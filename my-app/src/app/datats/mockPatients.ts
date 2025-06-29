// Mock database dựa trên cấu trúc MongoDB

// Khai báo các interface
export interface User {
  _id: string;
  userId: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: 'PATIENT' | 'DOCTOR' | 'PHARMACIST' | 'RECEPTIONIST' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Queue {
  _id: string;
  patient: string; // ObjectId của bệnh nhân
  status: 'waiting' | 'in_progress' | 'completed' | 'canceled';
  doctorId?: string; // ObjectId của bác sĩ được chỉ định (nếu có)
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Prescription {
  _id: string;
  customPrescriptionId: string;
  patientId: string; // ObjectId
  doctorId: string; // ObjectId
  diagnosis: string;
  date: string;
  status: 'PENDING_DISPENSE' | 'DISPENSED' | 'CANCELED';
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface PrescriptionDetail {
  _id: string;
  customPrescriptionDetailId: string;
  prescriptionId: string; // ObjectId
  medicineId: string; // ObjectId
  quantity: number;
  dosage: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Medicine {
  _id: string;
  customMedicineId: string;
  name: string;
  totalPills: number;
  price: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  _id: string;
  prescriptionId: string; // ObjectId
  patientId: string; // ObjectId
  totalAmount: number;
  status: 'PAID' | 'UNPAID';
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// Mock data - Users (Patients, Doctors, etc.)
export const mockUsers: User[] = [
  {
    _id: '685face13fc4c04e1bd96c06',
    userId: 'u1',
    username: 'nguyen.an',
    email: 'an.nguyen@mediclinic.com',
    password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
    fullName: 'Nguyễn Văn An',
    phone: '0901234567',
    role: 'PATIENT',
    createdAt: '2025-06-28T08:50:41.269+00:00',
    updatedAt: '2025-06-28T08:50:41.269+00:00',
    __v: 0
  },
  {
    _id: '685face13fc4c04e1bd96c07',
    userId: 'u2',
    username: 'tran.binh',
    email: 'binh.tran@mediclinic.com',
    password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
    fullName: 'Trần Văn Bình',
    phone: '0912345678',
    role: 'PATIENT',
    createdAt: '2025-06-28T09:15:22.123+00:00',
    updatedAt: '2025-06-28T09:15:22.123+00:00',
    __v: 0
  },
  {
    _id: '685face13fc4c04e1bd96c08',
    userId: 'd1',
    username: 'dr.hoa',
    email: 'hoa.doctor@mediclinic.com',
    password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
    fullName: 'Bác sĩ Trần Thị Hoa',
    phone: '0923456789',
    role: 'DOCTOR',
    createdAt: '2025-06-28T10:05:17.456+00:00',
    updatedAt: '2025-06-28T10:05:17.456+00:00',
    __v: 0
  },
  {
    _id: '685face13fc4c04e1bd96c09',
    userId: 'u3',
    username: 'le.chi',
    email: 'chi.le@mediclinic.com',
    password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
    fullName: 'Lê Thị Chi',
    phone: '0934567890',
    role: 'PATIENT',
    createdAt: '2025-06-28T11:30:45.789+00:00',
    updatedAt: '2025-06-28T11:30:45.789+00:00',
    __v: 0
  },
  {
    _id: '685face13fc4c04e1bd96c0a',
    userId: 'p1',
    username: 'pham.dung',
    email: 'dung.pham@mediclinic.com',
    password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
    fullName: 'Phạm Văn Dũng',
    phone: '0945678901',
    role: 'PHARMACIST',
    createdAt: '2025-06-28T12:45:33.012+00:00',
    updatedAt: '2025-06-28T12:45:33.012+00:00',
    __v: 0
  },
  {
    _id: '685face13fc4c04e1bd96c0b',
    userId: 'r1',
    username: 'receptionist.minh',
    email: 'minh.receptionist@mediclinic.com',
    password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
    fullName: 'Nguyễn Thị Minh',
    phone: '0956789012',
    role: 'RECEPTIONIST',
    createdAt: '2025-06-28T14:20:10.345+00:00',
    updatedAt: '2025-06-28T14:20:10.345+00:00',
    __v: 0
  },
  {
    _id: '685face13fc4c04e1bd96c0c',
    userId: 'a1',
    username: 'admin.tuan',
    email: 'tuan.admin@mediclinic.com',
    password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
    fullName: 'Lê Minh Tuấn',
    phone: '0967890123',
    role: 'ADMIN',
    createdAt: '2025-06-28T15:55:27.678+00:00',
    updatedAt: '2025-06-28T15:55:27.678+00:00',
    __v: 0
  },
  {
    _id: '685face13fc4c04e1bd96c0d',
    userId: 'u4',
    username: 'hoang.em',
    email: 'em.hoang@mediclinic.com',
    password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
    fullName: 'Hoàng Thị Em',
    phone: '0978901234',
    role: 'PATIENT',
    createdAt: '2025-06-28T16:30:50.901+00:00',
    updatedAt: '2025-06-28T16:30:50.901+00:00',
    __v: 0
  },
  {
    _id: '685face13fc4c04e1bd96c0e',
    userId: 'u5',
    username: 'nguyen.khang',
    email: 'khang.nguyen@mediclinic.com',
    password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
    fullName: 'Nguyễn Minh Khang',
    phone: '0989012345',
    role: 'PATIENT',
    createdAt: '2025-06-28T17:15:42.234+00:00',
    updatedAt: '2025-06-28T17:15:42.234+00:00',
    __v: 0
  },
  {
    _id: '685face13fc4c04e1bd96c0f',
    userId: 'd2',
    username: 'dr.trang',
    email: 'trang.doctor@mediclinic.com',
    password: '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
    fullName: 'Bác sĩ Lê Thị Trang',
    phone: '0990123456',
    role: 'DOCTOR',
    createdAt: '2025-06-28T18:40:15.567+00:00',
    updatedAt: '2025-06-28T18:40:15.567+00:00',
    __v: 0
  }
];

// Mock data - Queue
export const mockQueues: Queue[] = [
  {
    _id: '685f10baa8040f24f1a9014d',
    patient: '685face13fc4c04e1bd96c06', // Nguyễn Văn An
    status: 'waiting',
    createdAt: '2025-06-27T21:44:26.099+00:00',
    updatedAt: '2025-06-27T21:44:26.102+00:00',
    __v: 0
  },
  {
    _id: '685f10baa8040f24f1a9014e',
    patient: '685face13fc4c04e1bd96c07', // Trần Văn Bình
    status: 'in_progress',
    createdAt: '2025-06-27T22:30:15.456+00:00',
    updatedAt: '2025-06-27T22:45:20.789+00:00',
    __v: 0
  },
  {
    _id: '685f10baa8040f24f1a9014f',
    patient: '685face13fc4c04e1bd96c09', // Lê Thị Chi
    status: 'completed',
    createdAt: '2025-06-27T20:15:33.222+00:00',
    updatedAt: '2025-06-27T21:05:42.111+00:00',
    __v: 0
  },
  {
    _id: '685f10baa8040f24f1a90150',
    patient: '685face13fc4c04e1bd96c0d', // Hoàng Thị Em
    status: 'waiting',
    createdAt: '2025-06-28T08:22:17.345+00:00',
    updatedAt: '2025-06-28T08:22:17.345+00:00',
    __v: 0
  },
  {
    _id: '685f10baa8040f24f1a90151',
    patient: '685face13fc4c04e1bd96c0e', // Nguyễn Minh Khang
    status: 'canceled',
    createdAt: '2025-06-28T07:45:10.123+00:00',
    updatedAt: '2025-06-28T08:15:23.456+00:00',
    __v: 0
  }
];

// Mock data - Medicines
export const mockMedicines: Medicine[] = [
  {
    _id: '685face13fc4c04e1bd96c10',
    customMedicineId: 'm1',
    name: 'Paracetamol 500mg',
    totalPills: 980,
    price: 0.5,
    __v: 0,
    createdAt: '2025-06-28T08:50:41.969+00:00',
    updatedAt: '2025-06-28T10:57:49.516+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96c11',
    customMedicineId: 'm2',
    name: 'Amoxicillin 500mg',
    totalPills: 850,
    price: 1.2,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.001+00:00',
    updatedAt: '2025-06-28T08:50:42.001+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96c12',
    customMedicineId: 'm3',
    name: 'Ibuprofen 200mg',
    totalPills: 1200,
    price: 0.7,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.010+00:00',
    updatedAt: '2025-06-28T08:50:42.010+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96c1a',
    customMedicineId: 'm4',
    name: 'Cetirizine 10mg',
    totalPills: 750,
    price: 0.8,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.022+00:00',
    updatedAt: '2025-06-28T08:50:42.022+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96c1b',
    customMedicineId: 'm5',
    name: 'Omeprazole 20mg',
    totalPills: 630,
    price: 1.5,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d20',
    customMedicineId: 'm6',
    name: 'Loratadine 10mg',
    totalPills: 520,
    price: 0.9,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d21',
    customMedicineId: 'm7',
    name: 'Amlodipine 5mg',
    totalPills: 480,
    price: 1.8,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d22',
    customMedicineId: 'm8',
    name: 'Atorvastatin 20mg',
    totalPills: 360,
    price: 2.5,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d23',
    customMedicineId: 'm9',
    name: 'Metformin 500mg',
    totalPills: 720,
    price: 0.6,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d24',
    customMedicineId: 'm10',
    name: 'Clopidogrel 75mg',
    totalPills: 280,
    price: 3.2,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d25',
    customMedicineId: 'm11',
    name: 'Losartan 50mg',
    totalPills: 420,
    price: 2.1,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d26',
    customMedicineId: 'm12',
    name: 'Simvastatin 40mg',
    totalPills: 310,
    price: 1.7,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d27',
    customMedicineId: 'm13',
    name: 'Aspirin 100mg',
    totalPills: 940,
    price: 0.3,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d28',
    customMedicineId: 'm14',
    name: 'Metoprolol 25mg',
    totalPills: 390,
    price: 1.9,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d29',
    customMedicineId: 'm15',
    name: 'Furosemide 40mg',
    totalPills: 280,
    price: 1.4,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d30',
    customMedicineId: 'm16',
    name: 'Pantoprazole 40mg',
    totalPills: 450,
    price: 2.0,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d31',
    customMedicineId: 'm17',
    name: 'Fluoxetine 20mg',
    totalPills: 320,
    price: 2.3,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d32',
    customMedicineId: 'm18',
    name: 'Sertraline 50mg',
    totalPills: 290,
    price: 2.4,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d33',
    customMedicineId: 'm19',
    name: 'Ranitidine 150mg',
    totalPills: 580,
    price: 0.8,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d34',
    customMedicineId: 'm20',
    name: 'Tramadol 50mg',
    totalPills: 240,
    price: 2.8,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d35',
    customMedicineId: 'm21',
    name: 'Diazepam 5mg',
    totalPills: 180,
    price: 3.5,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d36',
    customMedicineId: 'm22',
    name: 'Gabapentin 300mg',
    totalPills: 340,
    price: 2.2,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d37',
    customMedicineId: 'm23',
    name: 'Pregabalin 75mg',
    totalPills: 260,
    price: 3.1,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d38',
    customMedicineId: 'm24',
    name: 'Lisinopril 10mg',
    totalPills: 410,
    price: 1.6,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d39',
    customMedicineId: 'm25',
    name: 'Vitamin D3 1000IU',
    totalPills: 790,
    price: 0.4,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d40',
    customMedicineId: 'm26',
    name: 'Folic Acid 5mg',
    totalPills: 870,
    price: 0.3,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d41',
    customMedicineId: 'm27',
    name: 'Calcium Carbonate 500mg',
    totalPills: 680,
    price: 0.5,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d42',
    customMedicineId: 'm28',
    name: 'Azithromycin 500mg',
    totalPills: 220,
    price: 3.8,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d43',
    customMedicineId: 'm29',
    name: 'Ciprofloxacin 500mg',
    totalPills: 250,
    price: 2.9,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  },
  {
    _id: '685face13fc4c04e1bd96d44',
    customMedicineId: 'm30',
    name: 'Montelukast 10mg',
    totalPills: 310,
    price: 2.7,
    __v: 0,
    createdAt: '2025-06-28T08:50:42.029+00:00',
    updatedAt: '2025-06-28T08:50:42.029+00:00'
  }
];

// Mock data - Prescriptions
export const mockPrescriptions: Prescription[] = [
  {
    _id: '685face23fc4c04e1bd96c13',
    customPrescriptionId: 'pr1',
    patientId: '685face13fc4c04e1bd96c06', // Nguyễn Văn An
    doctorId: '685face13fc4c04e1bd96c08', // Bác sĩ Trần Thị Hoa
    diagnosis: 'Common Cold',
    date: '2024-06-01T10:00:00.000+00:00',
    status: 'PENDING_DISPENSE',
    __v: 0,
    createdAt: '2025-06-28T08:50:42.030+00:00',
    updatedAt: '2025-06-28T08:50:42.030+00:00'
  },
  {
    _id: '685face23fc4c04e1bd96c14',
    customPrescriptionId: 'pr2',
    patientId: '685face13fc4c04e1bd96c07', // Trần Văn Bình
    doctorId: '685face13fc4c04e1bd96c0f', // Bác sĩ Lê Thị Trang
    diagnosis: 'Allergic Rhinitis',
    date: '2024-06-02T11:30:00.000+00:00',
    status: 'DISPENSED',
    __v: 0,
    createdAt: '2025-06-28T09:30:10.123+00:00',
    updatedAt: '2025-06-28T10:15:22.456+00:00'
  },
  {
    _id: '685face23fc4c04e1bd96c15',
    customPrescriptionId: 'pr3',
    patientId: '685face13fc4c04e1bd96c09', // Lê Thị Chi
    doctorId: '685face13fc4c04e1bd96c08', // Bác sĩ Trần Thị Hoa
    diagnosis: 'Gastritis',
    date: '2024-06-03T14:45:00.000+00:00',
    status: 'PENDING_DISPENSE',
    __v: 0,
    createdAt: '2025-06-28T14:50:33.789+00:00',
    updatedAt: '2025-06-28T14:50:33.789+00:00'
  },
  {
    _id: '685face23fc4c04e1bd96c1c',
    customPrescriptionId: 'pr4',
    patientId: '685face13fc4c04e1bd96c0d', // Hoàng Thị Em
    doctorId: '685face13fc4c04e1bd96c0f', // Bác sĩ Lê Thị Trang
    diagnosis: 'Migraine',
    date: '2024-06-04T09:15:00.000+00:00',
    status: 'CANCELED',
    __v: 0,
    createdAt: '2025-06-28T09:20:45.111+00:00',
    updatedAt: '2025-06-28T11:05:17.222+00:00'
  },
  {
    _id: '685face23fc4c04e1bd96c1d',
    customPrescriptionId: 'pr5',
    patientId: '685face13fc4c04e1bd96c0e', // Nguyễn Minh Khang
    doctorId: '685face13fc4c04e1bd96c08', // Bác sĩ Trần Thị Hoa
    diagnosis: 'Hypertension',
    date: '2024-06-05T16:00:00.000+00:00',
    status: 'DISPENSED',
    __v: 0,
    createdAt: '2025-06-28T16:05:22.333+00:00',
    updatedAt: '2025-06-28T17:30:14.444+00:00'
  }
];

// Mock data - Prescription Details
export const mockPrescriptionDetails: PrescriptionDetail[] = [
  {
    _id: '685face23fc4c04e1bd96c16',
    customPrescriptionDetailId: 'pd1',
    prescriptionId: '685face23fc4c04e1bd96c13', // pr1 - Common Cold
    medicineId: '685face13fc4c04e1bd96c10', // Paracetamol 500mg
    quantity: 10,
    dosage: '1 tablet every 6 hours',
    __v: 0,
    createdAt: '2025-06-28T08:50:42.083+00:00',
    updatedAt: '2025-06-28T08:50:42.083+00:00'
  },
  {
    _id: '685face23fc4c04e1bd96c17',
    customPrescriptionDetailId: 'pd2',
    prescriptionId: '685face23fc4c04e1bd96c13', // pr1 - Common Cold
    medicineId: '685face13fc4c04e1bd96c1a', // Cetirizine 10mg
    quantity: 5,
    dosage: '1 tablet daily before sleep',
    __v: 0,
    createdAt: '2025-06-28T08:50:42.085+00:00',
    updatedAt: '2025-06-28T08:50:42.085+00:00'
  },
  {
    _id: '685face23fc4c04e1bd96c18',
    customPrescriptionDetailId: 'pd3',
    prescriptionId: '685face23fc4c04e1bd96c14', // pr2 - Allergic Rhinitis
    medicineId: '685face13fc4c04e1bd96c1a', // Cetirizine 10mg
    quantity: 15,
    dosage: '1 tablet daily in the morning',
    __v: 0,
    createdAt: '2025-06-28T09:30:10.150+00:00',
    updatedAt: '2025-06-28T09:30:10.150+00:00'
  },
  {
    _id: '685face23fc4c04e1bd96c19',
    customPrescriptionDetailId: 'pd4',
    prescriptionId: '685face23fc4c04e1bd96c15', // pr3 - Gastritis
    medicineId: '685face13fc4c04e1bd96c1b', // Omeprazole 20mg
    quantity: 14,
    dosage: '1 tablet daily before breakfast',
    __v: 0,
    createdAt: '2025-06-28T14:50:33.800+00:00',
    updatedAt: '2025-06-28T14:50:33.800+00:00'
  },
  {
    _id: '685face23fc4c04e1bd96c1e',
    customPrescriptionDetailId: 'pd5',
    prescriptionId: '685face23fc4c04e1bd96c1c', // pr4 - Migraine
    medicineId: '685face13fc4c04e1bd96c12', // Ibuprofen 200mg
    quantity: 20,
    dosage: '2 tablets every 8 hours when in pain',
    __v: 0,
    createdAt: '2025-06-28T09:20:45.130+00:00',
    updatedAt: '2025-06-28T09:20:45.130+00:00'
  },
  {
    _id: '685face23fc4c04e1bd96c1f',
    customPrescriptionDetailId: 'pd6',
    prescriptionId: '685face23fc4c04e1bd96c1d', // pr5 - Hypertension
    medicineId: '685face13fc4c04e1bd96c11', // Amoxicillin 500mg
    quantity: 30,
    dosage: '1 tablet three times daily after meals',
    __v: 0,
    createdAt: '2025-06-28T16:05:22.350+00:00',
    updatedAt: '2025-06-28T16:05:22.350+00:00'
  }
];

// Mock data - Invoices
export const mockInvoices: Invoice[] = [
  {
    _id: '685f6f336bd59d7487de3ce8',
    prescriptionId: '685face23fc4c04e1bd96c14', // pr2
    patientId: '685face13fc4c04e1bd96c07', // Trần Văn Bình
    totalAmount: 12.0,
    status: 'PAID',
    __v: 0,
    createdAt: '2025-06-28T10:15:22.456+00:00',
    updatedAt: '2025-06-28T10:15:22.456+00:00'
  },
  {
    _id: '685f6f336bd59d7487de3ce9',
    prescriptionId: '685face23fc4c04e1bd96c1d', // pr5
    patientId: '685face13fc4c04e1bd96c0e', // Nguyễn Minh Khang
    totalAmount: 36.0,
    status: 'PAID',
    __v: 0,
    createdAt: '2025-06-28T17:30:14.444+00:00',
    updatedAt: '2025-06-28T17:30:14.444+00:00'
  },
  {
    _id: '685f6f336bd59d7487de3cea',
    prescriptionId: '685face23fc4c04e1bd96c13', // pr1
    patientId: '685face13fc4c04e1bd96c06', // Nguyễn Văn An
    totalAmount: 9.0,
    status: 'UNPAID',
    __v: 0,
    createdAt: '2025-06-28T08:50:42.030+00:00',
    updatedAt: '2025-06-28T08:50:42.030+00:00'
  }
];

// Hàm tiện ích để làm việc với dữ liệu

// Users
export const getAllUsers = () => [...mockUsers];

export const getUserById = (id: string) => {
  return mockUsers.find(user => user._id === id);
};

export const getUsersByRole = (role: string) => {
  return mockUsers.filter(user => user.role === role);
};

export const searchUsers = (searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return mockUsers.filter(user => 
    user.fullName.toLowerCase().includes(term) || 
    user.username.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.phone.includes(term) ||
    user.userId.includes(term)
  );
};

// Queues
export const getAllQueues = () => [...mockQueues];

export const getQueuesByStatus = (status: string) => {
  return mockQueues.filter(queue => queue.status === status);
};

export const getQueueByPatientId = (patientId: string) => {
  return mockQueues.find(queue => queue.patient === patientId);
};

// Medicines
export const getAllMedicines = () => [...mockMedicines];

export const getMedicineById = (id: string) => {
  return mockMedicines.find(medicine => medicine._id === id);
};

export const searchMedicines = (searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return mockMedicines.filter(medicine => 
    medicine.name.toLowerCase().includes(term) || 
    medicine.customMedicineId.includes(term)
  );
};

// Prescriptions
export const getAllPrescriptions = () => [...mockPrescriptions];

export const getPrescriptionById = (id: string) => {
  return mockPrescriptions.find(prescription => prescription._id === id);
};

export const getPrescriptionsByPatientId = (patientId: string) => {
  return mockPrescriptions.filter(prescription => prescription.patientId === patientId);
};

export const getPrescriptionsByDoctorId = (doctorId: string) => {
  return mockPrescriptions.filter(prescription => prescription.doctorId === doctorId);
};

export const getPrescriptionsByStatus = (status: string) => {
  return mockPrescriptions.filter(prescription => prescription.status === status);
};

// Prescription Details
export const getAllPrescriptionDetails = () => [...mockPrescriptionDetails];

export const getPrescriptionDetailsByPrescriptionId = (prescriptionId: string) => {
  return mockPrescriptionDetails.filter(detail => detail.prescriptionId === prescriptionId);
};

export const getMedicinesForPrescription = (prescriptionId: string) => {
  const details = getPrescriptionDetailsByPrescriptionId(prescriptionId);
  return details.map(detail => {
    const medicine = getMedicineById(detail.medicineId);
    return {
      ...detail,
      medicine: medicine || null
    };
  });
};

// Invoices
export const getAllInvoices = () => [...mockInvoices];

export const getInvoiceById = (id: string) => {
  return mockInvoices.find(invoice => invoice._id === id);
};

export const getInvoiceByPrescriptionId = (prescriptionId: string) => {
  return mockInvoices.find(invoice => invoice.prescriptionId === prescriptionId);
};

export const getInvoicesByPatientId = (patientId: string) => {
  return mockInvoices.filter(invoice => invoice.patientId === patientId);
};

export const getInvoicesByStatus = (status: string) => {
  return mockInvoices.filter(invoice => invoice.status === status);
};

// Hàm hữu ích khác
export const getPatientFullPrescriptionDetails = (patientId: string) => {
  // Lấy tất cả đơn thuốc của bệnh nhân
  const prescriptions = getPrescriptionsByPatientId(patientId);
  
  return prescriptions.map(prescription => {
    // Lấy thông tin bác sĩ
    const doctor = getUserById(prescription.doctorId);
    
    // Lấy chi tiết đơn thuốc và thông tin thuốc
    const details = getPrescriptionDetailsByPrescriptionId(prescription._id);
    const medicineDetails = details.map(detail => {
      const medicine = getMedicineById(detail.medicineId);
      return {
        ...detail,
        medicineName: medicine ? medicine.name : 'Unknown',
        medicinePrice: medicine ? medicine.price : 0
      };
    });
    
    // Lấy hóa đơn nếu có
    const invoice = getInvoiceByPrescriptionId(prescription._id);
    
    return {
      ...prescription,
      doctorName: doctor ? doctor.fullName : 'Unknown',
      details: medicineDetails,
      invoice: invoice || null
    };
  });
};

// Hàm lấy danh sách bệnh nhân
export const getAllPatients = () => {
  return mockUsers.filter(user => user.role === 'PATIENT');
};

// Hàm lấy danh sách bác sĩ
export const getAllDoctors = () => {
  return mockUsers.filter(user => user.role === 'DOCTOR');
};

// Type aliases để thuận tiện cho việc sử dụng
export type Patient = User;
export const mockPatients = getAllPatients();

// Hàm tạo MongoDB-like ID
export const generateMongoId = () => {
  // MongoDB ObjectId format: 24 hex characters
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const randomPart = Array(16).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  return timestamp + randomPart;
};

// Hàm tạo userId tự động
export const generateNextUserId = () => {
  // Tìm user ID lớn nhất hiện tại với pattern 'u' + number
  const patientUserIds = mockUsers
    .filter(user => user.role === 'PATIENT' && /^u\d+$/.test(user.userId))
    .map(user => parseInt(user.userId.substring(1)));
  
  const nextNumber = patientUserIds.length > 0 ? Math.max(...patientUserIds) + 1 : 1;
  return `u${nextNumber}`;
};

// Hàm kiểm tra trùng lặp userId, username, email
const checkDuplicates = (patient: Partial<User>) => {
  const errors = [];
  
  // Kiểm tra userId nếu được cung cấp
  if (patient.userId && mockUsers.some(user => user.userId === patient.userId)) {
    errors.push(`User ID '${patient.userId}' đã tồn tại`);
  }
  
  // Kiểm tra username nếu được cung cấp
  if (patient.username && mockUsers.some(user => user.username === patient.username)) {
    errors.push(`Username '${patient.username}' đã tồn tại`);
  }
  
  // Kiểm tra email nếu được cung cấp
  if (patient.email && mockUsers.some(user => user.email === patient.email)) {
    errors.push(`Email '${patient.email}' đã tồn tại`);
  }
  
  return errors;
};

// Hàm thêm bệnh nhân mới
export const addPatient = (patient: Partial<Omit<User, '_id' | 'createdAt' | 'updatedAt' | '__v'>>) => {
  // Kiểm tra thông tin trùng lặp
  const duplicateErrors = checkDuplicates(patient);
  if (duplicateErrors.length > 0) {
    throw new Error(`Không thể thêm bệnh nhân: ${duplicateErrors.join(', ')}`);
  }

  // Tạo ID MongoDB-like mới
  const _id = generateMongoId();
  const now = new Date().toISOString();
  
  // Tạo userId tự động nếu không được cung cấp
  const userId = patient.userId || generateNextUserId();
  
  const newPatient: User = {
    _id,
    userId,
    username: patient.username || `patient_${userId}`,
    email: patient.email || `${userId}@example.com`,
    password: patient.password || '$2a$10$iC8rd3mgPjzq/0USw63zquFgGmqpSJpECiKvlK',
    fullName: patient.fullName || 'Bệnh nhân mới',
    phone: patient.phone || '',
    role: 'PATIENT',
    createdAt: now,
    updatedAt: now,
    __v: 0
  };
  
  mockUsers.push(newPatient);
  return newPatient;
};

// Hàm cập nhật thông tin bệnh nhân
export const updatePatient = (id: string, patientData: Partial<User>) => {
  const index = mockUsers.findIndex(user => user._id === id);
  if (index === -1) {
    return null;
  }
  
  const currentUser = mockUsers[index];
  
  // Kiểm tra trùng lặp với các user khác (không phải chính user này)
  const duplicateErrors = [];
  
  // Kiểm tra userId nếu thay đổi
  if (patientData.userId && patientData.userId !== currentUser.userId) {
    if (mockUsers.some(user => user.userId === patientData.userId)) {
      duplicateErrors.push(`User ID '${patientData.userId}' đã tồn tại`);
    }
  }
  
  // Kiểm tra username nếu thay đổi
  if (patientData.username && patientData.username !== currentUser.username) {
    if (mockUsers.some(user => user.username === patientData.username)) {
      duplicateErrors.push(`Username '${patientData.username}' đã tồn tại`);
    }
  }
  
  // Kiểm tra email nếu thay đổi
  if (patientData.email && patientData.email !== currentUser.email) {
    if (mockUsers.some(user => user.email === patientData.email)) {
      duplicateErrors.push(`Email '${patientData.email}' đã tồn tại`);
    }
  }
  
  if (duplicateErrors.length > 0) {
    throw new Error(`Không thể cập nhật bệnh nhân: ${duplicateErrors.join(', ')}`);
  }
  
  // Cập nhật thông tin user
  mockUsers[index] = {
    ...currentUser,
    ...patientData,
    updatedAt: new Date().toISOString()
  };
  
  return mockUsers[index];
};

// Hàm xóa bệnh nhân
export const deletePatient = (id: string) => {
  const index = mockUsers.findIndex(user => user._id === id);
  if (index !== -1) {
    const deletedPatient = mockUsers[index];
    mockUsers.splice(index, 1);
    return deletedPatient;
  }
  return null;
};

// Hàm thêm queue mới
export const addQueue = (patientId: string, status: 'waiting' | 'in_progress' | 'completed' | 'canceled' = 'waiting') => {
  // Kiểm tra xem patientId có tồn tại và là bệnh nhân không
  const patient = getUserById(patientId);
  if (!patient || patient.role !== 'PATIENT') {
    console.error('Invalid patient ID or user is not a patient');
    return null;
  }

  // Kiểm tra xem bệnh nhân đã có trong queue chưa
  const existingQueue = getQueueByPatientId(patientId);
  if (existingQueue) {
    console.warn('Patient already in queue');
    return existingQueue;
  }

  // Tạo queue mới
  const newQueue: Queue = {
    _id: `queue_${Date.now()}`,
    patient: patientId,
    status: status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  };

  mockQueues.push(newQueue);
  return newQueue;
};

// Interface mở rộng Queue để thêm thông tin bác sĩ
interface QueueWithDoctor extends Queue {
  doctorId?: string;
}

// Hàm cập nhật trạng thái queue và có thể thêm bác sĩ nếu cần
export const updateQueueStatus = (
  queueId: string, 
  status: 'waiting' | 'in_progress' | 'completed' | 'canceled', 
  doctorId?: string
) => {
  const index = mockQueues.findIndex(queue => queue._id === queueId);
  if (index !== -1) {
    const updatedQueue: QueueWithDoctor = {
      ...mockQueues[index],
      status: status,
      updatedAt: new Date().toISOString()
    };
    
    // Nếu có doctorId và queue chuyển sang trạng thái in_progress, lưu doctorId vào queue
    if (doctorId && status === 'in_progress') {
      updatedQueue.doctorId = doctorId;
    }
    
    mockQueues[index] = updatedQueue as Queue;
    return mockQueues[index];
  }
  return null;
};

// Hàm xóa queue
export const deleteQueue = (queueId: string) => {
  const index = mockQueues.findIndex(queue => queue._id === queueId);
  if (index !== -1) {
    const deletedQueue = mockQueues[index];
    mockQueues.splice(index, 1);
    return deletedQueue;
  }
  return null;
};

// Hàm lấy danh sách bệnh nhân đang chờ khám
export const getWaitingPatients = () => {
  const waitingQueues = getQueuesByStatus('waiting');
  return waitingQueues.map(queue => {
    const patient = getUserById(queue.patient);
    return {
      queueInfo: queue,
      patientInfo: patient || null
    };
  });
};

// Hàm lấy tất cả queue kèm thông tin bệnh nhân
export const getAllQueuesWithPatientInfo = () => {
  return mockQueues.map(queue => {
    const patient = getUserById(queue.patient);
    return {
      ...queue,
      patientInfo: patient || null
    };
  });
};
