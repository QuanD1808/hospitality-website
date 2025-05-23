'use client';

import React, { useEffect, useState } from 'react';
import { ClockIcon, PhoneIcon } from 'lucide-react';
import { Patient, AppointmentType } from '../datats/auth';

interface PatientCardProps {
  patient: Patient;
  isSelected: boolean;
  onSelect: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  isSelected,
  onSelect
}) => {
  const [waitingTime, setWaitingTime] = useState(() => Math.floor((new Date().getTime() - new Date(patient.checkInTime).getTime()) / 60000));

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingTime(Math.floor((new Date().getTime() - new Date(patient.checkInTime).getTime()) / 60000));
    }, 1000);
    return () => clearInterval(interval);
  }, [patient.checkInTime]);

  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith('+84')) {
      return phone.replace(/(\+84)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
    }
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  };

  const getAppointmentTypeColor = (type: AppointmentType) => {
    switch (type) {
      case 'Khẩn cấp':
        return 'bg-red-100 text-red-800';
      case 'Đã đặt trước':
        return 'bg-blue-100 text-blue-800';
      case 'Tái khám':
        return 'bg-purple-100 text-purple-800';
      case 'Khám trực tiếp':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return <div className={`p-4 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`} onClick={onSelect}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">{patient.name}</h3>
          <p className="text-sm text-gray-800">
            {patient.age} tuổi • {patient.gender}
          </p>
          <div className="flex items-center text-sm text-gray-800 mt-1">
            <PhoneIcon className="h-3 w-3 mr-1" />
            {formatPhoneNumber(patient.phone)}
          </div>
          <p className="text-sm text-gray-800 mt-1">{patient.reason}</p>
        </div>
        <div className="flex flex-col items-end">
          {/* <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAppointmentTypeColor(patient.appointmentType as AppointmentType)}`}>
            {patient.appointmentType}
          </span> */}
          <div className="flex items-center mt-1 text-sm text-gray-900 font-medium">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>Đợi: {waitingTime} phút</span>
          </div>
        </div>
      </div>
    </div>;
};