import React, { useState } from 'react';
import { ClipboardListIcon, PrinterIcon, UserIcon } from 'lucide-react';
import { Invoice } from './Invoice';
export const PatientDetails = ({
  patient,
  onPatientComplete
}) => {
  const [showInvoice, setShowInvoice] = useState(false);
  if (showInvoice) {
    return <Invoice patient={patient} onClose={() => setShowInvoice(false)} onComplete={() => onPatientComplete(patient.id)} />;
  }
  const calculateTotal = () => {
    return patient.prescription.reduce((total, med) => {
      return total + med.price * med.quantity;
    }, 0);
  };
  return <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Chi Tiết Đơn Thuốc</h2>
        <button onClick={() => setShowInvoice(true)} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          <PrinterIcon className="h-4 w-4 mr-1" /> Xuất hóa đơn thuốc
        </button>
      </div>
      <div className="p-6 space-y-6">
        {/* Patient Information */}
        <div className="bg-blue-50 p-4 rounded-md">
          <div className="flex items-center mb-3">
            <UserIcon className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-blue-800">
              Thông tin bệnh nhân
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Họ và tên</p>
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
          </div>
        </div>
        {/* Medical Information */}
        <div>
          <div className="flex items-center mb-3">
            <ClipboardListIcon className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-blue-800">
              Thông tin y tế
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Tiền sử bệnh</p>
              <p className="font-medium">{patient.medicalHistory}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Chẩn đoán</p>
              <p className="font-medium">{patient.diagnosis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Bác sĩ</p>
              <p className="font-medium">{patient.doctor}</p>
            </div>
          </div>
        </div>
        {/* Prescription */}
        <div>
          <h3 className="text-lg font-medium text-blue-800 mb-3">Đơn thuốc</h3>
          <div className="overflow-x-auto">
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
                {patient.prescription.map((medicine, index) => <tr key={index}>
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
        </div>
      </div>
    </div>;
};