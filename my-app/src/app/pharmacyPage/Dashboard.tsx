import React, { useState, useEffect } from 'react';
import { LogOutIcon, PillIcon, BarChartIcon, AlertTriangle, UserIcon } from 'lucide-react';
import { PatientList } from './PatientList';
import { PatientDetails } from './PatientDetails';
import { Statistics } from './Statistics';
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
  const [activeTab, setActiveTab] = useState('dispense'); // 'dispense' or 'statistics'
  const [selectedPatient, setSelectedPatient] = useState<PharmacyPatient | null>(null);
  const [waitingPatients, setWaitingPatients] = useState<PharmacyPatient[]>([]);
  
  // State cho loading và error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Tải dữ liệu bệnh nhân chờ phát thuốc từ API
  const fetchPatients = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch prescriptions with status PENDING_DISPENSE
      const patients = await getPatientsWithPendingPrescriptions();
      setWaitingPatients(patients);
      console.log(`Fetched ${patients.length} patients with pending prescriptions`);
      
      if (patients.length === 0) {
        // Reset selected patient if no patients are waiting
        setSelectedPatient(null);
      }
    } catch (error: any) {
      console.error("Error fetching patients:", error);
      setError(error.message || "Không thể tải danh sách bệnh nhân");
      setWaitingPatients([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch patients on mount and when user changes
  // Initial fetch
  useEffect(() => {
    fetchPatients();
  }, [user]);
  
  // Setup polling for auto-refresh
  useEffect(() => {
    // Set up polling for real-time updates
    const intervalId = setInterval(() => {
      // Only auto-refresh if not viewing a patient's details
      if (!selectedPatient && !isLoading) {
        console.log("Auto-refreshing patient list...");
        fetchPatients();
      }
    }, 60000); // Poll every minute
    
    return () => clearInterval(intervalId);
  }, [selectedPatient, isLoading]);

  const handlePatientSelect = (patient: PharmacyPatient) => {
    setSelectedPatient(patient);
  };

  const handlePatientRemove = (patientId: string) => {
    console.log(`Removing patient ${patientId} from waiting list after dispensing`);
    setWaitingPatients(prevPatients => prevPatients.filter(p => p._id !== patientId));
    setSelectedPatient(null);
    
    // Also refresh the list to ensure our counts are accurate
    setTimeout(() => {
      fetchPatients();
    }, 1000); // Give the backend a moment to update
  };

  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hệ Thống Quản Lý Nhà Thuốc</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              Xin chào, {user?.fullName || 'Nhân viên'}
            </span>
            <button onClick={onLogout} className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:border-blue-900 focus:shadow-outline-blue active:bg-blue-900 transition duration-150 ease-in-out">
              <LogOutIcon className="h-4 w-4 mr-1" /> Đăng Xuất
            </button>
          </div>
        </div>
      </header>
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex space-x-8">
              <button onClick={() => {
              setActiveTab('dispense');
              setSelectedPatient(null);
            }} className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${activeTab === 'dispense' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <PillIcon className="h-5 w-5 mr-1" /> Phát Thuốc
              </button>
              <button onClick={() => {
              setActiveTab('statistics');
              setSelectedPatient(null);
            }} className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${activeTab === 'statistics' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <BarChartIcon className="h-5 w-5 mr-1" /> Xem Thống Kê Doanh Thu
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dispense' ? <div className="flex flex-col md:flex-row gap-6">
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
          </div> : <Statistics />}
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2023 Hệ Thống Quản Lý Nhà Thuốc. Bản quyền thuộc về Phòng Khám.
          </p>
        </div>
      </footer>
    </div>;
};