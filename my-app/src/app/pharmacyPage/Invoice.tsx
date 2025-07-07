import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, PrinterIcon, AlertTriangle, Coins, DollarSign, CalendarRange } from 'lucide-react';
import { PharmacyPatient, PharmacyMedicine } from './pharmacyUtils';
import { calculatePrescriptionRevenue } from '../services/api.service';
import { useAuth } from '../context/AuthContext';

interface InvoiceProps {
  patient: PharmacyPatient;
  onClose: () => void;
  onComplete: () => void;
}

export const Invoice = ({
  patient,
  onClose,
  onComplete
}: InvoiceProps) => {
  const { token, user } = useAuth(); // Get both token and user from auth context
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revenueData, setRevenueData] = useState<any>(null);
  const [isLoadingRevenue, setIsLoadingRevenue] = useState(false);
  
  // Get the current user's name for the invoice
  const pharmacistName = user?.fullName || 'Chưa xác định';
  const currentDate = new Date().toLocaleDateString('vi-VN');
  
  // Tính tổng tiền từ dữ liệu trong client
  const calculateTotal = () => {
    return patient.prescription.reduce((total: number, med: PharmacyMedicine) => {
      return total + med.price * med.quantity;
    }, 0);
  };
  
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
  
  const handlePrint = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      console.log("Invoice: Starting print and complete process");
      
      // Trước khi hoàn tất, kiểm tra nếu chưa có dữ liệu doanh thu, thử lấy lại
      if (!revenueData && token) {
        console.log("Invoice: Fetching revenue data before completing...");
        try {
          const data = await calculatePrescriptionRevenue(patient.id, token);
          setRevenueData(data);
          console.log("Revenue data retrieved:", data);
        } catch (revError: any) {
          console.error("Could not retrieve revenue data:", revError);
          // Continue even if we can't get revenue data
        }
      }
      
      // Xác định tổng tiền từ API hoặc tính toán cục bộ
      const totalAmount = revenueData?.totalAmount || calculateTotal();
      
      // In ra thông tin cho biết chúng ta đang xử lý
      console.log("Invoice: Printing invoice for patient:", patient.fullName);
      console.log("Invoice: Patient ID:", patient.id);
      console.log("Invoice: Prescription ID:", patient.id); // In the pharmacy system, patient.id is actually the prescription ID
      console.log("Invoice: Total amount (from API):", revenueData?.totalAmount?.toLocaleString('vi-VN') || "Not available", "đ");
      console.log("Invoice: Total amount (calculated):", calculateTotal().toLocaleString('vi-VN'), "đ");
      console.log("Invoice: Medicines:", patient.prescription.length, "items");
      
      // Additional revenue information
      if (revenueData) {
        console.log("Invoice: Monthly revenue:", revenueData.monthlyRevenue?.toLocaleString('vi-VN') || "N/A", "đ");
        console.log("Invoice: Yearly revenue:", revenueData.yearlyRevenue?.toLocaleString('vi-VN') || "N/A", "đ");
      }
      
      // Hiển thị thông tin chi tiết về mỗi loại thuốc
      patient.prescription.forEach((med, index) => {
        const apiMedicineData = revenueData?.medicines?.find((m: any) => m.name === med.name);
        
        console.log(`Invoice: Medicine ${index + 1}:`, {
          name: med.name,
          quantity: med.quantity,
          price: med.price,
          calculatedTotal: med.quantity * med.price,
          apiTotal: apiMedicineData?.total || 'N/A'
        });
      });
      
      // Giả lập thời gian chờ để UX tốt hơn
      console.log("Invoice: Waiting 1 second before completing...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cập nhật trạng thái prescription thành DISPENSED
      console.log("Invoice: Now calling onComplete() to mark prescription as DISPENSED");
      
      // Gọi callback để thông báo cho component cha (handleComplete trong PatientDetails.tsx)
      if (typeof onComplete === 'function') {
        onComplete();
        console.log("Invoice: Called onComplete() successfully");
      } else {
        console.error("Invoice: onComplete is not a function!", onComplete);
        throw new Error("Lỗi kết nối: onComplete không phải là một hàm");
      }
      
      console.log("Invoice: Process completed successfully");
      
      // Trong môi trường thực tế, đây là nơi có thể hiển thị thông báo thành công
      // hoặc chuyển hướng người dùng đến danh sách bệnh nhân
      
      // Thông báo trực quan cho người dùng biết đang xử lý
      alert("Hóa đơn đã được xử lý thành công!\nTrạng thái đơn thuốc đã được cập nhật thành 'DISPENSED'.");
      
      // Thực hiện yêu cầu in thực tế nếu cần
      // window.print(); // Uncomment để cho phép in hóa đơn thực tế
      
    } catch (err: any) {
      console.error("Error completing invoice:", err);
      setError(err.message || "Không thể hoàn tất hóa đơn. Vui lòng thử lại.");
    } finally {
      setIsProcessing(false);
    }
  };
  return <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={onClose} className="mr-2 text-white hover:text-blue-100">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-medium text-black bg-white px-2 py-1 rounded-md">Hóa Đơn Thuốc</h2>
        </div>
        {error ? (
          <div className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-md border border-red-200">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span className="text-sm">{error}</span>
          </div>
        ) : (
          <button 
            onClick={handlePrint} 
            disabled={isProcessing}
            className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md transition-colors ${
              isProcessing 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            }`}
          >
            {isProcessing ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1"></span>
                Đang xử lý...
              </>
            ) : (
              <>
                <PrinterIcon className="h-4 w-4 mr-1" /> In & hoàn tất
              </>
            )}
          </button>
        )}
      </div>
      <div className="p-6">
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-black">
              PHÒNG KHÁM ĐA KHOA
            </h3>
            <p className="text-black">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
            <p className="text-black">Điện thoại: (028) 3822 1234</p>
            <div className="mt-4 border-t pt-4">
              <h2 className="text-xl font-bold text-black">HÓA ĐƠN THUỐC</h2>
              <p className="text-black">Ngày: {currentDate}</p>
              {isLoadingRevenue && (
                <p className="text-blue-500 text-xs mt-1">Đang tính toán doanh thu...</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-black">Họ và tên bệnh nhân</p>
              <p className="text-black">{patient.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-black">Số điện thoại</p>
              <p className="text-black">{patient.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-black">Mã đơn thuốc</p>
              <p className="text-black">{patient.serialNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-black">Chẩn đoán</p>
              <p className="text-black">{patient.diagnosis}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-black">Bác sĩ kê đơn</p>
              <p className="text-black">{patient.doctor}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-black">Nhân viên phát thuốc</p>
              <p className="text-black">{pharmacistName}</p>
            </div>
          </div>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Tên thuốc
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Liều dùng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Đơn giá
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patient.prescription.map((medicine: PharmacyMedicine, index: number) => <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {medicine.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {medicine.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {medicine.dosage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {medicine.price.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(medicine.price * medicine.quantity).toLocaleString('vi-VN')}{' '}
                      đ
                    </td>
                  </tr>)}
                <tr className="bg-gray-50">
                  <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-right">
                    <div className="flex items-center justify-end">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span>Tổng cộng:</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {revenueData?.totalAmount ? 
                      revenueData.totalAmount.toLocaleString('vi-VN') : 
                      calculateTotal().toLocaleString('vi-VN')} đ
                  </td>
                </tr>
                {revenueData?.monthlyRevenue && (
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
                {revenueData?.yearlyRevenue && (
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
          {revenueData && (
            <div className="mb-8 p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <Coins className="h-5 w-5 mr-1" /> Thông tin doanh thu
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-blue-800">Doanh thu từ đơn thuốc này:</p>
                  <p className="text-lg font-bold text-blue-900">{revenueData.totalAmount?.toLocaleString('vi-VN') || '0'} đ</p>
                </div>
                {revenueData.monthlyRevenue !== undefined && (
                  <div>
                    <p className="text-sm text-blue-800">Doanh thu trong tháng:</p>
                    <p className="text-lg font-bold text-blue-900">{revenueData.monthlyRevenue?.toLocaleString('vi-VN') || '0'} đ</p>
                  </div>
                )}
                {revenueData.yearlyRevenue !== undefined && (
                  <div>
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
          
          {isLoadingRevenue && (
            <div className="mb-8 p-4 border border-blue-100 rounded-lg bg-blue-50">
              <div className="flex items-center justify-center">
                <span className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></span>
                <p className="text-blue-600">Đang tính toán doanh thu...</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="text-center">
              <p className="font-medium text-black">Người lập phiếu</p>
              <p className="text-black text-sm">(Ký, ghi rõ họ tên)</p>
              <div className="h-16"></div>
              <p className="text-black">{pharmacistName}</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-black">Người nhận thuốc</p>
              <p className="text-black text-sm">(Ký, ghi rõ họ tên)</p>
              <div className="h-16"></div>
              <p className="text-black">{patient.fullName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
