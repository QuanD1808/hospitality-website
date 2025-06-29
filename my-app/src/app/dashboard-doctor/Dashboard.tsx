'use client';

import React, { useState, useEffect } from 'react';
import { PatientList } from './PatientList';
import { DiagnosisPanel } from './DiagnosisPanel';
import { getAllQueuesWithPatientInfo, updateQueueStatus, User, Queue } from '../datats/mockPatients';

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
  // State cho danh sách bệnh nhân đang chờ
  const [patients, setPatients] = useState<PatientInQueue[]>([]);
  // State cho bệnh nhân được chọn
  const [selectedPatient, setSelectedPatient] = useState<PatientInQueue | null>(null);

  // Lấy danh sách bệnh nhân đang chờ khi component mount
  useEffect(() => {
    loadPatients();
  }, []);

  // Hàm để tải danh sách bệnh nhân đang chờ
  const loadPatients = () => {
    // Lấy tất cả queue kèm thông tin bệnh nhân
    const queues = getAllQueuesWithPatientInfo();
    // Lọc chỉ lấy những bệnh nhân đang chờ khám (status = 'waiting')
    const waitingPatients = queues.filter(q => q.status === 'waiting');
    setPatients(waitingPatients);
  };

  // Xử lý khi chọn bệnh nhân
  const handleSelectPatient = (patient: PatientInQueue) => {
    setSelectedPatient(patient);
  };

  // Xử lý khi hoàn thành khám bệnh nhân
  const handleMarkAsDone = (queueId: string) => {
    // Cập nhật trạng thái queue thành 'completed'
    updateQueueStatus(queueId, 'completed');
    // Tải lại danh sách bệnh nhân
    loadPatients();
    // Bỏ chọn bệnh nhân hiện tại
    setSelectedPatient(null);
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