'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Dashboard } from './Dashboard';
import { PatientManagement } from './PatientManagement';
import { QueueManagement } from './QueueManagement';
import { MedicationHistory } from './MedicationHistory';
import { AppointmentBooking } from './AppointmentBooking';

export default function ReceptionistPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [currentView, setCurrentView] = useState('Dashboard');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'RECEPTIONIST') {
      logout();
      router.push('/login');
    }
  }, [isAuthenticated, router, user, logout]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderCurrentView = () => {
    switch(currentView) {
      case 'PatientManagement':
        return <PatientManagement onBack={() => setCurrentView('Dashboard')} />;
      case 'QueueManagement':
        return <QueueManagement onBack={() => setCurrentView('Dashboard')} />;
      case 'MedicationHistory':
        return <MedicationHistory onBack={() => setCurrentView('Dashboard')} />;
      case 'AppointmentBooking':  // Thêm case này để xử lý AppointmentBooking
        return <AppointmentBooking onBack={() => setCurrentView('Dashboard')} />;
      case 'Dashboard':
      default:
        return <Dashboard onNavigate={(view) => setCurrentView(view)} />;
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {renderCurrentView()}
    </div>
  );
}