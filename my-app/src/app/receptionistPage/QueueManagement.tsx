import React, { useState, useEffect } from 'react';
import { MoveRightIcon, CheckCircleIcon, ClockIcon, UserIcon, X } from 'lucide-react';
import { 
  getAllQueuesWithPatientInfo, 
  updateQueueStatus, 
  Queue,
  getAllDoctors,
  User
} from '../datats/mockPatients';

interface QueueManagementProps {
  onBack: () => void;
}

// Thêm interface để định nghĩa loại dữ liệu cho queue đã có thông tin bệnh nhân
interface QueueWithPatientInfo extends Queue {
  patientInfo: {
    _id: string;
    userId: string;
    fullName: string;
    phone: string;
    role: string;
    [key: string]: any;
  } | null;
}

// Không cần interface Doctor nữa vì sẽ sử dụng User từ mockPatients.ts

export function QueueManagement({ onBack }: QueueManagementProps) {
  // State để lưu trữ danh sách queue đã được fetch từ mockdata
  const [queues, setQueues] = useState<QueueWithPatientInfo[]>([]);
  
  // State để lưu trữ danh sách bệnh nhân đang chờ
  const [waitingPatients, setWaitingPatients] = useState<QueueWithPatientInfo[]>([]);
  
  // State để lưu trữ danh sách bệnh nhân đang khám
  const [inProgressPatients, setInProgressPatients] = useState<QueueWithPatientInfo[]>([]);
  
  // Lấy danh sách bác sĩ từ mock data
  const [doctors, setDoctors] = useState<User[]>([]);
  
  // State để theo dõi modal chọn bác sĩ
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [selectedQueue, setSelectedQueue] = useState<string>('');
  
  // Effect để fetch dữ liệu queue từ mockdata khi component được render
  useEffect(() => {
    // Lấy toàn bộ queue cùng với thông tin bệnh nhân
    const allQueues = getAllQueuesWithPatientInfo();
    setQueues(allQueues);
    
    // Lọc ra các trạng thái khác nhau
    const waiting = allQueues.filter(q => q.status === 'waiting');
    const inProgress = allQueues.filter(q => q.status === 'in_progress');
    
    setWaitingPatients(waiting);
    setInProgressPatients(inProgress);
    
    // Lấy danh sách bác sĩ
    const allDoctors = getAllDoctors();
    setDoctors(allDoctors);
  }, []);
  
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
  const handleMoveToExamination = (queueId: string) => {
    // Mở modal để chọn bác sĩ
    setSelectedQueue(queueId);
    setShowDoctorModal(true);
  };
  
  // Hàm xử lý khi đã chọn bác sĩ và xác nhận chuyển bệnh nhân vào khám
  const handleConfirmMoveToExamination = (doctorId: string) => {
    // Cập nhật status của queue thành 'in_progress' trong mock data và thêm doctorId
    const updatedQueue = updateQueueStatus(selectedQueue, 'in_progress', doctorId);
    
    if (updatedQueue) {
      // Cập nhật lại state để re-render UI
      const allQueues = getAllQueuesWithPatientInfo();
      setQueues(allQueues);
      
      // Lọc lại các danh sách
      const waiting = allQueues.filter(q => q.status === 'waiting');
      const inProgress = allQueues.filter(q => q.status === 'in_progress');
      
      setWaitingPatients(waiting);
      setInProgressPatients(inProgress);
      
      // Đóng modal
      setShowDoctorModal(false);
      setSelectedQueue('');
    }
  };
  
  // Hàm xử lý khi hoàn thành khám bệnh
  const handleCompleteExamination = (queueId: string) => {
    // Cập nhật status của queue thành 'completed' trong mock data
    const updatedQueue = updateQueueStatus(queueId, 'completed');
    
    if (updatedQueue) {
      // Cập nhật lại state để re-render UI
      const allQueues = getAllQueuesWithPatientInfo();
      setQueues(allQueues);
      
      // Lọc lại các danh sách
      const waiting = allQueues.filter(q => q.status === 'waiting');
      const inProgress = allQueues.filter(q => q.status === 'in_progress');
      
      setWaitingPatients(waiting);
      setInProgressPatients(inProgress);
    }
  };
  
  // Lấy thông tin bác sĩ được chỉ định cho bệnh nhân
  const getAssignedDoctor = (doctorId?: string) => {
    if (!doctorId) return null;
    return doctors.find(doctor => doctor._id === doctorId) || null;
  };

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
        <h1 className="text-3xl font-bold text-black tracking-tight">Quản lý phòng chờ</h1>
        <p className="text-black mt-2">
          Quản lý danh sách bệnh nhân đang chờ khám và theo dõi trạng thái
        </p>
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
          
          {waitingPatients.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {waitingPatients.map((queue, index) => (
                <div key={queue._id} className={`p-5 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-black text-base">
                        {queue.patientInfo?.fullName || 'Không có tên'}
                      </h3>
                      <p className="text-sm text-black mt-1">
                        ID: {queue.patientInfo?.userId || 'N/A'}
                      </p>
                      <p className="text-sm text-black mt-1">
                        SĐT: {queue.patientInfo?.phone || 'N/A'}
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
                      className="flex items-center text-sm bg-green-600 hover:bg-green-700 text-white px-3.5 py-1.5 rounded-md transition-colors shadow-sm"
                    >
                      Chuyển vào khám
                      <MoveRightIcon size={16} className="ml-1.5" />
                    </button>
                  </div>
                </div>
              ))}
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
          
          {inProgressPatients.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {inProgressPatients.map((queue, index) => {
                const assignedDoctor = getAssignedDoctor(queue.doctorId);
                return (
                  <div key={queue._id} className={`p-5 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-black text-base">
                          {queue.patientInfo?.fullName || 'Không có tên'}
                        </h3>
                        <p className="text-sm text-black mt-1">
                          ID: {queue.patientInfo?.userId || 'N/A'}
                        </p>
                        <p className="text-sm text-black mt-1">
                          SĐT: {queue.patientInfo?.phone || 'N/A'}
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
                          {assignedDoctor ? assignedDoctor.fullName : 'Chưa chỉ định'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-black uppercase tracking-wide">Phòng khám</p>
                        <p className="text-sm font-medium text-black mt-1">
                          {assignedDoctor ? `Phòng ${100 + parseInt(assignedDoctor._id.slice(-2), 16) % 10}` : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button 
                        onClick={() => handleCompleteExamination(queue._id)}
                        className="flex items-center text-sm bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-md transition-colors shadow-sm"
                      >
                        Hoàn thành khám
                        <CheckCircleIcon size={16} className="ml-1.5" />
                      </button>
                    </div>
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
            
            {doctors.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-auto">
                {doctors.map((doctor) => (
                  <div 
                    key={doctor._id}
                    onClick={() => handleConfirmMoveToExamination(doctor._id)}
                    className="p-3 border border-gray-300 rounded-md hover:bg-blue-50 cursor-pointer transition-colors flex justify-between items-center"
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