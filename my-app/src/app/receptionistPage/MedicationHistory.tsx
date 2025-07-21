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
  originalDate?: string; // Original date string for sorting
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
  const [allStatuses, setAllStatuses] = useState(true); // Toggle to show all statuses - default to true to show all
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load medication data from API
  useEffect(() => {
    if (!token) return;
    
    const initializeData = async () => {
      const isTokenValid = await verifyToken();
      if (!isTokenValid) return;
      
      if (allStatuses) {
        loadAllPrescriptions();
      } else {
        loadDispensedPrescriptions();
      }
    };
    
    initializeData();
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
      
      if (prescriptions.length === 0) {
        console.log('No DISPENSED prescriptions found, checking if they exist with other statuses');
        const allPrescriptions = await apiService.getPrescriptions({}, token);
        console.log(`Total prescriptions: ${allPrescriptions.length}`);
        
        // Filter them manually to see if any have DISPENSED status
        const dispensedPrescriptions = allPrescriptions.filter((p: any) => p.status === 'DISPENSED');
        console.log(`Manually filtered DISPENSED prescriptions: ${dispensedPrescriptions.length}`);
        
        if (dispensedPrescriptions.length > 0) {
          console.log('Found DISPENSED prescriptions when not filtering by status, using those');
          await processPrescriptions(dispensedPrescriptions);
        } else {
          console.log('No DISPENSED prescriptions found even in unfiltered results');
          setMedicationRecords([]);
        }
      } else {
        await processPrescriptions(prescriptions);
      }
    } catch (error: any) {
      console.error("Error loading dispensed medication data:", error);
      
      // Handle specific error cases
      if (error.response) {
        if (error.response.status === 403) {
          setError("Bạn không có quyền xem dữ liệu này. Vui lòng liên hệ với quản trị viên.");
        } else if (error.response.status === 401) {
          setError("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
        } else {
          setError(`Lỗi từ máy chủ: ${error.response.status} - ${error.response.data?.message || error.message}`);
        }
      } else {
        setError(error.message || "Không thể tải dữ liệu lịch sử thuốc");
      }
      
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
      
      // Check if we have prescriptions to process
      if (prescriptions.length === 0) {
        console.log('No prescriptions found at all');
        setMedicationRecords([]);
      } else {
        console.log('Processing prescription data for display');
        await processPrescriptions(prescriptions);
        
        // Log the first few prescriptions to debug
        prescriptions.slice(0, 3).forEach((prescription: any, index: number) => {
          console.log(`Prescription ${index + 1}:`, {
            id: prescription._id,
            status: prescription.status,
            patientName: prescription.patientId?.fullName || 'Unknown',
            diagnosis: prescription.diagnosis
          });
        });
      }
    } catch (error: any) {
      console.error("Error loading all medication data:", error);
      
      // Handle specific error cases
      if (error.response) {
        if (error.response.status === 403) {
          setError("Bạn không có quyền xem dữ liệu này. Vui lòng liên hệ với quản trị viên.");
        } else if (error.response.status === 401) {
          setError("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
        } else {
          setError(`Lỗi từ máy chủ: ${error.response.status} - ${error.response.data?.message || error.message}`);
        }
      } else {
        setError(error.message || "Không thể tải dữ liệu lịch sử thuốc");
      }
      
      setMedicationRecords([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Common function to process prescriptions data
  const processPrescriptions = async (prescriptions: any[]) => {
    try {
      console.log(`Processing ${prescriptions.length} prescriptions`);
      
      // Sort prescriptions by newest first - using createdAt field if available, or date
      const sortedPrescriptions = [...prescriptions].sort((a, b) => {
        // Use createdAt if available, otherwise fall back to date field
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.date);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.date);
        
        // Sort in descending order (newest first)
        return dateB.getTime() - dateA.getTime();
      });
      
      console.log('Sorted prescriptions by newest first');
      
      // Transform prescriptions to the format we need for display
      const records: MedicationRecordDisplay[] = [];
      
      for (const prescription of sortedPrescriptions) {
        try {
          // Verify that the prescription object is valid
          if (!prescription || !prescription._id) {
            console.error('Invalid prescription object:', prescription);
            continue;
          }
          
          // Get prescription details (medicines)
          console.log(`MedicationHistory: Fetching details for prescription ${prescription._id}`);
          
          // Fix for TypeScript errors - ensure token is not null
          if (!token) {
            console.error('Token is null, cannot fetch prescription details');
            continue;
          }
          
          // Add error handling for prescription details with detailed logging
          let prescriptionDetails = [];
          try {
            console.log(`Calling getPrescriptionDetails API for prescriptionId: ${prescription._id}`);
            prescriptionDetails = await apiService.getPrescriptionDetails(prescription._id, token);
            console.log(`Got ${prescriptionDetails.length} medication details for prescription ${prescription._id}`, prescriptionDetails);
            
            // Log the first detail if available for debugging
            if (prescriptionDetails.length > 0) {
              console.log('First prescription detail:', prescriptionDetails[0]);
            }
          } catch (detailsError: any) {
            console.error(`Error fetching details for prescription ${prescription._id}:`, detailsError);
            if (detailsError.response) {
              console.error('Details error status:', detailsError.response.status);
              console.error('Details error data:', detailsError.response.data);
            }
            // Try a direct fetch as a backup
            try {
              const url = `http://localhost:5000/api/prescriptiondetails?prescriptionId=${prescription._id}`;
              console.log(`Trying direct fetch to: ${url}`);
              const response = await fetch(url, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });
              
              if (!response.ok) {
                console.error(`Direct fetch error: ${response.status}`);
              } else {
                prescriptionDetails = await response.json();
                console.log(`Direct fetch success: Got ${prescriptionDetails.length} details`);
              }
            } catch (directError) {
              console.error('Direct fetch also failed:', directError);
            }
          }
          
          // Transform prescription details to medication details
          const medications: MedicationDetailDisplay[] = [];
          
          console.log(`Processing ${prescriptionDetails.length} medication details for prescription ${prescription._id}`);
          
          // For each medicine in the prescription
          for (const detail of prescriptionDetails) {
            try {
              console.log('Processing prescription detail:', detail);
              
              // Get medicine details if medicineId is an object with _id
              let medicineId;
              if (detail.medicineId) {
                medicineId = typeof detail.medicineId === 'object' ? 
                  (detail.medicineId._id || detail.medicineId.id) : detail.medicineId;
              } else {
                console.error('Missing medicineId in prescription detail:', detail);
                continue;
              }
              
              console.log(`Extracted medicineId: ${medicineId}`);
              
              // Fix for TypeScript errors - ensure token is not null
              if (!token) {
                console.error('Token is null, cannot fetch medicine details');
                continue;
              }
              
              let medicine = null;
              
              // Check if medicineId is already populated
              if (detail.medicineId && typeof detail.medicineId === 'object') {
                medicine = detail.medicineId;
                console.log(`Medicine already populated: ${JSON.stringify(medicine)}`);
                console.log(`Medicine name from populated object: ${medicine.name}`);
              } else {
                try {
                  console.log(`Fetching medicine details for ID: ${medicineId}`);
                  medicine = await apiService.getMedicineById(medicineId, token);
                  console.log(`Successfully fetched medicine: ${medicine.name}`);
                } catch (medicineError) {
                  console.error(`Error fetching medicine ${medicineId}:`, medicineError);
                }
              }
              
              // Parse dosage to extract frequency and duration (with error handling)
              let frequency = 'Không có thông tin';
              try {
                if (detail.dosage) {
                  const dosageInfo = detail.dosage.split(' ');
                  frequency = dosageInfo.length > 0 ? dosageInfo.join(' ') : 'Không có thông tin';
                }
              } catch (parseError) {
                console.error('Error parsing dosage:', parseError);
              }
              
              // Calculate duration based on quantity and dosage (with error handling)
              let duration = 'Không xác định';
              try {
                if (detail.dosage && detail.quantity) {
                  const dosageInfo = detail.dosage.split(' ');
                  const firstNumberInDosage = parseInt(dosageInfo[0]);
                  if (!isNaN(firstNumberInDosage) && firstNumberInDosage > 0) {
                    duration = `${Math.round(detail.quantity / firstNumberInDosage)} ngày`;
                  }
                }
              } catch (durationError) {
                console.error('Error calculating duration:', durationError);
              }
              
              medications.push({
                name: medicine?.name || 'Không xác định thuốc',
                dosage: detail.dosage || 'Không xác định liều lượng',
                frequency: frequency,
                duration: duration
              });
            } catch (medErr) {
              console.error(`Error processing medicine details for ${detail.medicineId}:`, medErr);
              medications.push({
                name: 'Lỗi dữ liệu thuốc',
                dosage: 'Không xác định',
                frequency: 'Không xác định',
                duration: 'Không xác định'
              });
            }
          }
          
          // Format date for display (with error handling)
          let formattedDate = 'Không xác định';
          let originalDate; // Store the original date for sorting
          try {
            const dateObj = new Date(prescription.date);
            originalDate = dateObj;
            if (!isNaN(dateObj.getTime())) {
              formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
            }
          } catch (dateError) {
            console.error('Error formatting date:', dateError);
          }
          
          // Get patient and doctor info directly from populated fields if available (with error handling)
          let patient = { fullName: 'Không xác định', _id: 'Unknown' };
          let doctor = { fullName: 'Không xác định' };
          
          try {
            if (prescription.patientId && typeof prescription.patientId === 'object') {
              patient = prescription.patientId;
            }
          } catch (patientError) {
            console.error('Error processing patient info:', patientError);
          }
          
          try {
            if (prescription.doctorId && typeof prescription.doctorId === 'object') {
              doctor = prescription.doctorId;
            }
          } catch (doctorError) {
            console.error('Error processing doctor info:', doctorError);
          }
          
          // Create the record with proper error handling for all fields
          const record: MedicationRecordDisplay = {
            id: prescription._id || 'unknown',
            name: patient.fullName || 'Không xác định',
            patientId: patient._id || 'Unknown',
            date: formattedDate,
            originalDate: prescription.createdAt || prescription.date, // Store original date for sorting
            doctor: doctor.fullName || 'Không xác định',
            diagnosis: prescription.diagnosis || 'Không có chẩn đoán',
            medications: medications,
            status: prescription.status || 'Unknown' // Add status to the record
          };
          
          records.push(record);
          console.log(`Added record for patient ${record.name} with ${medications.length} medications`);
          
        } catch (prescErr) {
          console.error(`Error processing prescription ${prescription?._id || 'unknown'}:`, prescErr);
        }
      }
      
      console.log(`Finished processing ${records.length} records out of ${prescriptions.length} prescriptions`);
      
      // Reset to first page when data changes
      setCurrentPage(1);
      setMedicationRecords(records);
      setError(null);
    } catch (error: any) {
      console.error("Error processing prescriptions:", error);
      setError("Lỗi xử lý dữ liệu đơn thuốc: " + (error.message || error));
    }
  };
  
  // Add debug function to show available data
  const debugMedicationData = async () => {
    if (!token) {
      setError("Bạn chưa đăng nhập. Vui lòng đăng nhập để xem dữ liệu.");
      return;
    }
    
    try {
      console.log('Debug: Checking token validity');
      const tokenStatus = await apiService.validateToken(token);
      
      if (!tokenStatus.valid) {
        console.error('Debug: Token is invalid:', tokenStatus.reason);
        setError("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
        return;
      }
      
      console.log('Debug: Token is valid, user role:', tokenStatus.data?.role);
      console.log('Debug: Token data object:', tokenStatus.data);
      
      // Show the user's information - this is helpful for debugging permission issues
      console.log('Debug: User details:', {
        id: tokenStatus.data?._id,
        username: tokenStatus.data?.username,
        role: tokenStatus.data?.role,
      });
      
      // Manually test API access with a direct fetch - bypassing any frontend caching or filtering
      console.log('Debug: Making direct fetch to prescriptions API with DISPENSED filter');
      try {
        const url = 'http://localhost:5000/api/prescriptions?status=DISPENSED';
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Debug: Direct fetch status:', response.status);
        if (!response.ok) {
          console.error('Debug: Direct fetch error:', await response.text());
        } else {
          const data = await response.json();
          console.log(`Debug: Direct fetch found ${data.length} DISPENSED prescriptions`);
          if (data.length > 0) {
            console.log('Debug: First direct fetch result:', data[0]);
          }
        }
      } catch (directFetchError) {
        console.error('Debug: Direct fetch error:', directFetchError);
      }
      
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
        firstPrescription: allPrescriptions.length > 0 ? allPrescriptions[0] : null,
        userRole: tokenStatus.data?.role,
        userId: tokenStatus.data?._id,
      });
      
      // Check if we have any 'DISPENSED' prescriptions
      if (statusCounts['DISPENSED'] && statusCounts['DISPENSED'] > 0) {
        console.log('Debug: We have DISPENSED prescriptions, should be showing them');
        
        // Let's check those DISPENSED prescriptions
        const dispensedPrescriptions = allPrescriptions.filter((p: any) => p.status === 'DISPENSED');
        console.log('Debug: First DISPENSED prescription:', dispensedPrescriptions[0]);
        
        // Check why it's not showing up in the main view
        console.log('Debug: Testing specific API call for DISPENSED prescriptions');
        const specificDispensedPrescriptions = await apiService.getPrescriptions({ status: 'DISPENSED' }, token);
        console.log(`Debug: API call found ${specificDispensedPrescriptions.length} DISPENSED prescriptions`);
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
            
            // Check the specific prescription you mentioned by ID
            const specificId = '68614f3d994cbb5f5a751225';
            console.log(`Debug: Checking for specific prescription with ID ${specificId}`);
            try {
              const specificPrescription = await apiService.getPrescriptionById(specificId, token);
              console.log('Debug: Found specific prescription:', specificPrescription);
              console.log('Debug: Status of specific prescription:', specificPrescription?.status);
            } catch (err) {
              console.error(`Debug: Error fetching specific prescription ${specificId}:`, err);
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
      // Instead of calling debugMedicationData directly, try to load the data properly first
      const initializeData = async () => {
        try {
          console.log('Component mounted, verifying token and loading data');
          const isTokenValid = await verifyToken();
          
          if (isTokenValid) {
            // Try to load prescriptions
            if (allStatuses) {
              await loadAllPrescriptions();
            } else {
              await loadDispensedPrescriptions();
            }
            
            // If no medication records were loaded, try the debug function
            if (medicationRecords.length === 0) {
              console.log('No medication records loaded, running debug function');
              await debugMedicationData();
            }
          }
        } catch (err) {
          console.error('Error during initialization:', err);
        }
      };
      
      initializeData();
    }
  }, [token]);
  
  // Function to verify token is valid
  const verifyToken = async () => {
    if (!token) {
      setError("Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn");
      return false;
    }
    
    try {
      // Verify token is valid using validateToken function
      console.log('Verifying token validity...');
      const tokenStatus = await apiService.validateToken(token);
      
      if (!tokenStatus.valid) {
        console.error('Token is invalid:', tokenStatus.reason);
        setError("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
        return false;
      }
      
      console.log('Token is valid, checking permissions...');
      
      // Check if user has specific role with permissions
      if (tokenStatus.data && tokenStatus.data.role) {
        console.log('User role:', tokenStatus.data.role);
        
        // Check specific role permissions for viewing prescriptions
        if (!['ADMIN', 'RECEPTIONIST', 'PHARMACIST', 'DOCTOR'].includes(tokenStatus.data.role)) {
          console.error('User role does not have permission:', tokenStatus.data.role);
          setError("Bạn không có quyền xem lịch sử thuốc");
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error verifying token:', error);
      setError("Không thể xác thực phiên làm việc. Vui lòng đăng nhập lại.");
      return false;
    }
  };
  
  // Filter medications based on search term and date range
  const filteredMedications = medicationRecords.filter(record => {
    // Filter by search term
    const matchesSearch = 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (record.patientId && record.patientId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by date range if applicable
    let matchesDateRange = true;
    if (startDate && endDate) {
      let recordDate;
      try {
        // Try to parse the date from the formatted string (DD/MM/YYYY format)
        recordDate = new Date(record.date.split('/').reverse().join('-'));
      } catch {
        // If that fails, use the original date field if available
        recordDate = record.originalDate ? new Date(record.originalDate) : new Date();
      }
      const start = new Date(startDate);
      const end = new Date(endDate);
      // Add one day to end date to include the end date in results
      end.setDate(end.getDate() + 1);
      matchesDateRange = recordDate >= start && recordDate <= end;
    }
    
    return matchesSearch && matchesDateRange;
  });
  
  // Function to show a prescription from the debug data
  const showDebugPrescription = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Create a set of mock prescriptions to demonstrate pagination
      const mockPrescriptions = [];
      const baseDate = new Date("2024-06-01T10:00:00.000Z");
      
      // Create 15 mock prescriptions with different dates to show pagination
      for (let i = 0; i < 15; i++) {
        const mockDate = new Date(baseDate);
        mockDate.setDate(baseDate.getDate() - i); // Each record is a day older
        
        mockPrescriptions.push({
          _id: `debug-prescription-${i+1}`,
          customPrescriptionId: `pr${i+1}`,
          patientId: {
            _id: `patient-${i+1}`,
            username: "nguyen.an",
            email: "an.nguyen@mediclinic.com",
            fullName: `Bệnh nhân mẫu ${i+1}`,
            phone: "0901234567"
          },
          doctorId: {
            _id: "doctor-1",
            username: "tran.hoa",
            email: "hoa.tran@mediclinic.com",
            fullName: "Trần Thị Hoa",
            phone: "0912345678"
          },
          diagnosis: i % 3 === 0 ? "Cảm cúm" : (i % 3 === 1 ? "Đau họng" : "Đau đầu"),
          date: mockDate.toISOString(),
          status: "DISPENSED",
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString()
        });
      }
      
      // Process the mock prescriptions to create records
      console.log('Using mock prescription data for debugging pagination');
      
      const records: MedicationRecordDisplay[] = mockPrescriptions.map((mockPrescription, index) => {
        // Generate 1-3 mock medications for each prescription
        const medicationCount = (index % 3) + 1;
        const mockMedications: MedicationDetailDisplay[] = [];
        
        for (let j = 0; j < medicationCount; j++) {
          const medicationTypes = [
            {
              name: 'Paracetamol',
              dosage: '2 viên x 3 lần/ngày',
              frequency: '3 lần/ngày',
              duration: '5 ngày'
            },
            {
              name: 'Vitamin C',
              dosage: '1 viên x 2 lần/ngày',
              frequency: '2 lần/ngày',
              duration: '7 ngày'
            },
            {
              name: 'Amoxicillin',
              dosage: '1 viên x 3 lần/ngày',
              frequency: '3 lần/ngày',
              duration: '5 ngày'
            }
          ];
          
          mockMedications.push(medicationTypes[j % 3]);
        }
        
        const formattedDate = new Date(mockPrescription.date).toLocaleDateString('vi-VN');
        
        return {
          id: mockPrescription._id,
          name: mockPrescription.patientId.fullName,
          patientId: mockPrescription.patientId._id,
          date: formattedDate,
          originalDate: mockPrescription.createdAt,
          doctor: mockPrescription.doctorId.fullName,
          diagnosis: mockPrescription.diagnosis,
          medications: mockMedications,
          status: mockPrescription.status
        };
      });
      
      // Sort the records by newest first
      records.sort((a, b) => {
        const dateA = new Date(a.originalDate || a.date);
        const dateB = new Date(b.originalDate || b.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      // Set the medication records directly
      setMedicationRecords(records);
      console.log(`Set ${records.length} mock medication records for pagination testing`);
    } catch (err) {
      console.error('Error creating mock records:', err);
      setError('Lỗi khi tạo dữ liệu mẫu');
    } finally {
      setLoading(false);
    }
  };
  
  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredMedications.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredMedications.length / recordsPerPage);
  
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
      <div className="mb-8 border-b border-gray-200 pb-5 flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Lịch sử thuốc</h1>
          <p className="text-gray-600 mt-2 flex items-center">
            Xem lịch sử thuốc đã kê cho bệnh nhân
            <span className="ml-2 inline-flex items-center text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
              </svg>
              Mới nhất lên đầu
            </span>
          </p>
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <span className="text-sm text-gray-600">
            {filteredMedications.length} kết quả ({recordsPerPage} mỗi trang)
          </span>
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
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4 flex-wrap">
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Thử lại
                </button>
                
                <button 
                  onClick={verifyToken}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Kiểm tra quyền truy cập
                </button>
                
                <button 
                  onClick={showDebugPrescription}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Dùng dữ liệu mẫu
                </button>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p><b>Gợi ý khắc phục:</b></p>
                <ul className="list-disc pl-8 mt-2 text-left max-w-lg mx-auto">
                  <li>Hãy chắc chắn bạn đã đăng nhập với tài khoản có quyền RECEPTIONIST</li>
                  <li>Đảm bảo backend đã được cấu hình cho phép RECEPTIONIST xem đơn thuốc</li>
                  <li>Kiểm tra kết nối mạng đến server API</li>
                  <li>Nếu vẫn gặp vấn đề, hãy liên hệ quản trị viên</li>
                </ul>
              </div>
            </div>
          ) : currentRecords.length > 0 ? (
            <div className="space-y-6">
              {currentRecords.map(record => (
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
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
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
                
                <button 
                  onClick={async () => {
                    try {
                      setLoading(true);
                      // Try multiple IDs if needed
                      const specificIds = [
                        '68614f3d994cbb5f5a751225', // Your specific ID
                        '685face23fc4c04e1bd96c13'  // First prescription from debug data
                      ];
                      
                      // Try each ID until one works
                      for (const id of specificIds) {
                        try {
                          console.log(`Checking specific prescription: ${id}`);
                          const prescription = await apiService.getPrescriptionById(id, token || '');
                          
                          if (prescription) {
                            console.log(`Found prescription with ID ${id}:`, prescription);
                            console.log(`Status: ${prescription.status}`);
                            
                            // Process and display this single prescription
                            await processPrescriptions([prescription]);
                            setLoading(false);
                            setError(null);
                            return; // Exit the loop if successful
                          }
                        } catch (idError) {
                          console.error(`Error fetching prescription with ID ${id}:`, idError);
                          // Continue to next ID
                        }
                      }
                      
                      // If we get here, none of the IDs worked
                      console.error('Could not find any specific prescriptions');
                      setError(`Không thể tìm thấy đơn thuốc cụ thể. Hãy kiểm tra lại ID hoặc quyền truy cập.`);
                      setLoading(false);
                    } catch (err: any) {
                      console.error('Error in specific prescription check:', err);
                      setError(`Lỗi khi tìm đơn thuốc cụ thể: ${err.message || err}`);
                      setLoading(false);
                    }
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  Kiểm tra đơn thuốc cụ thể
                </button>
                
                <button 
                  onClick={showDebugPrescription}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                >
                  Hiển thị dữ liệu từ debug
                </button>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Trạng thái đơn thuốc hợp lệ:</p>
                <ul className="mt-2 inline-flex flex-wrap gap-2 justify-center">
                  <li className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md">PENDING_DISPENSE</li>
                  <li className="px-2 py-1 bg-green-100 text-green-800 rounded-md">DISPENSED</li>
                  <li className="px-2 py-1 bg-red-100 text-red-800 rounded-md">CANCELLED</li>
                </ul>
                
                {debugInfo && (
                  <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-left overflow-auto">
                    <h4 className="font-medium mb-2 text-gray-800">Debug Information:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p><b>User Role:</b> {debugInfo.userRole || 'Unknown'}</p>
                        <p><b>User ID:</b> {debugInfo.userId || 'Unknown'}</p>
                        <p><b>Total Prescriptions:</b> {debugInfo.totalPrescriptions || 0}</p>
                      </div>
                      <div>
                        <p><b>Status Counts:</b></p>
                        <ul className="list-disc pl-5">
                          {debugInfo.statusCounts && Object.entries(debugInfo.statusCounts).map(([status, count]) => (
                            <li key={status}>{status}: {String(count)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {debugInfo.firstPrescription && (
                      <div className="mt-3">
                        <p><b>First Prescription:</b></p>
                        <pre className="text-xs bg-gray-100 p-2 mt-1 max-h-40 overflow-auto rounded">
                          {JSON.stringify(debugInfo.firstPrescription, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Pagination */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-5 gap-4">
            <div className="flex items-center gap-2 text-sm text-black">
              <p>
                Hiển thị {filteredMedications.length > 0 ? 
                  `${indexOfFirstRecord + 1} - ${Math.min(indexOfLastRecord, filteredMedications.length)} của ${filteredMedications.length} kết quả` : 
                  "0 kết quả"}
              </p>
              
              <select 
                className="ml-2 border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={recordsPerPage}
                onChange={(e) => {
                  setRecordsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when changing items per page
                }}
              >
                <option value={10}>10 mỗi trang</option>
                <option value={20}>20 mỗi trang</option>
                <option value={50}>50 mỗi trang</option>
                <option value={100}>100 mỗi trang</option>
                <option value={filteredMedications.length}>Hiển thị tất cả</option>
              </select>
            </div>
            
            {totalPages > 1 && (
              <div className="inline-flex shadow-sm rounded-md">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border border-gray-300 text-sm font-medium rounded-l-md ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-50'
                  } focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors`}
                >
                  Trước
                </button>
                
                {/* Show page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Logic to show pages around current page
                  let pageToShow;
                  if (totalPages <= 5) {
                    pageToShow = i + 1;
                  } else if (currentPage <= 3) {
                    pageToShow = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageToShow = totalPages - 4 + i;
                  } else {
                    pageToShow = currentPage - 2 + i;
                  }
                  
                  if (pageToShow > 0 && pageToShow <= totalPages) {
                    return (
                      <button
                        key={pageToShow}
                        onClick={() => setCurrentPage(pageToShow)}
                        className={`px-4 py-2 border border-gray-300 relative -ml-px ${
                          currentPage === pageToShow
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-black hover:bg-gray-50'
                        } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors`}
                      >
                        {pageToShow}
                      </button>
                    );
                  }
                  return null;
                })}
                
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md ${
                    currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-50'
                  } focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors`}
                >
                  Sau
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}