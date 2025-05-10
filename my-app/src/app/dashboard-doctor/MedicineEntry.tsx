'use client';

import React, { useState } from 'react';
import { Medicine } from '../data/types';
import { TrashIcon } from 'lucide-react';

interface MedicineEntryProps {
  medicine: Medicine;
  onUpdate: (medicine: Medicine) => void;
  onRemove: (id: string) => void;
}

export const MedicineEntry: React.FC<MedicineEntryProps> = ({
  medicine,
  onUpdate,
  onRemove
}) => {
  const [name, setName] = useState(medicine.name);
  const [totalPills, setTotalPills] = useState(medicine.dosage || '0');
  const [schedule, setSchedule] = useState(medicine.frequency || '');

  const handleChange = () => {
    onUpdate({
      ...medicine,
      name,
      dosage: totalPills,
      frequency: schedule,
      duration: ''
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-3">
          <label htmlFor={`medicine-name-${medicine.id}`} className="block text-sm font-medium text-gray-900 mb-1">
            Tên thuốc
          </label>
          <input
            type="text"
            id={`medicine-name-${medicine.id}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleChange();
            }}
            placeholder="VD: Paracetamol"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
        </div>
        <div className="col-span-3">
          <label htmlFor={`medicine-total-${medicine.id}`} className="block text-sm font-medium text-gray-900 mb-1">
            Tổng số viên
          </label>
          <input
            type="number"
            id={`medicine-total-${medicine.id}`}
            value={totalPills}
            min={0}
            onChange={(e) => {
              setTotalPills(e.target.value);
              handleChange();
            }}
            placeholder="0"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
        </div>
        <div className="col-span-5">
          <label htmlFor={`medicine-schedule-${medicine.id}`} className="block text-sm font-medium text-gray-900 mb-1">
            Lịch uống hàng ngày
          </label>
          <input
            type="text"
            id={`medicine-schedule-${medicine.id}`}
            value={schedule}
            onChange={(e) => {
              setSchedule(e.target.value);
              handleChange();
            }}
            placeholder="VD: 1 sáng, 2 trưa, 1 tối"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
        </div>
        <div className="col-span-1 flex items-end justify-end h-full">
          <button
            type="button"
            onClick={() => onRemove(medicine.id)}
            className="p-2 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md"
            aria-label="Xóa thuốc"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};