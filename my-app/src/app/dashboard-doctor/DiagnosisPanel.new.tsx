'use client';

/**
 * DiagnosisPanel - Component cho bác sĩ để khám và kê đơn thuốc
 * 
 * Luồng hoạt động:
 * 1. Bác sĩ nhận bệnh nhân từ hàng đợi (queue)
 * 2. Nhập chẩn đoán và chọn thuốc
 * 3. Tạo đơn thuốc (prescription) với trạng thái "PENDING_DISPENSE"
 * 4. Tạo chi tiết đơn thuốc (prescriptionDetails) cho mỗi loại thuốc
 * 5. Cập nhật trạng thái queue thành "completed"
 * 
 * Mô hình dữ liệu MongoDB:
 * - Prescription: {_id, customPrescriptionId, patientId, doctorId, diagnosis, date, status}
 * - PrescriptionDetail: {_id, customPrescriptionDetailId, prescriptionId, medicineId, quantity, dosage}
 */

import React, { useState, useEffect } from 'react';
import { FileTextIcon, ClipboardListIcon, CalendarIcon, PlusIcon, UserIcon } from 'lucide-react';
import { MedicineEntry } from './MedicineEntry';
import { User } from '../datats/mockPatients';
import { Medicine } from '../datats/auth';
import { PatientProfile } from './PatientProfile';
import * as apiService from '../services/api.service';
import { useAuth } from '../context/AuthContext';

// Interface cho thông tin bệnh nhân trong hàng đợi
interface PatientInQueue {
  _id: string;
  patient: string | { _id: string; [key: string]: any };
  status: 'waiting' | 'in_progress' | 'completed' | 'canceled';
  doctorId?: string | { _id: string; [key: string]: any };
  createdAt: string;
  updatedAt: string;
  __v?: number;
  patientInfo: User | null;
}

interface DiagnosisPanelProps {
  patient: User | null;
  queueInfo: PatientInQueue | null;
  onMarkAsDone: (queueId: string) => void;
}

