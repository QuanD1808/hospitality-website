'use client';

import React, { useEffect, useState } from 'react';
import { ClockIcon, PhoneIcon } from 'lucide-react';
import { User } from '../datats/mockPatients';

// Interface cho thông tin bệnh nhân trong hàng đợi
interface PatientInQueue {
  _id: string;
  patient: string;
  status: 'waiting' | 'in_progress' | 'completed' | 'canceled';
  doctorId?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  patientInfo: User | null;
}

interface PatientCardProps {
  patientInQueue: PatientInQueue;
  isSelected: boolean;
  onSelect: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patientInQueue,
  isSelected,
  onSelect
}) => {
  // Lấy thông tin người dùng từ patientInQueue
  const patient = patientInQueue.patientInfo;
  
  if (!patient) {
    return null; // Không hiển thị nếu không có thông tin người dùng
  }
  
  const [waitingTime, setWaitingTime] = useState(() => 
    Math.floor((new Date().getTime() - new Date(patientInQueue.createdAt).getTime()) / 60000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingTime(Math.floor((new Date().getTime() - new Date(patientInQueue.createdAt).getTime()) / 60000));
    }, 1000);
    return () => clearInterval(interval);
  }, [patientInQueue.createdAt]);

  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith('+84')) {
      return phone.replace(/(\+84)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
    }
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  };

  return <div className={`p-4 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`} onClick={onSelect}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">{patient.fullName}</h3>
          {/* Trong User mockPatients không có age và gender nên hiển thị thông tin có sẵn */}
          <p className="text-sm text-gray-800">
            {patient.role} • {new Date(patientInQueue.createdAt).toLocaleDateString()}
          </p>
          <div className="flex items-center text-sm text-gray-800 mt-1">
            <PhoneIcon className="h-3 w-3 mr-1" />
            {formatPhoneNumber(patient.phone)}
          </div>
          <p className="text-sm text-gray-800 mt-1">{patient.email}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center mt-1 text-sm text-gray-900 font-medium">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>Đợi: {waitingTime} phút</span>
          </div>
        </div>
      </div>
    </div>;
};