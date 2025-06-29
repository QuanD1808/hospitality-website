'use client';

import React, { useState, useEffect } from 'react';
import { FileTextIcon, ClipboardListIcon, CalendarIcon, PlusIcon, UserIcon } from 'lucide-react';
import { MedicineEntry } from './MedicineEntry';
import { User } from '../datats/mockPatients';
import { Medicine } from '../datats/auth';
import { PatientProfile } from './PatientProfile';

// Interface cho thông tin bệnh nhân trong hàng đợi
interface PatientInQueue {
  _id: string;
  patient: string;
  status: 'waiting' | 'in_progress' | 'completed' | 'canceled';
  doctorId?: string;
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
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState<Medicine[]>([]);
  const [followUp, setFollowUp] = useState(false);
  const [followUpDate, setFollowUpDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset form fields when patient changes
    setDiagnosis('');
    setPrescription([]);
    setFollowUp(false);
    setFollowUpDate('');
    setError(null);
  }, [patient]);

  const canComplete = diagnosis.trim() !== '' && prescription.length > 0;

  const handleComplete = () => {
    if (diagnosis.trim() === '') {
      setError('Vui lòng nhập thông tin chẩn đoán');
      return;
    }
    if (prescription.length === 0) {
      setError('Vui lòng thêm ít nhất một loại thuốc');
      return;
    }
    setError(null);
    if (queueInfo) onMarkAsDone(queueInfo._id);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient || !queueInfo) return;
    
    // TODO: Implement save functionality with mock data
    console.log('Saving diagnosis:', {
      patientId: queueInfo.patient,
      queueId: queueInfo._id,
      diagnosis,
      prescription,
      followUp,
      followUpDate
    });
    
    // Cập nhật trạng thái queue
    onMarkAsDone(queueInfo._id);
  };

  const handleAddMedicine = () => {
    // Tạo thuốc mới với cấu trúc phù hợp với Medicine từ auth.ts
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
    return <div className="bg-white rounded-lg shadow-md h-full flex items-center justify-center p-8">
        <div className="text-center">
          <FileTextIcon className="mx-auto h-12 w-12 text-gray-600" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Chưa chọn bệnh nhân
          </h3>
          <p className="mt-1 text-sm text-gray-700">
            Vui lòng chọn bệnh nhân từ danh sách chờ để bắt đầu khám
          </p>
        </div>
      </div>;
  }

  return <div className="bg-white rounded-lg shadow-md h-full">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">{patient?.fullName || 'Không có tên'}</h2>
          <p className="text-sm text-gray-500">
            {patient?.email} • {patient?.phone}
          </p>
        </div>
        <button
          onClick={handleComplete}
          disabled={!canComplete}
          className={`px-4 py-2 text-sm font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${canComplete ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Hoàn thành khám
        </button>
      </div>
      <div className="p-4 overflow-y-auto space-y-6" style={{
      maxHeight: 'calc(100vh - 250px)'
    }}>
        {error && (
          <div className="mb-4 text-red-600 font-medium text-base">{error}</div>
        )}
        <div>
          <h3 className="text-sm font-medium text-gray-900 flex items-center mb-3">
            <UserIcon className="h-4 w-4 mr-2 text-blue-500" />
            Thông tin bệnh nhân
          </h3>
          <PatientProfile patient={patient} />
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <ClipboardListIcon className="h-4 w-4 mr-2 text-blue-500" />
            Thông tin khám bệnh
          </h3>
          <div className="mt-2 text-sm text-gray-800">
            <p>
              <strong>Thời gian chờ:</strong>{' '}
              {queueInfo ? `${Math.floor((new Date().getTime() - new Date(queueInfo.createdAt).getTime()) / 60000)} phút` : 'Không xác định'}
            </p>
            <p>
              <strong>Trạng thái:</strong>{' '}
              <span className={`font-medium ${queueInfo?.status === 'waiting' ? 'text-yellow-600' : queueInfo?.status === 'in_progress' ? 'text-blue-600' : queueInfo?.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                {queueInfo?.status === 'waiting' ? 'Đang chờ' : 
                queueInfo?.status === 'in_progress' ? 'Đang khám' : 
                queueInfo?.status === 'completed' ? 'Đã hoàn thành' : 'Đã hủy'}
              </span>
            </p>
            <p>
              <strong>Ngày tạo:</strong>{' '}
              {queueInfo ? new Date(queueInfo.createdAt).toLocaleString() : 'Không xác định'}
            </p>
          </div>
        </div>
        <form onSubmit={handleSave} className="space-y-6">
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
    </div>;
};