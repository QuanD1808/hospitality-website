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
      
      // 1. Create a custom prescription ID - định dạng PRESC-YYYYMMDD-XXXX
      const dateStr = today.replace(/-/g, '');
      const customPrescriptionId = `PRESC-${dateStr}-${Date.now().toString().slice(-4)}`;
      
      // 2. Create the prescription trong MongoDB
      
      // Xử lý patient ID - lấy đúng ID MongoDB từ object
      let patientId;
      
      if (typeof queueInfo.patient === 'string') {
        patientId = queueInfo.patient;
      } else if (queueInfo.patient && queueInfo.patient._id) {
        patientId = queueInfo.patient._id;
      } else {
        console.error('Invalid patient data:', queueInfo.patient);
        throw new Error('Không thể tạo đơn thuốc: Dữ liệu bệnh nhân không hợp lệ');
      }
      
      // Xử lý doctor ID - đảm bảo luôn có doctorId
      let doctorId;
      
      // First attempt: Get doctorId directly from the queue if it exists
      if (queueInfo.doctorId) {
        if (typeof queueInfo.doctorId === 'string') {
          doctorId = queueInfo.doctorId;
        } else if (queueInfo.doctorId._id) {
          doctorId = queueInfo.doctorId._id;
        }
      }
      
      // Second attempt: If still no doctorId, use current user
      if (!doctorId) {
        try {
          // Use the token to extract user information
          if (token) {
            // JWT typically has three parts: header.payload.signature
            const tokenParts = token.split('.');
            if (tokenParts.length === 3) {
              // Decode the payload (middle part) - safely
              try {
                // For browser environment
                let decodedPayload;
                if (typeof window !== 'undefined' && window.atob) {
                  decodedPayload = JSON.parse(window.atob(tokenParts[1]));
                } else {
                  // For Node.js environment or as a fallback
                  const base64 = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
                  const jsonPayload = decodeURIComponent(
                    Array.from(Buffer.from(base64, 'base64').toString('binary'))
                      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                      .join('')
                  );
                  decodedPayload = JSON.parse(jsonPayload);
                }
                doctorId = decodedPayload.id; // Assuming JWT contains user ID as 'id'
                console.log('Extracted doctor ID from token:', doctorId);
              } catch (decodeError) {
                console.error('Failed to decode JWT payload:', decodeError);
              }
            }
          }
        } catch (err) {
          console.error('Error extracting user data from token:', err);
        }
      }
      
      // Third attempt: Try from localStorage
      if (!doctorId) {
        try {
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          doctorId = currentUser?._id;
          console.log('Using current user as doctor from localStorage:', doctorId);
        } catch (err) {
          console.error('Error getting user from localStorage:', err);
        }
      }
        
      console.log('Patient ID type:', typeof patientId, 'value:', patientId);
      console.log('Doctor ID type:', typeof doctorId, 'value:', doctorId);
      
      if (!doctorId) {
        console.error('ERROR: doctorId is undefined! Cannot create prescription without doctor ID.');
        throw new Error('Không thể tạo đơn thuốc: Thiếu thông tin bác sĩ');
      }
      
      const prescriptionData = {
        customPrescriptionId, // ID tùy chỉnh của đơn thuốc để dễ nhận diện
        patientId, // ID bệnh nhân đã xử lý ở trên
        doctorId, // ID bác sĩ đã xử lý ở trên
        diagnosis, // Chẩn đoán của bác sĩ
        date: today, // Ngày kê đơn
        status: 'PENDING_DISPENSE' // Trạng thái chờ cấp phát thuốc tại nhà thuốc
      };
      
      console.log('Creating prescription with data:', prescriptionData);
      
      // Create the prescription and store it in this variable for later use
      let createdPrescription;
      
      try {
        // First try using a direct fetch for debugging with more detailed logs
        console.log('Trying direct fetch to create prescription with data:', JSON.stringify(prescriptionData));
        
        try {
          // Check token validity before attempting to create prescription
          console.log('Token first 20 chars:', token?.substring(0, 20));
          
          const response = await fetch('http://localhost:5000/api/prescriptions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(prescriptionData)
          });
          
          const responseText = await response.text();
          console.log('Raw response text:', responseText);
          
          let responseData;
          try {
            // Parse JSON response if possible
            responseData = JSON.parse(responseText);
            console.log('Direct fetch response parsed:', response.status, responseData);
          } catch (parseError) {
            console.error('Failed to parse response as JSON:', parseError);
            responseData = { message: 'Invalid JSON response' };
          }

          if (!response.ok) {
            throw new Error(`Direct fetch failed: ${response.status} - ${responseData.message || responseText || 'Unknown error'}`);
          }

          // If direct fetch succeeds, use it
          createdPrescription = responseData;
          console.log('Successfully created prescription with direct fetch:', createdPrescription);
        } catch (fetchError) {
          console.error('Direct fetch failed:', fetchError);
          
          // Fall back to the API service with detailed error logging
          console.log('Falling back to apiService.createPrescription with data:', JSON.stringify(prescriptionData));
          
          // Ensure the IDs are strings before sending to API
          const updatedPrescriptionData = {...prescriptionData};
          
          if (typeof updatedPrescriptionData.patientId === 'object' && updatedPrescriptionData.patientId !== null) {
            const patientObj = updatedPrescriptionData.patientId as any;
            if (patientObj._id) {
              updatedPrescriptionData.patientId = patientObj._id.toString();
            }
          }
          
          if (typeof updatedPrescriptionData.doctorId === 'object' && updatedPrescriptionData.doctorId !== null) {
            const doctorObj = updatedPrescriptionData.doctorId as any;
            if (doctorObj._id) {
              updatedPrescriptionData.doctorId = doctorObj._id.toString();
            }
          }
          
          console.log('Creating prescription with stringified IDs:', JSON.stringify(updatedPrescriptionData));
          createdPrescription = await apiService.createPrescription(updatedPrescriptionData, token);
        }
        
        console.log('Prescription created successfully:', createdPrescription);
        
        // Validate that we received a valid response with _id
        if (!createdPrescription || !createdPrescription._id) {
          console.error('ERROR: Created prescription is missing _id!', createdPrescription);
          throw new Error('Created prescription is missing _id');
        }
      } catch (prescError: any) {
        console.error('Failed to create prescription:', prescError);
        throw new Error(`Không thể tạo đơn thuốc: ${prescError.message}`);
      }
      
      // 3. Tạo chi tiết đơn thuốc (PrescriptionDetail) cho nhiều loại thuốc cùng lúc
      // Chuẩn bị mảng dữ liệu cho batch creation API
      // Log the original prescription data to debug
      console.log('Original prescription data:', prescription);
      
      const validPrescriptionDetails = prescription
        .filter(med => med.name && med.totalPills) // Lọc bỏ thuốc không có tên hoặc số lượng
        .map(med => {
          // Lấy đúng medicineId từ MongoDB - kiểm tra kỹ từng trường hợp
          // Med có thể có trường medicineId (từ khi chọn từ dropdown) hoặc id (từ khi tạo mới)
          const medicineId = (med as any).medicineId || med.id;
          console.log(`Processing medicine: ${med.name}, ID: ${medicineId}, Type: ${typeof medicineId}`);
          
          if (!medicineId) {
            console.error('Missing medicineId for', med);
            throw new Error(`Missing medicineId for ${med.name}`);
          }
          
          // Tạo một ID tùy chỉnh cho chi tiết đơn thuốc
          const timestamp = Date.now().toString().slice(-8);
          const medIdSuffix = typeof medicineId === 'string' ? medicineId.slice(-4) : Math.floor(Math.random() * 9000 + 1000).toString();
          const customPrescriptionDetailId = `PRESCD-${timestamp}-${medIdSuffix}`;
          
          // Trả về cấu trúc dữ liệu cho mỗi chi tiết đơn thuốc
          // Xử lý trường hợp schedule/dosage rỗng
          const dosageValue = med.schedule && med.schedule.trim() 
            ? med.schedule 
            : 'Dùng theo chỉ dẫn của bác sĩ';
          
          console.log(`Medicine ${med.name}: using dosage value "${dosageValue}"`);
          
          return {
            customPrescriptionDetailId,
            medicineId,
            quantity: med.totalPills,
            dosage: dosageValue
          };
        });
      
      // Check if we have a valid prescription and details to create
      if (!createdPrescription || !createdPrescription._id) {
        console.error('Cannot create prescription details: No valid prescription created', createdPrescription);
        throw new Error('Không thể tạo chi tiết đơn thuốc: Không có đơn thuốc hợp lệ');
      }

      // Convert the prescription ID to string to ensure compatibility with the API
      const prescriptionId = createdPrescription._id.toString();
      console.log(`Prescription created with ID: ${prescriptionId} (type: ${typeof prescriptionId})`);

      if (validPrescriptionDetails.length === 0) {
        console.warn('No valid prescription details to create');
      } else {
        console.log('Creating batch prescription details for prescription ID:', prescriptionId);
        console.log('Prescription details data:', validPrescriptionDetails);
        
        try {
          // Re-verify that we have valid medicine IDs in each detail
          const verifiedDetails = validPrescriptionDetails.map(detail => {
            // Ensure medicineId is a string
            if (typeof detail.medicineId === 'object' && detail.medicineId !== null) {
              detail.medicineId = (detail.medicineId as any)._id?.toString() || String(detail.medicineId);
            } else if (detail.medicineId) {
              detail.medicineId = String(detail.medicineId);
            }
            return detail;
          });
          
          console.log('Verified prescription details:', verifiedDetails);
          
          // Create the batch prescription details using the prescription ID
          const result = await apiService.createBatchPrescriptionDetails(
            prescriptionId,
            verifiedDetails,
            token
          );
          console.log('Successfully created all prescription details in batch:', result);
        } catch (detailsError: any) {
          console.error('Failed to create prescription details:', detailsError);
          // We'll continue even if prescription details creation fails
          // The prescription has already been created, so we can still complete the process
          setError(`Đơn thuốc đã được tạo nhưng có lỗi khi thêm chi tiết thuốc: ${detailsError.message}`);
        }
      }
      
      // 4. Cập nhật trạng thái queue thành 'completed'
      console.log('Cập nhật trạng thái queue thành completed và kết thúc khám bệnh...');
      onMarkAsDone(queueInfo._id);
      
      // Hiển thị thông báo thành công với thông tin về đơn thuốc
      setSuccessMessage(
        `Đã tạo đơn thuốc ${customPrescriptionId} thành công cho bệnh nhân ${patient.fullName}!
        Đơn thuốc với ${validPrescriptionDetails.length} loại thuốc đã được gửi đến nhà thuốc với trạng thái "Chờ cấp phát".
        Bệnh nhân có thể đến quầy thuốc để nhận thuốc.`
      );
      
      // Xóa form để sẵn sàng cho bệnh nhân tiếp theo
      setDiagnosis('');
      setPrescription([]);
      setFollowUp(false);
      setFollowUpDate('');
      
    } catch (error: any) {
      console.error('Error creating prescription:', error);
      
      let errorMessage = 'Không xác định';
      
      // Xử lý thông báo lỗi từ API
      if (error.response) {
        console.error('API error response:', error.response);
        
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
          
          // Thêm chi tiết lỗi nếu có
          if (error.response.data.details) {
            errorMessage += `: ${error.response.data.details}`;
          }
          
          // Xử lý lỗi cụ thể cho các trường hợp đặc biệt
          if (error.response.status === 500) {
            errorMessage = "Lỗi server: Vui lòng thử lại sau hoặc liên hệ quản trị viên";
          }
          
          if (error.response.status === 400 && error.response.data.invalidDetails) {
            errorMessage = `Có ${error.response.data.invalidDetails.length} loại thuốc không hợp lệ. Vui lòng kiểm tra lại thông tin.`;
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(`Lỗi khi tạo đơn thuốc: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
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
      <div className="p-4 overflow-y-auto space-y-6" style={{
      maxHeight: 'calc(100vh - 250px)'
    }}>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 font-medium">{error}</div>
        )}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded text-green-700">
            <h4 className="font-bold mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Đơn thuốc đã được tạo thành công!
            </h4>
            <p className="whitespace-pre-line">{successMessage}</p>
            <p className="mt-2 text-green-600">Bệnh nhân sẽ được chuyển tới quầy thuốc để nhận thuốc.</p>
          </div>
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