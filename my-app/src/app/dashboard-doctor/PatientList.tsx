'use client';

import React from 'react';
import { Patient } from '../data/types';
import { PatientCard } from './PatientCard';

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
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
              <div key={patient.id} className={idx === 0 ? '' : 'opacity-50 pointer-events-none'}>
                <PatientCard
                  patient={patient}
                  isSelected={selectedPatientId === patient.id}
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