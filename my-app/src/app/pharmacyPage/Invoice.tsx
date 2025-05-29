import React from 'react';
import { ArrowLeftIcon, PrinterIcon } from 'lucide-react';
import { Patient, Medicine } from '../data/types'; // Corrected import path

interface InvoiceProps {
  patient: Patient;
  onClose: () => void;
  onComplete: () => void;
}

export const Invoice = ({
  patient,
  onClose,
  onComplete
}: InvoiceProps) => {
  const currentDate = new Date().toLocaleDateString('vi-VN');
  const calculateTotal = () => {
    return patient.prescription.reduce((total: number, med: Medicine) => {
      return total + med.price * med.quantity;
    }, 0);
  };
  const handlePrint = () => {
    // In a real app, this would trigger the print functionality
    // For now, we'll just simulate the completion
    onComplete();
  };
  return <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={onClose} className="mr-2 text-white hover:text-blue-100">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-medium text-white">Hóa Đơn Thuốc</h2>
        </div>
        <button onClick={handlePrint} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          <PrinterIcon className="h-4 w-4 mr-1" /> In hóa đơn
        </button>
      </div>
      <div className="p-6">
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-blue-800">
              PHÒNG KHÁM ĐA KHOA
            </h3>
            <p className="text-gray-500">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
            <p className="text-gray-500">Điện thoại: (028) 3822 1234</p>
            <div className="mt-4 border-t pt-4">
              <h2 className="text-xl font-bold">HÓA ĐƠN THUỐC</h2>
              <p className="text-gray-500">Ngày: {currentDate}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Họ và tên bệnh nhân</p>
              <p className="font-medium">{patient.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tuổi</p>
              <p className="font-medium">{patient.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Giới tính</p>
              <p className="font-medium">{patient.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Số điện thoại</p>
              <p className="font-medium">{patient.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Địa chỉ</p>
              <p className="font-medium">{patient.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Chẩn đoán</p>
              <p className="font-medium">{patient.diagnosis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Bác sĩ kê đơn</p>
              <p className="font-medium">{patient.doctor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nhân viên phát thuốc</p>
              <p className="font-medium">Nguyễn Thị Hà</p>
            </div>
          </div>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên thuốc
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liều dùng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đơn giá
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patient.prescription.map((medicine: Medicine, index: number) => <tr key={index}>
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
                  <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    Tổng cộng:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">
                    {calculateTotal().toLocaleString('vi-VN')} đ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="text-center">
              <p className="font-medium">Người lập phiếu</p>
              <p className="text-gray-500 text-sm">(Ký, ghi rõ họ tên)</p>
              <div className="h-16"></div>
              <p>Nguyễn Thị Hà</p>
            </div>
            <div className="text-center">
              <p className="font-medium">Người nhận thuốc</p>
              <p className="text-gray-500 text-sm">(Ký, ghi rõ họ tên)</p>
              <div className="h-16"></div>
              <p>{patient.fullName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};