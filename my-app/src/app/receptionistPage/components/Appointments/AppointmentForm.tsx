import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
interface AppointmentFormProps {
  onClose: () => void;
}
export function AppointmentForm({
  onClose
}: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    nationalId: '',
    age: '',
    gender: 'Nam',
    phone: '',
    address: '',
    appointmentDate: '',
    appointmentTime: '',
    symptoms: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally save the appointment data
    console.log('Appointment form submitted:', formData);
    onClose();
  };
  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];
  // Get date 30 days from now for max date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];
  return <div>
      <div className="flex justify-between items-center border-b p-4">
        <h2 className="text-xl font-semibold text-gray-800">Đặt lịch khám</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
          <XIcon size={20} className="text-gray-500" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input type="text" id="name" name="name" required className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nationalId">
              Căn cước công dân <span className="text-red-500">*</span>
            </label>
            <input type="text" id="nationalId" name="nationalId" required className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.nationalId} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="age">
              Tuổi <span className="text-red-500">*</span>
            </label>
            <input type="number" id="age" name="age" required min="0" max="120" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.age} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="gender">
              Giới tính <span className="text-red-500">*</span>
            </label>
            <select id="gender" name="gender" required className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.gender} onChange={handleChange}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input type="tel" id="phone" name="phone" required className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <input type="text" id="address" name="address" required className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.address} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointmentDate">
              Ngày hẹn <span className="text-red-500">*</span>
            </label>
            <input type="date" id="appointmentDate" name="appointmentDate" required min={today} max={maxDateStr} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.appointmentDate} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="appointmentTime">
              Giờ hẹn <span className="text-red-500">*</span>
            </label>
            <select id="appointmentTime" name="appointmentTime" required className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.appointmentTime} onChange={handleChange}>
              <option value="">Chọn giờ hẹn</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="symptoms">
            Triệu chứng / Lý do khám
          </label>
          <textarea id="symptoms" name="symptoms" rows={3} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.symptoms} onChange={handleChange} placeholder="Mô tả triệu chứng hoặc lý do khám..." />
        </div>
        <div className="mt-8 flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Hủy bỏ
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Đặt lịch
          </button>
        </div>
      </form>
    </div>;
}