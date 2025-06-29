import React, { useState, useEffect } from 'react';
import { XIcon, UserIcon, SearchIcon } from 'lucide-react';
import { User, searchUsers, getAllUsers, addQueue } from '../../../datats/mockPatients';
import * as apiService from '../../../services/api.service';
import { useAuth } from '../../../context/AuthContext';

interface AppointmentFormProps {
  onClose: () => void;
}

export function AppointmentForm({
  onClose
}: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientId: '', // Lưu trữ ID của bệnh nhân
    patientName: '',
    patientPhone: '',
    appointmentDate: new Date().toISOString().split('T')[0], // Today's date as default
    appointmentTime: '09:00', // Default time
    status: 'pending' // Default status for appointments
  });
  
  const [selectedPatient, setSelectedPatient] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [patients, setPatients] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  
  // Tải dữ liệu bệnh nhân khi component được tạo
  useEffect(() => {
    const loadPatients = async () => {
      const allUsers = await getAllUsers();
      const patientUsers = allUsers.filter(user => user.role === 'PATIENT');
      setPatients(patientUsers);
    };
    
    loadPatients();
  }, []);

  // Xử lý tìm kiếm bệnh nhân
  useEffect(() => {
    const searchPatientsAsync = async () => {
      if (searchTerm.length > 0) {
        // Sử dụng hàm searchUsers từ mockPatients.ts và lọc chỉ lấy các user có role='PATIENT'
        const results = await searchUsers(searchTerm);
        const filteredResults = results.filter(user => user.role === 'PATIENT');
        setSearchResults(filteredResults);
      } else {
        setSearchResults([]);
      }
    };
    
    searchPatientsAsync();
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const selectPatient = (patient: User) => {
    setSelectedPatient(patient);
    setFormData({
      ...formData,
      patientId: patient._id,
      patientName: patient.fullName,
      patientPhone: patient.phone
    });
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatient) {
      alert('Vui lòng chọn bệnh nhân');
      return;
    }

    try {
      setLoading(true);
      
      // Create appointment object
      const appointmentData = {
        patientId: formData.patientId,
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        status: formData.status
      };
      
      // Create appointment via API if token exists
      let success = false;
      if (token) {
        try {
          const createdAppointment = await apiService.createAppointment(appointmentData, token);
          if (createdAppointment && createdAppointment._id) {
            success = true;
          }
        } catch (apiError) {
          console.error("API Error creating appointment:", apiError);
        }
      }
      
      // Fallback: Add to queue directly if API fails or no token
      if (!success) {
        // Add the patient to queue as a fallback
        const queueStatus = 'waiting' as const;
        const newQueue = await addQueue(formData.patientId, queueStatus);
        
        if (newQueue) {
          console.log('Patient added to queue as fallback:', newQueue);
          success = true;
        }
      }
      
      if (success) {
        alert(`Đã đặt lịch hẹn cho bệnh nhân ${selectedPatient.fullName}!`);
        onClose();
      } else {
        alert('Không thể đặt lịch hẹn. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert('Đã xảy ra lỗi khi đặt lịch hẹn. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
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
                    setFormData({...formData, patientId: '', patientName: '', patientPhone: ''});
                  }}
                  className="text-gray-500 hover:text-red-500"
                >
                  <XIcon size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Appointment Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="appointmentDate">
              Ngày hẹn <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.appointmentDate}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {/* Appointment Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="appointmentTime">
              Thời gian <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.appointmentTime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        {/* Trạng thái */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="status">
            Trạng thái cuộc hẹn
          </label>
          <select
            id="status"
            name="status"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="pending">Đang chờ xác nhận (pending)</option>
            <option value="confirmed">Đã xác nhận (confirmed)</option>
            <option value="canceled">Đã hủy (canceled)</option>
          </select>
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            disabled={loading}
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={!selectedPatient || loading}
          >
            {loading ? 'Đang xử lý...' : 'Đặt lịch'}
          </button>
        </div>
      </form>
    </div>
  );
}