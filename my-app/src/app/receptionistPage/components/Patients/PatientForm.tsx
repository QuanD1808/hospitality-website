import React, { useState, useEffect } from 'react';
import { XIcon, UserIcon, SaveIcon } from 'lucide-react';
import { User, generateMongoId } from '../../../datats/mockPatients';
import { useAuth } from '../../../context/AuthContext';
import * as apiService from '../../../services/api.service';

interface PatientFormProps {
  patient?: User | null;
  onClose: () => void;
  onSave?: (patient: Partial<User>) => void;
  isLoading?: boolean;
}

export function PatientForm({ patient, onClose, onSave, isLoading = false }: PatientFormProps) {
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
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [internalLoading, setInternalLoading] = useState(false);
  
  // Combine external and internal loading states
  const loading = isLoading || internalLoading;
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { token, user } = useAuth();

  // Define mock functions for fallback
  const addPatient = async (patientData: Partial<User>): Promise<User | null> => {
    try {
      // Create a new patient object with MongoDB-like ID
      const newPatient = {
        ...patientData,
        _id: generateMongoId(),
        userId: patientData.userId || `PA${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      } as User;
      
      console.log("Using mock function to add patient:", newPatient);
      return newPatient;
    } catch (error) {
      console.error("Error in mock addPatient:", error);
      return null;
    }
  };

  const updatePatient = (id: string, patientData: Partial<User>): User | null => {
    try {
      // In a real implementation with a database, this would update the record
      // Here we just return the merged data as if it was updated
      const updatedPatient = {
        ...patient,
        ...patientData,
        _id: id,
        updatedAt: new Date().toISOString()
      } as User;
      
      console.log(`Using mock function to update patient with ID ${id}:`, updatedPatient);
      return updatedPatient;
    } catch (error) {
      console.error(`Error in mock updatePatient for ${id}:`, error);
      return null;
    }
  };

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

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Xóa lỗi khi người dùng thay đổi input
    setError(null);
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    let isValid = true;
    
    // Validate required fields
    if (!formData.fullName.trim()) {
      errors.fullName = 'Họ và tên là bắt buộc';
      isValid = false;
    }
    
    if (!formData.username.trim()) {
      errors.username = 'Tên đăng nhập là bắt buộc';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email là bắt buộc';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Số điện thoại là bắt buộc';
      isValid = false;
    }
    
    // Validate email format
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email không hợp lệ. Vui lòng kiểm tra lại.';
      isValid = false;
    }
    
    // Validate phone number (adjust for Vietnamese phone numbers)
    if (formData.phone && !/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Số điện thoại phải có 10-11 số.';
      isValid = false;
    }
    
    // Validate password requirement for new users
    if (!isEditing && (!formData.password || formData.password.length < 6)) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
      isValid = false;
    }
    
    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Xóa lỗi trước khi submit
    setError(null);
    setSuccessMessage(null);
    
    // Validate form first
    if (!validateForm()) {
      return;
    }
    
    setInternalLoading(true);
    
    // Chuẩn bị dữ liệu người dùng
    const userData = {
      ...formData,
      // Nếu không phải là chế độ chỉnh sửa và userId trống, không cần thêm vào
      // hệ thống sẽ tự động tạo userId
      ...((!isEditing && !formData.userId.trim()) ? {} : { userId: formData.userId }),
      role: formData.role as 'PATIENT' | 'DOCTOR' | 'PHARMACIST' | 'RECEPTIONIST' | 'ADMIN',
    };

    try {
      let resultPatient = null;
      
      if (isEditing && patient && patient._id) {
        // Cập nhật bệnh nhân hiện có
        if (token) {
          try {
            // Attempt to use the API first
            console.log('Using API to update patient');
            const response = await apiService.updateUser(patient._id, userData, token);
            resultPatient = response;
            console.log('API update successful:', response);
          } catch (apiError: any) {
            console.error('API error when updating patient:', apiError);
            
            // Hiển thị chi tiết lỗi từ API
            if (apiError.response) {
              if (apiError.response.data && apiError.response.data.field) {
                const fieldName = apiError.response.data.field;
                setFieldErrors({
                  [fieldName]: apiError.response.data.message || `Lỗi với trường ${fieldName}`
                });
              } else {
                setError(`Lỗi từ server: ${apiError.response.data?.message || apiError.message}`);
              }
            } else {
              setError(`Lỗi kết nối: ${apiError.message}`);
            }
            
            console.log('Falling back to mock update function');
            // Fallback to mock update if API fails
            resultPatient = updatePatient(patient._id, userData);
          }
        } else {
          // Use mock update if no token is available
          console.log('No token available, using mock update function');
          resultPatient = updatePatient(patient._id, userData);
        }
        
        if (resultPatient) {
          setSuccessMessage(`Đã cập nhật thông tin bệnh nhân: ${resultPatient.fullName}`);
        } else {
          setError('Không thể cập nhật thông tin bệnh nhân. Vui lòng thử lại.');
          setInternalLoading(false);
          return;
        }
      } else {
        // Thêm bệnh nhân mới
        if (token) {
          try {
            // Attempt to use the API first
            console.log('Using API to create new patient');
            console.log('User role:', user?.role);
            console.log('Data being sent:', userData);
            
            const response = await apiService.createUser(userData, token);
            resultPatient = response;
            console.log('API creation successful:', response);
          } catch (apiError: any) {
            console.error('API error when creating patient:', apiError);
            
            // Hiển thị chi tiết lỗi từ API
            if (apiError.response) {
              console.log('API error response:', apiError.response.data);
              
              if (apiError.response.data && apiError.response.data.field) {
                const fieldName = apiError.response.data.field;
                setFieldErrors({
                  [fieldName]: apiError.response.data.message || `Lỗi với trường ${fieldName}`
                });
              } else {
                setError(`Lỗi từ server: ${apiError.response.data?.message || apiError.message}`);
              }
              
              // Nếu lỗi là không có quyền, không fallback
              if (apiError.response.status === 403) {
                setError(`Bạn không có quyền tạo bệnh nhân mới. Vui lòng liên hệ admin.`);
                setInternalLoading(false);
                return;
              }
            } else {
              setError(`Lỗi kết nối: ${apiError.message}`);
            }
            
            console.log('Falling back to mock creation function');
            // Fallback to mock creation if API fails
            resultPatient = await addPatient(userData);
          }
        } else {
          // Use mock creation if no token is available
          console.log('No token available, using mock creation function');
          resultPatient = await addPatient(userData);
        }
        
        if (resultPatient) {
          setSuccessMessage(`Đã thêm bệnh nhân mới: ${resultPatient.fullName} (ID: ${resultPatient.userId})`);
          
          // Reset form after successful creation if not using API or if specifically requested
          if (!token) {
            setFormData({
              fullName: '',
              userId: '',
              username: '',
              email: '',
              phone: '',
              password: '',
              role: 'PATIENT' as const,
            });
          }
        } else {
          setError('Không thể thêm bệnh nhân mới. Vui lòng thử lại.');
          setInternalLoading(false);
          return;
        }
      }

      // Gọi onSave callback nếu có để thông báo lên component cha
      if (onSave) {
        onSave(resultPatient || userData);
      }
      
      // Nếu thành công và đang chỉnh sửa, đóng form sau 1 giây
      if (isEditing) {
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error('Lỗi khi lưu bệnh nhân:', error);
      // Hiển thị thông báo lỗi
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Đã xảy ra lỗi khi lưu thông tin bệnh nhân.');
      }
    } finally {
      setInternalLoading(false);
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
          disabled={loading}
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
        
        {/* Success message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            <p className="font-medium">{successMessage}</p>
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
              className={`w-full border ${fieldErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm`}
              value={formData.fullName}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.fullName && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.fullName}</p>
            )}
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
              className={`w-full border ${fieldErrors.userId ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm`}
              value={formData.userId}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.userId && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.userId}</p>
            )}
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
              className={`w-full border ${fieldErrors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm`}
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.username && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.username}</p>
            )}
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
              className={`w-full border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm`}
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
            )}
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
              className={`w-full border ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm`}
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
            )}
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
              className={`w-full border ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm`}
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
            )}
          </div>
        </div>

        {/* Form actions */}
        <div className="mt-8 pt-5 border-t border-gray-300 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="submit"
            className={`px-5 py-2 rounded-lg text-white font-medium transition-colors flex items-center shadow-sm ${
              loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                {isEditing ? 'Đang cập nhật...' : 'Đang lưu...'}
              </>
            ) : (
              <>
                <SaveIcon size={18} className="mr-2" />
                {isEditing ? 'Cập nhật' : 'Lưu'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}