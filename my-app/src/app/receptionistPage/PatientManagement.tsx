import React, { useState, useEffect } from 'react';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon, UsersIcon, FilterIcon, ArrowUpDown, UserPlusIcon } from 'lucide-react';
import { PatientForm } from './components/Patients/PatientForm';
import { 
  User,
  getAllPatients,
  searchUsers,
  addQueue,
  getQueueByPatientId,
  initializeData,
  generateMongoId
} from '../datats/mockPatients';
import { useAuth } from '../context/AuthContext';
import * as apiService from '../services/api.service';
import axiosInstance from '../services/axios.customize.service';

interface PatientManagementProps {
  onBack: () => void;
}

// Custom CRUD functions for patients with API integration
const addPatient = async (patientData: Partial<User>, authToken?: string) => {
  try {
    if (authToken) {
      // Sử dụng API nếu có token
      try {
        console.log("Adding patient via API:", patientData);
        const result = await apiService.createUser(patientData, authToken);
        console.log("API success - new patient added:", result);
        return result;
      } catch (apiError) {
        console.error("API error when adding patient:", apiError);
        // Fallback to mock data nếu API lỗi
        console.log("Falling back to mock data for adding patient");
      }
    }
    
    // Sử dụng mock data nếu không có token hoặc API lỗi
    const newPatient = {
      ...patientData,
      _id: generateMongoId(),
      userId: patientData.userId || `PA${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    } as User;
    
    console.log("Added patient using mock data:", newPatient);
    return newPatient;
  } catch (error) {
    console.error("Error adding patient:", error);
    return null;
  }
};

const updatePatient = async (id: string, patientData: Partial<User>, authToken?: string) => {
  try {
    if (authToken) {
      // Sử dụng API nếu có token
      try {
        console.log(`Updating patient via API - ID ${id}:`, patientData);
        
        // Kiểm tra tính hợp lệ của token trước khi gọi API
        const tokenStatus = await apiService.validateToken(authToken);
        if (!tokenStatus.valid) {
          console.error("Invalid token when updating patient:", tokenStatus);
          throw new Error(`Authentication error: ${tokenStatus.reason}`);
        }
        
        // Gọi API để cập nhật thông tin bệnh nhân
        const result = await apiService.updateUser(id, patientData, authToken);
        console.log("API success - patient updated:", result);
        
        // Trả về dữ liệu từ API để cập nhật UI
        return result;
      } catch (apiError: any) {
        // Log chi tiết lỗi từ API để debug
        console.error(`API error when updating patient ${id}:`, apiError);
        if (apiError.response) {
          console.error("Error status:", apiError.response.status);
          console.error("Error data:", apiError.response.data);
        }
        
        // Hiển thị thông báo lỗi cụ thể
        if (apiError.response && apiError.response.status === 403) {
          // Thử lại với vai trò tiếp tân
          try {
            console.log("Trying to update patient as receptionist...");
            const currentUser = await apiService.getUserById('me', authToken);
            
            // Nếu người dùng là tiếp tân, thử gửi với tham số đặc biệt
            if (currentUser && currentUser.role === 'RECEPTIONIST') {
              console.log("User is a receptionist, trying with receptionist parameter");
              // Thêm tham số isReceptionist: true để backend biết đây là tiếp tân
              const updatedData = { ...patientData, isReceptionist: true };
              const result = await apiService.updateUser(id, updatedData, authToken);
              console.log("Success updating patient as receptionist:", result);
              return result;
            } else {
              throw new Error("Bạn không có quyền cập nhật thông tin bệnh nhân");
            }
          } catch (retryError) {
            console.error("Error when retrying as receptionist:", retryError);
            throw new Error("Bạn không có quyền cập nhật thông tin bệnh nhân");
          }
        } else if (apiError.response && apiError.response.status === 401) {
          throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
        } else if (apiError.response && apiError.response.status === 404) {
          throw new Error("Không tìm thấy bệnh nhân với ID đã cung cấp");
        } else {
          throw new Error(`Lỗi cập nhật thông tin: ${apiError.message || 'Không thể kết nối đến máy chủ'}`);
        }
      }
    }
    
    // Sử dụng mock data nếu không có token
    console.log("No token available, using mock data for updating patient");
    const updatedPatient = {
      ...patientData,
      _id: id,
      updatedAt: new Date().toISOString()
    } as User;
    
    console.log(`Updated patient using mock data - ID ${id}:`, updatedPatient);
    return updatedPatient;
  } catch (error) {
    // Re-throw để component xử lý và hiển thị
    console.error(`Error updating patient ${id}:`, error);
    throw error;
  }
};

const deletePatient = async (id: string, authToken?: string) => {
  try {
    if (authToken) {
      // Sử dụng API nếu có token
      try {
        console.log(`Deleting patient via API - ID ${id}`);
        
        // Kiểm tra tính hợp lệ của token trước khi gọi API
        const tokenStatus = await apiService.validateToken(authToken);
        if (!tokenStatus.valid) {
          console.error("Invalid token when deleting patient:", tokenStatus);
          throw new Error(`Authentication error: ${tokenStatus.reason}`);
        }
        
        // Gọi API để xóa bệnh nhân
        await axiosInstance.delete(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        
        console.log("API success - patient deleted");
        return true;
      } catch (apiError: any) {
        // Log chi tiết lỗi từ API để debug
        console.error(`API error when deleting patient ${id}:`, apiError);
        if (apiError.response) {
          console.error("Error status:", apiError.response.status);
          console.error("Error data:", apiError.response.data);
        }
        
        // Hiển thị thông báo lỗi cụ thể
        if (apiError.response && apiError.response.status === 403) {
          // Thử lại với vai trò tiếp tân
          try {
            console.log("Trying to delete patient as receptionist...");
            const currentUser = await apiService.getUserById('me', authToken);
            
            // Nếu người dùng là tiếp tân, thử gửi với tham số đặc biệt
            if (currentUser && currentUser.role === 'RECEPTIONIST') {
              console.log("User is a receptionist, trying with receptionist parameter");
              
              // Thêm tham số query isReceptionist=true để backend biết đây là tiếp tân
              await axiosInstance.delete(`/users/${id}?isReceptionist=true`, {
                headers: {
                  Authorization: `Bearer ${authToken}`
                }
              });
              
              console.log("Success deleting patient as receptionist");
              return true;
            } else {
              throw new Error("Bạn không có quyền xóa bệnh nhân");
            }
          } catch (retryError) {
            console.error("Error when retrying delete as receptionist:", retryError);
            throw new Error("Bạn không có quyền xóa bệnh nhân");
          }
        } else if (apiError.response && apiError.response.status === 401) {
          throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
        } else if (apiError.response && apiError.response.status === 404) {
          throw new Error("Không tìm thấy bệnh nhân với ID đã cung cấp");
        } else if (apiError.response && apiError.response.status === 400) {
          throw new Error("Không thể xóa bệnh nhân này. Bệnh nhân có thể đang có dữ liệu liên quan.");
        } else {
          throw new Error(`Lỗi xóa bệnh nhân: ${apiError.message || 'Không thể kết nối đến máy chủ'}`);
        }
      }
    }
    
    // Sử dụng mock data nếu không có token
    console.log(`No token available, using mock data for deleting patient - ID ${id}`);
    return true;
  } catch (error) {
    // Re-throw để component xử lý và hiển thị
    console.error(`Error deleting patient ${id}:`, error);
    throw error;
  }
};

export function PatientManagement({ onBack }: PatientManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPatient, setEditingPatient] = useState<User | null>(null);
  // Thêm state để theo dõi thay đổi và buộc giao diện cập nhật
  const [refreshData, setRefreshData] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Sử dụng dữ liệu bệnh nhân từ API hoặc mock data
  const [patients, setPatients] = useState<User[]>([]);
  
  // Lấy token xác thực từ context
  const { token } = useAuth();
  
  // Cập nhật danh sách bệnh nhân khi có thay đổi
  // State để theo dõi lỗi xác thực
  const [authError, setAuthError] = useState<string | null>(null);

  // State để hiển thị thông báo
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setAuthError(null);
      try {
        let patientData: User[] = [];
        
        if (token) {
          try {
            // Kiểm tra tính hợp lệ của token trước
            const tokenStatus = await apiService.validateToken(token);
            
            if (!tokenStatus.valid) {
              console.error("Invalid token:", tokenStatus.reason);
              throw new Error(`Auth token invalid: ${tokenStatus.reason}`);
            }
            
            // Nếu có token hợp lệ, thử lấy dữ liệu từ API
            console.log("Fetching patients from API...");
            patientData = await apiService.getPatients(token);
            console.log("Successfully fetched patients from API:", patientData.length, "patients");
          } catch (apiError: any) {
            console.error("API error when loading patients:", apiError);
            
            // Kiểm tra lỗi cụ thể
            if (apiError.response && apiError.response.status === 403) {
              setAuthError("Không có quyền truy cập dữ liệu bệnh nhân. Vui lòng đăng nhập lại với tài khoản có quyền.");
            }
            
            console.log("Falling back to mock data...");
            // Nếu API lỗi, sử dụng mock data
            await initializeData();
            patientData = await getAllPatients();
          }
        } else {
          // Nếu không có token, sử dụng mock data
          console.log("No authentication token, using mock data...");
          await initializeData();
          patientData = await getAllPatients();
        }
        
        setPatients(patientData);
      } catch (error) {
        console.error("Error loading patients data:", error);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [refreshData, token]);
  
  const handleEdit = (patient: User) => {
    setEditingPatient(patient);
    setShowForm(true);
  };
  
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa bệnh nhân này không?");
    if (confirmed) {
      setLoading(true);
      setNotification(null);
      try {
        await deletePatient(id, token || undefined);
        // Hiển thị thông báo thành công
        setNotification({
          type: 'success',
          message: 'Xóa bệnh nhân thành công'
        });
        
        // Kích hoạt cập nhật giao diện
        setRefreshData(prev => prev + 1);
      } catch (error: any) {
        console.error("Error deleting patient:", error);
        setNotification({
          type: 'error',
          message: error.message || 'Không thể xóa bệnh nhân. Vui lòng thử lại sau.'
        });
      } finally {
        setLoading(false);
        
        // Tự động ẩn thông báo sau 5 giây
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    }
  };
  
  const handleSavePatient = async (patientData: Partial<User>) => {
    setLoading(true);
    setNotification(null);
    try {
      let result;
      if (editingPatient && editingPatient._id) {
        // Cập nhật bệnh nhân hiện có
        console.log("Updating existing patient:", editingPatient._id);
        result = await updatePatient(editingPatient._id, patientData, token || undefined);
        setNotification({
          type: 'success',
          message: `Cập nhật thông tin bệnh nhân ${result.fullName || ''} thành công`
        });
      } else {
        // Thêm bệnh nhân mới với role là PATIENT
        console.log("Adding new patient");
        result = await addPatient({
          ...patientData,
          role: 'PATIENT'
        }, token || undefined);
        setNotification({
          type: 'success',
          message: `Thêm bệnh nhân ${result.fullName || ''} thành công`
        });
      }
      
      // Kích hoạt cập nhật giao diện
      setRefreshData(prev => prev + 1);
      handleCloseForm();
    } catch (error: any) {
      console.error("Error saving patient:", error);
      setNotification({
        type: 'error',
        message: error.message || 'Không thể lưu thông tin bệnh nhân. Vui lòng thử lại sau.'
      });
      // Không đóng form để người dùng có thể sửa lỗi và thử lại
    } finally {
      setLoading(false);
      
      // Tự động ẩn thông báo sau 5 giây
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };
  
  // Hàm thêm bệnh nhân vào phòng chờ
  const addToWaitingRoom = async (patientId: string) => {
    try {
      setLoading(true);
      setNotification(null);

      if (token) {
        // Thử sử dụng API nếu có token
        try {
          console.log(`Adding patient ${patientId} to queue via API`);
          
          // Kiểm tra tính hợp lệ của token
          const tokenStatus = await apiService.validateToken(token);
          if (!tokenStatus.valid) {
            console.error("Invalid token when adding to queue:", tokenStatus);
            throw new Error(`Authentication error: ${tokenStatus.reason}`);
          }
          
          // Kiểm tra xem bệnh nhân đã có trong phòng chờ chưa bằng API
          const allQueues = await apiService.getQueues(token);
          const existingQueue = allQueues.find(
            (queue: any) => queue.patient === patientId && 
                          ['waiting', 'in_progress'].includes(queue.status)
          );
          
          if (existingQueue) {
            setNotification({
              type: 'error',
              message: 'Bệnh nhân này đã có trong phòng chờ hoặc đang khám!'
            });
            return;
          }
          
          // Gọi API để tạo queue mới
          const newQueue = await apiService.createQueue(patientId, token);
          
          console.log("Successfully added patient to queue via API:", newQueue);
          setNotification({
            type: 'success',
            message: 'Đã thêm bệnh nhân vào phòng chờ!'
          });
          
          return;
        } catch (apiError: any) {
          console.error("API error when adding to queue:", apiError);
          if (apiError.response) {
            console.error("Error status:", apiError.response.status);
            console.error("Error data:", apiError.response.data);
          }
          
          // Hiển thị lỗi cụ thể
          if (apiError.response && apiError.response.status === 403) {
            setNotification({
              type: 'error',
              message: 'Bạn không có quyền thêm bệnh nhân vào phòng chờ'
            });
            return;
          } else if (apiError.response && apiError.response.status === 401) {
            setNotification({
              type: 'error',
              message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại'
            });
            return;
          }
          
          console.log("Falling back to mock data for adding to queue");
          // Không return, tiếp tục xuống phần fallback
        }
      }
      
      // Fallback to mock data
      // Kiểm tra xem bệnh nhân đã có trong phòng chờ chưa
      const existingQueue = await getQueueByPatientId(patientId);
      
      if (existingQueue) {
        if (existingQueue.status === 'waiting' || existingQueue.status === 'in_progress') {
          setNotification({
            type: 'error',
            message: 'Bệnh nhân này đã có trong phòng chờ hoặc đang khám!'
          });
          return;
        } else if (existingQueue.status === 'completed' || existingQueue.status === 'canceled') {
          // Nếu bệnh nhân đã từng được thêm vào phòng chờ trước đó,
          // nhưng đã hoàn thành hoặc hủy, ta có thể thêm họ vào lại phòng chờ
          const newQueue = await addQueue(patientId);
          if (newQueue) {
            setNotification({
              type: 'success',
              message: 'Đã thêm bệnh nhân vào phòng chờ! (dữ liệu mô phỏng)'
            });
          } else {
            setNotification({
              type: 'error',
              message: 'Có lỗi khi thêm bệnh nhân vào phòng chờ!'
            });
          }
        }
      } else {
        // Nếu bệnh nhân chưa từng được thêm vào phòng chờ
        const newQueue = await addQueue(patientId);
        if (newQueue) {
          setNotification({
            type: 'success',
            message: 'Đã thêm bệnh nhân vào phòng chờ! (dữ liệu mô phỏng)'
          });
        } else {
          setNotification({
            type: 'error',
            message: 'Có lỗi khi thêm bệnh nhân vào phòng chờ!'
          });
        }
      }
    } catch (error) {
      console.error("Error adding patient to waiting room:", error);
      setNotification({
        type: 'error',
        message: 'Có lỗi xảy ra khi thêm bệnh nhân vào phòng chờ!'
      });
    } finally {
      setLoading(false);
      
      // Tự động ẩn thông báo sau 5 giây
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  
  // State for handling search results
  const [searchResults, setSearchResults] = useState<User[]>([]);
  
  // Effect to handle search
  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }
      
      try {
        const results = await searchUsers(searchTerm);
        const filteredResults = results.filter(user => user.role === 'PATIENT');
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Error searching patients:", error);
        setSearchResults([]);
      }
    };
    
    handleSearch();
  }, [searchTerm]);
  
  // Use either search results or all patients
  const filteredPatients = searchTerm.trim() === '' ? patients : searchResults;
  
  return (
    <div className="w-full px-4 sm:px-6">
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-gray-700"
        >
          ← Quay lại
        </button>
      </div>
      {/* Header section */}
      <div className="mb-8 border-b border-gray-200 pb-5">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black tracking-tight">Quản lý bệnh nhân</h1>
          <button 
            onClick={() => setShowForm(true)} 
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg flex items-center font-medium shadow-sm transition-colors"
          >
            <PlusIcon size={18} className="mr-2" />
            Thêm bệnh nhân
          </button>
        </div>
        <p className="text-black mt-2">
          Quản lý thông tin bệnh nhân và thêm vào phòng chờ
        </p>
      </div>
      
      {/* Main content */}
      <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white">
        {/* Auth error notification if present */}
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 mb-4 rounded-lg mx-6 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Lỗi xác thực</h3>
                <div className="mt-1 text-sm text-red-700">{authError}</div>
                <div className="mt-2">
                  <button 
                    className="text-sm font-medium text-red-700 hover:text-red-600 underline"
                    onClick={() => setRefreshData(prev => prev + 1)}
                  >
                    Thử lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Search and filters */}
        <div className="p-6 border-b border-gray-300 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-black" />
              </div>
              <input 
                type="text" 
                placeholder="Tìm kiếm theo tên, ID, email hoặc SĐT..." 
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black placeholder-gray-500 shadow-sm" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm">
                  <option value="">Tất cả vai trò</option>
                  <option value="PATIENT">Bệnh nhân</option>
                  <option value="DOCTOR">Bác sĩ</option>
                  <option value="PHARMACIST">Nhân viên quầy thuốc</option>
                  <option value="RECEPTIONIST">Lễ tân</option>
                  <option value="ADMIN">Quản trị viên</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FilterIcon size={16} className="text-black" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm">
                  <option value="">Sắp xếp theo</option>
                  <option value="fullName">Tên</option>
                  <option value="username">Tên đăng nhập</option>
                  <option value="createdAt">Ngày tạo</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ArrowUpDown size={16} className="text-black" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Table or empty state */}
        <div className="p-6">
          {filteredPatients.length > 0 ? (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Họ và tên
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Điện thoại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Vai trò
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center">
                        <div className="flex justify-center items-center space-x-2">
                          <span className="animate-spin">⏳</span>
                          <span>Đang tải dữ liệu...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredPatients.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center">
                        Không tìm thấy bệnh nhân nào.
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.map((patient, index) => (
                      <tr key={patient._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-black">
                          {patient.fullName}
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                          {patient.userId}
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                          {patient.username}
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                          {patient.email}
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                          {patient.phone}
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                          {patient.role}
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => handleEdit(patient)} 
                              className="p-1.5 rounded-full hover:bg-gray-100 text-black border border-gray-300"
                              title="Chỉnh sửa"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(patient._id)}
                              className="p-1.5 rounded-full hover:bg-gray-100 text-black border border-gray-300"
                              title="Xóa"
                            >
                              <TrashIcon size={16} />
                            </button>
                            <button 
                              onClick={() => addToWaitingRoom(patient._id)}
                              className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm flex items-center"
                            >
                              <UserPlusIcon size={16} className="mr-1" />
                              Thêm vào phòng chờ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-300 rounded-lg">
              <UsersIcon size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-black">
                Không tìm thấy bệnh nhân
              </h3>
              <p className="text-black mt-2">
                Thử tìm kiếm với từ khóa khác hoặc thêm bệnh nhân mới
              </p>
            </div>
          )}
          
          {/* Pagination */}
          {filteredPatients.length > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-black">
                Hiển thị <span className="font-medium">{filteredPatients.length}</span> bệnh nhân
              </p>
              <div className="inline-flex shadow-sm rounded-md">
                <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-black rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors">
                  Trước
                </button>
                <button className="px-4 py-2 bg-gray-200 text-black text-sm font-medium border border-gray-300 relative -ml-px hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-black rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors">
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <PatientForm 
              patient={editingPatient} 
              onClose={handleCloseForm}
              onSave={handleSavePatient} 
              isLoading={loading}
            />
          </div>
        </div>
      )}
      
      {/* Notification component */}
      {notification && (
        <div className={`fixed bottom-6 right-6 max-w-sm w-full shadow-lg rounded-lg p-4 flex items-start space-x-4 z-50 ${
          notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className={`flex-shrink-0 h-5 w-5 relative mt-0.5 ${
            notification.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {notification.type === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h3 className={`text-sm font-medium ${
              notification.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {notification.type === 'success' ? 'Thành công' : 'Lỗi'}
            </h3>
            <p className={`mt-1 text-sm ${
              notification.type === 'success' ? 'text-green-700' : 'text-red-700'
            }`}>
              {notification.message}
            </p>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="flex-shrink-0 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Notification component */}
      {notification && (
        <div className={`fixed bottom-6 right-6 max-w-sm w-full shadow-lg rounded-lg p-4 flex items-start space-x-4 z-50 ${
          notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className={`flex-shrink-0 h-5 w-5 relative mt-0.5 ${
            notification.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {notification.type === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h3 className={`text-sm font-medium ${
              notification.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {notification.type === 'success' ? 'Thành công' : 'Lỗi'}
            </h3>
            <p className={`mt-1 text-sm ${
              notification.type === 'success' ? 'text-green-700' : 'text-red-700'
            }`}>
              {notification.message}
            </p>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="flex-shrink-0 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}