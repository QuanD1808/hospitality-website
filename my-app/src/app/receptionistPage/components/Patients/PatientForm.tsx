import React, { useState, useEffect } from 'react';
import { XIcon, UserIcon, SaveIcon } from 'lucide-react';
import { User, addPatient, updatePatient } from '../../../datats/mockPatients';

interface PatientFormProps {
  patient?: User | null;
  onClose: () => void;
  onSave?: (patient: Partial<User>) => void;
}

export function PatientForm({ patient, onClose, onSave }: PatientFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    userId: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'PATIENT' as const,
  });
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!patient;

  useEffect(() => {
    if (patient) {
      setFormData({
        fullName: patient.fullName || '',
        userId: patient.userId || '',
        username: patient.username || '',
        email: patient.email || '',
        phone: patient.phone || '',
        password: '',  // Không hiển thị mật khẩu
        role: 'PATIENT',  // Vì form này chỉ dành cho bệnh nhân
      });
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Xóa lỗi khi người dùng thay đổi input
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xóa lỗi trước khi submit
    setError(null);
    
    // Chuẩn bị dữ liệu người dùng
    const userData = {
      ...formData,
      // Nếu không phải là chế độ chỉnh sửa và userId trống, không cần thêm vào
      // hệ thống sẽ tự động tạo userId
      ...((!isEditing && !formData.userId.trim()) ? {} : { userId: formData.userId }),
      role: formData.role as 'PATIENT' | 'DOCTOR' | 'PHARMACIST' | 'RECEPTIONIST' | 'ADMIN',
    };

    try {
      if (isEditing && patient && patient._id) {
        // Cập nhật bệnh nhân hiện có
        const updatedPatient = updatePatient(patient._id, userData);
        if (updatedPatient) {
          alert(`Đã cập nhật thông tin bệnh nhân: ${updatedPatient.fullName}`);
        } else {
          setError('Không thể cập nhật thông tin bệnh nhân. Vui lòng thử lại.');
          return;
        }
      } else {
        // Thêm bệnh nhân mới
        const newPatient = addPatient(userData);
        if (newPatient) {
          alert(`Đã thêm bệnh nhân mới: ${newPatient.fullName} (ID: ${newPatient.userId})`);
        } else {
          setError('Không thể thêm bệnh nhân mới. Vui lòng thử lại.');
          return;
        }
      }

      // Gọi onSave callback nếu có để thông báo lên component cha
      if (onSave) {
        onSave(userData);
      }
      
      onClose();
    } catch (error) {
      console.error('Lỗi khi lưu bệnh nhân:', error);
      // Hiển thị thông báo lỗi
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Đã xảy ra lỗi khi lưu thông tin bệnh nhân.');
      }
    }
  };

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
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <p className="font-medium">{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-black mb-2">
              Họ và tên <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              placeholder="Nhập họ và tên..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-black mb-2">
              User ID {isEditing && <span className="text-red-600">*</span>}
              {!isEditing && <span className="text-xs text-gray-500 ml-1">(Tự động nếu để trống)</span>}
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              required={isEditing}
              placeholder={isEditing ? "Nhập User ID..." : "Để trống để tạo ID tự động..."}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm"
              value={formData.userId}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black mb-2">
              Tên đăng nhập <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Nhập tên đăng nhập..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Nhập email..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm"
              value={formData.email}
              onChange={handleChange}
            />
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
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
              Mật khẩu {!isEditing && <span className="text-red-600">*</span>}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required={!isEditing}
              placeholder={isEditing ? "Để trống nếu không thay đổi..." : "Nhập mật khẩu..."}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm"
              value={formData.password}
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