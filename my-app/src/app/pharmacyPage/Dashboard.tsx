import React, { useState } from 'react';
import { LogOutIcon, PillIcon, BarChartIcon } from 'lucide-react';
import { PatientList } from './PatientList';
import { PatientDetails } from './PatientDetails';
import { Statistics } from './Statistics';
import { patients } from '../datats/mockData';
export const Dashboard = ({
  user,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState('dispense'); // 'dispense' or 'statistics'
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [waitingPatients, setWaitingPatients] = useState(patients);
  const handlePatientSelect = patient => {
    setSelectedPatient(patient);
  };
  const handlePatientRemove = patientId => {
    setWaitingPatients(waitingPatients.filter(p => p.id !== patientId));
    setSelectedPatient(null);
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hệ Thống Quản Lý Nhà Thuốc</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              Xin chào, {user?.name || 'Nhân viên'}
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
              <PatientList patients={waitingPatients} onPatientSelect={handlePatientSelect} />
            </div>
            <div className="w-full md:w-2/3">
              {selectedPatient ? <PatientDetails patient={selectedPatient} onPatientComplete={handlePatientRemove} /> : <div className="bg-white shadow rounded-lg p-6 h-96 flex items-center justify-center">
                  <p className="text-gray-500 text-center">
                    Vui lòng chọn bệnh nhân từ danh sách để xem chi tiết.
                  </p>
                </div>}
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