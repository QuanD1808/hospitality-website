'use client';

import React, { useState } from 'react';
import { PatientList } from './PatientList';
import { DiagnosisPanel } from './DiagnosisPanel';
import { mockPatients, Patient } from '../data/auth';

export const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleMarkAsDone = (patientId: string) => {
    setPatients(prev => prev.filter(p => String(p.id) !== patientId));
    setSelectedPatient(null);
  };

  // Sắp xếp bệnh nhân theo thời gian đợi giảm dần
  const sortedPatients = [...patients].sort((a, b) => {
    const waitA = new Date().getTime() - new Date(a.checkInTime).getTime();
    const waitB = new Date().getTime() - new Date(b.checkInTime).getTime();
    return waitB - waitA;
  });

  return (
    <div className="flex flex-col lg:flex-row w-full h-full gap-6">
      <div className="w-full lg:w-1/3 h-full">
        <PatientList 
          patients={sortedPatients} 
          onSelectPatient={handleSelectPatient} 
          selectedPatientId={selectedPatient ? String(selectedPatient.id) : undefined} 
        />
      </div>
      <div className="w-full lg:w-2/3 h-full">
        <DiagnosisPanel 
          patient={selectedPatient} 
          onMarkAsDone={handleMarkAsDone} 
        />
      </div>
    </div>
  );
};