import React, { useState, useEffect } from 'react';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon, UsersIcon, FilterIcon, ArrowUpDown, UserPlusIcon } from 'lucide-react';
import { PatientForm } from './components/Patients/PatientForm';
import { 
  mockPatients, 
  searchUsers, 
  User, 
  addPatient, 
  updatePatient, 
  deletePatient, 
  getAllPatients,
  addQueue,
  getQueueByPatientId
} from '../datats/mockPatients';

interface PatientManagementProps {
  onBack: () => void;
}

export function PatientManagement({ onBack }: PatientManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPatient, setEditingPatient] = useState<User | null>(null);
  // Thêm state để theo dõi thay đổi và buộc giao diện cập nhật
  const [refreshData, setRefreshData] = useState(0);
  
  // Sử dụng dữ liệu bệnh nhân từ mockPatients - hàm này sẽ lấy danh sách mới mỗi khi gọi
  const [patients, setPatients] = useState<User[]>([]);
  
  // Cập nhật danh sách bệnh nhân khi có thay đổi
  useEffect(() => {
    // Sử dụng getAllPatients() để luôn lấy danh sách mới nhất
    const latestPatients = getAllPatients();
    setPatients(latestPatients);
  }, [refreshData]);
  
  const handleEdit = (patient: User) => {
    setEditingPatient(patient);
    setShowForm(true);
  };
  
  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa bệnh nhân này không?");
    if (confirmed) {
      deletePatient(id);
      // Kích hoạt cập nhật giao diện
      setRefreshData(prev => prev + 1);
    }
  };
  
  const handleSavePatient = (patientData: Partial<User>) => {
    if (editingPatient && editingPatient._id) {
      // Cập nhật bệnh nhân hiện có
      updatePatient(editingPatient._id, patientData);
    } else {
      // Thêm bệnh nhân mới
      addPatient({
        ...patientData,
        role: 'PATIENT'
      });
    }
    // Kích hoạt cập nhật giao diện
    setRefreshData(prev => prev + 1);
    handleCloseForm();
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };
  
  // Hàm thêm bệnh nhân vào phòng chờ
  const addToWaitingRoom = (patientId: string) => {
    // Kiểm tra xem bệnh nhân đã có trong phòng chờ chưa
    const existingQueue = getQueueByPatientId(patientId);
    
    if (existingQueue) {
      if (existingQueue.status === 'waiting' || existingQueue.status === 'in_progress') {
        alert(`Bệnh nhân này đã có trong phòng chờ hoặc đang khám!`);
        return;
      } else if (existingQueue.status === 'completed' || existingQueue.status === 'canceled') {
        // Nếu bệnh nhân đã từng được thêm vào phòng chờ trước đó,
        // nhưng đã hoàn thành hoặc hủy, ta có thể thêm họ vào lại phòng chờ
        const newQueue = addQueue(patientId);
        if (newQueue) {
          alert(`Đã thêm bệnh nhân vào phòng chờ!`);
        } else {
          alert(`Có lỗi khi thêm bệnh nhân vào phòng chờ!`);
        }
      }
    } else {
      // Nếu bệnh nhân chưa từng được thêm vào phòng chờ
      const newQueue = addQueue(patientId);
      if (newQueue) {
        alert(`Đã thêm bệnh nhân vào phòng chờ!`);
      } else {
        alert(`Có lỗi khi thêm bệnh nhân vào phòng chờ!`);
      }
    }
  };
  
  // Sử dụng hàm searchUsers từ mockPatients.ts để tìm kiếm bệnh nhân
  const filteredPatients = searchTerm.trim() === '' 
    ? patients 
    : searchUsers(searchTerm).filter(user => user.role === 'PATIENT');
  
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
                      Tên đăng nhập
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Số điện thoại
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
                  {filteredPatients.map((patient, index) => (
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
                  ))}
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
            />
          </div>
        </div>
      )}
    </div>
  );
}