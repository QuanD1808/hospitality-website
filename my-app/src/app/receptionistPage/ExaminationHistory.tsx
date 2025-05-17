import React, { useState } from 'react';
import { SearchIcon, CalendarIcon, FilterIcon, CheckIcon, XIcon } from 'lucide-react';
export function ExaminationHistory() {
  const [activeTab, setActiveTab] = useState('examined');
  const [dateRange, setDateRange] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  // Mock examination data
  const examinedPatients = [{
    id: 1,
    name: 'Nguyễn Văn A',
    nationalId: '001201012345',
    queueNumber: 1,
    time: '08:30',
    doctor: 'Bs. Nguyễn Văn X',
    diagnosis: 'Viêm họng',
    status: 'completed'
  }, {
    id: 2,
    name: 'Trần Thị B',
    nationalId: '001201054321',
    queueNumber: 2,
    time: '09:00',
    doctor: 'Bs. Trần Thị Y',
    diagnosis: 'Cảm cúm',
    status: 'completed'
  }, {
    id: 3,
    name: 'Lê Văn C',
    nationalId: '001201098765',
    queueNumber: 3,
    time: '09:30',
    doctor: 'Bs. Nguyễn Văn X',
    diagnosis: 'Đau lưng',
    status: 'completed'
  }, {
    id: 4,
    name: 'Phạm Thị D',
    nationalId: '001201087654',
    queueNumber: 4,
    time: '10:00',
    doctor: 'Bs. Trần Thị Y',
    diagnosis: 'Dị ứng',
    status: 'completed'
  }];
  const notExaminedPatients = [{
    id: 5,
    name: 'Hoàng Văn E',
    nationalId: '001201076543',
    queueNumber: 5,
    time: '-',
    status: 'waiting'
  }, {
    id: 6,
    name: 'Đỗ Thị F',
    nationalId: '001201065432',
    queueNumber: 6,
    time: '-',
    status: 'waiting'
  }, {
    id: 7,
    name: 'Vũ Văn G',
    nationalId: '001201054321',
    queueNumber: 7,
    time: '-',
    status: 'waiting'
  }];
  const patients = activeTab === 'examined' ? examinedPatients : notExaminedPatients;
  const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.nationalId.includes(searchTerm));
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lịch sử khám bệnh</h1>
        <p className="text-gray-600">
          Xem lịch sử khám bệnh của tất cả bệnh nhân
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex" aria-label="Tabs">
            <button onClick={() => setActiveTab('examined')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'examined' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <CheckIcon size={16} className="inline mr-2" />
              Đã khám ({examinedPatients.length})
            </button>
            <button onClick={() => setActiveTab('not-examined')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'not-examined' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <XIcon size={16} className="inline mr-2" />
              Chưa khám ({notExaminedPatients.length})
            </button>
          </nav>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-gray-400" />
              </div>
              <input type="text" placeholder="Tìm kiếm theo tên hoặc CCCD..." className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select className="appearance-none border rounded-md pl-10 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={dateRange} onChange={e => setDateRange(e.target.value)}>
                  <option value="today">Hôm nay</option>
                  <option value="yesterday">Hôm qua</option>
                  <option value="week">Tuần này</option>
                  <option value="month">Tháng này</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon size={18} className="text-gray-400" />
                </div>
              </div>
              <button className="flex items-center border rounded-md px-4 py-2 hover:bg-gray-50">
                <FilterIcon size={18} className="mr-2 text-gray-500" />
                Lọc
              </button>
            </div>
          </div>
          {filteredPatients.length > 0 ? <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Họ và tên
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CCCD
                    </th>
                    {activeTab === 'examined' && <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thời gian
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bác sĩ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chẩn đoán
                        </th>
                      </>}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPatients.map(patient => <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {patient.queueNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.nationalId}
                      </td>
                      {activeTab === 'examined' && <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {patient.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {patient.doctor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {patient.diagnosis}
                          </td>
                        </>}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {patient.status === 'completed' ? <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Đã khám
                          </span> : <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Chờ khám
                          </span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                          Chi tiết
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div> : <div className="text-center py-12">
              <p className="text-gray-500">Không có dữ liệu</p>
            </div>}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Hiển thị {filteredPatients.length} kết quả
            </p>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                Trước
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
                1
              </button>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}