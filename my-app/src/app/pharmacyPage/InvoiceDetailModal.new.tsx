import React, { useState, useEffect } from 'react';
import { XIcon, FileTextIcon, PrinterIcon, Coins, DollarSign, CalendarRange, BarChart2 } from 'lucide-react';
import { PharmacyPatient, PharmacyMedicine, PharmacyInvoice } from './pharmacyUtils';
import { calculatePrescriptionRevenue } from '../services/api.service';
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
            
            {revenueData && showRevenueStats && (
              <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                  <Coins className="h-5 w-5 mr-1" /> Thông tin doanh thu chi tiết
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded border border-blue-100">
                    <p className="text-sm text-blue-800">Doanh thu từ đơn thuốc này:</p>
                    <p className="text-lg font-bold text-blue-900">{revenueData.totalAmount?.toLocaleString('vi-VN') || '0'} đ</p>
                  </div>
                  {revenueData.monthlyRevenue !== undefined && (
                    <div className="bg-white p-3 rounded border border-blue-100">
                      <p className="text-sm text-blue-800">Doanh thu trong tháng:</p>
                      <p className="text-lg font-bold text-blue-900">{revenueData.monthlyRevenue?.toLocaleString('vi-VN') || '0'} đ</p>
                    </div>
                  )}
                  {revenueData.yearlyRevenue !== undefined && (
                    <div className="bg-white p-3 rounded border border-blue-100">
                      <p className="text-sm text-blue-800">Doanh thu trong năm:</p>
                      <p className="text-lg font-bold text-blue-900">{revenueData.yearlyRevenue?.toLocaleString('vi-VN') || '0'} đ</p>
                    </div>
                  )}
                </div>
                
                {/* Chi tiết các loại thuốc đóng góp vào doanh thu */}
                {revenueData.medicines && revenueData.medicines.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-sm font-medium text-blue-800 mb-2">Phân tích chi tiết:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {revenueData.medicines.map((med: any, idx: number) => (
                        <div key={idx} className="text-xs bg-white p-2 rounded border border-blue-100 flex justify-between">
                          <span className="text-gray-700">{med.name} <span className="text-gray-500">({med.quantity} x {med.price?.toLocaleString('vi-VN')}đ)</span></span>
                          <span className="font-medium text-blue-700">{med.total?.toLocaleString('vi-VN')}đ</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-between mt-6">
              {revenueData ? (
                <button
                  onClick={() => setShowRevenueStats(!showRevenueStats)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors shadow-sm font-medium border border-blue-700"
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
