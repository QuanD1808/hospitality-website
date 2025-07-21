import React, { useState, useEffect } from 'react';
import { UsersIcon, ClockIcon, CheckSquareIcon, CalendarIcon, UserIcon, LogOutIcon, CheckCircleIcon, RefreshCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getAllPatients, 
  getQueuesByStatus,
  // Removed initializeData import to prevent unauthorized access
} from '../datats/mockPatients';
import * as apiService from '../services/api.service';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user, logout, token } = useAuth();
  
  // State cho các thống kê từ mock data
  const [patientCount, setPatientCount] = useState(0);
  const [waitingCount, setWaitingCount] = useState(0);
  const [completedTodayCount, setCompletedTodayCount] = useState(0);
  const [newPatientsToday, setNewPatientsToday] = useState(0);
  
  // State cho danh sách queue đã hoàn thành
  const [completedQueues, setCompletedQueues] = useState<any[]>([]);
  const [loadingQueues, setLoadingQueues] = useState(false);
  const [queueError, setQueueError] = useState<string | null>(null);
  
  // Pagination state cho danh sách queue đã hoàn thành
  const [currentPage, setCurrentPage] = useState(1);
  const [queuesPerPage, setQueuesPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Load dữ liệu từ API khi component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Removed initializeData() call to prevent 403 Forbidden error
        // This was trying to access medicines data which receptionists don't have permission for
        
        // Lấy tổng số bệnh nhân
        const patients = await getAllPatients();
        setPatientCount(patients.length);
        
        // Tính số bệnh nhân mới hôm nay
        const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại dạng YYYY-MM-DD
        const newPatients = patients.filter(p => 
          p.createdAt.startsWith(today)).length;
        setNewPatientsToday(newPatients);
        
        // Lấy số bệnh nhân đang chờ
        const waitingQueues = await getQueuesByStatus('waiting');
        setWaitingCount(waitingQueues.length);
        
        // Lấy số bệnh nhân đã hoàn thành khám hôm nay
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Đặt thời gian về đầu ngày
        
        const completedQueues = await getQueuesByStatus('completed');
        const completedToday = completedQueues.filter(q => {
          const queueDate = new Date(q.updatedAt);
          return queueDate >= todayStart;
        });
        setCompletedTodayCount(completedToday.length);
        
        // Lấy danh sách queue đã hoàn thành
        await fetchCompletedQueues();
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };
    
    loadData();
  }, [token]);

  // Thống kê hiển thị với dữ liệu từ mock data
  const stats = [
    {
      title: 'Lịch hẹn hôm nay',
      value: `${waitingCount + completedTodayCount}`,
      icon: <CalendarIcon className="h-6 w-6 text-blue-600" />,
      change: `${waitingCount} chờ`,
      changeType: 'neutral'
    },
    {
      title: 'Đang chờ khám',
      value: `${waitingCount}`,
      icon: <ClockIcon className="h-6 w-6 text-yellow-600" />,
      change: waitingCount > 0 ? `${waitingCount} bệnh nhân` : 'Không có',
      changeType: 'neutral'
    },
    {
      title: 'Hoàn thành hôm nay',
      value: `${completedTodayCount}`,
      icon: <CheckSquareIcon className="h-6 w-6 text-green-600" />,
      change: completedTodayCount > 0 ? 
        `${Math.round((completedTodayCount / (completedTodayCount + waitingCount || 1)) * 100)}%` : 
        '0%',
      changeType: 'increase'
    },
    {
      title: 'Tổng bệnh nhân',
      value: patientCount.toString(),
      icon: <UsersIcon className="h-6 w-6 text-purple-600" />,
      change: `+${newPatientsToday} mới`,
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

  // Hàm lấy danh sách queue đã hoàn thành
  const fetchCompletedQueues = async () => {
    setLoadingQueues(true);
    setQueueError(null);
    
    try {
      if (token) {
        // Sử dụng API với token
        try {
          console.log("Fetching completed queues from API...");
          const response = await apiService.getQueuesByStatus('completed', token);
          console.log("API response:", response);
          
          // Format lại dữ liệu nếu cần
          const formattedQueues = response.map((queue: any) => ({
            ...queue,
            patientName: queue.patient && typeof queue.patient === 'object' ? 
                        queue.patient.fullName : 'Không có tên',
            doctorName: queue.doctorId && typeof queue.doctorId === 'object' ? 
                       queue.doctorId.fullName : 'Không rõ bác sĩ'
          }));
          
          // Sắp xếp theo thời gian hoàn thành mới nhất
          formattedQueues.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          
          setCompletedQueues(formattedQueues);
          setTotalPages(Math.ceil(formattedQueues.length / queuesPerPage));
          setCurrentPage(1); // Reset to first page when data changes
        } catch (apiError: any) {
          console.error("API error:", apiError);
          setQueueError(`Lỗi khi lấy dữ liệu từ API: ${apiError.message}`);
          
          // Fallback to mock data
          await fetchCompletedQueuesMock();
        }
      } else {
        // Sử dụng mock data nếu không có token
        await fetchCompletedQueuesMock();
      }
    } catch (error: any) {
      console.error("Error fetching completed queues:", error);
      setQueueError(`Lỗi: ${error.message}`);
    } finally {
      setLoadingQueues(false);
    }
  };
  
  // Hàm fallback sử dụng mock data
  const fetchCompletedQueuesMock = async () => {
    try {
      console.log("Using mock data for completed queues...");
      // Remove initializeData call here too
      
      // Lấy danh sách queue đã hoàn thành từ mock data
      const mockCompletedQueues = await getQueuesByStatus('completed');
      
      // Format lại dữ liệu để hiển thị
      const formattedMockQueues = await Promise.all(mockCompletedQueues.map(async (queue: any) => {
        // Giả sử bạn có các hàm mock để lấy thông tin bệnh nhân và bác sĩ
        let patientName = 'Không có tên';
        
        // Xử lý các cấu trúc dữ liệu khác nhau có thể có
        if (queue.patientInfo && queue.patientInfo.fullName) {
          patientName = queue.patientInfo.fullName;
        } else if (queue.patient && typeof queue.patient === 'object' && queue.patient.fullName) {
          patientName = queue.patient.fullName;
        }
        
        return {
          ...queue,
          patientName: patientName,
          doctorName: queue.doctorId ? `Bác sĩ ${queue._id.substring(0, 5)}` : 'Không rõ bác sĩ',
          completedAt: new Date(queue.updatedAt).toLocaleString('vi-VN')
        };
      }));
      
      // Sắp xếp theo thời gian hoàn thành mới nhất
      formattedMockQueues.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      
      setCompletedQueues(formattedMockQueues);
      setTotalPages(Math.ceil(formattedMockQueues.length / queuesPerPage));
      setCurrentPage(1); // Reset to first page when data changes
    } catch (mockError: any) {
      console.error("Error loading mock data for completed queues:", mockError);
      setQueueError(`Không thể tải dữ liệu mô phỏng: ${mockError.message}`);
      setCompletedQueues([]);
      setTotalPages(1);
    }
  };

  // Calculating pagination variables
  const indexOfLastQueue = currentPage * queuesPerPage;
  const indexOfFirstQueue = indexOfLastQueue - queuesPerPage;
  const currentQueues = completedQueues.slice(indexOfFirstQueue, indexOfLastQueue);
  
  // Function to handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Function to handle records per page change
  const handleRecordsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setQueuesPerPage(value);
    setTotalPages(Math.ceil(completedQueues.length / value));
    setCurrentPage(1); // Reset to first page when changing records per page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">Hệ thống Lễ tân MediClinic</h1>
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <p className="text-sm font-medium text-gray-900">{user?.fullName || 'Người dùng'}</p>
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

        {/* Completed Queues List */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Danh sách bệnh nhân đã hoàn thành khám</h3>
            <button 
              onClick={fetchCompletedQueues}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded flex items-center"
              disabled={loadingQueues}
            >
              <RefreshCcw size={14} className={`mr-1 ${loadingQueues ? 'animate-spin' : ''}`} />
              Làm mới
            </button>
          </div>
          
          {queueError && (
            <div className="px-4 py-3 bg-red-50 text-red-700 border-t border-b border-red-200">
              {queueError}
            </div>
          )}
          
          <div className="border-t border-gray-200">
            {loadingQueues ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
              </div>
            ) : completedQueues.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bệnh nhân
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bác sĩ
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày hoàn thành
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentQueues.map((queue) => (
                      <tr key={queue._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {queue.patientName || (queue.patient && typeof queue.patient === 'object' ? 
                              queue.patient.fullName : 'Không có tên')}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {queue.patient && typeof queue.patient === 'object' ? 
                              queue.patient.userId : queue.patient || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {queue.doctorName || (queue.doctorId && typeof queue.doctorId === 'object' ? 
                              queue.doctorId.fullName : 'Không rõ bác sĩ')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(queue.updatedAt).toLocaleString('vi-VN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            <CheckCircleIcon size={14} className="mr-1" /> Hoàn thành
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination Controls */}
                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex flex-col gap-4 sm:hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700">
                        Trang {currentPage}/{totalPages}
                      </p>
                      <select 
                        className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm"
                        value={queuesPerPage}
                        onChange={(e) => {
                          setQueuesPerPage(Number(e.target.value));
                          setTotalPages(Math.ceil(completedQueues.length / Number(e.target.value)));
                          setCurrentPage(1); // Reset to first page when changing records per page
                        }}
                      >
                        <option value={5}>5 mỗi trang</option>
                        <option value={10}>10 mỗi trang</option>
                        <option value={20}>20 mỗi trang</option>
                        <option value={completedQueues.length}>Tất cả</option>
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={`relative inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                          currentPage === 1 
                            ? 'text-gray-400 bg-gray-100'
                            : 'text-blue-600 bg-blue-100 hover:bg-blue-200'
                        } focus:outline-none`}
                        disabled={currentPage === 1}
                      >
                        Trước
                      </button>
                      <span className="text-sm font-medium">
                        {currentPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={`relative inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                          currentPage === totalPages 
                            ? 'text-gray-400 bg-gray-100'
                            : 'text-blue-600 bg-blue-100 hover:bg-blue-200'
                        } focus:outline-none`}
                        disabled={currentPage === totalPages}
                      >
                        Tiếp theo
                      </button>
                    </div>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:justify-between">
                    <div className="flex items-center">
                      <p className="text-sm text-gray-700">
                        Hiển thị{' '}
                        <span className="font-medium">{(currentPage - 1) * queuesPerPage + 1}</span>
                        {' '}đến{' '}
                        <span className="font-medium">{Math.min(currentPage * queuesPerPage, completedQueues.length)}</span>
                        {' '}trong tổng số{' '}
                        <span className="font-medium">{completedQueues.length}</span>
                        {' '}bệnh nhân đã hoàn thành khám
                      </p>
                      <select 
                        className="ml-3 border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm"
                        value={queuesPerPage}
                        onChange={(e) => {
                          setQueuesPerPage(Number(e.target.value));
                          setTotalPages(Math.ceil(completedQueues.length / Number(e.target.value)));
                          setCurrentPage(1); // Reset to first page when changing records per page
                        }}
                      >
                        <option value={5}>5 mỗi trang</option>
                        <option value={10}>10 mỗi trang</option>
                        <option value={20}>20 mỗi trang</option>
                        <option value={completedQueues.length}>Hiển thị tất cả</option>
                      </select>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => setCurrentPage(1)}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10"
                        >
                          <span className="sr-only">Đến trang đầu</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10"
                          disabled={currentPage === 1}
                        >
                          <span className="sr-only">Trang trước</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>
                        
                        {/* Page number buttons */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          // Logic to show pages around current page
                          let pageToShow;
                          if (totalPages <= 5) {
                            pageToShow = i + 1;
                          } else if (currentPage <= 3) {
                            pageToShow = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageToShow = totalPages - 4 + i;
                          } else {
                            pageToShow = currentPage - 2 + i;
                          }
                          
                          if (pageToShow > 0 && pageToShow <= totalPages) {
                            return (
                              <button
                                key={pageToShow}
                                onClick={() => setCurrentPage(pageToShow)}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 ${
                                  currentPage === pageToShow
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors`}
                              >
                                {pageToShow}
                              </button>
                            );
                          }
                          return null;
                        })}
                        
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10"
                          disabled={currentPage === totalPages}
                        >
                          <span className="sr-only">Trang tiếp theo</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10"
                        >
                          <span className="sr-only">Đến trang cuối</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircleIcon className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500">Không có bệnh nhân nào đã hoàn thành khám</p>
              </div>
            )}
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
