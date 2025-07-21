'use client';

import React, { useState, useEffect } from 'react';
import { PatientList } from './PatientList';
import { DiagnosisPanel } from './DiagnosisPanel';
import { getAllQueuesWithPatientInfo, updateQueueStatus, User, Queue } from '../datats/mockPatients';
import * as apiService from '../services/api.service';
import { useAuth } from '../context/AuthContext';

// === SỬA LỖI 1: Cập nhật Interface cho chính xác ===
// Interface cho thông tin bệnh nhân trong danh sách chờ
interface PatientInQueue {
  _id: string; // ID của queue
  patient: string; // ID của bệnh nhân
  status: 'waiting' | 'in_progress' | 'completed' | 'canceled';
  doctorId?: string;
  createdAt: string;
  updatedAt: string;
  patientInfo: User | null; // Cho phép patientInfo là null để phản ánh đúng dữ liệu
  __v?: number; // Thêm thuộc tính tùy chọn này
}

export const Dashboard = () => {
  const { token } = useAuth();
  const [patients, setPatients] = useState<PatientInQueue[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientInQueue | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPatients();
    const interval = setInterval(() => {
      loadPatients();
    }, 30000);
    return () => clearInterval(interval);
  }, [token]);

  // Hàm để tải danh sách bệnh nhân đang chờ
  const loadPatients = async () => {
    try {
      setLoading(true);
      console.log("Refreshing doctor's patient list...");
      
      let patientsData: PatientInQueue[] = [];

      if (token) {
        try {
          const doctorQueues = await apiService.getQueuesByDoctor(token, 'in_progress');
          console.log(`Loaded ${doctorQueues.length} queues assigned to current doctor`);
          
          // Chuyển đổi an toàn, chấp nhận patient có thể không được populate
          patientsData = doctorQueues
            .filter((queue: any) => queue) // Lọc bỏ queue null
            .map((queue: any): PatientInQueue => ({
              _id: queue._id,
              patient: typeof queue.patient === 'object' && queue.patient !== null ? queue.patient._id : queue.patient,
              status: queue.status,
              doctorId: typeof queue.doctorId === 'object' && queue.doctorId !== null ? queue.doctorId._id : queue.doctorId,
              createdAt: queue.createdAt,
              updatedAt: queue.updatedAt,
              patientInfo: typeof queue.patient === 'object' && queue.patient !== null ? queue.patient : null,
              __v: queue.__v
            }));
          
        } catch (apiError) {
          console.error("API error loading doctor's patients:", apiError);
          patientsData = await fallbackToMockData();
        }
      } else {
        patientsData = await fallbackToMockData();
      }

      // === SỬA LỖI 2: Lọc bỏ các bản ghi không có thông tin bệnh nhân ===
      // Chỉ giữ lại những hàng chờ có thông tin bệnh nhân hợp lệ để hiển thị
      const validPatients = patientsData.filter(p => p.patientInfo !== null);
      setPatients(validPatients);

    } catch (error) {
      console.error("Error loading patients:", error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Hàm fallback trả về đúng kiểu dữ liệu
  const fallbackToMockData = async (): Promise<PatientInQueue[]> => {
    try {
      console.log("Using mock data for doctor's patients");
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const doctorId = currentUser?._id;
      
      if (!doctorId) return [];
      
      const queues = await getAllQueuesWithPatientInfo();
      
      // Lọc an toàn
      const patientsInProgress = queues.filter(q => 
        q && q.status === 'in_progress' && q.doctorId === doctorId
      );
      
      return patientsInProgress as PatientInQueue[];
    } catch (error) {
      console.error("Error loading mock patient data:", error);
      return [];
    }
  };

  const handleSelectPatient = (patient: PatientInQueue) => {
    setSelectedPatient(patient);
  };

  const handleMarkAsDone = async (queueId: string) => {
    setLoading(true);
    try {
      if (token) {
        await apiService.updateQueueStatus(queueId, token, 'completed');
      } else {
        await updateQueueStatus(queueId, 'completed');
      }
      
      await loadPatients();
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error marking patient as done:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedPatients = [...patients]
    .filter(p => p && p.createdAt)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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