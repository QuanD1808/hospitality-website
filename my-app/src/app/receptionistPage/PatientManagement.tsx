import React, { useState, useEffect, useMemo } from 'react';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon, UsersIcon, ArrowUpDown, UserPlusIcon } from 'lucide-react';
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

// ===  Hàm trợ giúp để định dạng ngày tháng ===
const formatDate = (isoString: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
// === KẾT THÚC THÊM MỚI ===

// Các hàm CRUD giữ nguyên logic gốc 
const addPatient = async (patientData: Partial<User>, authToken?: string) => {
  try {
    if (authToken) {
      try {
        const result = await apiService.createUser(patientData, authToken);
        return result;
      } catch (apiError) {
        console.error("API error when adding patient:", apiError);
        console.log("Falling back to mock data for adding patient");
      }
    }
    const newPatient = {
      ...patientData,
      _id: generateMongoId(),
      userId: patientData.userId || `PA${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    } as User;
    return newPatient;
  } catch (error) {
    console.error("Error adding patient:", error);
    return null;
  }
};

const updatePatient = async (id: string, patientData: Partial<User>, authToken?: string) => {
    // ... Giữ nguyên logic của bạn
};

const deletePatient = async (id: string, authToken?: string) => {
    // ... Giữ nguyên logic của bạn
};


export function PatientManagement({ onBack }: PatientManagementProps) {
  
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPatient, setEditingPatient] = useState<User | null>(null);
  const [refreshData, setRefreshData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<User[]>([]);
  const { token } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  
  const [sortKey, setSortKey] = useState('createdAt-desc');

 useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setAuthError(null);
      try {
        let patientData: (User | null)[] = [];
        if (token) {
          try {
            patientData = await apiService.getPatients(token);
          } catch (apiError: any) {
            if (apiError.response && apiError.response.status === 403) {
              setAuthError("Không có quyền truy cập dữ liệu bệnh nhân. Vui lòng đăng nhập lại với tài khoản có quyền.");
            }
            await initializeData();
            patientData = await getAllPatients();
          }
        } else {
          await initializeData();
          patientData = await getAllPatients();
        }
        const validPatients = patientData.filter(patient => patient !== null && patient !== undefined);
        setPatients(validPatients as User[]);
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
        setNotification({ type: 'success', message: 'Xóa bệnh nhân thành công' });
        setRefreshData(prev => prev + 1);
      } catch (error: any) {
        setNotification({ type: 'error', message: error.message || 'Lỗi khi xóa.' });
      } finally {
        setLoading(false);
        setTimeout(() => setNotification(null), 5000);
      }
    }
  };
  
const handleSavePatient = async (patientData: Partial<User>) => {
  setLoading(true);
  setNotification(null);
  try {
    if (editingPatient && editingPatient._id) {
      // Logic cho việc CẬP NHẬT bệnh nhân
      console.log("Data being sent to UPDATE API:", patientData);
      
      // Không cần kiểm tra các trường bắt buộc như password khi cập nhật
      if (!patientData.fullName || !patientData.email) {
          throw new Error("Vui lòng điền đầy đủ Họ và tên và Email.");
      }

      await updatePatient(editingPatient._id, patientData, token || undefined);
      setNotification({ type: 'success', message: 'Cập nhật thông tin thành công' });

    } else {
      // Logic cho việc THÊM MỚI bệnh nhân
      const newPatientData = { ...patientData, role: 'PATIENT' as const };
      console.log("Data being sent to CREATE API:", newPatientData);

      // Kiểm tra các trường bắt buộc khi tạo mới
      if (!newPatientData.fullName || !newPatientData.email || !newPatientData.password) {
          throw new Error("Vui lòng điền đầy đủ Họ và tên, Email và Mật khẩu.");
      }

      await addPatient(newPatientData, token || undefined);
      setNotification({ type: 'success', message: 'Thêm bệnh nhân thành công' });
    }

    // === SỬA LOGIC Ở ĐÂY ===
    // Nếu các lệnh await ở trên không throw ra lỗi, thì coi như đã thành công.
    // Không cần kiểm tra `result` nữa.
    setRefreshData(prev => prev + 1);
    handleCloseForm();

  } catch (error: any) {
    // Xử lý lỗi từ API một cách chi tiết
    console.error("Error saving patient:", error);
    const errorMessage = error.response?.data?.message || error.message || 'Lỗi khi lưu thông tin. Vui lòng thử lại.';
    setNotification({ type: 'error', message: errorMessage });
    
  } finally {
    setLoading(false);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }
};
  
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };
  
  const addToWaitingRoom = async (patientId: string) => {
    setLoading(true);
    setNotification(null);
    try {
      if (token) {
        try {
          const allQueues = await apiService.getQueues(token);
          const existingQueue = allQueues.find(
            (q: any) => q.patient === patientId && ['waiting', 'in_progress'].includes(q.status)
          );
          if (existingQueue) {
            throw new Error('Bệnh nhân này đã có trong phòng chờ hoặc đang khám!');
          }
          await apiService.createQueue(patientId, token);
          setNotification({ type: 'success', message: 'Đã thêm bệnh nhân vào phòng chờ!' });
          setPatients(prevPatients => prevPatients.filter(p => p && p._id !== patientId));
          return;
        } catch (apiError: any) {
           // Fallback to mock
        }
      }
      const existingQueue = await getQueueByPatientId(patientId);
      if (existingQueue && ['waiting', 'in_progress'].includes(existingQueue.status)) {
        throw new Error('Bệnh nhân này đã có trong phòng chờ hoặc đang khám!');
      }
      const newQueue = await addQueue(patientId);
      if (newQueue) {
        setNotification({ type: 'success', message: 'Đã thêm bệnh nhân vào phòng chờ! (dữ liệu mô phỏng)' });
        setPatients(prevPatients => prevPatients.filter(p => p && p._id !== patientId));
      } else {
        throw new Error('Có lỗi khi thêm bệnh nhân vào phòng chờ!');
      }
    } catch (error: any) {
      setNotification({ type: 'error', message: error.message || 'Có lỗi xảy ra!' });
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const [searchResults, setSearchResults] = useState<User[]>([]);
  
  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }
      try {
        const results = await searchUsers(searchTerm);
        setSearchResults(results.filter(user => user && user.role === 'PATIENT'));
      } catch (error) {
        setSearchResults([]);
      }
    };
    handleSearch();
  }, [searchTerm]);
  
  const filteredPatients = searchTerm.trim() === '' ? patients : searchResults;

  const sortedPatients = useMemo(() => {
    if (!filteredPatients) return [];
    const [key, direction] = sortKey.split('-');
    if (!key || !direction) return filteredPatients;
    return [...filteredPatients].sort((a, b) => {
      if (!a || !b) return 0;
      const aValue = a[key as keyof User] as any;
      const bValue = b[key as keyof User] as any;
      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      else if (aValue < bValue) comparison = -1;
      return direction === 'desc' ? comparison * -1 : comparison;
    });
  }, [filteredPatients, sortKey]);

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
      
      <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white">
        {authError && (
          <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {authError}
          </div>
        )}
        
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
                <select 
                  className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
                >
                  <option value="createdAt-desc">Sắp xếp: Mới nhất</option>
                  <option value="createdAt-asc">Sắp xếp: Cũ nhất</option>
                  <option value="fullName-asc">Sắp xếp: Tên (A-Z)</option>
                  <option value="fullName-desc">Sắp xếp: Tên (Z-A)</option>
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
        
        <div className="p-6">
          {sortedPatients && sortedPatients.length > 0 ? (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">Họ và tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">Điện thoại</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">Vai trò</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan={7} className="px-6 py-10 text-center">Đang tải dữ liệu...</td></tr>
                  ) : (
                    sortedPatients
                      .filter(patient => patient)
                      .map((patient, index) => (
                      <tr key={patient._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td 
                          className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-black cursor-pointer"
                          title={patient.createdAt ? `Đã tạo vào: ${formatDate(patient.createdAt)}` : 'Không có thông tin ngày tạo'}
                        >
                          {patient.fullName}
                        </td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">{patient.userId}</td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">{patient.username}</td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">{patient.email}</td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">{patient.phone}</td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">{patient.role}</td>
                        <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                          <div className="flex items-center space-x-3">
                            <button onClick={() => handleEdit(patient)} className="p-1.5 rounded-full hover:bg-gray-100 text-black border border-gray-300" title="Chỉnh sửa"><EditIcon size={16} /></button>
                            <button onClick={() => handleDelete(patient._id)} className="p-1.5 rounded-full hover:bg-gray-100 text-black border border-gray-300" title="Xóa"><TrashIcon size={16} /></button>
                            <button onClick={() => addToWaitingRoom(patient._id)} className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm flex items-center">
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
                <h3 className="text-lg font-medium text-black">Không tìm thấy bệnh nhân</h3>
                <p className="text-black mt-2">Thử tìm kiếm với từ khóa khác hoặc thêm bệnh nhân mới</p>
            </div>
          )}
          
          {sortedPatients && sortedPatients.filter(p => p).length > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-black">Hiển thị <span className="font-medium">{sortedPatients.filter(p => p).length}</span> bệnh nhân</p>
              <div className="inline-flex shadow-sm rounded-md">
                <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-black rounded-l-md hover:bg-gray-50">Trước</button>
                <button className="px-4 py-2 bg-gray-200 text-black text-sm font-medium border border-gray-300 relative -ml-px hover:bg-gray-300">1</button>
                <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-black rounded-r-md hover:bg-gray-50">Sau</button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showForm && (
        // === SỬA LỖI: Thêm class `light` để buộc chế độ sáng ===
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 light">
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