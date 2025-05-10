import React from 'react';
import { PhoneIcon, MapPinIcon } from 'lucide-react';
type PatientProfileProps = {
  patient: {
    name: string;
    age: number;
    gender: string;
    phone: string;
    address: string;
  };
};
export const PatientProfile = ({
  patient
}: PatientProfileProps) => {
  const formatPhoneNumber = (phone: string) => {
    // Format Vietnamese phone number: 0912 345 678 or +84 912 345 678
    if (phone.startsWith('+84')) {
      return phone.replace(/(\+84)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
    }
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  };
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-800">
          <PhoneIcon className="h-4 w-4 mr-2 text-gray-600" />
          <div>
            <span className="font-medium">Số điện thoại:</span>{' '}
            <a href={`tel:${patient.phone}`} className="text-blue-600 hover:text-blue-800">
              {formatPhoneNumber(patient.phone)}
            </a>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-start text-sm text-gray-800">
          <MapPinIcon className="h-4 w-4 mr-2 mt-1 text-gray-600 flex-shrink-0" />
          <div>
            <span className="font-medium">Địa chỉ:</span> {patient.address}
          </div>
        </div>
      </div>
    </div>;
};