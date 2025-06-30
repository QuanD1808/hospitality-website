// Updated 2025-07-01: Removed Statistics tab and consolidated revenue features into InvoiceDetailModal
import React, { useState, useEffect } from 'react';
import { LogOutIcon, PillIcon, AlertTriangle, UserIcon, FileText } from 'lucide-react';
import { PatientList } from './PatientList';
import { PatientDetails } from './PatientDetails';
import { MedicineManager } from './MedicineManager';
import { PharmacyPatient, getPatientsWithPendingPrescriptions } from './pharmacyUtils';
import { useAuth } from '../context/AuthContext';

// User interface for authentication context
interface User {
  fullName: string; // Changed from 'name' to 'fullName' to match User in mockPatients
  role: string;
  // Other user properties (optional)
  _id?: string;
  username?: string;
  email?: string;
}

interface DashboardProps {
  user: User | null; // Assuming user can be null if not logged in
  onLogout: () => void;
}

export const Dashboard = ({
  user,
  onLogout
}: DashboardProps) => {
  const { token } = useAuth(); // Get token from auth context
  const [activeTab, setActiveTab] = useState('dispense'); // Only 'dispense' tab remains
  const [selectedPatient, setSelectedPatient] = useState<PharmacyPatient | null>(null);
  const [waitingPatients, setWaitingPatients] = useState<PharmacyPatient[]>([]);
  const [showMedicineManager, setShowMedicineManager] = useState(false);
  
  // State cho loading và error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Tải dữ liệu bệnh nhân chờ phát thuốc từ API
  const fetchPatients = async () => {
    setIsLoading(true);
    setError(null);
    
    console.log("Dashboard: Starting fetchPatients function");
    console.log("Dashboard: Token available:", !!token);
    
    try {
      // Fetch prescriptions with status PENDING_DISPENSE
      console.log("Dashboard: Calling getPatientsWithPendingPrescriptions...");
      const patients = await getPatientsWithPendingPrescriptions();
      console.log(`Dashboard: Fetched ${patients.length} patients with pending prescriptions`);
      console.log("Dashboard: Patient data:", patients);
      
      setWaitingPatients(patients);
      
      if (patients.length === 0) {
        // Reset selected patient if no patients are waiting
        console.log("Dashboard: No patients in queue, resetting selected patient");
        setSelectedPatient(null);
      }
    } catch (error: any) {
      console.error("Dashboard: Error fetching patients:", error);
      setError(error.message || "Không thể tải danh sách bệnh nhân");
      setWaitingPatients([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch patients on mount and when user changes
  // Initial fetch
  useEffect(() => {
    console.log("Dashboard: Initial useEffect - fetching patients");
    fetchPatients();
  }, [user, token]); // Add token as dependency
  
  // Setup polling for auto-refresh
  useEffect(() => {
    console.log("Dashboard: Setting up polling interval");
    // Set up polling for real-time updates
    const intervalId = setInterval(() => {
      // Only auto-refresh if not viewing a patient's details
      if (!selectedPatient && !isLoading) {
        console.log("Dashboard: Auto-refreshing patient list...");
        fetchPatients();
      }
    }, 60000); // Poll every minute
    
    return () => {
      console.log("Dashboard: Clearing polling interval");
      clearInterval(intervalId);
    };
  }, [selectedPatient, isLoading]);

  const handlePatientSelect = (patient: PharmacyPatient) => {
    console.log("Dashboard: Patient selected:", patient.id, patient.fullName);
    setSelectedPatient(patient);
  };

  const handlePatientRemove = (patientId: string) => {
    console.log(`Dashboard: Removing patient ${patientId} from waiting list after dispensing`);
    setWaitingPatients(prevPatients => prevPatients.filter(p => p.id !== patientId));
    setSelectedPatient(null);
    
    // Also refresh the list to ensure our counts are accurate
    setTimeout(() => {
      fetchPatients();
    }, 1000); // Give the backend a moment to update
  };

  // Add debug output for the render cycle
  console.log("Dashboard: Rendering with state:", {
    activeTab,
    selectedPatient: selectedPatient ? `${selectedPatient.id} - ${selectedPatient.fullName}` : "none",
    waitingPatients: waitingPatients.length,
    isLoading,
    error
  });

  return <div className="min-h-screen bg-gray-50">
      {/* Medicine Manager Overlay */}
      {showMedicineManager && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl">
            <MedicineManager onClose={() => setShowMedicineManager(false)} />
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="bg-blue-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hệ Thống Quản Lý Nhà Thuốc</h1>
          <div className="flex items-center space-x-4">
            {/* Medicine Management Button */}
            <button 
              onClick={() => setShowMedicineManager(true)} 
              className="inline-flex items-center px-3 py-1.5 border border-green-800 text-sm rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors shadow-md font-medium"
              title="Quản lý danh mục thuốc"
            >
              <FileText className="h-4 w-4 mr-1.5 text-white" /> Quản Lý Thuốc
            </button>
            
            <span className="text-sm">
              Xin chào, {user?.fullName || 'Nhân viên'}
            </span>
            <button onClick={onLogout} className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:border-blue-900 focus:shadow-outline-blue active:bg-blue-900 transition duration-150 ease-in-out">
              <LogOutIcon className="h-4 w-4 mr-1" /> Đăng Xuất
            </button>
          </div>
        </div>
      </header>
      
      {/* Navigation - Removed Statistics tab */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex">
              <button className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-blue-500 text-gray-900`}>
                <PillIcon className="h-5 w-5 mr-1" /> Phát Thuốc
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content - Removed Statistics component */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <PatientList 
              patients={waitingPatients} 
              onPatientSelect={handlePatientSelect} 
              onRefresh={fetchPatients}
              isLoading={isLoading}
              error={error}
            />
          </div>
          <div className="w-full md:w-2/3">
            {isLoading && !selectedPatient ? (
              <div className="bg-white shadow rounded-lg p-6 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Đang tải danh sách bệnh nhân...</p>
                </div>
              </div>
            ) : error && !selectedPatient ? (
              <div className="bg-white shadow rounded-lg p-6 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-red-100 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <p className="text-red-600 font-medium mb-2">Không thể tải dữ liệu</p>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button 
                    onClick={fetchPatients}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Thử lại
                  </button>
                </div>
              </div>
            ) : selectedPatient ? (
              <PatientDetails patient={selectedPatient} onPatientComplete={handlePatientRemove} />
            ) : (
              <div className="bg-white shadow rounded-lg p-6 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-gray-700 font-medium mb-2">Chưa có bệnh nhân nào được chọn</p>
                  <p className="text-gray-500">
                    Vui lòng chọn bệnh nhân từ danh sách để xem chi tiết đơn thuốc.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
             Hệ Thống Quản Lý Nhà Thuốc. Bản quyền thuộc về Phòng Khám.
          </p>
        </div>
      </footer>
    </div>;
};