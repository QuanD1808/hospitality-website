// Interface cho đơn thuốc từ MongoDB
export interface Prescription {
  _id: string;
  customPrescriptionId: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  date: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interface cho chi tiết đơn thuốc từ MongoDB
export interface PrescriptionDetail {
  _id: string;
  customPrescriptionDetailId: string;
  prescriptionId: string;
  medicineId: string;
  quantity: number;
  dosage: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// Interface cho thuốc từ MongoDB
export interface Medicine {
  _id: string;
  customMedicineId: string;
  name: string;
  unit: string;
  totalPills: number;
  price: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// Interface cho người dùng từ MongoDB
export interface User {
  _id: string;
  userId: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  gender?: string;
  dateOfBirth?: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// Interface cho hiển thị trong PatientList
export interface PharmacyPatient {
  _id: string;
  prescriptionId: string;
  customPrescriptionId: string;
  fullName: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  diagnosis: string;
  doctorName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  medications: PharmacyMedication[];
}

// Interface cho hiển thị thuốc trong PatientDetails
export interface PharmacyMedication {
  _id: string;
  customPrescriptionDetailId: string;
  medicineId: string;
  medicineName: string;
  medicineUnit: string;
  quantity: number;
  dosage: string;
  price: number;
  total: number;
}
