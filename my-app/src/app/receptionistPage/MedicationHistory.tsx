import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Calendar as CalendarIcon, Pill as PillIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as apiService from '../services/api.service';

// Define interfaces for the data we're working with
interface MedicationDetailDisplay {
  name: string;
  dosage: string;
  frequency: string; // This will be derived from the dosage
  duration: string;  // This will be derived from the quantity
}

interface MedicationRecordDisplay {
  id: string;
  name: string;
  patientId: string;
  date: string;
  doctor: string;
  diagnosis: string;
  medications: MedicationDetailDisplay[];
  status?: string; // Status of the prescription
}

interface MedicationHistoryProps {
  onBack: () => void;
}

export function MedicationHistory({ onBack }: MedicationHistoryProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [medicationRecords, setMedicationRecords] = useState<MedicationRecordDisplay[]>([]);
  const [allStatuses, setAllStatuses] = useState(false); // Toggle to show all statuses
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load medication data from API
  useEffect(() => {
    if (!token) return;
    
    if (allStatuses) {
      loadAllPrescriptions();
    } else {
      loadDispensedPrescriptions();
    }
  }, [token, allStatuses]);
  
  // Function to load prescriptions with DISPENSED status
  const loadDispensedPrescriptions = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Get prescriptions with status DISPENSED from the API
      console.log('MedicationHistory: Fetching DISPENSED prescriptions');
      const prescriptions = await apiService.getPrescriptions({ status: 'DISPENSED' }, token);
      console.log(`MedicationHistory: Found ${prescriptions.length} DISPENSED prescriptions`);
      
      await processPrescriptions(prescriptions);
    } catch (error: any) {
      console.error("Error loading dispensed medication data:", error);
      setError(error.message || "Không thể tải dữ liệu lịch sử thuốc");
      setMedicationRecords([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to load all prescriptions regardless of status
  const loadAllPrescriptions = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Loading all prescriptions regardless of status');
      const prescriptions = await apiService.getPrescriptions({}, token);
      console.log(`Found ${prescriptions.length} total prescriptions`);
      
      await processPrescriptions(prescriptions);
    } catch (error: any) {
      console.error("Error loading all medication data:", error);
      setError(error.message || "Không thể tải dữ liệu lịch sử thuốc");
      setMedicationRecords([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Common function to process prescriptions data
  const processPrescriptions = async (prescriptions: any[]) => {
    try {
      // Transform prescriptions to the format we need for display
      const records: MedicationRecordDisplay[] = [];
      
      for (const prescription of prescriptions) {
        try {
          // Get prescription details (medicines)
          console.log(`MedicationHistory: Fetching details for prescription ${prescription._id}`);
          
          // Fix for TypeScript errors - ensure token is not null
          if (!token) {
            console.error('Token is null, cannot fetch prescription details');
            continue;
          }
          
          const prescriptionDetails = await apiService.getPrescriptionDetails(prescription._id, token);
          
          // Transform prescription details to medication details
          const medications: MedicationDetailDisplay[] = [];
          
          // For each medicine in the prescription
          for (const detail of prescriptionDetails) {
            try {
              // Get medicine details if medicineId is an object with _id
              const medicineId = typeof detail.medicineId === 'object' ? detail.medicineId._id : detail.medicineId;
              
              // Fix for TypeScript errors - ensure token is not null
              if (!token) {
                console.error('Token is null, cannot fetch medicine details');
                continue;
              }
              
              const medicine = detail.medicineId && typeof detail.medicineId === 'object' 
                ? detail.medicineId  // If already populated
                : await apiService.getMedicineById(medicineId, token);
              
              // Parse dosage to extract frequency and duration
              const dosageInfo = detail.dosage.split(' ');
              const frequency = dosageInfo.length > 0 ? dosageInfo.join(' ') : 'Không có thông tin';
              
              // Calculate duration based on quantity and dosage
              let duration = 'Không xác định';
              const firstNumberInDosage = parseInt(dosageInfo[0]);
              if (!isNaN(firstNumberInDosage) && firstNumberInDosage > 0) {
                duration = `${Math.round(detail.quantity / firstNumberInDosage)} ngày`;
              }
              
              medications.push({
                name: medicine?.name || 'Không xác định thuốc',
                dosage: detail.dosage || 'Không xác định liều lượng',
                frequency: frequency,
                duration: duration
              });
            } catch (medErr) {
              console.error(`Error fetching medicine details for ${detail.medicineId}:`, medErr);
              medications.push({
                name: 'Lỗi dữ liệu thuốc',
                dosage: 'Không xác định',
                frequency: 'Không xác định',
                duration: 'Không xác định'
              });
            }
          }
          
          // Format date for display
          const dateObj = new Date(prescription.date);
          const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
          
          // Get patient and doctor info directly from populated fields if available
          const patient = prescription.patientId && typeof prescription.patientId === 'object' 
            ? prescription.patientId 
            : { fullName: 'Không xác định', _id: 'Unknown' };
          
          const doctor = prescription.doctorId && typeof prescription.doctorId === 'object' 
            ? prescription.doctorId 
            : { fullName: 'Không xác định' };
          
          records.push({
            id: prescription._id,
            name: patient.fullName,
            patientId: patient._id,
            date: formattedDate,
            doctor: doctor.fullName,
            diagnosis: prescription.diagnosis || 'Không có chẩn đoán',
            medications: medications,
            status: prescription.status // Add status to the record
          });
        } catch (prescErr) {
          console.error(`Error processing prescription ${prescription._id}:`, prescErr);
        }
      }
      
      setMedicationRecords(records);
      setError(null);
    } catch (error: any) {
      console.error("Error processing prescriptions:", error);
      throw error;
    }
  };
  
  // Add debug function to show available data
  const debugMedicationData = async () => {
    if (!token) return;
    
    try {
      console.log('Debug: Fetching all prescriptions to see available statuses');
      const allPrescriptions = await apiService.getPrescriptions({}, token);
      
      console.log('Debug: First 3 prescriptions raw data:', allPrescriptions.slice(0, 3));
      
      // Group by status to see what we have
      const statusCounts: Record<string, number> = {};
      allPrescriptions.forEach((prescription: any) => {
        const status = prescription.status || 'unknown';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
      
      console.log('Debug: Available prescription statuses:', statusCounts);
      setDebugInfo({
        statusCounts,
        totalPrescriptions: allPrescriptions.length,
        firstPrescription: allPrescriptions.length > 0 ? allPrescriptions[0] : null
      });
      
      // Check if we have any 'DISPENSED' prescriptions
      if (statusCounts['DISPENSED'] && statusCounts['DISPENSED'] > 0) {
        console.log('Debug: We have DISPENSED prescriptions, should be showing them');
        
        // Let's check those DISPENSED prescriptions
        const dispensedPrescriptions = allPrescriptions.filter((p: any) => p.status === 'DISPENSED');
        console.log('Debug: First DISPENSED prescription:', dispensedPrescriptions[0]);
      } else {
        console.log('Debug: No DISPENSED prescriptions found, this is why no data appears');
        
        // Let's try to manually search for a few other statuses
        const tryOtherStatuses = async () => {
          try {
            console.log('Debug: Trying with status=PENDING_DISPENSE');
            const pendingPrescriptions = await apiService.getPrescriptions({ status: 'PENDING_DISPENSE' }, token);
            console.log(`Debug: Found ${pendingPrescriptions.length} PENDING_DISPENSE prescriptions`);
            
            if (pendingPrescriptions.length > 0) {
              console.log('Debug: Example PENDING_DISPENSE prescription:', pendingPrescriptions[0]);
            }
          } catch (err) {
            console.error('Debug: Error fetching PENDING_DISPENSE prescriptions', err);
          }
        };
        
        tryOtherStatuses();
      }
      
    } catch (error) {
      console.error('Debug: Error fetching all prescriptions:', error);
    }
  };
  
  // Call debug function when component loads
  useEffect(() => {
    if (token) {
      debugMedicationData();
    }
  }, [token]);
  
  // Filter medications based on search term and date range
  const filteredMedications = medicationRecords.filter(record => {
    // Filter by search term
    const matchesSearch = 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (record.patientId && record.patientId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by date range if applicable
    let matchesDateRange = true;
    if (startDate && endDate) {
      const recordDate = new Date(record.date.split('/').reverse().join('-'));
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDateRange = recordDate >= start && recordDate <= end;
    }
    
    return matchesSearch && matchesDateRange;
  });
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-gray-700"
        >
          ← Quay lại
        </button>
      </div>
      {/* Header section */}
      <div className="mb-8 border-b border-gray-200 pb-5 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Lịch sử thuốc</h1>
          <p className="text-gray-600 mt-2">Xem lịch sử thuốc đã kê cho bệnh nhân</p>
        </div>
        <div>
          <button
            onClick={() => setAllStatuses(!allStatuses)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              allStatuses 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {allStatuses ? 'Chỉ hiển thị đã phát thuốc' : 'Hiển thị tất cả đơn thuốc'}
          </button>
        </div>
      </div>
      
      {/* Main content container */}
      <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white">
        {/* Search and date pickers */}
        <div className="p-6 border-b border-gray-300 bg-white">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-black" />
              </div>
              <input 
                type="text" 
                placeholder="Tìm theo TÊN hoặc ID..." 
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm transition-all text-black placeholder-gray-500" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex flex-col">
                <label htmlFor="start-date" className="block text-sm font-medium text-black mb-1 pl-1">Từ ngày</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon size={16} className="text-black" />
                  </div>
                  <input
                    id="start-date"
                    type="date"
                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm transition-all text-black"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="end-date" className="block text-sm font-medium text-black mb-1 pl-1">Đến ngày</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon size={16} className="text-black" />
                  </div>
                  <input
                    id="end-date"
                    type="date"
                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm transition-all text-black"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Records content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-700">
                Đang tải dữ liệu...
              </h3>
              <p className="text-gray-500 mt-2">
                Vui lòng đợi trong khi chúng tôi tải dữ liệu từ máy chủ
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                <PillIcon size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">
                Không thể tải dữ liệu
              </h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          ) : filteredMedications.length > 0 ? (
            <div className="space-y-6">
              {filteredMedications.map(record => (
                <div key={record.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                  <div className="border-b border-gray-300 bg-gradient-to-r from-gray-50 to-white p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {record.name}
                      </h3>
                      <p className="text-sm text-gray-700 mt-0.5">
                        ID: {record.patientId}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-6">
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">Ngày khám</p>
                        <p className="text-sm font-medium text-gray-800 mt-1">{record.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">Bác sĩ</p>
                        <p className="text-sm font-medium text-gray-800 mt-1">{record.doctor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">Chẩn đoán</p>
                        <p className="text-sm font-medium text-gray-800 mt-1">{record.diagnosis}</p>
                      </div>
                      {record.status && (
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">Trạng thái</p>
                          <p className={`text-sm font-medium mt-1 px-2 py-0.5 rounded inline-block ${
                            record.status === 'DISPENSED' 
                              ? 'bg-green-100 text-green-800' 
                              : record.status === 'PENDING_DISPENSE' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {record.status === 'DISPENSED' 
                              ? 'Đã phát thuốc' 
                              : record.status === 'PENDING_DISPENSE' 
                                ? 'Chờ phát thuốc' 
                                : 'Đã hủy'
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                      <PillIcon size={18} className="mr-2 text-indigo-600" />
                      Danh sách thuốc
                    </h4>
                    <div className="overflow-x-auto rounded-lg border border-gray-300">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                              Tên thuốc
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                              Liều lượng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                              Tần suất
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                              Thời gian dùng
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-300">
                          {record.medications.map((med, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {med.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {med.dosage}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {med.frequency}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {med.duration}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg">
              <PillIcon size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">
                {allStatuses ? 'Không tìm thấy đơn thuốc nào' : 'Không tìm thấy đơn thuốc đã phát'}
              </h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                {allStatuses 
                  ? 'Không có đơn thuốc nào trong hệ thống' 
                  : 'Không có đơn thuốc nào ở trạng thái đã phát (DISPENSED) trong hệ thống.'}
              </p>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={debugMedicationData}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Kiểm tra trạng thái đơn thuốc
                </button>
                
                {!allStatuses && (
                  <button 
                    onClick={() => setAllStatuses(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Hiển thị tất cả đơn thuốc
                  </button>
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Trạng thái đơn thuốc hợp lệ:</p>
                <ul className="mt-2 inline-flex flex-wrap gap-2 justify-center">
                  <li className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md">PENDING_DISPENSE</li>
                  <li className="px-2 py-1 bg-green-100 text-green-800 rounded-md">DISPENSED</li>
                  <li className="px-2 py-1 bg-red-100 text-red-800 rounded-md">CANCELLED</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Pagination */}
          <div className="mt-8 flex justify-between items-center border-t border-gray-200 pt-5">
            <p className="text-sm text-black">
              Hiển thị <span className="font-medium">{filteredMedications.length}</span> kết quả
            </p>
            <div className="inline-flex shadow-sm rounded-md">
              <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-black rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors">
                Trước
              </button>
              <button className="px-4 py-2 bg-gray-200 text-black text-sm font-medium border border-gray-300 relative -ml-px hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-black rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors">
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}