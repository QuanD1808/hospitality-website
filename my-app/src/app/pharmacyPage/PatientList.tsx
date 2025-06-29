import React from 'react';
import { UserIcon } from 'lucide-react';
import { PharmacyPatient } from './pharmacyUtils';

interface PatientListProps {
  patients: PharmacyPatient[];
  onPatientSelect: (patient: PharmacyPatient) => void;
}

export const PatientList = ({
  patients,
  onPatientSelect
}: PatientListProps) => {
  return <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="bg-blue-600 px-4 py-3">
        <h2 className="text-lg font-medium text-white">
          Danh Sách Chờ Phát Thuốc
        </h2>
      </div>
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {patients.length > 0 ? patients.map(patient => <div key={patient.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {patient.serialNumber} - {patient.fullName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {patient.phone}
                    </p>
                  </div>
                </div>
                <button onClick={() => onPatientSelect(patient)} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Phát thuốc
                </button>
              </div>
            </div>) : <div className="p-4 text-center text-gray-500">
            Không có bệnh nhân nào trong danh sách chờ.
          </div>}
      </div>
    </div>;
};