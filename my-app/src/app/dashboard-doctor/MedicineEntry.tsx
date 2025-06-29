'use client';

import React, { useState, useEffect } from 'react';
import { Medicine as AuthMedicine } from '../datats/auth';
import { Medicine as MockMedicine, getAllMedicines } from '../datats/mockPatients';
import { TrashIcon, ChevronDownIcon } from 'lucide-react';

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
  const [availableMedicines, setAvailableMedicines] = useState<MockMedicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<MockMedicine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Lấy danh sách thuốc từ mockdata
  useEffect(() => {
    const medicines = getAllMedicines();
    setAvailableMedicines(medicines);
    setFilteredMedicines(medicines);
    setSearchTerm(name); // Đặt giá trị tìm kiếm ban đầu là tên thuốc hiện tại
  }, []);
  
  // Thêm sự kiện click ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`#medicine-dropdown-${medicine.id}`)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [medicine.id]);

  // Cập nhật lại danh sách thuốc được lọc khi nhập term tìm kiếm
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMedicines(availableMedicines);
    } else {
      const filtered = availableMedicines.filter(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMedicines(filtered);
    }
  }, [searchTerm, availableMedicines]);

  // Xử lý khi chọn một loại thuốc từ danh sách
  const handleSelectMedicine = (selectedMedicine: MockMedicine) => {
    setName(selectedMedicine.name);
    setIsDropdownOpen(false);
    setSearchTerm(selectedMedicine.name);
    
    onUpdate({
      ...medicine,
      name: selectedMedicine.name,
      totalPills: parseInt(totalPills) || 0,
      schedule
    });
  };
  
  // Xử lý thay đổi số lượng và cách dùng
  const handleChange = () => {
    onUpdate({
      ...medicine,
      name,
      totalPills: parseInt(totalPills) || 0,
      schedule
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
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onClick={(e) => e.stopPropagation()}
                placeholder="Tìm thuốc..."
                className="border-none outline-none focus:ring-0 p-0 w-full text-base text-gray-800"
              />
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            </div>
            
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none border border-gray-200">
                {filteredMedicines.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-gray-600">Không tìm thấy thuốc</div>
                ) : (
                  filteredMedicines.map(med => (
                    <div
                      key={med._id}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-50 text-sm text-gray-800"
                      onClick={() => handleSelectMedicine(med)}
                    >
                      {med.name} - <span className="text-blue-600 font-medium">{med.price}đ/viên</span>
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
            onChange={(e) => {
              setTotalPills(e.target.value);
              handleChange();
            }}
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
            onChange={(e) => {
              setSchedule(e.target.value);
              handleChange();
            }}
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