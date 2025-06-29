'use client';

import React, { useState, useEffect } from 'react';
import { PatientList } from './PatientList';
import { DiagnosisPanel } from './DiagnosisPanel';
import { getAllQueuesWithPatientInfo, updateQueueStatus, User, Queue } from '../datats/mockPatients';
import * as apiService from '../services/api.service';
import { useAuth } from '../context/AuthContext';

// Interface cho thông tin bệnh nhân trong danh sách chờ
interface PatientInQueue {
  _id: string; // ID của queue
  patient: string; // ID của bệnh nhân
  status: 'waiting' | 'in_progress' | 'completed' | 'canceled';
  doctorId?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  patientInfo: User | null;
}

export const Dashboard = () => {
  const { token } = useAuth();
  // State cho danh sách bệnh nhân đang chờ
  const [patients, setPatients] = useState<PatientInQueue[]>([]);
  // State cho bệnh nhân được chọn
  const [selectedPatient, setSelectedPatient] = useState<PatientInQueue | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lấy danh sách bệnh nhân đang chờ khi component mount và định kỳ mỗi 30 giây
  useEffect(() => {
    // Tải dữ liệu ngay lần đầu
    loadPatients();
    
    // Thiết lập interval để tự động làm mới danh sách
    const interval = setInterval(() => {
      loadPatients();
    }, 30000); // 30 giây
    
    // Xóa interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  // Hàm chuyển đổi dữ liệu API thành định dạng PatientInQueue
  const formatApiData = (apiData: any[]): PatientInQueue[] => {
    return apiData.map(item => {
      // Xây dựng patientInfo từ dữ liệu patient
      let patientInfo = null;
      if (item.patient && typeof item.patient === 'object') {
        patientInfo = {
          _id: item.patient._id,
          userId: item.patient.userId || item.patient._id,
          fullName: item.patient.fullName,
          phone: item.patient.phone,
          role: item.patient.role,
          email: item.patient.email,
        } as User; // Type cast to User
      }
      
      // Chuẩn hóa trường patient thành string (ID)
      const patientId = typeof item.patient === 'object' ? item.patient._id : item.patient;
      
      // Chuẩn hóa trường doctorId thành string (ID)
      const doctorId = typeof item.doctorId === 'object' ? item.doctorId._id : item.doctorId;
      
      return {
        _id: item._id,
        patient: patientId,
        status: item.status,
        doctorId: doctorId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        __v: item.__v,
        patientInfo
      } as PatientInQueue; // Type cast to PatientInQueue
    }) as PatientInQueue[];
  };

  // Hàm để tải danh sách bệnh nhân đang chờ
  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Refreshing doctor's patient list...");
      
      if (token) {
        try {
          // Sử dụng endpoint mới để lấy danh sách bệnh nhân chỉ của bác sĩ đang đăng nhập
          console.log("Fetching doctor's queues from API...");
          const doctorQueues = await apiService.getDoctorQueues(token, 'in_progress');
          console.log(`API returned ${doctorQueues.length} queues for current doctor`);
          
          // Chuyển đổi dữ liệu API thành định dạng PatientInQueue
          const formattedQueues = formatApiData(doctorQueues);
          setPatients(formattedQueues);
          
          // Nếu đã chọn một bệnh nhân nhưng bệnh nhân đó không còn trong danh sách mới
          // thì bỏ chọn bệnh nhân đó
          if (selectedPatient && !formattedQueues.some(p => p._id === selectedPatient._id)) {
            setSelectedPatient(null);
          }
        } catch (apiError: any) {
          console.error("API error loading patients:", apiError);
          setError(`Lỗi API: ${apiError.message}`);
          // Fallback to mock data
          useMockData();
        }
      } else {
        // Không có token, sử dụng mock data
        useMockData();
      }
    } catch (error: any) {
      console.error("Error loading patients:", error);
      setError(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Sử dụng mock data khi không có token hoặc API bị lỗi
  const useMockData = async () => {
    try {
      // Lấy tất cả queue kèm thông tin bệnh nhân từ mock data
      const queues = await getAllQueuesWithPatientInfo();
      // Lọc chỉ lấy những bệnh nhân đã được chuyển vào khám (status = 'in_progress')
      const patientsInProgress = queues.filter(q => q.status === 'in_progress');
      setPatients(patientsInProgress);
    } catch (error) {
      console.error("Error loading patients:", error);
    }
  };

  // Xử lý khi chọn bệnh nhân
  const handleSelectPatient = (patient: PatientInQueue) => {
    setSelectedPatient(patient);
  };

  // Xử lý khi hoàn thành khám bệnh nhân
  const handleMarkAsDone = async (queueId: string) => {
    setLoading(true);
    try {
      if (token) {
        // Sử dụng API nếu có token
        try {
          // Cập nhật trạng thái queue thành 'completed' thông qua API
          const response = await apiService.updateQueueStatus(
            queueId,
            token,
            'completed'
          );
          console.log("Queue marked as completed via API:", response);
        } catch (apiError) {
          console.error("API error marking queue as done:", apiError);
          // Fallback to mock function
          await updateQueueStatus(queueId, 'completed');
        }
      } else {
        // Sử dụng mock function nếu không có token
        await updateQueueStatus(queueId, 'completed');
      }
      
      // Tải lại danh sách bệnh nhân
      await loadPatients();
      // Bỏ chọn bệnh nhân hiện tại
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error marking patient as done:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sắp xếp bệnh nhân theo thời gian chờ giảm dần
  const sortedPatients = [...patients].sort((a, b) => {
    const waitA = new Date().getTime() - new Date(a.createdAt).getTime();
    const waitB = new Date().getTime() - new Date(b.createdAt).getTime();
    return waitB - waitA;
  });

  return (
    <div className="flex flex-col lg:flex-row w-full h-full gap-6">
      <div className="w-full lg:w-1/3 h-full">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <PatientList 
          patients={sortedPatients} 
          onSelectPatient={handleSelectPatient} 
          selectedPatientId={selectedPatient ? selectedPatient._id : undefined} 
        />
      </div>
      <div className="w-full lg:w-2/3 h-full">
        <DiagnosisPanel 
          patient={selectedPatient?.patientInfo || null} 
          queueInfo={selectedPatient || null}
          onMarkAsDone={handleMarkAsDone} 
        />
      </div>
    </div>
  );
};