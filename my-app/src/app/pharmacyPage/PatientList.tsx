import React, { useState, useEffect } from 'react';
import { UserIcon, RefreshCw, AlertCircle, ClipboardList, Clock } from 'lucide-react';
import { PharmacyPatient, getPatientsWithPendingPrescriptions } from './pharmacyUtils';
import { useAuth } from '../context/AuthContext';

interface PatientListProps {
  patients: PharmacyPatient[];
  onPatientSelect: (patient: PharmacyPatient) => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const PatientList = ({
  patients,
  onPatientSelect,
  onRefresh,
  isLoading = false,
  error = null
}: PatientListProps) => {
  const { token } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Function to handle manual refresh
  const handleRefresh = async () => {
    if (isRefreshing || isLoading) return;
    
    setIsRefreshing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error("Error refreshing patient list:", error);
    } finally {
      // Add a small delay for better UX
      setTimeout(() => {
        setIsRefreshing(false);
      }, 800);
    }
  };
  
  return <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <ClipboardList className="h-5 w-5 text-white mr-2" />
          <h2 className="text-lg font-medium text-white">
            Danh Sách Chờ Phát Thuốc
          </h2>
          {patients.length > 0 && (
            <span className="ml-2 bg-white text-blue-600 rounded-full px-2 py-0.5 text-xs font-medium">
              {patients.length}
            </span>
          )}
        </div>
        <button 
          onClick={handleRefresh} 
          className={`p-1.5 rounded-full text-white hover:bg-blue-700 transition-all focus:outline-none ${isRefreshing ? 'animate-spin' : ''}`}
          disabled={isRefreshing || isLoading}
          title="Làm mới danh sách"
        >
          <RefreshCw size={18} />
        </button>
      </div>
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {isRefreshing || isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <RefreshCw size={24} className="animate-spin mx-auto text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">{isRefreshing ? 'Đang cập nhật danh sách...' : 'Đang tải danh sách...'}</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <div className="rounded-full bg-red-100 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-red-600 font-medium">Không thể tải dữ liệu</p>
            <p className="text-sm text-gray-600 mt-2 mb-4">{error}</p>
            <button 
              onClick={handleRefresh}
              className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <RefreshCw size={16} className="mr-2" /> Thử lại
            </button>
          </div>
        ) : patients.length > 0 ? (
          patients.map(patient => (
            <div key={patient.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium text-gray-900">
                        {patient.fullName}
                      </p>
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {patient.serialNumber}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {patient.phone || 'Không có SĐT'}
                    </p>
                    <div className="flex items-center text-xs text-blue-600 mt-1">
                      <span className="font-medium">Bác sĩ:</span> 
                      <span className="ml-1">{patient.doctor}</span>
                    </div>
                    <div className="flex flex-col mt-1">
                      {patient.diagnosis && (
                        <div className="text-xs text-gray-700">
                          <span className="font-medium">Chẩn đoán:</span> 
                          <span className="ml-1 line-clamp-1">{patient.diagnosis}</span>
                        </div>
                      )}
                      {patient.prescription && (
                        <div className="flex items-center text-xs text-green-600 mt-0.5">
                          <Clock size={12} className="mr-1" />
                          <span className="font-medium">{patient.prescription.length} loại thuốc cần phát</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onPatientSelect(patient)} 
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Phát thuốc
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="rounded-full bg-gray-100 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">Không có bệnh nhân nào trong danh sách chờ.</p>
            <p className="text-sm text-gray-500 mt-1">Tất cả đơn thuốc đã được phát.</p>
            <button 
              onClick={handleRefresh}
              className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw size={16} className="mr-2" /> Kiểm tra lại
            </button>
          </div>
        )}
      </div>
    </div>;
};