import React, { useState } from 'react';
import { CalendarIcon, SearchIcon, ChevronDownIcon } from 'lucide-react';
import { dailyRevenue, invoices, patients } from '../datats/mockData';
import { InvoiceDetailModal } from './InvoiceDetailModal';
export const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2023-06-15');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };
  const getTotalRevenue = () => {
    return dailyRevenue.find(item => item.date === selectedDate)?.amount || 0;
  };
  const getInvoicesForDate = () => {
    return invoices.filter(invoice => invoice.date === selectedDate);
  };
  const getPatientById = id => {
    return patients.find(patient => patient.id === id);
  };
  const calculateInvoiceTotal = patientId => {
    const patient = getPatientById(patientId);
    if (!patient) return 0;
    return patient.prescription.reduce((total, med) => {
      return total + med.price * med.quantity;
    }, 0);
  };
  return <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-4 py-3">
          <h2 className="text-lg font-medium text-white">
            Xem Thống Kê Doanh Thu
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div>
              <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
                Thời gian
              </label>
              <div className="relative">
                <select id="period" value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border">
                  <option value="day">Ngày</option>
                  <option value="month">Tháng</option>
                  <option value="year">Năm</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Chọn ngày
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="date" id="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border py-2" />
              </div>
            </div>
            <div className="flex-grow"></div>
            <div className="flex items-end">
              <button onClick={() => setShowDetails(!showDetails)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <SearchIcon className="h-4 w-4 mr-1" /> Xem chi tiết
              </button>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              Tổng doanh thu
            </h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-blue-600">
                {getTotalRevenue().toLocaleString('vi-VN')} đ
              </span>
              <span className="ml-2 text-sm text-gray-500">
                Ngày {formatDate(selectedDate)}
              </span>
            </div>
          </div>
          {showDetails && <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Chi tiết hóa đơn
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã hóa đơn
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên bệnh nhân
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nhân viên phát thuốc
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tổng tiền
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getInvoicesForDate().map(invoice => {
                  const patient = getPatientById(invoice.patientId);
                  return <tr key={invoice.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            #{invoice.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {patient?.fullName || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {invoice.pharmacistName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {invoice.totalAmount.toLocaleString('vi-VN')} đ
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <button onClick={() => setSelectedInvoice({
                        invoice,
                        patient
                      })} className="text-blue-600 hover:text-blue-800">
                              Xem chi tiết
                            </button>
                          </td>
                        </tr>;
                })}
                    {getInvoicesForDate().length === 0 && <tr>
                        <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          Không có hóa đơn nào cho ngày đã chọn.
                        </td>
                      </tr>}
                  </tbody>
                </table>
              </div>
            </div>}
        </div>
      </div>
      {selectedInvoice && <InvoiceDetailModal invoice={selectedInvoice.invoice} patient={selectedInvoice.patient} onClose={() => setSelectedInvoice(null)} />}
    </div>;
};