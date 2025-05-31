import React from 'react';
import { XIcon, FileTextIcon, PrinterIcon } from 'lucide-react';
import { Patient, Medicine } from '../data/types';

interface Invoice {
  id: string | number;
  date: string;
  pharmacistName: string;
  totalAmount: number;
}

interface InvoiceDetailModalProps {
  invoice: Invoice;
  patient: Patient;
  onClose: () => void;
}

export const InvoiceDetailModal = ({
  invoice,
  patient,
  onClose
}: InvoiceDetailModalProps) => {
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
                <p className="text-sm font-medium text-black mb-1">Tuổi</p>
                <p className="text-black">{patient.age}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-black mb-1">Giới tính</p>
                <p className="text-black">{patient.gender}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-black mb-1">Số điện thoại</p>
                <p className="text-black">{patient.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-black mb-1">Địa chỉ</p>
                <p className="text-black">{patient.address}</p>
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
                  {patient.prescription.map((medicine: Medicine, index: number) => (
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
                      {invoice.totalAmount.toLocaleString('vi-VN')} đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end mt-6">
              <button className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center transition-colors shadow-sm">
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