export const DiagnosisPanel: React.FC<DiagnosisPanelProps> = ({
  patient,
  queueInfo,
  onMarkAsDone
}) => {
  const { token } = useAuth();
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState<Medicine[]>([]);
  const [followUp, setFollowUp] = useState(false);
  const [followUpDate, setFollowUpDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Reset form fields when patient changes
    setDiagnosis('');
    setPrescription([]);
    setFollowUp(false);
    setFollowUpDate('');
    setError(null);
    setSuccessMessage(null);
  }, [patient]);

  const canComplete = diagnosis.trim() !== '' && prescription.length > 0 && !loading;

  const handleSave = async (e: React.FormEvent | React.MouseEvent | null = null) => {
    // Prevent form submission if called from a form submit event
    if (e && 'preventDefault' in e) e.preventDefault();
    if (!patient || !queueInfo) return;
    
    // Validate before saving
    if (!diagnosis.trim()) {
      setError('Vui lòng nhập chẩn đoán');
      return;
    }
    if (prescription.length === 0) {
      setError('Vui lòng thêm ít nhất một loại thuốc');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      if (!token) {
        throw new Error('Không có token xác thực');
      }
      
      // Format current date to YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];
      
      // 1. Tạo ID cho đơn thuốc với định dạng PRESC-YYYYMMDD-XXXX
      const dateStr = today.replace(/-/g, '');
      const customPrescriptionId = `PRESC-${dateStr}-${Date.now().toString().slice(-4)}`;
      
      // Xác định patientId và doctorId
      let patientId;
      let doctorId;
      
      // Lấy patientId từ queueInfo
      if (typeof queueInfo.patient === 'string') {
        patientId = queueInfo.patient;
      } else if (queueInfo.patient && queueInfo.patient._id) {
        patientId = queueInfo.patient._id;
      } else {
        throw new Error('Dữ liệu bệnh nhân không hợp lệ');
      }
      
      // Lấy doctorId từ queueInfo hoặc localStorage
      if (queueInfo.doctorId) {
        if (typeof queueInfo.doctorId === 'string') {
          doctorId = queueInfo.doctorId;
        } else if (queueInfo.doctorId._id) {
          doctorId = queueInfo.doctorId._id;
        }
      } else {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        doctorId = currentUser?._id;
      }
      
      if (!doctorId) {
        throw new Error('Thiếu thông tin bác sĩ');
      }
      
      // 2. Tạo đơn thuốc (Prescription)
      const prescriptionData = {
        customPrescriptionId,
        patientId,
        doctorId,
        diagnosis,
        date: today,
        status: 'PENDING_DISPENSE'
      };
      
      console.log('Tạo đơn thuốc với data:', prescriptionData);
      
      // Gọi API để tạo đơn thuốc trong MongoDB
      const createdPrescription = await apiService.createPrescription(prescriptionData, token);
      console.log('Đơn thuốc đã được tạo:', createdPrescription);
      
      // 3. Tạo chi tiết đơn thuốc (PrescriptionDetail)
      const prescriptionDetails = prescription
        .filter(med => med.name && med.totalPills)
        .map(med => {
          // Tạo ID cho chi tiết đơn thuốc
          const timestamp = Date.now().toString().slice(-8);
          const randomSuffix = Math.floor(Math.random() * 9000 + 1000).toString();
          const customPrescriptionDetailId = `PRESCD-${timestamp}-${randomSuffix}`;
          
          // Lấy medicineId (MongoDB ID của thuốc)
          const medicineId = (med as any).medicineId || med.id;
          
          return {
            customPrescriptionDetailId,
            medicineId,
            quantity: med.totalPills,
            dosage: med.schedule || 'Dùng theo chỉ dẫn của bác sĩ'
          };
        });
      
      // Gọi API để tạo chi tiết đơn thuốc
      if (prescriptionDetails.length > 0) {
        console.log('Tạo chi tiết đơn thuốc:', prescriptionDetails);
        await apiService.createBatchPrescriptionDetails(
          createdPrescription._id,
          prescriptionDetails,
          token
        );
      }
      
      // 4. Cập nhật trạng thái queue thành 'completed'
      onMarkAsDone(queueInfo._id);
      
      // Hiển thị thông báo thành công
      setSuccessMessage(`Đã tạo đơn thuốc ${customPrescriptionId} thành công cho bệnh nhân ${patient.fullName}!`);
      
      // Reset form
      setDiagnosis('');
      setPrescription([]);
      setFollowUp(false);
      setFollowUpDate('');
      
    } catch (error: any) {
      console.error('Error creating prescription:', error);
      setError(`Lỗi khi tạo đơn thuốc: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicine = () => {
    // Tạo thuốc mới
    const newMedicine: Medicine = {
      id: Date.now().toString(),
      name: '',
      totalPills: 0,
      schedule: ''
    };
    setPrescription([...prescription, newMedicine]);
  };

  const handleUpdateMedicine = (updatedMedicine: Medicine) => {
    setPrescription(prescription.map(med => 
      med.id === updatedMedicine.id ? updatedMedicine : med
    ));
  };

  const handleRemoveMedicine = (medicineId: string) => {
    setPrescription(prescription.filter(med => med.id !== medicineId));
  };

  if (!patient) {
    return (
      <div className="bg-white rounded-lg shadow-md h-full flex items-center justify-center p-8">
        <div className="text-center">
          <FileTextIcon className="mx-auto h-12 w-12 text-gray-600" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Chưa chọn bệnh nhân
          </h3>
          <p className="mt-1 text-sm text-gray-700">
            Vui lòng chọn bệnh nhân từ danh sách chờ để bắt đầu khám
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md h-full">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">{patient?.fullName || 'Không có tên'}</h2>
          <p className="text-sm text-gray-500">
            {patient?.email} • {patient?.phone}
          </p>
        </div>
        <button
          onClick={() => handleSave(null)}
          disabled={!canComplete || loading}
          className={`px-4 py-2 text-sm font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
            loading ? 'bg-gray-400 text-white cursor-not-allowed' :
            canComplete ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 cursor-pointer' : 
            'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Đang xử lý...' : 'Hoàn thành khám'}
        </button>
      </div>
      
      <div className="p-4 overflow-y-auto space-y-6" style={{ maxHeight: 'calc(100vh - 250px)' }}>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 font-medium">{error}</div>
        )}
        
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded text-green-700">
            <h4 className="font-bold mb-2">Thành công!</h4>
            <p>{successMessage}</p>
          </div>
        )}
        
        <div>
          <h3 className="text-sm font-medium text-gray-900 flex items-center mb-3">
            <UserIcon className="h-4 w-4 mr-2 text-blue-500" />
            Thông tin bệnh nhân
          </h3>
          <PatientProfile patient={patient} />
        </div>
        
        <form onSubmit={(e) => handleSave(e)} className="space-y-6">
          <div>
            <label htmlFor="diagnosis" className="block text-base font-semibold text-gray-900">
              Chẩn đoán
            </label>
            <textarea
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 text-base text-gray-900 placeholder-gray-500"
              rows={3}
              placeholder="Nhập thông tin chẩn đoán chi tiết cho bệnh nhân..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-base font-semibold text-gray-900">
                Đơn thuốc
              </label>
              <button
                type="button"
                onClick={handleAddMedicine}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-semibold rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Thêm thuốc
              </button>
            </div>
            <div className="space-y-4">
              {prescription.map((medicine) => (
                <MedicineEntry
                  key={medicine.id}
                  medicine={medicine}
                  onUpdate={handleUpdateMedicine}
                  onRemove={handleRemoveMedicine}
                />
              ))}
              {prescription.length === 0 && (
                <div className="text-center p-4 bg-gray-50 text-gray-500 rounded-md">
                  Chưa có thuốc nào được thêm vào đơn
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <input
                id="followUp"
                type="checkbox"
                checked={followUp}
                onChange={e => setFollowUp(e.target.checked)}
                className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="followUp" className="ml-2 block text-base font-semibold text-gray-900 cursor-pointer select-none">
                Đặt lịch tái khám
              </label>
            </div>
            {followUp && (
              <div>
                <label htmlFor="followUpDate" className="block text-base font-semibold text-gray-900 mb-1">
                  Ngày tái khám
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    type="date"
                    id="followUpDate"
                    value={followUpDate}
                    onChange={e => setFollowUpDate(e.target.value)}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 text-base text-gray-900"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
