import React from 'react';
import { XIcon } from 'lucide-react';
export const InvoiceDetailModal = ({
  invoice,
  patient,
  onClose
}) => {
  return <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Chi Tiết Hóa Đơn #{invoice.id}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-blue-800">
                PHÒNG KHÁM ĐA KHOA
              </h3>
              <p className="text-gray-500">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
              <p className="text-gray-500">Điện thoại: (028) 3822 1234</p>
              <div className="mt-4 border-t pt-4">
                <h2 className="text-xl font-bold">HÓA ĐƠN THUỐC</h2>
                <p className="text-gray-500">
                  Ngày: {new Date(invoice.date).toLocaleDateString('vi-VN')}
                </p>
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
                <p className="font-medium">{invoice.pharmacistName}</p>
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
                      {invoice.totalAmount.toLocaleString('vi-VN')} đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>;
};