import React, { useState } from 'react';
import { MoveRightIcon, CheckCircleIcon, ClockIcon, SearchIcon, PlusCircleIcon, UserIcon, UserPlusIcon } from 'lucide-react';

export function QueueManagement() {
  // Mock waiting room data
  const [waitingPatients] = useState([{
    id: 1,
    name: 'Nguyễn Thị B',
    nationalId: '001201054321',
    queueNumber: 5,
    waitTime: '25 phút',
    status: 'waiting'
  }, {
    id: 2,
    name: 'Trần Văn C',
    nationalId: '001201098765',
    queueNumber: 6,
    waitTime: '18 phút',
    status: 'waiting'
  }, {
    id: 3,
    name: 'Lê Thị D',
    nationalId: '001201087654',
    queueNumber: 7,
    waitTime: '10 phút',
    status: 'waiting'
  }, {
    id: 4,
    name: 'Phạm Văn E',
    nationalId: '001201076543',
    queueNumber: 8,
    waitTime: '5 phút',
    status: 'waiting'
  }]);
  
  // Mock in examination data
  const [inExaminationPatients] = useState([{
    id: 5,
    name: 'Hoàng Văn F',
    nationalId: '001201065432',
    queueNumber: 3,
    doctor: 'Bs. Nguyễn Văn X',
    room: 'Phòng 101'
  }, {
    id: 6,
    name: 'Đỗ Thị G',
    nationalId: '001201054321',
    queueNumber: 4,
    doctor: 'Bs. Trần Thị Y',
    room: 'Phòng 102'
  }]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="w-full px-4 sm:px-6">
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
              {waitingPatients.map((patient, index) => (
                <div key={patient.id} className={`p-5 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-black text-base">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-black mt-1">
                        CCCD: {patient.nationalId}
                      </p>
                    </div>
                    <div className="bg-gray-200 border border-gray-300 text-black px-3 py-1 rounded-full text-sm font-medium">
                      STT: {patient.queueNumber}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-black flex items-center">
                      <ClockIcon size={16} className="mr-1.5 text-black" />
                      Thời gian chờ: <span className="font-medium ml-1">{patient.waitTime}</span>
                    </span>
                    <button className="flex items-center text-sm bg-green-600 hover:bg-green-700 text-white px-3.5 py-1.5 rounded-md transition-colors shadow-sm">
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
              <p className="text-sm text-black mt-1">Thêm bệnh nhân vào danh sách chờ bên dưới</p>
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
              {inExaminationPatients.length} bệnh nhân
            </span>
          </div>
          
          {inExaminationPatients.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {inExaminationPatients.map((patient, index) => (
                <div key={patient.id} className={`p-5 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-black text-base">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-black mt-1">
                        CCCD: {patient.nationalId}
                      </p>
                    </div>
                    <div className="bg-gray-200 border border-gray-300 text-black px-3 py-1 rounded-full text-sm font-medium">
                      STT: {patient.queueNumber}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="text-xs font-medium text-black uppercase tracking-wide">Bác sĩ khám</p>
                      <p className="text-sm font-medium text-black mt-1">{patient.doctor}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-black uppercase tracking-wide">Phòng khám</p>
                      <p className="text-sm font-medium text-black mt-1">{patient.room}</p>
                    </div>
                  </div>
                </div>
              ))}
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
      
      {/* Add patient form */}
      <div className="mt-8 border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white">
        <div className="p-4 border-b border-gray-300 bg-gray-50">
          <h2 className="text-lg font-semibold text-black flex items-center">
            <PlusCircleIcon size={20} className="mr-2 text-black" />
            Thêm bệnh nhân vào phòng chờ
          </h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-black mb-2" htmlFor="patientSearch">
                Tìm kiếm bệnh nhân
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-black" />
                </div>
                <input 
                  type="text" 
                  id="patientSearch" 
                  placeholder="Nhập tên hoặc CCCD..." 
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black placeholder-gray-500 shadow-sm" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-40">
              <label className="block text-sm font-medium text-black mb-2" htmlFor="queueNumber">
                Số thứ tự
              </label>
              <input 
                type="number" 
                id="queueNumber" 
                min="1" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm" 
                defaultValue="9" 
              />
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center justify-center">
                <UserPlusIcon size={18} className="mr-2" />
                Thêm vào phòng chờ
              </button>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-black mb-3">Kết quả tìm kiếm gần đây</h3>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm text-black">
              Nhập thông tin để tìm kiếm bệnh nhân
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}