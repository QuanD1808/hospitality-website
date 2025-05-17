import React, { useState } from 'react';
import { MoveRightIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
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
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý phòng chờ</h1>
        <p className="text-gray-600">
          Quản lý danh sách bệnh nhân đang chờ khám
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-blue-50 flex justify-between items-center">
            <div className="flex items-center">
              <ClockIcon size={20} className="text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">
                Bệnh nhân đang chờ
              </h2>
            </div>
            <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
              {waitingPatients.length} bệnh nhân
            </span>
          </div>
          {waitingPatients.length > 0 ? <div className="divide-y divide-gray-200">
              {waitingPatients.map(patient => <div key={patient.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        CCCD: {patient.nationalId}
                      </p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      STT: {patient.queueNumber}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Thời gian chờ: {patient.waitTime}
                    </span>
                    <button className="flex items-center text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                      Chuyển vào khám
                      <MoveRightIcon size={16} className="ml-1" />
                    </button>
                  </div>
                </div>)}
            </div> : <div className="p-8 text-center">
              <ClockIcon size={40} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">Không có bệnh nhân nào đang chờ</p>
            </div>}
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-green-50 flex justify-between items-center">
            <div className="flex items-center">
              <CheckCircleIcon size={20} className="text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Đang khám</h2>
            </div>
            <span className="bg-green-600 text-white text-sm px-2 py-1 rounded-full">
              {inExaminationPatients.length} bệnh nhân
            </span>
          </div>
          {inExaminationPatients.length > 0 ? <div className="divide-y divide-gray-200">
              {inExaminationPatients.map(patient => <div key={patient.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        CCCD: {patient.nationalId}
                      </p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      STT: {patient.queueNumber}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Bác sĩ khám</p>
                      <p className="text-sm font-medium">{patient.doctor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phòng khám</p>
                      <p className="text-sm font-medium">{patient.room}</p>
                    </div>
                  </div>
                </div>)}
            </div> : <div className="p-8 text-center">
              <CheckCircleIcon size={40} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">Không có bệnh nhân nào đang khám</p>
            </div>}
        </div>
      </div>
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Thêm bệnh nhân vào phòng chờ
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="patientSearch">
              Tìm kiếm bệnh nhân
            </label>
            <input type="text" id="patientSearch" placeholder="Nhập tên hoặc CCCD..." className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="queueNumber">
              Số thứ tự
            </label>
            <input type="number" id="queueNumber" min="1" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="9" />
          </div>
          <div className="self-end">
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Thêm vào phòng chờ
            </button>
          </div>
        </div>
      </div>
    </div>;
}