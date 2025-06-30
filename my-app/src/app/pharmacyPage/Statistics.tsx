import React, { useState, useEffect } from 'react';
import { CalendarIcon, SearchIcon, ChevronDownIcon } from 'lucide-react';
import { InvoiceDetailModal } from './InvoiceDetailModal';
import { 
  PharmacyPatient, 
  PharmacyInvoice, 
  getPharmacyInvoices, 
  getDailyRevenue,
  getYearlyRevenue,
  getPatientsWithPendingPrescriptions
} from './pharmacyUtils';
import { initializeData } from '../datats/mockPatients';

export const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('day');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('2025-06-29');
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedInvoice, setSelectedInvoice] = useState<{invoice: PharmacyInvoice, patient: PharmacyPatient | undefined} | null>(null);
  const [revenueData, setRevenueData] = useState<Array<{date: string, amount: number}>>([]);
  const [yearlyRevenueData, setYearlyRevenueData] = useState<Array<{year: string, amount: number}>>([]);
  const [invoicesData, setInvoicesData] = useState<PharmacyInvoice[]>([]);
  const [patients, setPatients] = useState<PharmacyPatient[]>([]);
  
  // Tải dữ liệu doanh thu và hóa đơn từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Khởi tạo dữ liệu từ API trước
        await initializeData();
        
        // Sau đó lấy dữ liệu thống kê, hóa đơn, và danh sách bệnh nhân
        const [dailyRevenue, yearlyRevenue, invoices, patientsList] = await Promise.all([
          getDailyRevenue(),
          getYearlyRevenue(),
          getPharmacyInvoices(),
          getPatientsWithPendingPrescriptions()
        ]);
        
        setRevenueData(dailyRevenue);
        setYearlyRevenueData(yearlyRevenue);
        setInvoicesData(invoices);
        setPatients(patientsList);
        
        // Mặc định chọn ngày hôm nay nếu có dữ liệu
        if (dailyRevenue && dailyRevenue.length > 0) {
          // Lấy ngày đầu tiên trong danh sách doanh thu (thường là ngày gần nhất)
          setSelectedDate(dailyRevenue[0].date);
        }
        
        // Mặc định chọn năm hiện tại
        setSelectedYear(new Date().getFullYear().toString());
      } catch (error) {
        console.error("Error fetching statistics data:", error);
      }
    };
    
    fetchData();
  }, []);
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };
  
  const getTotalRevenue = (): number => {
    if (selectedPeriod === 'day') {
      return revenueData.find(item => item.date === selectedDate)?.amount || 0;
    } else if (selectedPeriod === 'year') {
      return yearlyRevenueData.find(item => item.year === selectedYear)?.amount || 0;
    }
    return 0;
  };
  
  const getInvoicesForDate = (): PharmacyInvoice[] => {
    if (selectedPeriod === 'day') {
      return invoicesData.filter(invoice => {
        // Lấy phần ngày từ định dạng ISO
        const invoiceDate = new Date(invoice.date).toISOString().split('T')[0];
        return invoiceDate === selectedDate;
      });
    } else if (selectedPeriod === 'year') {
      return invoicesData.filter(invoice => {
        // Lấy năm từ định dạng ISO
        const invoiceYear = new Date(invoice.date).getFullYear().toString();
        return invoiceYear === selectedYear;
      });
    }
    return [];
  };
  
  const getPatientById = (id: string): PharmacyPatient | undefined => {
    return patients.find(patient => patient.id === id);
  };
  
  // Render thống kê doanh thu và danh sách hóa đơn
  return (
    <div className="space-y-6">
      {/* Bảng thống kê */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-4 py-3">
          <h2 className="text-lg font-medium text-white">
            Xem Thống Kê Doanh Thu
          </h2>
        </div>
        <div className="p-6">
          {/* Bộ lọc và công cụ */}
          <div className="flex flex-wrap items-center gap-5 mb-6">
            {/* Chọn kiểu thống kê */}
            <div className="flex-grow">
              <label className="block text-sm font-medium text-black mb-2">
                Thống kê theo
              </label>
              <div className="flex">
                <button
                  onClick={() => setSelectedPeriod('day')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    selectedPeriod === 'day'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Ngày
                </button>
                <button
                  onClick={() => setSelectedPeriod('year')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    selectedPeriod === 'year'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Năm
                </button>
              </div>
            </div>
            
            {/* Chọn ngày hoặc năm */}
            {selectedPeriod === 'day' ? (
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-black mb-2">
                  Chọn ngày
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon size={18} className="text-black" />
                  </div>
                  <input 
                    type="date" 
                    id="date" 
                    value={selectedDate} 
                    onChange={e => setSelectedDate(e.target.value)} 
                    className="pl-10 pr-4 py-2.5 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-black focus:border-black text-black border" 
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-black mb-2">
                  Chọn năm
                </label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={e => setSelectedYear(e.target.value)}
                  className="pl-3 pr-10 py-2.5 block w-44 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-black focus:border-black text-black border"
                >
                  {yearlyRevenueData.map(item => (
                    <option key={item.year} value={item.year}>
                      {item.year}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="flex-grow"></div>
            
            {/* Nút xem chi tiết */}
            <div className="flex items-end">
              <button 
                onClick={() => setShowDetails(!showDetails)} 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <SearchIcon className="h-4 w-4 mr-1" /> 
                {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
              </button>
            </div>
          </div>
          
          {/* Hiển thị tổng doanh thu */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              Tổng doanh thu
            </h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-blue-600">
                {getTotalRevenue().toLocaleString('vi-VN')} đ
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {selectedPeriod === 'day' 
                  ? `Ngày ${formatDate(selectedDate)}` 
                  : `Năm ${selectedYear}`
                }
              </span>
            </div>
          </div>
          
          {/* Bảng chi tiết hóa đơn */}
          {showDetails && (
            <div>
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
                      // Lấy thông tin bệnh nhân từ ID
                      const patient = getPatientById(invoice.patientId);
                      
                      return (
                        <tr key={invoice.id}>
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
                            <button 
                              onClick={() => setSelectedInvoice({ invoice, patient })} 
                              className="text-blue-600 hover:text-blue-800"
                              disabled={!patient}
                            >
                              Xem chi tiết
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    
                    {/* Hiển thị khi không có hóa đơn */}
                    {getInvoicesForDate().length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {selectedPeriod === 'day' 
                            ? 'Không có hóa đơn nào cho ngày đã chọn.' 
                            : 'Không có hóa đơn nào cho năm đã chọn.'
                          }
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Hiển thị modal chi tiết hóa đơn khi được chọn */}
      {selectedInvoice && selectedInvoice.patient && (
        <InvoiceDetailModal 
          invoice={selectedInvoice.invoice} 
          patient={selectedInvoice.patient} 
          onClose={() => setSelectedInvoice(null)} 
        />
      )}
    </div>
  );
};