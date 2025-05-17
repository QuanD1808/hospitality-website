import React, { useState } from 'react';
import { SearchIcon, CalendarIcon, FilterIcon, PillIcon } from 'lucide-react';
export function MedicationHistory() {
  const [dateRange, setDateRange] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  // Mock medication data
  const [medications] = useState([{
    id: 1,
    name: 'Nguyễn Văn A',
    nationalId: '001201012345',
    date: '15/05/2023',
    doctor: 'Bs. Nguyễn Văn X',
    diagnosis: 'Viêm họng',
    medications: [{
      name: 'Paracetamol',
      dosage: '500mg',
      frequency: '3 lần/ngày',
      duration: '5 ngày'
    }, {
      name: 'Strepsils',
      dosage: '1 viên',
      frequency: '4 lần/ngày',
      duration: '5 ngày'
    }]
  }, {
    id: 2,
    name: 'Trần Thị B',
    nationalId: '001201054321',
    date: '15/05/2023',
    doctor: 'Bs. Trần Thị Y',
    diagnosis: 'Cảm cúm',
    medications: [{
      name: 'Panadol',
      dosage: '500mg',
      frequency: '3 lần/ngày',
      duration: '3 ngày'
    }, {
      name: 'Vitamin C',
      dosage: '1000mg',
      frequency: '1 lần/ngày',
      duration: '7 ngày'
    }]
  }, {
    id: 3,
    name: 'Lê Văn C',
    nationalId: '001201098765',
    date: '14/05/2023',
    doctor: 'Bs. Nguyễn Văn X',
    diagnosis: 'Đau lưng',
    medications: [{
      name: 'Ibuprofen',
      dosage: '400mg',
      frequency: '2 lần/ngày',
      duration: '7 ngày'
    }, {
      name: 'Myonal',
      dosage: '50mg',
      frequency: '3 lần/ngày',
      duration: '5 ngày'
    }]
  }]);
  const filteredMedications = medications.filter(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()) || med.nationalId.includes(searchTerm));
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lịch sử thuốc</h1>
        <p className="text-gray-600">Xem lịch sử thuốc đã kê cho bệnh nhân</p>
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
        {filteredMedications.length > 0 ? <div className="space-y-6">
            {filteredMedications.map(record => <div key={record.id} className="border rounded-lg overflow-hidden">
                <div className="bg-blue-50 p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {record.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      CCCD: {record.nationalId}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Ngày khám</p>
                      <p className="text-sm font-medium">{record.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Bác sĩ</p>
                      <p className="text-sm font-medium">{record.doctor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Chẩn đoán</p>
                      <p className="text-sm font-medium">{record.diagnosis}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                    <PillIcon size={18} className="mr-2 text-blue-600" />
                    Danh sách thuốc
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tên thuốc
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Liều lượng
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tần suất
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thời gian dùng
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {record.medications.map((med, index) => <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {med.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {med.dosage}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {med.frequency}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {med.duration}
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>)}
          </div> : <div className="text-center py-12">
            <PillIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-500">
              Không tìm thấy dữ liệu
            </h3>
            <p className="text-gray-400 mt-1">
              Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc
            </p>
          </div>}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Hiển thị {filteredMedications.length} kết quả
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
    </div>;
}