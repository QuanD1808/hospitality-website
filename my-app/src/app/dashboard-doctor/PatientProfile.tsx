import React from 'react';
import { PhoneIcon, MapPinIcon, MailIcon, UserIcon } from 'lucide-react';
import { User } from '../datats/mockPatients';

type PatientProfileProps = {
  patient: User | null;
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
  if (!patient) {
    return <div className="p-4 bg-gray-50 rounded-lg text-gray-500 text-sm">Không có thông tin bệnh nhân</div>;
  }
  
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-800">
          <UserIcon className="h-4 w-4 mr-2 text-gray-600" />
          <div>
            <span className="font-medium">ID:</span> {patient.userId}
          </div>
        </div>
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
      <div className="space-y-3">
        <div className="flex items-start text-sm text-gray-800">
          <MailIcon className="h-4 w-4 mr-2 mt-1 text-gray-600 flex-shrink-0" />
          <div>
            <span className="font-medium">Email:</span>{' '}
            <a href={`mailto:${patient.email}`} className="text-blue-600 hover:text-blue-800">
              {patient.email}
            </a>
          </div>
        </div>
        <div className="flex items-start text-sm text-gray-800">
          <MapPinIcon className="h-4 w-4 mr-2 mt-1 text-gray-600 flex-shrink-0" />
          <div>
            <span className="font-medium">Ngày tạo:</span> {new Date(patient.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>;
};