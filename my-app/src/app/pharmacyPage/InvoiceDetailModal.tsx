import React, { useState, useEffect } from 'react';
import { XIcon, FileTextIcon, PrinterIcon, Coins, DollarSign, CalendarRange, BarChart2, Calendar, AlertTriangle } from 'lucide-react';
import { PharmacyPatient, PharmacyMedicine, PharmacyInvoice } from './pharmacyUtils';
import { calculatePrescriptionRevenue, calculateRevenue } from '../services/api.service';
import { useAuth } from '../context/AuthContext';

interface InvoiceDetailModalProps {
  invoice: PharmacyInvoice;
  patient: PharmacyPatient;
  onClose: () => void;
}

export const InvoiceDetailModal = ({
  invoice,
  patient,
  onClose
}: InvoiceDetailModalProps) => {
  const { token } = useAuth();
  const [revenueData, setRevenueData] = useState<any>(null);
  const [isLoadingRevenue, setIsLoadingRevenue] = useState(false);
  const [showRevenueStats, setShowRevenueStats] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'year'>('day');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [customRevenueData, setCustomRevenueData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Lấy doanh thu từ API khi component được mount
  useEffect(() => {
    const fetchRevenueData = async () => {
      if (!token || !patient.id) {
        console.log("Missing token or patient ID, cannot fetch revenue data");
        return;
      }
      
      setIsLoadingRevenue(true);
      try {
        console.log(`Fetching revenue data for prescription ID: ${patient.id}`);
        // Gọi API để tính doanh thu từ đơn thuốc này
        const data = await calculatePrescriptionRevenue(patient.id, token);
        console.log("Revenue data from API:", data);
        
        if (data && data.totalAmount !== undefined) {
          setRevenueData(data);
          console.log(`Total revenue for this prescription: ${data.totalAmount.toLocaleString('vi-VN')} đ`);
          
          if (data.monthlyRevenue) {
            console.log(`Monthly revenue: ${data.monthlyRevenue.toLocaleString('vi-VN')} đ`);
          }
          
          if (data.yearlyRevenue) {
            console.log(`Yearly revenue: ${data.yearlyRevenue.toLocaleString('vi-VN')} đ`);
          }
        } else {
          console.warn("Revenue data is incomplete or undefined");
        }
      } catch (err: any) {
        console.error("Error fetching revenue data:", err);
        console.error("Error details:", err.response?.data || err.message);
      } finally {
        setIsLoadingRevenue(false);
      }
    };
    
    fetchRevenueData();
  }, [patient.id, token]);
  
  // Lấy doanh thu theo ngày hoặc năm được chọn
  
  const fetchCustomRevenueData = async () => {
    if (!token) {
      console.log("Missing token, cannot fetch custom revenue data");
      setErrorMessage("Không có quyền truy cập, vui lòng đăng nhập lại");
      return;
    }
    
    setIsLoadingRevenue(true);
    setErrorMessage(null); // Clear any previous errors
    
    try {
      console.log(`Fetching ${selectedPeriod === 'day' ? 'daily' : 'yearly'} revenue data`);
      
      let startDate, endDate;
      if (selectedPeriod === 'day') {
        startDate = selectedDate;
        endDate = selectedDate;
      } else {
        startDate = `${selectedYear}-01-01`;
        endDate = `${selectedYear}-12-31`;
      }
      
      // Gọi API để tính doanh thu theo ngày hoặc năm
      const data = await calculateRevenue(token, startDate, endDate);
      
      if (!data) {
        throw new Error("Không nhận được phản hồi từ máy chủ");
      }
      
      console.log(`Custom revenue data for ${selectedPeriod}:`, data);
      
      if (data.totalAmount !== undefined) {
        setCustomRevenueData(data);
        // Nếu không có dữ liệu chi tiết thuốc, hiển thị thông báo
        if (!data.medicineDetails || data.medicineDetails.length === 0) {
          console.warn("No medicine details in revenue data");
          setErrorMessage(`Không có chi tiết thuốc nào trong doanh thu ${selectedPeriod === 'day' ? 'ngày' : 'năm'} này`);
        }
      } else {
        console.warn("Custom revenue data is incomplete");
        setCustomRevenueData({
          totalAmount: 0,
          medicineDetails: [],
          message: "Không có dữ liệu doanh thu"
        });
        setErrorMessage(`Không tìm thấy dữ liệu doanh thu cho ${selectedPeriod === 'day' ? 'ngày' : 'năm'} đã chọn`);
      }
    } catch (err: any) {
      console.error(`Error fetching ${selectedPeriod} revenue data:`, err);
      console.error("Error details:", err.response?.data || err.message);
      
      setCustomRevenueData(null);
      
      // Hiển thị thông báo lỗi chi tiết hơn và thân thiện với người dùng
      if (err.response?.status === 404) {
        setErrorMessage(`Không tìm thấy dữ liệu doanh thu cho ${selectedPeriod === 'day' ? 'ngày' : 'năm'} đã chọn`);
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        setErrorMessage("Bạn không có quyền truy cập dữ liệu này. Vui lòng đăng nhập lại.");
      } else if (err.response?.status >= 500) {
        setErrorMessage("Máy chủ gặp sự cố. Vui lòng thử lại sau.");
      } else {
        setErrorMessage(
          err.response?.data?.message || 
          err.message || 
          "[API Error] Không nhận được phản hồi từ máy chủ"
        );
      }
    } finally {
      setIsLoadingRevenue(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gray-50 border-b border-gray-300">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-black flex items-center">
              <FileTextIcon size={20} className="mr-2 text-black" />
              Chi Tiết Hóa Đơn #{invoice.id}
            </h2>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-full hover:bg-gray-200 text-black transition-colors"
            >
              <XIcon size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-black">
                PHÒNG KHÁM ĐA KHOA
              </h3>
              <p className="text-black mt-1">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
              <p className="text-black">Điện thoại: (028) 3822 1234</p>
              <div className="mt-4 border-t border-gray-300 pt-4">
                <h2 className="text-xl font-bold text-black">HÓA ĐƠN THUỐC</h2>
                <p className="text-black mt-1">
                  Ngày: {new Date(invoice.date).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm font-medium text-black mb-1">Họ và tên bệnh nhân</p>
                <p className="text-black">{patient.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-black mb-1">Số điện thoại</p>
                <p className="text-black">{patient.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-black mb-1">Mã đơn thuốc</p>
                <p className="text-black">{patient.serialNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-black mb-1">Chẩn đoán</p>
                <p className="text-black">{patient.diagnosis}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-black mb-1">Bác sĩ kê đơn</p>
                <p className="text-black">{patient.doctor}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-black mb-1">Nhân viên phát thuốc</p>
                <p className="text-black">{invoice.pharmacistName}</p>
              </div>
            </div>
            
            <div className="overflow-x-auto mb-6 border border-gray-300 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                      STT
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                      Tên thuốc
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                      Số lượng
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                      Liều dùng
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                      Đơn giá
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patient.prescription.map((medicine: PharmacyMedicine, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {medicine.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {medicine.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {medicine.dosage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {medicine.price.toLocaleString('vi-VN')} đ
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {(medicine.price * medicine.quantity).toLocaleString('vi-VN')} đ
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100">
                    <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-right border-t border-gray-400">
                      <div className="flex items-center justify-end">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>Tổng cộng:</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black border-t border-gray-400">
                      {revenueData?.totalAmount ? 
                        revenueData.totalAmount.toLocaleString('vi-VN') : 
                        invoice.totalAmount.toLocaleString('vi-VN')} đ
                    </td>
                  </tr>
                  {revenueData?.monthlyRevenue && showRevenueStats && (
                    <tr className="bg-blue-50">
                      <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800 text-right">
                        <div className="flex items-center justify-end">
                          <CalendarRange className="w-4 h-4 mr-1" />
                          <span>Doanh thu tháng này:</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">
                        {revenueData.monthlyRevenue.toLocaleString('vi-VN')} đ
                      </td>
                    </tr>
                  )}
                  {revenueData?.yearlyRevenue && showRevenueStats && (
                    <tr className="bg-green-50">
                      <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-800 text-right">
                        <div className="flex items-center justify-end">
                          <Coins className="w-4 h-4 mr-1" />
                          <span>Doanh thu năm nay:</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-800">
                        {revenueData.yearlyRevenue.toLocaleString('vi-VN')} đ
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {isLoadingRevenue && (
              <div className="mb-6 p-4 border border-blue-100 rounded-lg bg-blue-50">
                <div className="flex items-center justify-center">
                  <span className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></span>
                  <p className="text-blue-600">Đang tính toán doanh thu...</p>
                </div>
              </div>
            )}
            
            {errorMessage && (
              <div className="mb-6 p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Lỗi khi tải dữ liệu</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {revenueData && showRevenueStats && (
              <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-blue-600 px-4 py-3">
                  <h2 className="text-lg font-medium text-white flex items-center">
                    <Coins className="h-5 w-5 mr-1" /> Thống Kê Doanh Thu
                  </h2>
                </div>
                <div className="p-4">
                  {/* Bộ chọn thông kê theo */}
                  <div className="flex flex-wrap items-center gap-5 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
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
                            <Calendar size={18} className="text-black" />
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
                          {[0, 1, 2, 3, 4].map(i => {
                            const year = (new Date().getFullYear() - i).toString();
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                    
                    <div className="flex items-end">
                      <button 
                        onClick={fetchCustomRevenueData} 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isLoadingRevenue}
                      >
                        {isLoadingRevenue ? (
                          <>
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                            Đang tải...
                          </>
                        ) : (
                          <>
                            <BarChart2 className="h-4 w-4 mr-1" /> 
                            Xem thống kê
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Tổng doanh thu của đơn thuốc hiện tại */}
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-medium text-blue-800 mb-2">
                      Tổng doanh thu từ đơn thuốc này
                    </h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-blue-600">
                        {revenueData.totalAmount?.toLocaleString('vi-VN') || '0'} đ
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(invoice.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>

                  {/* Tổng doanh thu theo ngày hoặc năm được chọn */}
                  {customRevenueData && (
                    <div className="bg-green-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-medium text-green-800 mb-2">
                        Doanh thu {selectedPeriod === 'day' ? 'ngày' : 'năm'} đã chọn
                      </h3>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-green-600">
                          {customRevenueData.totalAmount?.toLocaleString('vi-VN') || '0'} đ
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          {selectedPeriod === 'day' 
                            ? new Date(selectedDate).toLocaleDateString('vi-VN')
                            : `Năm ${selectedYear}`
                          }
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Thống kê tháng và năm */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {revenueData.monthlyRevenue !== undefined && (
                      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center mb-2 text-blue-800">
                          <CalendarRange className="h-5 w-5 mr-2" />
                          <h4 className="font-medium">Doanh thu tháng này</h4>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{revenueData.monthlyRevenue?.toLocaleString('vi-VN') || '0'} đ</p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <span>Tháng {new Date().getMonth() + 1}/{new Date().getFullYear()}</span>
                        </div>
                      </div>
                    )}
                    
                    {revenueData.yearlyRevenue !== undefined && (
                      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center mb-2 text-green-800">
                          <BarChart2 className="h-5 w-5 mr-2" />
                          <h4 className="font-medium">Doanh thu năm nay</h4>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{revenueData.yearlyRevenue?.toLocaleString('vi-VN') || '0'} đ</p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <span>Năm {new Date().getFullYear()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Chi tiết các loại thuốc đóng góp vào doanh thu */}
                  {revenueData.medicines && revenueData.medicines.length > 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h4 className="font-medium text-gray-700">Chi tiết đơn thuốc này</h4>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {revenueData.medicines.map((med: any, idx: number) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-200 flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-700">{med.name}</p>
                                <p className="text-xs text-gray-500">{med.quantity} x {med.price?.toLocaleString('vi-VN')}đ</p>
                              </div>
                              <span className="font-medium text-green-600">{med.total?.toLocaleString('vi-VN')}đ</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Chi tiết medicines từ custom revenue data nếu có */}
                  {customRevenueData && customRevenueData.medicineDetails && customRevenueData.medicineDetails.length > 0 && (
                    <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h4 className="font-medium text-gray-700">
                          Chi tiết thuốc {selectedPeriod === 'day' ? 'trong ngày' : 'trong năm'} đã chọn
                        </h4>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {customRevenueData.medicineDetails.map((med: any, idx: number) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-200 flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-700">{med.name}</p>
                                <p className="text-xs text-gray-500">{med.quantity} x {med.price?.toLocaleString('vi-VN')}đ</p>
                              </div>
                              <span className="font-medium text-green-600">{med.subtotal?.toLocaleString('vi-VN')}đ</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-6">
              {revenueData ? (
                <button
                  onClick={() => setShowRevenueStats(!showRevenueStats)}
                  className={`px-5 py-2.5 ${showRevenueStats ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg flex items-center transition-colors shadow-sm font-medium border ${showRevenueStats ? 'border-gray-700' : 'border-blue-700'}`}
                >
                  <BarChart2 size={18} className="mr-2" />
                  {showRevenueStats ? 'Ẩn thống kê doanh thu' : 'Xem thống kê doanh thu'}
                </button>
              ) : (
                <div></div>
              )}
              
              <button className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center transition-colors shadow-sm font-medium border border-green-700">
                <PrinterIcon size={18} className="mr-2" />
                In hóa đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
