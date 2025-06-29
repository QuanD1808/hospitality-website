import React, { useState, useEffect } from 'react';
import { CalendarIcon, SearchIcon, CheckCircleIcon, XIcon } from 'lucide-react';
import { AppointmentForm } from './components/Appointments/AppointmentForm';
import { 
  getAllPatients, 
  getQueuesByStatus, 
  addQueue
} from '../datats/mockPatients';
import { User } from '../datats/mockPatients';
import axiosInstance from '../services/axios.customize.service';
import * as apiService from '../services/api.service';
import { useAuth } from '../context/AuthContext';

interface AppointmentBookingProps {
  onBack: () => void;
}

// Interface for our appointment data structure
interface Appointment {
  id: string;
  name: string;
  userId: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
}

export function AppointmentBooking({ onBack }: AppointmentBookingProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  // Load appointments from API
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        
        // Get patients for mapping 
        const patients = await getAllPatients();
        
        // In a real implementation, fetch appointments from the API
        // For now, generate mock appointments from patient data
        if (token) {
          // Try to get appointments from API
          try {
            const apiAppointments = await apiService.getAppointments(token);
            if (apiAppointments && Array.isArray(apiAppointments)) {
              // Format appointments from API
              const formattedAppointments = apiAppointments.map((appt: any) => ({
                id: appt._id,
                name: appt.patientName || 'Unknown',
                userId: appt.patientId || '',
                phone: appt.patientPhone || '',
                appointmentDate: new Date(appt.appointmentDate).toISOString().split('T')[0],
                appointmentTime: appt.appointmentTime,
                status: appt.status as 'pending' | 'confirmed' | 'completed' | 'canceled'
              }));
              setAppointments(formattedAppointments);
              setLoading(false);
              return;
            }
          } catch (apiError) {
            console.log('Could not fetch appointments from API, falling back to mock data', apiError);
          }
        }

        // Fallback: Generate mock appointments from patient data
        const today = new Date();
        const mockAppointments = patients.slice(0, 5).map((patient, index) => {
          const appointmentHour = 9 + index;
          const appointmentDate = new Date();
          appointmentDate.setDate(today.getDate() + (index % 3)); // Distribute over next 3 days
          
          return {
            id: patient._id,
            name: patient.fullName,
            userId: patient.userId,
            phone: patient.phone,
            appointmentDate: appointmentDate.toISOString().split('T')[0],
            appointmentTime: `${appointmentHour < 10 ? '0' + appointmentHour : appointmentHour}:00`,
            status: (index % 2 === 0) ? 'pending' : 'confirmed'
          } as Appointment;
        });
        
        setAppointments(mockAppointments);
      } catch (err) {
        console.error("Error loading appointments:", err);
        setError("Could not load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadAppointments();
  }, [token]);
  
  const filteredAppointments = appointments.filter(appointment => 
    appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    appointment.userId.includes(searchTerm) ||
    appointment.phone.includes(searchTerm)
  );
  
  const handleMoveToQueue = async (appointmentId: string) => {
    try {
      // Add patient to queue using the addQueue function (now async)
      const result = await addQueue(appointmentId, 'waiting');
      
      if (result) {
        // Update appointment status
        setAppointments(appointments.map(appt => 
          appt.id === appointmentId ? {...appt, status: 'completed' as const} : appt
        ));
        
        // In a real implementation, update the appointment status in the API
        if (token) {
          try {
            const appointmentToUpdate = appointments.find(a => a.id === appointmentId);
            if (appointmentToUpdate) {
              await apiService.updateAppointment(
                appointmentId, 
                { status: 'completed' }, 
                token
              );
            }
          } catch (apiError) {
            console.error("Failed to update appointment status in API:", apiError);
          }
        }
        
        alert('Đã chuyển bệnh nhân vào phòng chờ!');
      } else {
        alert('Bệnh nhân đã có trong phòng chờ hoặc không thể thêm!');
      }
    } catch (error) {
      console.error("Error adding patient to queue:", error);
      alert('Đã xảy ra lỗi khi chuyển bệnh nhân vào phòng chờ!');
    }
  };
  
  if (loading) return <div className="p-8 text-center">Đang tải dữ liệu...</div>;
  
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  
  return <div>
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="mr-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-gray-700"
        >
          ← Quay lại
        </button>
      </div>
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold text-black tracking-tight">Đặt lịch khám</h1>
        <p className="text-black mt-2">
          Quản lý các cuộc hẹn khám bệnh và điều phối lịch
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Lịch hẹn</h2>
              <button 
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center text-sm font-medium transition-colors"
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Thêm lịch hẹn
              </button>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-black" />
                </div>
                <input 
                  type="text" 
                  placeholder="Tìm kiếm theo tên, ID hoặc số điện thoại..." 
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm" 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bệnh nhân
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời gian
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                          <div className="text-sm text-gray-500">ID: {appointment.userId}</div>
                          <div className="text-sm text-gray-500">SĐT: {appointment.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(appointment.appointmentDate).toLocaleDateString('vi-VN')}
                          </div>
                          <div className="text-sm text-gray-500">{appointment.appointmentTime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : appointment.status === 'canceled'
                              ? 'bg-red-100 text-red-800'
                              : appointment.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status === 'confirmed' 
                              ? 'Đã xác nhận' 
                              : appointment.status === 'canceled'
                              ? 'Đã hủy'
                              : appointment.status === 'completed'
                              ? 'Đã hoàn thành'
                              : 'Đang chờ'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {appointment.status !== 'completed' && appointment.status !== 'canceled' && (
                            <button 
                              onClick={() => handleMoveToQueue(appointment.id)}
                              className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md mr-2 flex items-center"
                            >
                              <CheckCircleIcon className="w-4 h-4 mr-1" />
                              Chuyển vào phòng chờ
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                        Không tìm thấy lịch hẹn nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Hiển thị {filteredAppointments.length} trong tổng số {appointments.length} lịch hẹn
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Lịch hẹn hôm nay</h2>
              <p className="mt-1 text-sm text-gray-500">
                {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="p-6">
              {appointments.filter(a => a.appointmentDate === new Date().toISOString().split('T')[0]).length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {appointments
                    .filter(a => a.appointmentDate === new Date().toISOString().split('T')[0])
                    .map(appointment => (
                      <li key={appointment.id} className="py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-black">{appointment.appointmentTime}</p>
                            <p className="text-sm text-gray-600 mt-1">{appointment.name}</p>
                          </div>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : appointment.status === 'canceled'
                              ? 'bg-red-100 text-red-800'
                              : appointment.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status === 'confirmed' 
                              ? 'Đã xác nhận' 
                              : appointment.status === 'canceled'
                              ? 'Đã hủy'
                              : appointment.status === 'completed'
                              ? 'Đã hoàn thành'
                              : 'Đang chờ'}
                          </span>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Không có lịch hẹn hôm nay</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Chưa có lịch hẹn nào được đặt cho hôm nay.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <CalendarIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                      Thêm lịch hẹn
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Appointment Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <AppointmentForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>;
}