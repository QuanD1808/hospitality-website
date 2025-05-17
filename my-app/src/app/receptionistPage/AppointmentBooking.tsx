import React, { useState } from 'react';
import { CalendarIcon, SearchIcon, CheckCircleIcon, XIcon } from 'lucide-react';
import { AppointmentForm } from './components/Appointments/AppointmentForm';
export function AppointmentBooking() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // Mock appointments data
  const [appointments] = useState([{
    id: 1,
    name: 'Nguyễn Văn A',
    nationalId: '001201012345',
    phone: '0912345678',
    appointmentDate: '2024-02-20',
    appointmentTime: '09:00',
    status: 'pending'
  }, {
    id: 2,
    name: 'Trần Thị B',
    nationalId: '001201054321',
    phone: '0923456789',
    appointmentDate: '2024-02-20',
    appointmentTime: '10:00',
    status: 'confirmed'
  }, {
    id: 3,
    name: 'Lê Văn C',
    nationalId: '001201098765',
    phone: '0934567890',
    appointmentDate: '2024-02-20',
    appointmentTime: '14:00',
    status: 'pending'
  }]);
  const filteredAppointments = appointments.filter(appointment => appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) || appointment.nationalId.includes(searchTerm));
  const handleMoveToQueue = (appointmentId: number) => {
    // Implementation for moving to queue
    console.log('Moving appointment to queue:', appointmentId);
  };
  return <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Đặt lịch online</h1>
          <p className="text-gray-600">Quản lý lịch hẹn khám bệnh trực tuyến</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <CalendarIcon size={18} className="mr-2" />
          Đặt lịch mới
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className="text-gray-400" />
            </div>
            <input type="text" placeholder="Tìm kiếm theo tên hoặc CCCD..." className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="completed">Đã khám</option>
              <option value="cancelled">Đã hủy</option>
            </select>
            <input type="date" className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
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
                  Số điện thoại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày hẹn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giờ hẹn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map(appointment => <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.nationalId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(appointment.appointmentDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.appointmentTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {appointment.status === 'confirmed' && <button onClick={() => handleMoveToQueue(appointment.id)} className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-sm flex items-center">
                          Chuyển vào phòng chờ
                        </button>}
                      {appointment.status === 'pending' && <button className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm">
                          Xác nhận
                        </button>}
                      <button className="text-red-600 hover:text-red-800">
                        Hủy
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {showForm && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <AppointmentForm onClose={() => setShowForm(false)} />
          </div>
        </div>}
    </div>;
}