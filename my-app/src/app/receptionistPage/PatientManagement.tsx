import React, { useState } from 'react';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon, UsersIcon } from 'lucide-react';
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
  const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.nationalId.includes(searchTerm));
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý bệnh nhân</h1>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon size={18} className="mr-1" />
          Thêm bệnh nhân
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className="text-gray-400" />
            </div>
            <input type="text" placeholder="Tìm kiếm theo tên hoặc CCCD..." className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Tất cả giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
            <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sắp xếp theo</option>
              <option value="name">Tên</option>
              <option value="age">Tuổi</option>
              <option value="date">Ngày tạo</option>
            </select>
          </div>
        </div>
        {filteredPatients.length > 0 ? <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Họ và tên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CCCD
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tuổi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giới tính
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số điện thoại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Địa chỉ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.map(patient => <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.nationalId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(patient)} className="p-1 rounded-full hover:bg-blue-100 text-blue-600">
                          <EditIcon size={18} />
                        </button>
                        <button className="p-1 rounded-full hover:bg-red-100 text-red-600">
                          <TrashIcon size={18} />
                        </button>
                        <button className="text-sm text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded">
                          Chuyển vào phòng chờ
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div> : <div className="flex flex-col items-center justify-center py-12">
            <UsersIcon size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-500">
              Không tìm thấy bệnh nhân
            </h3>
            <p className="text-gray-400 mt-1">
              Thử tìm kiếm với từ khóa khác hoặc thêm bệnh nhân mới
            </p>
          </div>}
      </div>
      {showForm && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <PatientForm patient={editingPatient} onClose={handleCloseForm} />
          </div>
        </div>}
    </div>;
}