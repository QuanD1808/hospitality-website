// Dữ liệu được fetched từ API thay vì dùng static data
import axiosInstance from '../services/axios.customize.service';

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

// Biến cache để lưu trữ dữ liệu từ API
export let mockUsers: User[] = [];
export let mockQueues: Queue[] = [];
export let mockMedicines: Medicine[] = [];
export let mockPrescriptions: Prescription[] = [];
export let mockPrescriptionDetails: PrescriptionDetail[] = [];
export let mockInvoices: Invoice[] = [];

// Biến toàn cục để lưu token xác thực
let authToken: string | null = null;

// Hàm thiết lập token khi người dùng đăng nhập
export const setAuthToken = (token: string) => {
  authToken = token;
  if (typeof window !== 'undefined') { // Kiểm tra nếu đang chạy trên browser
    localStorage.setItem('authToken', token); // Lưu token vào localStorage để giữ qua refresh
  }
};

// Hàm để lấy token hiện tại
export const getAuthToken = () => {
  // Nếu không có token trong memory, thử lấy từ localStorage
  if (!authToken && typeof window !== 'undefined') {
    authToken = localStorage.getItem('authToken');
  }
  return authToken;
};

// Helper function để thực hiện API call có xác thực
const authenticatedGet = async (endpoint: string) => {
  try {
    // Lấy token từ localStorage hoặc cookies
    let token = getAuthToken();
    
    // Thử lấy token từ cookies nếu không tìm thấy trong localStorage
    if (!token && typeof document !== 'undefined') {
      // Check browser cookies if localStorage doesn't have the token
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(c => c.trim().startsWith('token='));
      if (tokenCookie) {
        token = tokenCookie.split('=')[1];
        console.log("Found token in cookies, using it for API calls");
        // Lưu lại vào authToken để sử dụng cho các lần sau
        setAuthToken(token);
      }
    }
    
    if (!token) {
      console.warn('No authentication token available for API call to:', endpoint);
      console.warn('Please login first or check token storage.');
      return null;
    }

    console.log(`Making authenticated request to ${endpoint}`);
    console.log(`Using token (first 10 chars): ${token.substring(0, 10)}...`);

    const response = await axiosInstance.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log(`Successful response from ${endpoint}:`, response.status);
    if (Array.isArray(response.data)) {
      console.log(`Got ${response.data.length} items from ${endpoint}`);
    } else {
      console.log(`Got data from ${endpoint}:`, response.data ? 'Object returned' : 'Empty response');
    }
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching from ${endpoint}:`, error.message);
    
    // Log more detailed error info
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      
      if (error.response.status === 403) {
        console.error(`Access forbidden to ${endpoint} - check user permissions`);
      } else if (error.response.status === 401) {
        console.error(`Unauthorized access to ${endpoint} - token may be expired`);
        // Thử xóa token để người dùng phải đăng nhập lại
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          authToken = null;
        }
      }
    } else if (error.request) {
      console.error('No response received from request. Server may be down.');
    } else {
      console.error('Error setting up request:', error.message);
    }
    
    return null;
  }
};

// ============= FETCH DATA FUNCTIONS =============

// Load users từ API
export const fetchUsers = async () => {
  console.log('Fetching users from API...');
  
  // Đầu tiên thử lấy thông tin user hiện tại để biết role
  try {
    const currentUser = await authenticatedGet('/users/me');
    
    if (currentUser) {
      console.log(`Current user role: ${currentUser.role}`);
      
      if (currentUser.role === 'ADMIN') {
        // Nếu là ADMIN, có quyền lấy tất cả users
        console.log('User is ADMIN, trying to fetch all users');
        const data = await authenticatedGet('/users');
        
        if (data && Array.isArray(data)) {
          console.log(`Successfully fetched ${data.length} users from API`);
          mockUsers = data;
          return data;
        }
      } 
      
      // Dù là role nào, thử dùng endpoint mới để lấy danh sách bệnh nhân
      if (['ADMIN', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST'].includes(currentUser.role)) {
        console.log(`Trying to fetch patients using /users/patients endpoint for ${currentUser.role}`);
        const patients = await authenticatedGet('/users/patients');
        
        if (patients && Array.isArray(patients)) {
          console.log(`Successfully fetched ${patients.length} patients from API`);
          
          // Kết hợp với dữ liệu hiện có (nếu có)
          // Giữ lại các user không phải bệnh nhân từ danh sách hiện có (nếu có)
          const nonPatients = mockUsers.filter(user => user.role !== 'PATIENT');
          mockUsers = [...nonPatients, ...patients];
          
          console.log(`Combined user data: ${mockUsers.length} users (${nonPatients.length} non-patients + ${patients.length} patients)`);
          return mockUsers;
        }
      }
      
      // Nếu không thể lấy dữ liệu, giữ nguyên dữ liệu mockUsers hiện tại
      console.log(`Using existing mock data with ${mockUsers.length} users`);
      return [...mockUsers];
    } else {
      console.error('Could not fetch current user info, authentication may be invalid');
      return mockUsers;
    }
  } catch (error) {
    console.error('Error in fetchUsers:', error);
    return mockUsers;
  }
};

// Load queues từ API
export const fetchQueues = async () => {
  const data = await authenticatedGet('/queues');
  if (data && Array.isArray(data)) {
    mockQueues = data;
    return data;
  }
  return [];
};

// Load medicines từ API
export const fetchMedicines = async () => {
  const data = await authenticatedGet('/medicines');
  if (data && Array.isArray(data)) {
    mockMedicines = data;
    return data;
  }
  return [];
};

// Load prescriptions từ API
export const fetchPrescriptions = async () => {
  const data = await authenticatedGet('/prescriptions');
  if (data && Array.isArray(data)) {
    mockPrescriptions = data;
    return data;
  }
  return [];
};

// Load prescription details từ API
export const fetchPrescriptionDetails = async () => {
  const data = await authenticatedGet('/prescription-details');
  if (data && Array.isArray(data)) {
    mockPrescriptionDetails = data;
    return data;
  }
  return [];
};

// Load invoices từ API
export const fetchInvoices = async () => {
  const data = await authenticatedGet('/invoices');
  if (data && Array.isArray(data)) {
    mockInvoices = data;
    return data;
  }
  return [];
};

// Initialize all data (call when app starts)
export const initializeData = async () => {
  console.log('Initializing data from API or mock sources...');
  
  try {
    // Check if we have a valid token first
    const token = getAuthToken();
    if (!token) {
      console.warn('No authentication token found, will use existing mock data');
      return false;
    }
    
    // Try to validate token
    try {
      console.log('Validating token before fetching data...');
      const currentUser = await authenticatedGet('/users/me');
      if (!currentUser) {
        console.error('Token validation failed, cannot fetch data');
        return false;
      }
      console.log(`Token valid, logged in as ${currentUser.username} (${currentUser.role})`);
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
    
    // Initialize with separate try/catch for each resource type
    // This allows some data to load even if others fail
    const results = {
      users: false,
      queues: false,
      medicines: false,
      prescriptions: false,
      prescriptionDetails: false,
      invoices: false
    };
    
    try {
      await fetchUsers();
      results.users = true;
      console.log(`Users loaded: ${mockUsers.length} items`);
    } catch (error) {
      console.error('Error loading users:', error);
    }
    
    try {
      await fetchQueues();
      results.queues = true;
      console.log(`Queues loaded: ${mockQueues.length} items`);
    } catch (error) {
      console.error('Error loading queues:', error);
    }
    
    try {
      await fetchMedicines();
      results.medicines = true;
      console.log(`Medicines loaded: ${mockMedicines.length} items`);
    } catch (error) {
      console.error('Error loading medicines:', error);
    }
    
    try {
      await fetchPrescriptions();
      results.prescriptions = true;
      console.log(`Prescriptions loaded: ${mockPrescriptions.length} items`);
    } catch (error) {
      console.error('Error loading prescriptions:', error);
    }
    
    try {
      await fetchPrescriptionDetails();
      results.prescriptionDetails = true;
      console.log(`Prescription details loaded: ${mockPrescriptionDetails.length} items`);
    } catch (error) {
      console.error('Error loading prescription details:', error);
    }
    
    try {
      await fetchInvoices();
      results.invoices = true;
      console.log(`Invoices loaded: ${mockInvoices.length} items`);
    } catch (error) {
      console.error('Error loading invoices:', error);
    }
    
    const successCount = Object.values(results).filter(Boolean).length;
    console.log(`Data initialization complete: ${successCount}/6 resource types loaded successfully`);
    
    return successCount > 0;
  } catch (error) {
    console.error('Error in data initialization:', error);
    return false;
  }
};

// ============= USER-RELATED FUNCTIONS =============

export const getAllUsers = async () => {
  if (mockUsers.length === 0) {
    await fetchUsers();
  }
  return [...mockUsers];
};

export const getUserById = async (id: string) => {
  if (mockUsers.length === 0) {
    await fetchUsers();
  }
  return mockUsers.find(user => user._id === id);
};

export const getUsersByRole = async (role: string) => {
  if (mockUsers.length === 0) {
    await fetchUsers();
  }
  return mockUsers.filter(user => user.role === role);
};

export const searchUsers = async (searchTerm: string) => {
  if (mockUsers.length === 0) {
    await fetchUsers();
  }
  const term = searchTerm.toLowerCase();
  return mockUsers.filter(user => 
    user.fullName.toLowerCase().includes(term) || 
    user.username.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.phone.includes(term) ||
    user.userId.includes(term)
  );
};

// ============= QUEUE-RELATED FUNCTIONS =============

export const getAllQueues = async () => {
  if (mockQueues.length === 0) {
    await fetchQueues();
  }
  return [...mockQueues];
};

export const getQueuesByStatus = async (status: string) => {
  if (mockQueues.length === 0) {
    await fetchQueues();
  }
  return mockQueues.filter(queue => queue.status === status);
};

export const getQueueByPatientId = async (patientId: string) => {
  if (mockQueues.length === 0) {
    await fetchQueues();
  }
  return mockQueues.find(queue => queue.patient === patientId);
};

export const addQueue = async (patientId: string, status: 'waiting' | 'in_progress' | 'completed' | 'canceled' = 'waiting') => {
  // Kiểm tra xem patientId có tồn tại và là bệnh nhân không
  const patient = await getUserById(patientId);
  if (!patient || patient.role !== 'PATIENT') {
    console.error('Invalid patient ID or user is not a patient');
    return null;
  }

  // Kiểm tra xem bệnh nhân đã có trong queue chưa
  const existingQueue = await getQueueByPatientId(patientId);
  if (existingQueue) {
    console.warn('Patient already in queue');
    return existingQueue;
  }

  // Tạo queue mới
  const newQueue: Queue = {
    _id: generateMongoId(),
    patient: patientId,
    status: status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  };

  // Gọi API để tạo queue thực sự qua API
  try {
    // Đây là phần sẽ gọi API thực tế
    // const response = await axiosInstance.post('/queues', newQueue, {
    //   headers: { Authorization: `Bearer ${getAuthToken()}` }
    // });
    // if (response.data) {
    //   mockQueues.push(response.data);
    //   return response.data;
    // }
    
    // Hiện tại, chúng ta chỉ thêm vào cache
    mockQueues.push(newQueue);
    return newQueue;
  } catch (error) {
    console.error('Error creating queue:', error);
    return null;
  }
};

export const updateQueueStatus = async (
  queueId: string, 
  status: 'waiting' | 'in_progress' | 'completed' | 'canceled', 
  doctorId?: string
) => {
  if (mockQueues.length === 0) {
    await fetchQueues();
  }
  
  const index = mockQueues.findIndex(queue => queue._id === queueId);
  if (index !== -1) {
    const updatedQueue = {
      ...mockQueues[index],
      status: status,
      updatedAt: new Date().toISOString()
    };
    
    if (doctorId && status === 'in_progress') {
      updatedQueue.doctorId = doctorId;
    }
    
    // Thực tế sẽ gọi API để cập nhật queue
    // const response = await axiosInstance.put(`/queues/${queueId}`, updatedQueue, {
    //   headers: { Authorization: `Bearer ${getAuthToken()}` }
    // });
    
    // Hiện tại chỉ cập nhật trong cache
    mockQueues[index] = updatedQueue;
    return mockQueues[index];
  }
  return null;
};

export const deleteQueue = async (queueId: string) => {
  if (mockQueues.length === 0) {
    await fetchQueues();
  }
  
  const index = mockQueues.findIndex(queue => queue._id === queueId);
  if (index !== -1) {
    const deletedQueue = mockQueues[index];
    
    // Thực tế sẽ gọi API để xóa queue
    // await axiosInstance.delete(`/queues/${queueId}`, {
    //   headers: { Authorization: `Bearer ${getAuthToken()}` }
    // });
    
    // Hiện tại chỉ xóa trong cache
    mockQueues.splice(index, 1);
    return deletedQueue;
  }
  return null;
};

// ============= MEDICINE-RELATED FUNCTIONS =============

export const getAllMedicines = async () => {
  if (mockMedicines.length === 0) {
    await fetchMedicines();
  }
  return [...mockMedicines];
};

export const getMedicineById = async (id: string) => {
  if (mockMedicines.length === 0) {
    await fetchMedicines();
  }
  return mockMedicines.find(medicine => medicine._id === id);
};

export const searchMedicines = async (searchTerm: string) => {
  if (mockMedicines.length === 0) {
    await fetchMedicines();
  }
  const term = searchTerm.toLowerCase();
  return mockMedicines.filter(medicine => 
    medicine.name.toLowerCase().includes(term) || 
    medicine.customMedicineId.toLowerCase().includes(term)
  );
};

// ============= PRESCRIPTION-RELATED FUNCTIONS =============

export const getAllPrescriptions = async () => {
  if (mockPrescriptions.length === 0) {
    await fetchPrescriptions();
  }
  return [...mockPrescriptions];
};

export const getPrescriptionById = async (id: string) => {
  if (mockPrescriptions.length === 0) {
    await fetchPrescriptions();
  }
  return mockPrescriptions.find(prescription => prescription._id === id);
};

export const getPrescriptionsByPatientId = async (patientId: string) => {
  if (mockPrescriptions.length === 0) {
    await fetchPrescriptions();
  }
  return mockPrescriptions.filter(prescription => prescription.patientId === patientId);
};

export const getPrescriptionsByDoctorId = async (doctorId: string) => {
  if (mockPrescriptions.length === 0) {
    await fetchPrescriptions();
  }
  return mockPrescriptions.filter(prescription => prescription.doctorId === doctorId);
};

export const getPrescriptionsByStatus = async (status: string) => {
  if (mockPrescriptions.length === 0) {
    await fetchPrescriptions();
  }
  return mockPrescriptions.filter(prescription => prescription.status === status);
};

// ============= PRESCRIPTION DETAIL-RELATED FUNCTIONS =============

export const getAllPrescriptionDetails = async () => {
  if (mockPrescriptionDetails.length === 0) {
    await fetchPrescriptionDetails();
  }
  return [...mockPrescriptionDetails];
};

export const getPrescriptionDetailsByPrescriptionId = async (prescriptionId: string) => {
  if (mockPrescriptionDetails.length === 0) {
    await fetchPrescriptionDetails();
  }
  return mockPrescriptionDetails.filter(detail => detail.prescriptionId === prescriptionId);
};

export const getMedicinesForPrescription = async (prescriptionId: string) => {
  const details = await getPrescriptionDetailsByPrescriptionId(prescriptionId);
  
  const result = [];
  for (const detail of details) {
    const medicine = await getMedicineById(detail.medicineId);
    result.push({
      ...detail,
      medicine: medicine || null
    });
  }
  
  return result;
};

// ============= INVOICE-RELATED FUNCTIONS =============

export const getAllInvoices = async () => {
  if (mockInvoices.length === 0) {
    await fetchInvoices();
  }
  return [...mockInvoices];
};

export const getInvoiceById = async (id: string) => {
  if (mockInvoices.length === 0) {
    await fetchInvoices();
  }
  return mockInvoices.find(invoice => invoice._id === id);
};

export const getInvoiceByPrescriptionId = async (prescriptionId: string) => {
  if (mockInvoices.length === 0) {
    await fetchInvoices();
  }
  return mockInvoices.find(invoice => invoice.prescriptionId === prescriptionId);
};

export const getInvoicesByPatientId = async (patientId: string) => {
  if (mockInvoices.length === 0) {
    await fetchInvoices();
  }
  return mockInvoices.filter(invoice => invoice.patientId === patientId);
};

export const getInvoicesByStatus = async (status: string) => {
  if (mockInvoices.length === 0) {
    await fetchInvoices();
  }
  return mockInvoices.filter(invoice => invoice.status === status);
};

// ============= UTILITY FUNCTIONS =============

export const getPatientFullPrescriptionDetails = async (patientId: string) => {
  const prescriptions = await getPrescriptionsByPatientId(patientId);
  
  const result = [];
  for (const prescription of prescriptions) {
    // Lấy thông tin bác sĩ
    const doctor = await getUserById(prescription.doctorId);
    
    // Lấy chi tiết đơn thuốc và thông tin thuốc
    const details = await getPrescriptionDetailsByPrescriptionId(prescription._id);
    const medicineDetails = [];
    
    for (const detail of details) {
      const medicine = await getMedicineById(detail.medicineId);
      medicineDetails.push({
        ...detail,
        medicineName: medicine ? medicine.name : 'Unknown',
        medicinePrice: medicine ? medicine.price : 0
      });
    }
    
    // Lấy hóa đơn nếu có
    const invoice = await getInvoiceByPrescriptionId(prescription._id);
    
    result.push({
      ...prescription,
      doctorName: doctor ? doctor.fullName : 'Unknown',
      details: medicineDetails,
      invoice: invoice || null
    });
  }
  
  return result;
};

export const getAllPatients = async () => {
  if (mockUsers.length === 0) {
    await fetchUsers();
  }
  return mockUsers.filter(user => user.role === 'PATIENT');
};

export const getAllDoctors = async () => {
  if (mockUsers.length === 0) {
    await fetchUsers();
  }
  return mockUsers.filter(user => user.role === 'DOCTOR');
};

export type Patient = User;
export const mockPatients = getAllPatients;

export const getWaitingPatients = async () => {
  const waitingQueues = await getQueuesByStatus('waiting');
  
  const result = [];
  for (const queue of waitingQueues) {
    const patient = await getUserById(queue.patient);
    result.push({
      queueInfo: queue,
      patientInfo: patient || null
    });
  }
  
  return result;
};

export const getAllQueuesWithPatientInfo = async () => {
  if (mockQueues.length === 0) {
    await fetchQueues();
  }
  
  const result = [];
  for (const queue of mockQueues) {
    const patient = await getUserById(queue.patient);
    result.push({
      ...queue,
      patientInfo: patient || null
    });
  }
  
  return result;
};

// Hàm tạo MongoDB-like ID
export const generateMongoId = () => {
  // MongoDB ObjectId format: 24 hex characters
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const randomPart = Array(16).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  return timestamp + randomPart;
};

// Hàm để làm mới/reload dữ liệu từ API
export const reloadData = async (dataTypes?: ('users' | 'queues' | 'medicines' | 'prescriptions' | 'prescriptionDetails' | 'invoices')[]) => {
  if (!dataTypes || dataTypes.length === 0) {
    // Reload tất cả
    return await initializeData();
  }

  const promises = [];
  if (dataTypes.includes('users')) promises.push(fetchUsers());
  if (dataTypes.includes('queues')) promises.push(fetchQueues());
  if (dataTypes.includes('medicines')) promises.push(fetchMedicines());
  if (dataTypes.includes('prescriptions')) promises.push(fetchPrescriptions());
  if (dataTypes.includes('prescriptionDetails')) promises.push(fetchPrescriptionDetails());
  if (dataTypes.includes('invoices')) promises.push(fetchInvoices());
  
  await Promise.all(promises);
  return {
    users: mockUsers.length,
    queues: mockQueues.length,
    medicines: mockMedicines.length,
    prescriptions: mockPrescriptions.length,
    prescriptionDetails: mockPrescriptionDetails.length,
    invoices: mockInvoices.length
  };
};

// Hàm thay thế để lấy dữ liệu khi không có quyền admin
export const fetchUsersAlternative = async () => {
  console.log('Trying alternative method to fetch users...');
  
  try {
    // Thử lấy thông tin người dùng hiện tại (me endpoint)
    const currentUser = await authenticatedGet('/users/me');
    if (!currentUser) {
      console.warn('Could not fetch current user');
      return [];
    }
    
    console.log('Current user retrieved:', currentUser.role);
    
    if (currentUser.role === 'ADMIN') {
      // Nếu là admin, thử lại với endpoint /users
      return await fetchUsers();
    }
    
    // Không phải admin, phải dùng cách khác
    // 1. Nếu là bác sĩ, có thể lấy danh sách bệnh nhân được chỉ định
    // 2. Nếu là receptionist, thử lấy dữ liệu theo cách khác
    
    // Endpoint hoặc API call thích hợp theo role
    // Ví dụ: const patients = await authenticatedGet('/appointments/patients');
    
    // Tạm thời giữ nguyên dữ liệu hiện tại nếu có
    return mockUsers.length > 0 ? mockUsers : [];
  } catch (error) {
    console.error('Alternative user fetch failed:', error);
    return [];
  }
};

// Mock function để gửi thông tin queue đến bác sĩ
export const sendQueueToDoctor = async (queueId: string): Promise<Queue | null> => {
  try {
    // Lấy thông tin queue
    const queue = mockQueues.find(q => q._id === queueId);
    
    if (!queue) {
      console.error(`Queue with ID ${queueId} not found.`);
      return null;
    }
    
    // Kiểm tra xem queue đã được gán cho bác sĩ chưa
    if (!queue.doctorId) {
      console.error(`Queue ${queueId} has no assigned doctor.`);
      return null;
    }
    
    // Trong môi trường thực tế, tại đây sẽ có logic gửi thông báo đến bác sĩ
    // Trong mock data, ta chỉ cần đảm bảo trạng thái là in_progress
    if (queue.status !== 'in_progress') {
      queue.status = 'in_progress';
      queue.updatedAt = new Date().toISOString();
    }
    
    console.log(`Mock: Queue ${queueId} information sent to doctor ${queue.doctorId}`);
    return queue;
  } catch (error) {
    console.error('Error sending queue information to doctor:', error);
    throw error;
  }
};
