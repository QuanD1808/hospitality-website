import React, { useState, useEffect } from 'react';
import { XIcon, UserIcon, SaveIcon } from 'lucide-react';

interface PatientFormProps {
  patient?: any;
  onClose: () => void;
  onSave?: (patient: any) => void;
}

export function PatientForm({ patient, onClose, onSave }: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    nationalId: '',
    age: '',
    gender: 'Nam',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        nationalId: patient.nationalId || '',
        age: patient.age ? patient.age.toString() : '',
        gender: patient.gender || 'Nam',
        phone: patient.phone || '',
        address: patient.address || '',
      });
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...patient,
        ...formData,
        age: parseInt(formData.age, 10) || 0,
      });
    }
    onClose();
  };

  const isEditing = !!patient;

  return (
    <div className="w-full">
      {/* Form header */}
      <div className="px-6 py-4 border-b border-gray-300 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center">
          <UserIcon size={20} className="mr-2 text-black" />
          <h2 className="text-lg font-semibold text-black">
            {isEditing ? 'Sửa thông tin bệnh nhân' : 'Thêm bệnh nhân mới'}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-gray-200 text-black transition-colors"
        >
          <XIcon size={20} />
        </button>
      </div>

      {/* Form content */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
              Họ và tên <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Nhập họ và tên..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="nationalId" className="block text-sm font-medium text-black mb-2">
              Số CCCD <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="nationalId"
              name="nationalId"
              required
              placeholder="Nhập số CCCD..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm"
              value={formData.nationalId}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-black mb-2">
              Tuổi <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              required
              min="0"
              placeholder="Nhập tuổi..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-black mb-2">
              Giới tính <span className="text-red-600">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm bg-white appearance-none"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
              Số điện thoại <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Nhập số điện thoại..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-black mb-2">
              Địa chỉ <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              placeholder="Nhập địa chỉ..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Form actions */}
        <div className="mt-8 pt-5 border-t border-gray-300 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-green-600 rounded-lg text-white font-medium hover:bg-green-700 transition-colors flex items-center shadow-sm"
          >
            <SaveIcon size={18} className="mr-2" />
            {isEditing ? 'Cập nhật' : 'Lưu'}
          </button>
        </div>
      </form>
    </div>
  );
}