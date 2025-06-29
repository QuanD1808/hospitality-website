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
        <h2 className="text-lg font-semibold text-gray-900">Danh sách bệnh nhân</h2>
      </div>
      <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {patients.length === 0 ? (
          <div className="text-center text-gray-700 text-sm">Không có bệnh nhân trong danh sách chờ.</div>
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