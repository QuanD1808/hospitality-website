// Types for medical history
export interface MedicalHistory {
  allergies: string;
  chronicConditions: string;
  lastVisit: string;
}

// Types for appointment
export type AppointmentType = 'Khẩn cấp' | 'Đã đặt trước' | 'Tái khám' | 'Khám trực tiếp';

// Types for user roles
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  PHARMACIST = 'PHARMACIST',    // Nhân viên quầy thuốc
  RECEPTIONIST = 'RECEPTIONIST', // Lễ tân
  ADMIN = 'ADMIN',
         // Người dùng (bệnh nhân)
}

// Types for patient data
export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  appointmentType: AppointmentType;
  checkInTime: string;
  reason: string;
  medicalHistory?: MedicalHistory;
}

// Types for medicine data
export interface Medicine {
  id: string;
  name: string;
  totalPills: number;
  schedule: string;
}

// Types for diagnosis data
export interface Diagnosis {
  patientId: number;
  diagnosis: string;
  medicines: Medicine[];
  followUp: boolean;
  followUpDate?: string;
}

// Types for user data
export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  specialization?: string;  // Chuyên môn (cho bác sĩ)
  licenseNumber?: string;   // Số giấy phép hành nghề (cho bác sĩ và dược sĩ)
  createdAt: Date;
  updatedAt: Date;
}

// Thứ tự ưu tiên khám bệnh
export const APPOINTMENT_PRIORITY: Record<AppointmentType, number> = {
  'Khẩn cấp': 1,
  'Đã đặt trước': 2,
  'Tái khám': 3,
  'Khám trực tiếp': 4
};

// Mock data for testing
export const mockPatients: Patient[] = [
  // Bệnh nhân khẩn cấp
  {
    id: 1,
    name: "Lê Văn Cường",
    age: 67,
    gender: "Nam",
    phone: "0912345678",
    address: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
    reason: "Đau ngực dữ dội",
    appointmentType: "Khẩn cấp",
    checkInTime: new Date(new Date().setMinutes(new Date().getMinutes() - 45)).toISOString(),
    medicalHistory: {
      allergies: "Thuốc sulfamide",
      chronicConditions: "Viêm khớp, Bệnh động mạch vành",
      lastVisit: "2 tuần trước"
    }
  },
  {
    id: 2,
    name: "Trần Thị Hương",
    age: 45,
    gender: "Nữ",
    phone: "0987654321",
    address: "45 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    reason: "Khó thở, sốt cao",
    appointmentType: "Khẩn cấp",
    checkInTime: new Date(new Date().setMinutes(new Date().getMinutes() - 30)).toISOString(),
    medicalHistory: {
      allergies: "Không",
      chronicConditions: "Hen suyễn",
      lastVisit: "1 tháng trước"
    }
  },
  // Bệnh nhân đã đặt lịch
  {
    id: 3,
    name: "Nguyễn Văn An",
    age: 45,
    gender: "Nam",
    phone: "0912345678",
    address: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
    reason: "Khám sức khỏe định kỳ",
    appointmentType: "Đã đặt trước",
    checkInTime: new Date(new Date().setMinutes(new Date().getMinutes() - 60)).toISOString(),
    medicalHistory: {
      allergies: "Penicillin",
      chronicConditions: "Huyết áp cao",
      lastVisit: "6 tháng trước"
    }
  },
  {
    id: 4,
    name: "Phạm Thị Bình",
    age: 32,
    gender: "Nữ",
    phone: "0987654321",
    address: "45 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    reason: "Khám thai định kỳ",
    appointmentType: "Đã đặt trước",
    checkInTime: new Date(new Date().setMinutes(new Date().getMinutes() - 45)).toISOString(),
    medicalHistory: {
      allergies: "Không",
      chronicConditions: "Không",
      lastVisit: "1 tháng trước"
    }
  },
  // Bệnh nhân tái khám
  {
    id: 5,
    name: "Hoàng Văn Dũng",
    age: 52,
    gender: "Nam",
    phone: "0912345678",
    address: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
    reason: "Tái khám tiểu đường",
    appointmentType: "Tái khám",
    checkInTime: new Date(new Date().setMinutes(new Date().getMinutes() - 30)).toISOString(),
    medicalHistory: {
      allergies: "Không",
      chronicConditions: "Tiểu đường type 2",
      lastVisit: "2 tuần trước"
    }
  },
  {
    id: 6,
    name: "Lê Thị Mai",
    age: 28,
    gender: "Nữ",
    phone: "0987654321",
    address: "45 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    reason: "Tái khám viêm xoang",
    appointmentType: "Tái khám",
    checkInTime: new Date(new Date().setMinutes(new Date().getMinutes() - 15)).toISOString(),
    medicalHistory: {
      allergies: "Không",
      chronicConditions: "Viêm xoang mãn tính",
      lastVisit: "1 tháng trước"
    }
  },
  // Bệnh nhân khám trực tiếp
  {
    id: 7,
    name: "Trần Văn Em",
    age: 35,
    gender: "Nam",
    phone: "0912345678",
    address: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
    reason: "Đau đầu, mệt mỏi",
    appointmentType: "Khám trực tiếp",
    checkInTime: new Date(new Date().setMinutes(new Date().getMinutes() - 20)).toISOString(),
    medicalHistory: {
      allergies: "Không",
      chronicConditions: "Không",
      lastVisit: "1 năm trước"
    }
  },
  {
    id: 8,
    name: "Nguyễn Thị Lan",
    age: 25,
    gender: "Nữ",
    phone: "0987654321",
    address: "45 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    reason: "Ho, đau họng",
    appointmentType: "Khám trực tiếp",
    checkInTime: new Date(new Date().setMinutes(new Date().getMinutes() - 10)).toISOString(),
    medicalHistory: {
      allergies: "Không",
      chronicConditions: "Không",
      lastVisit: "2 năm trước"
    }
  }
];

// Mock data for users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'huong.nt',
    password: 'password123',
    fullName: 'Dr. Nguyễn Thị Hương',
    email: 'huong.nt@doctor.mediclinic.com',
    phone: '0123456789',
    role: UserRole.DOCTOR,
    department: 'Nội tổng quát',
    specialization: 'Tim mạch',
    licenseNumber: 'BS-12345',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    username: 'pharmacist1',
    password: 'password123',
    fullName: 'Dược sĩ Trần Thị B',
    email: 'pharmacist1@pharmacy.mediclinic.com',
    phone: '0123456788',
    role: UserRole.PHARMACIST,
    licenseNumber: 'DS-12345',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    username: 'receptionist1',
    password: 'password123',
    fullName: 'Lễ tân Lê Văn C',
    email: 'receptionist1@reception.mediclinic.com',
    phone: '0123456787',
    role: UserRole.RECEPTIONIST,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    username: 'admin1',
    password: 'password123',
    fullName: 'Admin Phạm Thị D',
    email: 'admin1@admin.mediclinic.com',
    phone: '0123456786',
    role: UserRole.ADMIN,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '5',
    username: 'patient1',
    password: 'password123',
    fullName: 'Bệnh nhân Nguyễn Văn E',
    email: 'patient1@patient.mediclinic.com',
    phone: '0123456785',
    role: UserRole.PATIENT,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
]; 