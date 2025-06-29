import React, { useState } from 'react';
import { ClipboardListIcon, PrinterIcon, UserIcon, PillIcon } from 'lucide-react';
import { Invoice } from './Invoice';
import { PharmacyPatient } from './pharmacyUtils';

interface PatientDetailsProps {
  patient: PharmacyPatient;
  onPatientComplete: (id: string) => void;
}

export const PatientDetails = ({
  patient,
  onPatientComplete
}: PatientDetailsProps) => {
  const [showInvoice, setShowInvoice] = useState(false);
  
  if (showInvoice) {
    return <Invoice patient={patient} onClose={() => setShowInvoice(false)} onComplete={() => onPatientComplete(patient.id)} />;
  }
  
  const calculateTotal = () => {
    return patient.prescription.reduce((total, med) => {
      return total + med.price * med.quantity;
    }, 0);
  };
  
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-300 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-black flex items-center">
          <PillIcon size={20} className="mr-2 text-black" />
          Chi Tiết Đơn Thuốc
        </h2>
        <button 
          onClick={() => setShowInvoice(true)} 
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-sm transition-colors"
        >
          <PrinterIcon size={16} className="mr-2" /> 
          Xuất hóa đơn thuốc
        </button>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Patient Information */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
          <div className="flex items-center mb-4">
            <UserIcon size={18} className="text-black mr-2" />
            <h3 className="text-lg font-medium text-black">
              Thông tin bệnh nhân
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="text-sm font-medium text-black mb-1">Họ và tên</p>
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
          </div>
        </div>
        
        {/* Medical Information */}
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <ClipboardListIcon size={18} className="text-black mr-2" />
            <h3 className="text-lg font-medium text-black">
              Thông tin y tế
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-black mb-1">Chẩn đoán</p>
              <p className="text-black">{patient.diagnosis}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-black mb-1">Bác sĩ</p>
              <p className="text-black">{patient.doctor}</p>
            </div>
          </div>
        </div>
        
        {/* Prescription */}
        <div>
          <h3 className="text-lg font-medium text-black mb-4 flex items-center">
            <PillIcon size={18} className="mr-2 text-black" />
            Đơn thuốc
          </h3>
          
          <div className="overflow-x-auto border border-gray-300 rounded-lg">
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
              
              <tbody className="bg-white divide-y divide-gray-300">
                {patient.prescription.map((medicine, index) => (
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
                    Tổng cộng:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black border-t border-gray-400">
                    {calculateTotal().toLocaleString('vi-VN')} đ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};