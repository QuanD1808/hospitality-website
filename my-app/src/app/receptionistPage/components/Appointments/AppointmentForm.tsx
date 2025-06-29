import React, { useState, useEffect } from 'react';
import { XIcon, UserIcon, SearchIcon } from 'lucide-react';
import { User, searchUsers, mockPatients, addQueue } from '../../../datats/mockPatients';

interface AppointmentFormProps {
  onClose: () => void;
}

export function AppointmentForm({
  onClose
}: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientId: '', // Lưu trữ ID của bệnh nhân
    status: 'waiting' // Mặc định là waiting
  });
  
  const [selectedPatient, setSelectedPatient] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  // Sử dụng danh sách bệnh nhân từ mockPatients.ts
  const patients = mockPatients;

  // Xử lý tìm kiếm bệnh nhân
  useEffect(() => {
    if (searchTerm.length > 0) {
      // Sử dụng hàm searchUsers từ mockPatients.ts và lọc chỉ lấy các user có role='PATIENT'
      const results = searchUsers(searchTerm).filter(user => user.role === 'PATIENT');
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const selectPatient = (patient: User) => {
    setSelectedPatient(patient);
    setFormData({
      ...formData,
      patientId: patient._id
    });
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      status: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatient) {
      alert('Vui lòng chọn bệnh nhân');
      return;
    }

    // Sử dụng hàm addQueue từ mockPatients.ts để thêm bệnh nhân vào queue
    const status = formData.status as 'waiting' | 'in_progress' | 'completed' | 'canceled';
    const newQueue = addQueue(formData.patientId, status);
    
    if (newQueue) {
      console.log('Patient added to queue:', newQueue);
      alert(`Đã thêm bệnh nhân ${selectedPatient.fullName} vào hàng chờ!`);
      onClose();
    } else {
      alert('Không thể thêm bệnh nhân vào hàng chờ. Bệnh nhân có thể đã tồn tại trong hàng chờ.');
    }
  };
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex justify-between items-center border-b p-4">
        <h2 className="text-xl font-semibold text-gray-800">Đặt lịch khám</h2>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-3">ID và version sẽ được tạo tự động</span>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XIcon size={20} className="text-gray-500" />
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        {/* Tìm kiếm bệnh nhân */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tìm bệnh nhân (patient) <span className="text-red-500">*</span>
          </label>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm theo tên, CCCD hoặc số điện thoại..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          {searchResults.length > 0 && (
            <div className="mt-2 border border-gray-200 rounded-md max-h-60 overflow-y-auto bg-white shadow-md">
              {searchResults.map((patient) => (
                <div
                  key={patient._id}
                  className="p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer flex items-center"
                  onClick={() => selectPatient(patient)}
                >
                  <UserIcon size={20} className="text-gray-500 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">{patient.fullName}</p>
                    <div className="text-sm text-gray-500">
                      ID: {patient.userId} | SĐT: {patient.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Hiển thị bệnh nhân đã chọn */}
          {selectedPatient && (
            <div className="mt-4 p-3 border border-blue-200 rounded-md bg-blue-50">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <UserIcon size={20} className="text-blue-500 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">{selectedPatient.fullName}</p>
                    <div className="text-sm text-gray-600">
                      ID: {selectedPatient.userId} | SĐT: {selectedPatient.phone}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPatient(null);
                    setFormData({...formData, patientId: ''});
                  }}
                  className="text-gray-500 hover:text-red-500"
                >
                  <XIcon size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Trạng thái */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="status">
            Trạng thái cuộc hẹn (status)
          </label>
          <select
            id="status"
            name="status"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.status}
            onChange={handleStatusChange}
          >
            <option value="waiting">Đang chờ (waiting)</option>
            <option value="in_progress">Đang thực hiện (in_progress)</option>
            <option value="completed">Đã hoàn thành (completed)</option>
            <option value="canceled">Đã hủy (canceled)</option>
          </select>
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={!selectedPatient}
          >
            Đặt lịch
          </button>
        </div>
      </form>
    </div>
  );
}