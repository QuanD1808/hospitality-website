'use client';

import React from 'react';
import { PatientCard } from './PatientCard';
import { User } from '../datats/mockPatients';

// Interface cho thông tin bệnh nhân trong hàng đợi
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

interface PatientListProps {
  patients: PatientInQueue[];
  onSelectPatient: (patient: PatientInQueue) => void;
  selectedPatientId?: string;
}

export const PatientList: React.FC<PatientListProps> = ({
  patients,
  onSelectPatient,
  selectedPatientId
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md h-full">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Danh sách bệnh nhân của bạn</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {patients.length} bệnh nhân
        </span>
      </div>
      <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {patients.length === 0 ? (
          <div className="text-center text-gray-700 py-8">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-base">Không có bệnh nhân nào được gán cho bạn</p>
            <p className="text-xs text-gray-500 mt-1">Các bệnh nhân sẽ được tiếp tân chuyển đến bạn</p>
          </div>
        ) : (
          <div className="space-y-2">
            {patients.map((patient, idx) => (
              <div key={patient._id} className={idx === 0 ? '' : 'opacity-50 pointer-events-none'}>
                <PatientCard
                  patientInQueue={patient}
                  isSelected={selectedPatientId === patient._id}
                  onSelect={() => idx === 0 && onSelectPatient(patient)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};