import React, { useState } from 'react';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon, UsersIcon, FilterIcon, ArrowUpDown } from 'lucide-react';
import { PatientForm } from './components/Patients/PatientForm';

export function PatientManagement() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPatient, setEditingPatient] = useState<any>(null);
  
  // Mock patient data
  const [patients] = useState([{
    id: 1,
    name: 'Nguyễn Văn A',
    nationalId: '001201012345',
    age: 45,
    gender: 'Nam',
    phone: '0912345678',
    address: 'Hà Nội'
  }, {
    id: 2,
    name: 'Trần Thị B',
    nationalId: '001201054321',
    age: 32,
    gender: 'Nữ',
    phone: '0923456789',
    address: 'Hồ Chí Minh'
  }, {
    id: 3,
    name: 'Lê Văn C',
    nationalId: '001201098765',
    age: 28,
    gender: 'Nam',
    phone: '0934567890',
    address: 'Đà Nẵng'
  }, {
    id: 4,
    name: 'Phạm Thị D',
    nationalId: '001201087654',
    age: 50,
    gender: 'Nữ',
    phone: '0945678901',
    address: 'Hải Phòng'
  }, {
    id: 5,
    name: 'Hoàng Văn E',
    nationalId: '001201076543',
    age: 35,
    gender: 'Nam',
    phone: '0956789012',
    address: 'Cần Thơ'
  }]);
  
  const handleEdit = (patient: any) => {
    setEditingPatient(patient);
    setShowForm(true);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.nationalId.includes(searchTerm)
  );
  
  return (
    <div className="w-full px-4 sm:px-6">
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
                placeholder="Tìm kiếm theo tên hoặc CCCD..." 
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black placeholder-gray-500 shadow-sm" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm">
                  <option value="">Tất cả giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
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
                  <option value="name">Tên</option>
                  <option value="age">Tuổi</option>
                  <option value="date">Ngày tạo</option>
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
                      CCCD
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Tuổi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Giới tính
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Số điện thoại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Địa chỉ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map((patient, index) => (
                    <tr key={patient.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-black">
                        {patient.name}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                        {patient.nationalId}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                        {patient.age}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                        {patient.gender}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                        {patient.phone}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap text-sm text-black">
                        {patient.address}
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
                            className="p-1.5 rounded-full hover:bg-gray-100 text-black border border-gray-300"
                            title="Xóa"
                          >
                            <TrashIcon size={16} />
                          </button>
                          <button className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                            Chuyển vào phòng chờ
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
            <PatientForm patient={editingPatient} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
}