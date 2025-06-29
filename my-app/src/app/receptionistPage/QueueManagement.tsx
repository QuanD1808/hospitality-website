import React, { useState, useEffect } from 'react';
import { MoveRightIcon, CheckCircleIcon, ClockIcon, UserIcon, X, RefreshCcw } from 'lucide-react';
import { 
  getAllQueuesWithPatientInfo, 
  updateQueueStatus, 
  Queue,
  getAllDoctors,
  getUsersByRole,
  User,
  initializeData,
  sendQueueToDoctor
} from '../datats/mockPatients';
import * as apiService from '../services/api.service';
import { useAuth } from '../context/AuthContext';

interface QueueManagementProps {
  onBack: () => void;
}

// Extended interface to work with both API and mock data
interface QueueWithPatientInfo {
  _id: string;
  patientInfo?: {
    _id: string;
    userId: string;
    fullName: string;
    phone: string;
    role: string;
    [key: string]: any;
  } | null;
  // For API response
  patient?: {
    _id: string;
    userId: string;
    fullName: string;
    phone: string;
    role: string;
    email: string;
    [key: string]: any;
  } | string;
  status: 'waiting' | 'in_progress' | 'completed' | 'canceled';
  doctorId?: {
    _id: string;
    userId: string;
    fullName: string;
    [key: string]: any;
  } | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export function QueueManagement({ onBack }: QueueManagementProps) {
  // State để lưu trữ danh sách queue đã được fetch từ API
  const [queues, setQueues] = useState<QueueWithPatientInfo[]>([]);
  
  // State để lưu trữ danh sách bệnh nhân đang chờ
  const [waitingPatients, setWaitingPatients] = useState<QueueWithPatientInfo[]>([]);
  
  // State để lưu trữ danh sách bệnh nhân đang khám
  const [inProgressPatients, setInProgressPatients] = useState<QueueWithPatientInfo[]>([]);
  
  // Lấy danh sách bác sĩ từ API
  const [doctors, setDoctors] = useState<User[]>([]);
  
  // State để theo dõi modal chọn bác sĩ
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [selectedQueue, setSelectedQueue] = useState<string>('');
  
  // State để theo dõi trạng thái loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Lấy authentication token từ context
  const { token } = useAuth();
  
  // Function để format dữ liệu từ API về đúng định dạng cần dùng
  const formatApiQueueResponse = (apiData: any[]): QueueWithPatientInfo[] => {
    return apiData.map(item => ({
      ...item,
      // Map thông tin bệnh nhân từ phản hồi API sang format patientInfo cho tương thích
      patientInfo: item.patient && typeof item.patient === 'object' ? {
        _id: item.patient._id,
        userId: item.patient.userId,
        fullName: item.patient.fullName,
        phone: item.patient.phone,
        role: item.patient.role,
        email: item.patient.email
      } : null,
      // Giữ nguyên patient từ API để tiện sử dụng
    }));
  };
  
  // Format dữ liệu từ mock data để tương thích với kiểu QueueWithPatientInfo
  const formatMockQueueData = (mockData: any[]): QueueWithPatientInfo[] => {
    return mockData.map(item => ({
      ...item,
      // Đảm bảo kiểu dữ liệu phù hợp với QueueWithPatientInfo
      patient: item.patient, // Giữ nguyên dạng string cho mock data
    }));
  };
  
  // Effect để fetch dữ liệu queue từ API khi component được render
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (token) {
          // Fetch data từ API nếu có token
          try {
            console.log("Fetching queues from API...");
            const apiQueues = await apiService.getQueuesWithPatients(token);
            console.log("API response:", apiQueues);
            
            // Format lại dữ liệu từ API
            const formattedQueues = formatApiQueueResponse(apiQueues);
            setQueues(formattedQueues);
            
            // Lọc ra các trạng thái khác nhau
            const waiting = formattedQueues.filter(q => q.status === 'waiting');
            const inProgress = formattedQueues.filter(q => q.status === 'in_progress');
            
            setWaitingPatients(waiting);
            setInProgressPatients(inProgress);
            
            // Không lấy danh sách bác sĩ ở đây nữa, sẽ lấy khi mở modal
          } catch (apiError: any) {
            console.error("API error:", apiError);
            setError(`Lỗi khi lấy dữ liệu từ API: ${apiError.message}`);
            
            // Fallback to mock data
            console.log("Falling back to mock data...");
            await fallbackToMockData();
          }
        } else {
          // Không có token, sử dụng mock data
          console.log("No token available, using mock data...");
          await fallbackToMockData();
        }
      } catch (error: any) {
        console.error("Error loading data:", error);
        setError(`Lỗi: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    const fallbackToMockData = async () => {
      try {
        // Đảm bảo mock data được khởi tạo
        await initializeData();
        
        // Lấy toàn bộ queue cùng với thông tin bệnh nhân từ mock data
        const allQueues = await getAllQueuesWithPatientInfo();
        const formattedMockQueues = formatMockQueueData(allQueues);
        
        setQueues(formattedMockQueues);
        
        // Lọc ra các trạng thái khác nhau
        const waiting = formattedMockQueues.filter(q => q.status === 'waiting');
        const inProgress = formattedMockQueues.filter(q => q.status === 'in_progress');
        
        setWaitingPatients(waiting);
        setInProgressPatients(inProgress);
        
        // Không lấy danh sách bác sĩ ở đây nữa, sẽ lấy khi mở modal
      } catch (mockError) {
        console.error("Error loading mock data:", mockError);
        setError(`Không thể tải dữ liệu: ${mockError}`);
      }
    };
    
    loadData();
  }, [token]);
  
  // Tính thời gian chờ dựa trên createdAt (giả lập)
  const calculateWaitingTime = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const diffMs = currentDate.getTime() - createdDate.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} phút`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours} giờ ${mins} phút`;
    }
  };
  
  // Hàm xử lý khi click vào nút "Chuyển vào khám"
  const handleMoveToExamination = async (queueId: string) => {
    // Mở modal để chọn bác sĩ
    setSelectedQueue(queueId);
    setShowDoctorModal(true);
    
    // Lấy danh sách bác sĩ vào lúc này, không phải lúc load trang
    setLoading(true);
    setError(null);
    
    try {
      let doctorsList: User[] = [];
      
      if (token) {
        // Thử sử dụng endpoint mới dành riêng cho việc lấy danh sách bác sĩ
        try {
          console.log("Fetching doctors from API...");
          doctorsList = await apiService.getDoctors(token);
          console.log(`Retrieved ${doctorsList.length} doctors from API`);
        } catch (apiError: any) {
          console.error("API error when fetching doctors:", apiError);
          
          // Fallback to mock data
          console.log("Falling back to mock data for doctors...");
          doctorsList = await getUsersByRole('DOCTOR');
        }
      } else {
        // Sử dụng mock data nếu không có token
        console.log("Using mock data for doctors list...");
        doctorsList = await getUsersByRole('DOCTOR');
      }
      
      // Cập nhật state với danh sách bác sĩ
      setDoctors(doctorsList);
    } catch (error: any) {
      console.error("Error loading doctors:", error);
      setError(`Lỗi khi tải danh sách bác sĩ: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Hàm xử lý khi đã chọn bác sĩ và xác nhận chuyển bệnh nhân vào khám
  const handleConfirmMoveToExamination = async (doctorId: string) => {
    setLoading(true);
    try {
      if (token) {
        // Sử dụng API nếu có token
        try {
          console.log(`Updating queue ${selectedQueue} via API...`);
          const updatedQueue = await apiService.updateQueueStatus(
            selectedQueue, 
            token,
            'in_progress',
            doctorId
          );
          console.log("API update successful:", updatedQueue);
          
          // Cập nhật UI với dữ liệu mới
          await refreshData();
          
        } catch (apiError) {
          console.error("API error when updating queue:", apiError);
          // Fallback to mock function
          await fallbackUpdateQueue(selectedQueue, 'in_progress', doctorId);
        }
      } else {
        // Sử dụng mock function nếu không có token
        await fallbackUpdateQueue(selectedQueue, 'in_progress', doctorId);
      }
      
      // Đóng modal
      setShowDoctorModal(false);
      setSelectedQueue('');
    } catch (error) {
      console.error("Error moving patient to examination:", error);
      setError(`Lỗi khi chuyển bệnh nhân vào khám: ${error}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Hàm xử lý khi hoàn thành khám bệnh
  const handleCompleteExamination = async (queueId: string) => {
    setLoading(true);
    try {
      if (token) {
        // Sử dụng API nếu có token
        try {
          // Bước 1: Gửi thông tin bệnh nhân đến bác sĩ
          console.log(`Sending queue ${queueId} information to doctor...`);
          try {
            const sendResult = await apiService.sendQueueToDoctor(queueId, token);
            console.log("Queue sent to doctor successfully:", sendResult);
            setError(`Đã gửi thông tin bệnh nhân đến bác sĩ thành công!`);
          } catch (sendError: any) {
            console.error("Error sending queue to doctor:", sendError);
            setError(`Lỗi khi gửi thông tin đến bác sĩ: ${sendError.message}. Nhưng vẫn hoàn thành thay đổi trạng thái.`);
          }
          
          // Bước 2: Cập nhật trạng thái queue
          console.log(`Updating queue ${queueId} status to completed...`);
          const updatedQueue = await apiService.updateQueueStatus(
            queueId, 
            token,
            'completed'
          );
          console.log("API update successful:", updatedQueue);
          
          // Cập nhật UI với dữ liệu mới
          await refreshData();
          
        } catch (apiError) {
          console.error("API error when completing examination:", apiError);
          // Fallback to mock function
          await fallbackUpdateQueue(queueId, 'completed');
        }
      } else {
        // Sử dụng mock function nếu không có token
        await fallbackUpdateQueue(queueId, 'completed');
      }
    } catch (error: any) {
      console.error("Error completing examination:", error);
      setError(`Lỗi khi hoàn thành khám bệnh: ${error.message}`);
    } finally {
      setLoading(false);
      
      // Tự động ẩn thông báo lỗi sau 5 giây
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  
  // Fallback function để sử dụng mock data khi API lỗi
  const fallbackUpdateQueue = async (queueId: string, status: 'waiting' | 'in_progress' | 'completed' | 'canceled', doctorId?: string) => {
    try {
      console.log(`Using mock data to update queue ${queueId} to ${status}`);
      
      // Nếu đang chuyển sang trạng thái completed, gửi thông tin đến bác sĩ trước
      if (status === 'completed') {
        try {
          // Trong trường hợp thực, thông tin này đã được gửi qua API
          // Đối với mock data, ta giả lập việc gửi thông tin
          console.log(`Sending queue ${queueId} information to doctor (mock)...`);
          await sendQueueToDoctor(queueId);
          console.log('Mock: Information successfully sent to doctor');
        } catch (sendError) {
          console.error("Error sending information to doctor (mock):", sendError);
        }
      }
      
      const updatedQueue = await updateQueueStatus(queueId, status, doctorId);
      
      if (updatedQueue) {
        // Cập nhật lại state để re-render UI
        const allQueues = await getAllQueuesWithPatientInfo();
        const formattedMockQueues = formatMockQueueData(allQueues);
        
        setQueues(formattedMockQueues);
        
        // Lọc lại các danh sách
        const waiting = formattedMockQueues.filter(q => q.status === 'waiting');
        const inProgress = formattedMockQueues.filter(q => q.status === 'in_progress');
        
        setWaitingPatients(waiting);
        setInProgressPatients(inProgress);
      }
    } catch (mockError: any) {
      console.error("Error using mock data:", mockError);
      setError(`Không thể cập nhật trạng thái: ${mockError.message || mockError}`);
    }
  };
  
  // Lấy thông tin bác sĩ được chỉ định cho bệnh nhân
  const getAssignedDoctor = (doctorId?: any) => {
    if (!doctorId) return null;
    
    // Nếu doctorId là object (từ API)
    if (typeof doctorId === 'object' && doctorId !== null) {
      return doctorId;
    }
    
    // Nếu doctorId là string (từ mock data)
    return doctors.find(doctor => doctor._id === doctorId) || null;
  };
  
  // Hàm để refresh dữ liệu
  const refreshData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (token) {
        console.log("Refreshing data from API...");
        const apiQueues = await apiService.getQueuesWithPatients(token);
        const formattedQueues = formatApiQueueResponse(apiQueues);
        
        setQueues(formattedQueues);
        setWaitingPatients(formattedQueues.filter(q => q.status === 'waiting'));
        setInProgressPatients(formattedQueues.filter(q => q.status === 'in_progress'));
      } else {
        console.log("Refreshing data from mock data...");
        await initializeData();
        const allQueues = await getAllQueuesWithPatientInfo();
        const formattedMockQueues = formatMockQueueData(allQueues);
        
        setQueues(formattedMockQueues);
        setWaitingPatients(formattedMockQueues.filter(q => q.status === 'waiting'));
        setInProgressPatients(formattedMockQueues.filter(q => q.status === 'in_progress'));
      }
      
      // Không cần refresh danh sách bác sĩ, vì danh sách này sẽ được load khi cần thiết
    } catch (error: any) {
      console.error("Error refreshing data:", error);
      setError(`Lỗi khi làm mới dữ liệu: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Trích xuất thông tin bệnh nhân từ mỗi queue, xử lý cả từ API và mock data
  const getPatientInfo = (queue: QueueWithPatientInfo) => {
    // Ưu tiên patientInfo (đã được chuẩn hoá)
    if (queue.patientInfo) {
      return queue.patientInfo;
    }
    
    // Nếu patient là object (từ API)
    if (queue.patient && typeof queue.patient === 'object') {
      return {
        _id: queue.patient._id,
        userId: queue.patient.userId,
        fullName: queue.patient.fullName,
        phone: queue.patient.phone,
        role: queue.patient.role,
        email: queue.patient.email
      };
    }
    
    // Trường hợp khác (có thể là null hoặc không có thông tin)
    return null;
  };

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onBack}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-gray-700"
        >
          ← Quay lại
        </button>
        
        <button 
          onClick={refreshData}
          disabled={loading}
          className={`px-4 py-2 rounded-md flex items-center ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          <RefreshCcw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Đang tải...' : 'Làm mới dữ liệu'}
        </button>
      </div>
      {/* Header section */}
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold text-black tracking-tight">Quản lý phòng chờ</h1>
        <p className="text-black mt-2">
          Quản lý danh sách bệnh nhân đang chờ khám và theo dõi trạng thái
        </p>
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waiting patients card */}
        <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white">
          <div className="p-4 border-b border-gray-300 bg-gray-50 flex justify-between items-center">
            <div className="flex items-center">
              <ClockIcon size={20} className="text-black mr-2" />
              <h2 className="text-lg font-semibold text-black">
                Bệnh nhân đang chờ
              </h2>
            </div>
            <span className="bg-gray-800 text-white text-sm px-3.5 py-1 rounded-full font-medium flex items-center">
              <UserIcon size={14} className="mr-1.5" />
              {waitingPatients.length} bệnh nhân
            </span>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-3"></div>
              <p className="text-black">Đang tải dữ liệu...</p>
            </div>
          ) : waitingPatients.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {waitingPatients.map((queue, index) => {
                // Lấy thông tin bệnh nhân từ đúng nguồn dữ liệu
                const patientInfo = getPatientInfo(queue);
                
                return (
                  <div key={queue._id} className={`p-5 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-black text-base">
                          {patientInfo?.fullName || 'Không có tên'}
                        </h3>
                        <p className="text-sm text-black mt-1">
                          ID: {patientInfo?.userId || 'N/A'}
                        </p>
                        <p className="text-sm text-black mt-1">
                          SĐT: {patientInfo?.phone || 'N/A'}
                        </p>
                      </div>
                      <div className="bg-gray-200 border border-gray-300 text-black px-3 py-1 rounded-full text-sm font-medium">
                        Chờ
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black flex items-center">
                        <ClockIcon size={16} className="mr-1.5 text-black" />
                        Thời gian chờ: <span className="font-medium ml-1">{calculateWaitingTime(queue.createdAt)}</span>
                      </span>
                      <button 
                        onClick={() => handleMoveToExamination(queue._id)}
                        disabled={loading}
                        className={`flex items-center text-sm ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white px-3.5 py-1.5 rounded-md transition-colors shadow-sm`}
                      >
                        Chuyển vào khám
                        <MoveRightIcon size={16} className="ml-1.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <ClockIcon size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-black font-medium">Không có bệnh nhân nào đang chờ</p>
              <p className="text-sm text-black mt-1">Hãy thêm bệnh nhân vào danh sách chờ từ màn hình Quản lý bệnh nhân</p>
            </div>
          )}
        </div>
        
        {/* In examination patients card */}
        <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white">
          <div className="p-4 border-b border-gray-300 bg-gray-50 flex justify-between items-center">
            <div className="flex items-center">
              <CheckCircleIcon size={20} className="text-black mr-2" />
              <h2 className="text-lg font-semibold text-black">Đang khám</h2>
            </div>
            <span className="bg-gray-800 text-white text-sm px-3.5 py-1 rounded-full font-medium flex items-center">
              <UserIcon size={14} className="mr-1.5" />
              {inProgressPatients.length} bệnh nhân
            </span>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-3"></div>
              <p className="text-black">Đang tải dữ liệu...</p>
            </div>
          ) : inProgressPatients.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {inProgressPatients.map((queue, index) => {
                // Lấy thông tin bệnh nhân từ đúng nguồn dữ liệu
                const patientInfo = getPatientInfo(queue);
                
                // Lấy thông tin bác sĩ được chỉ định
                const assignedDoctor = getAssignedDoctor(queue.doctorId);
                
                return (
                  <div key={queue._id} className={`p-5 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-black text-base">
                          {patientInfo?.fullName || 'Không có tên'}
                        </h3>
                        <p className="text-sm text-black mt-1">
                          ID: {patientInfo?.userId || 'N/A'}
                        </p>
                        <p className="text-sm text-black mt-1">
                          SĐT: {patientInfo?.phone || 'N/A'}
                        </p>
                      </div>
                      <div className="bg-blue-100 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Đang khám
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <p className="text-xs font-medium text-black uppercase tracking-wide">Bác sĩ khám</p>
                        <p className="text-sm font-medium text-black mt-1">
                          {assignedDoctor ? (typeof assignedDoctor === 'object' ? assignedDoctor.fullName : assignedDoctor) : 'Chưa chỉ định'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-black uppercase tracking-wide">Phòng khám</p>
                        <p className="text-sm font-medium text-black mt-1">
                          {assignedDoctor ? `Phòng ${typeof assignedDoctor === 'object' ? 
                              (100 + parseInt(assignedDoctor._id.slice(-2), 16) % 10) : 
                              (100 + parseInt(String(assignedDoctor).slice(-2), 16) % 10)
                            }` : 'N/A'}
                        </p>
                      </div>
                    </div>
                    {/* Removed "Hoàn thành khám" button as this is now the doctor's responsibility */}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <CheckCircleIcon size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-black font-medium">Không có bệnh nhân nào đang khám</p>
              <p className="text-sm text-black mt-1">Chuyển bệnh nhân từ phòng chờ vào khám</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal chọn bác sĩ */}
      {showDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Chọn bác sĩ</h2>
              <button 
                onClick={() => setShowDoctorModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-black mb-4">Vui lòng chọn bác sĩ để chuyển bệnh nhân vào khám:</p>
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-3"></div>
                <p className="text-black">Đang tải...</p>
              </div>
            ) : doctors.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-auto">
                {doctors.map((doctor) => (
                  <div 
                    key={doctor._id}
                    onClick={() => !loading && handleConfirmMoveToExamination(doctor._id)}
                    className={`p-3 border border-gray-300 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50 cursor-pointer'} transition-colors flex justify-between items-center`}
                  >
                    <div>
                      <p className="font-medium text-black">{doctor.fullName}</p>
                      <p className="text-sm text-gray-600">{doctor.email}</p>
                    </div>
                    <div className="bg-gray-100 text-black text-xs px-2 py-1 rounded">
                      Phòng {100 + parseInt(doctor._id.slice(-2), 16) % 10}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-black">Không có bác sĩ nào</p>
            )}
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowDoctorModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md mr-2 text-black hover:bg-gray-300"
                disabled={loading}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}