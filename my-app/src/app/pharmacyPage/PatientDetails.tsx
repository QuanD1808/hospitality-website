import React, { useState, useEffect } from 'react';
import { ClipboardListIcon, PrinterIcon, UserIcon, PillIcon, AlertTriangle, RefreshCw } from 'lucide-react';
import { Invoice } from './Invoice';
import { PharmacyPatient, PharmacyMedicine, createPharmacyInvoice } from './pharmacyUtils';
import { useAuth } from '../context/AuthContext';
import { getPrescriptionDetails } from '../services/api.service';

interface PatientDetailsProps {
  patient: PharmacyPatient;
  onPatientComplete: (id: string) => void;
}

interface PrescriptionDetailType {
  _id: string;
  prescriptionId: string;
  medicineId: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
  dosage: string;
}

export const PatientDetails = ({
  patient,
  onPatientComplete
}: PatientDetailsProps) => {
  const { token } = useAuth();
  const [showInvoice, setShowInvoice] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [medicines, setMedicines] = useState<PharmacyMedicine[]>(patient.prescription);
  const [isLoading, setIsLoading] = useState(false);
  
  // Reset medicines state when patient changes to avoid showing stale data
  useEffect(() => {
    setMedicines(patient.prescription);
  }, [patient]);
  
  // Fetch prescription details from MongoDB when component loads or patient changes
  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      if (!token) return;
      
      setIsLoading(true);
      try {
        // Get prescription details from the backend
        const prescriptionDetails = await getPrescriptionDetails(patient.id, token);
        console.log(`Fetched ${prescriptionDetails.length} prescription details from MongoDB for ID: ${patient.id}`);
        
        // Transform prescription details to match our UI format
        if (prescriptionDetails && prescriptionDetails.length > 0) {
          const updatedMedicines: PharmacyMedicine[] = prescriptionDetails.map((detail: PrescriptionDetailType) => ({
            name: detail.medicineId?.name || 'Unknown', // medicineId is populated with name
            quantity: detail.quantity,
            dosage: detail.dosage,
            price: detail.medicineId?.price || 0 // medicineId is populated with price
          }));
          
          setMedicines(updatedMedicines);
        } else {
          // If no prescription details found, reset to an empty array
          // This ensures we don't show old medicines when switching to a patient without prescriptions
          setMedicines([]);
        }
      } catch (err: any) {
        console.error("Error fetching prescription details:", err);
        // Reset medicines to what was passed in props if API fetch fails
        setMedicines(patient.prescription);
        setError("Không thể tải chi tiết đơn thuốc từ máy chủ. Đang hiển thị dữ liệu cục bộ.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPrescriptionDetails();
  }, [patient.id, token, patient.prescription]);
  
  // Handler for showing invoice
  const handleShowInvoice = async () => {
    setProcessing(true);
    setError(null);
    
    try {
      setShowInvoice(true);
    } catch (err: any) {
      console.error("Error preparing invoice:", err);
      setError(err.message || "Không thể tạo hóa đơn. Vui lòng thử lại.");
    } finally {
      setProcessing(false);
    }
  };
  
  // Tính tổng tiền của đơn thuốc
  const calculateTotal = () => {
    // Use our fetched medicines instead of patient.prescription
    return medicines.reduce((total, med) => {
      return total + med.price * med.quantity;
    }, 0);
  };
  
  // Handler for completing prescription
  const handleComplete = async () => {
    console.log("PatientDetails: handleComplete started");
    setProcessing(true);
    setError(null);
    
    try {
      if (!token) {
        console.error("PatientDetails: No authentication token available");
        throw new Error("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.");
      }
      
      const totalAmount = medicines.length > 0 ? calculateTotal() : 0;
      console.log(`PatientDetails: Processing completion for patient ${patient.fullName} (ID: ${patient.id})`);
      console.log(`PatientDetails: Total amount to be recorded: ${totalAmount} VND`);
      console.log(`PatientDetails: Medicines count: ${medicines.length}`);
      
      // Mark prescription as DISPENSED even if there are no medicines
      console.log("PatientDetails: Calling createPharmacyInvoice...");
      // Pass medicines data to deduct quantities from inventory
      const success = await createPharmacyInvoice(patient.id, totalAmount, token, medicines);
      
      if (success) {
        console.log("PatientDetails: Invoice created successfully");
        // Close invoice and notify parent component
        setShowInvoice(false);
        console.log("PatientDetails: Notifying Dashboard of completion via onPatientComplete");
        // Thêm timeout nhỏ để đảm bảo UI cập nhật sau khi API hoàn tất
        setTimeout(() => {
          onPatientComplete(patient.id);
          console.log(`PatientDetails: Patient ${patient.id} removed from waiting list`);
        }, 300);
      } else {
        console.error("PatientDetails: Failed to create pharmacy invoice");
        throw new Error("Không thể cập nhật trạng thái đơn thuốc.");
      }
    } catch (err: any) {
      console.error("PatientDetails: Error completing prescription:", err);
      setError(err.message || "Không thể hoàn thành phát thuốc. Vui lòng thử lại.");
    } finally {
      setProcessing(false);
      console.log("PatientDetails: handleComplete process finished");
    }
  };
  
  if (showInvoice) {
    // Pass our fetched medicines data to Invoice component
    const patientWithUpdatedMeds = {
      ...patient,
      prescription: medicines
    };
    
    return <Invoice 
      patient={patientWithUpdatedMeds} 
      onClose={() => setShowInvoice(false)} 
      onComplete={handleComplete} 
    />;
  }
  
  // Định nghĩa calculateTotal đã được di chuyển lên trước hàm handleComplete
  
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-300 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-black flex items-center">
          <PillIcon size={20} className="mr-2 text-black" />
          Chi Tiết Đơn Thuốc
        </h2>
        {error ? (
          <div className="flex items-center text-red-600">
            <AlertTriangle size={16} className="mr-1" />
            <span className="text-sm">{error}</span>
          </div>
        ) : (
          <button 
            onClick={handleShowInvoice} 
            disabled={processing || isLoading}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white transition-colors shadow-sm ${
              processing || isLoading
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            }`}
            title="Xuất hóa đơn thuốc"
          >
            {processing ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Đang xử lý...
              </>
            ) : (
              <>
                <PrinterIcon size={16} className="mr-2" /> 
                Xuất hóa đơn thuốc
              </>
            )}
          </button>
        )}
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
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <RefreshCw size={24} className="animate-spin text-blue-600 mb-2" />
                        <p className="text-gray-600">Đang tải chi tiết đơn thuốc...</p>
                      </div>
                    </td>
                  </tr>
                ) : medicines.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <AlertTriangle size={24} className="text-amber-500 mb-2" />
                        <p className="text-gray-600">Bệnh nhân này không có đơn thuốc nào.</p>
                      </div>
                    </td>
                  </tr>
                ) : medicines.map((medicine, index) => (
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
                
                {medicines.length > 0 && (
                  <tr className="bg-gray-100">
                    <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-right border-t border-gray-400">
                      Tổng cộng:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black border-t border-gray-400">
                      {calculateTotal().toLocaleString('vi-VN')} đ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};