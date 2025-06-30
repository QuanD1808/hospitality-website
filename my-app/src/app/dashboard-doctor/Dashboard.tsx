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
  patientInfo: User | null;
}

export const Dashboard = () => {
  const { token } = useAuth();
  // State cho danh sách bệnh nhân đang chờ
  const [patients, setPatients] = useState<PatientInQueue[]>([]);
  // State cho bệnh nhân được chọn
  const [selectedPatient, setSelectedPatient] = useState<PatientInQueue | null>(null);
  const [loading, setLoading] = useState(false);

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

  // Hàm để tải danh sách bệnh nhân đang chờ
  const loadPatients = async () => {
    try {
      setLoading(true);
      console.log("Refreshing doctor's patient list...");
      
      if (token) {
        // Sử dụng API để lấy danh sách bệnh nhân được gán cho bác sĩ hiện tại
        try {
          // Lấy danh sách queue của bác sĩ hiện tại có trạng thái "in_progress"
          const doctorQueues = await apiService.getQueuesByDoctor(token, 'in_progress');
          console.log(`Loaded ${doctorQueues.length} queues assigned to current doctor`);
          
          // Convert API response to PatientInQueue format
          const patientsInProgress: PatientInQueue[] = doctorQueues.map((queue: any) => ({
            _id: queue._id,
            patient: typeof queue.patient === 'object' ? queue.patient._id : queue.patient,
            status: queue.status,
            doctorId: typeof queue.doctorId === 'object' ? queue.doctorId._id : queue.doctorId,
            createdAt: queue.createdAt,
            updatedAt: queue.updatedAt,
            patientInfo: typeof queue.patient === 'object' ? queue.patient : null
          }));
          
          setPatients(patientsInProgress);
        } catch (apiError) {
          console.error("API error loading doctor's patients:", apiError);
          // Fallback to mock data if API fails
          fallbackToMockData();
        }
      } else {
        // No token, use mock data
        fallbackToMockData();
      }
    } catch (error) {
      console.error("Error loading patients:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fallback function to load mock data
  const fallbackToMockData = async () => {
    try {
      console.log("Using mock data for doctor's patients");
      // Get current doctor ID from localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const doctorId = currentUser?._id;
      
      if (!doctorId) {
        console.warn("No doctor ID found in localStorage, can't filter patients");
        return;
      }
      
      // Lấy tất cả queue kèm thông tin bệnh nhân
      const queues = await getAllQueuesWithPatientInfo();
      // Lọc chỉ lấy những bệnh nhân đã được chuyển vào khám (status = 'in_progress')
      // VÀ được chỉ định cho bác sĩ hiện tại
      const patientsInProgress = queues.filter(q => 
        q.status === 'in_progress' && q.doctorId === doctorId
      );
      
      setPatients(patientsInProgress);
    } catch (error) {
      console.error("Error loading mock patient data:", error);
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