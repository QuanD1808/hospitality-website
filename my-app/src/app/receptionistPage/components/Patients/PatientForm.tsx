import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
interface PatientFormProps {
  patient?: any;
  onClose: () => void;
}
export function PatientForm({
  patient,
  onClose
}: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    nationalId: patient?.nationalId || '',
    age: patient?.age || '',
    gender: patient?.gender || 'Nam',
    phone: patient?.phone || '',
    address: patient?.address || ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    // Here you would normally save the data
    console.log('Form submitted:', formData);
    onClose();
  };
  return <div>
      <div className="flex justify-between items-center border-b p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {patient ? 'Sửa thông tin bệnh nhân' : 'Thêm bệnh nhân mới'}
        </h2>
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
              Địa chỉ
            </label>
            <input type="text" id="address" name="address" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.address} onChange={handleChange} />
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Hủy bỏ
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            {patient ? 'Cập nhật' : 'Tạo mới'}
          </button>
        </div>
      </form>
    </div>;
}