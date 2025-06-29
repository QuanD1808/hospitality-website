'use client';

import React, { useState, useEffect } from 'react';
import { Medicine as AuthMedicine } from '../datats/auth';
import { TrashIcon, ChevronDownIcon } from 'lucide-react';
import * as apiService from '../services/api.service';
import { useAuth } from '../context/AuthContext';

interface MedicineEntryProps {
  medicine: AuthMedicine;
  onUpdate: (medicine: AuthMedicine) => void;
  onRemove: (id: string) => void;
}

export const MedicineEntry: React.FC<MedicineEntryProps> = ({
  medicine,
  onUpdate,
  onRemove
}) => {
  // State để lưu thông tin đơn thuốc
  const [name, setName] = useState(medicine.name);
  const [totalPills, setTotalPills] = useState(medicine.totalPills ? medicine.totalPills.toString() : '0');
  const [schedule, setSchedule] = useState(medicine.schedule || '');
  
  // State để quản lý dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [availableMedicines, setAvailableMedicines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  
  // Lấy danh sách thuốc từ API
  useEffect(() => {
    const fetchMedicines = async () => {
      setIsLoading(true);
      try {
        if (token) {
          const medicines = await apiService.getMedicines(token);
          setAvailableMedicines(medicines);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMedicines();
  }, [token]);

  // Xử lý khi chọn một loại thuốc từ danh sách
  const handleSelectMedicine = (selectedMedicine: any) => {
    setName(selectedMedicine.name);
    setIsDropdownOpen(false);
    
    // Cập nhật thông tin thuốc
    const updatedMedicine = {
      ...medicine,
      name: selectedMedicine.name,
      totalPills: parseInt(totalPills) || 0,
      schedule,
      medicineId: selectedMedicine._id
    };
    
    onUpdate(updatedMedicine);
  };
  
  // Cập nhật thông tin thuốc khi thay đổi số lượng và cách dùng
  const handlePillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTotalPills(newValue);
    
    onUpdate({
      ...medicine,
      name,
      totalPills: parseInt(newValue) || 0,
      schedule
    });
  };
  
  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSchedule(newValue);
    
    onUpdate({
      ...medicine,
      name,
      totalPills: parseInt(totalPills) || 0,
      schedule: newValue
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-3">
          <label htmlFor={`medicine-name-${medicine.id}`} className="block text-sm font-medium text-gray-800 mb-1">
            Tên thuốc
          </label>
          <div className="relative" id={`medicine-dropdown-${medicine.id}`}>
            <div 
              className="flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <input 
                type="text"
                id={`medicine-name-${medicine.id}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Chọn thuốc..."
                className="border-none outline-none focus:ring-0 p-0 w-full text-base text-gray-800"
                readOnly
              />
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            </div>
            
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none border border-gray-200">
                {isLoading ? (
                  <div className="px-3 py-4 text-sm text-gray-600 text-center">Đang tải...</div>
                ) : availableMedicines.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-gray-600">Không có thuốc</div>
                ) : (
                  availableMedicines.map(med => (
                    <div
                      key={med._id}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-50 text-sm text-gray-800"
                      onClick={() => handleSelectMedicine(med)}
                    >
                      {med.name} - <span>{med.price}đ/viên</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <label htmlFor={`medicine-total-${medicine.id}`} className="block text-sm font-medium text-gray-800 mb-1">
            Tổng số viên
          </label>
          <input
            type="number"
            id={`medicine-total-${medicine.id}`}
            value={totalPills}
            min={0}
            onChange={handlePillsChange}
            placeholder="0"
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-800 placeholder-gray-400 px-3 py-2"
          />
        </div>
        <div className="col-span-5">
          <label htmlFor={`medicine-schedule-${medicine.id}`} className="block text-sm font-medium text-gray-800 mb-1">
            Lịch uống hàng ngày
          </label>
          <input
            type="text"
            id={`medicine-schedule-${medicine.id}`}
            value={schedule}
            onChange={handleScheduleChange}
            placeholder="VD: 1 sáng, 2 trưa, 1 tối"
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-800 placeholder-gray-400 px-3 py-2"
          />
        </div>
        <div className="col-span-1 flex items-end justify-end h-full">
          <button
            type="button"
            onClick={() => onRemove(medicine.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md transition-colors"
            aria-label="Xóa thuốc"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};