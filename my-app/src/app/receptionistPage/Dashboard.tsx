import React from 'react';
import { UsersIcon, ClockIcon, CheckSquareIcon, CalendarIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Dashboard({ onNavigate }) {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: 'Lịch hẹn hôm nay',
      value: '24',
      icon: <CalendarIcon className="h-6 w-6 text-blue-600" />,
      change: '+2',
      changeType: 'increase'
    },
    {
      title: 'Đang chờ khám',
      value: '12',
      icon: <ClockIcon className="h-6 w-6 text-yellow-600" />,
      change: '3 mới',
      changeType: 'neutral'
    },
    {
      title: 'Hoàn thành hôm nay',
      value: '18',
      icon: <CheckSquareIcon className="h-6 w-6 text-green-600" />,
      change: '75%',
      changeType: 'increase'
    },
    {
      title: 'Tổng bệnh nhân',
      value: '1,234',
      icon: <UsersIcon className="h-6 w-6 text-purple-600" />,
      change: '+5.2%',
      changeType: 'increase'
    }
  ];

  const appointments = [
    { id: 1, patient: 'Nguyễn Văn A', time: '9:00 AM', doctor: 'Dr. Nguyễn Thị Hương', department: 'Nội khoa', status: 'Đang chờ' },
    { id: 2, patient: 'Trần Văn B', time: '9:30 AM', doctor: 'Dr. Lê Minh Tuấn', department: 'Tim mạch', status: 'Đang khám' },
    { id: 3, patient: 'Phạm Thị C', time: '10:00 AM', doctor: 'Dr. Trần Thị Mai', department: 'Da liễu', status: 'Đặt trước' },
    { id: 4, patient: 'Hoàng Văn D', time: '10:30 AM', doctor: 'Dr. Nguyễn Thị Hương', department: 'Nội khoa', status: 'Đặt trước' },
    { id: 5, patient: 'Lê Thị E', time: '11:00 AM', doctor: 'Dr. Phạm Văn Nam', department: 'Nhãn khoa', status: 'Đặt trước' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">Hệ thống Lễ tân MediClinic</h1>
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name || user?.fullName}</p>
              <p className="text-xs text-gray-500">Lễ tân</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-gray-600" />
            </div>
            <button 
              onClick={logout}
              className="ml-4 p-2 rounded-full text-gray-500 hover:bg-gray-100"
              title="Đăng xuất"
            >
              <LogOutIcon size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">{stat.icon}</div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span className={`font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 
                    stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500"> so với hôm qua</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Appointments Today */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Lịch hẹn hôm nay</h3>
              <p className="mt-1 text-sm text-gray-500">Danh sách bệnh nhân có lịch hẹn hôm nay</p>
            </div>
            <div>
              <button 
                onClick={() => onNavigate('AppointmentBooking')}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Thêm lịch hẹn mới
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bệnh nhân
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giờ hẹn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bác sĩ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khoa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.doctor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{appointment.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'Đang chờ' ? 'bg-yellow-100 text-yellow-800' : 
                          appointment.status === 'Đang khám' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Check-in</button>
                        <button className="text-red-600 hover:text-red-900">Hủy</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Thao tác nhanh</h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-6">
              {/* Card 1 - Patient Management */}
              <div 
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 cursor-pointer"
                onClick={() => onNavigate('PatientManagement')}
              >
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                  <UsersIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Quản lý bệnh nhân</p>
                  <p className="text-sm text-gray-500">Xem và quản lý thông tin bệnh nhân</p>
                </div>
              </div>
              
              {/* Card 2 - Queue Management */}
              <div 
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 cursor-pointer"
                onClick={() => onNavigate('QueueManagement')}
              >
                <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                  <CalendarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Quản lý lịch hẹn</p>
                  <p className="text-sm text-gray-500">Thêm và chỉnh sửa lịch hẹn</p>
                </div>
              </div>
              
              {/* Card 3 - Medication History */}
              <div 
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 cursor-pointer"
                onClick={() => onNavigate('MedicationHistory')}
              >
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                  <ClockIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Báo cáo</p>
                  <p className="text-sm text-gray-500">Xem báo cáo hoạt động</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}