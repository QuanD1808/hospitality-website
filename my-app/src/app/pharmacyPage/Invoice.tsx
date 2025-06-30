import React, { useState } from 'react';
import { ArrowLeftIcon, PrinterIcon, AlertTriangle } from 'lucide-react';
import { PharmacyPatient, PharmacyMedicine } from './pharmacyUtils';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const currentDate = new Date().toLocaleDateString('vi-VN');
  
  const calculateTotal = () => {
    return patient.prescription.reduce((total: number, med: PharmacyMedicine) => {
      return total + med.price * med.quantity;
    }, 0);
  };
  
  const handlePrint = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      console.log("Invoice: Starting print and complete process");
      
      // Mô phỏng việc in hóa đơn thực tế
      // Trong thực tế, đây là nơi bạn có thể:
      // 1. Gọi API in hóa đơn
      // 2. Gọi API để trừ số lượng thuốc trong kho
      // 3. Gọi API để tạo invoice record
      
      // In ra thông tin cho biết chúng ta đang xử lý
      console.log("Invoice: Printing invoice for patient:", patient.fullName);
      console.log("Invoice: Patient ID:", patient.id);
      console.log("Invoice: Total amount:", calculateTotal().toLocaleString('vi-VN'), "đ");
      console.log("Invoice: Medicines:", patient.prescription.length, "items");
      
      // Hiển thị thông tin chi tiết về mỗi loại thuốc
      patient.prescription.forEach((med, index) => {
        console.log(`Invoice: Medicine ${index + 1}:`, {
          name: med.name,
          quantity: med.quantity,
          price: med.price,
          total: med.quantity * med.price
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
              <p className="text-black">Nguyễn Thị Hà</p>
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
                    Tổng cộng:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {calculateTotal().toLocaleString('vi-VN')} đ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="text-center">
              <p className="font-medium text-black">Người lập phiếu</p>
              <p className="text-black text-sm">(Ký, ghi rõ họ tên)</p>
              <div className="h-16"></div>
              <p className="text-black">Nguyễn Thị Hà</p>
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