(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/datats/mockPatients.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Dữ liệu được fetched từ API thay vì dùng static data
__turbopack_context__.s({
    "addQueue": ()=>addQueue,
    "deleteQueue": ()=>deleteQueue,
    "fetchInvoices": ()=>fetchInvoices,
    "fetchMedicines": ()=>fetchMedicines,
    "fetchPrescriptionDetails": ()=>fetchPrescriptionDetails,
    "fetchPrescriptions": ()=>fetchPrescriptions,
    "fetchQueues": ()=>fetchQueues,
    "fetchUsers": ()=>fetchUsers,
    "fetchUsersAlternative": ()=>fetchUsersAlternative,
    "generateMongoId": ()=>generateMongoId,
    "getAllDoctors": ()=>getAllDoctors,
    "getAllInvoices": ()=>getAllInvoices,
    "getAllMedicines": ()=>getAllMedicines,
    "getAllPatients": ()=>getAllPatients,
    "getAllPrescriptionDetails": ()=>getAllPrescriptionDetails,
    "getAllPrescriptions": ()=>getAllPrescriptions,
    "getAllQueues": ()=>getAllQueues,
    "getAllQueuesWithPatientInfo": ()=>getAllQueuesWithPatientInfo,
    "getAllUsers": ()=>getAllUsers,
    "getAuthToken": ()=>getAuthToken,
    "getInvoiceById": ()=>getInvoiceById,
    "getInvoiceByPrescriptionId": ()=>getInvoiceByPrescriptionId,
    "getInvoicesByPatientId": ()=>getInvoicesByPatientId,
    "getInvoicesByStatus": ()=>getInvoicesByStatus,
    "getMedicineById": ()=>getMedicineById,
    "getMedicinesForPrescription": ()=>getMedicinesForPrescription,
    "getPatientFullPrescriptionDetails": ()=>getPatientFullPrescriptionDetails,
    "getPrescriptionById": ()=>getPrescriptionById,
    "getPrescriptionDetailsByPrescriptionId": ()=>getPrescriptionDetailsByPrescriptionId,
    "getPrescriptionsByDoctorId": ()=>getPrescriptionsByDoctorId,
    "getPrescriptionsByPatientId": ()=>getPrescriptionsByPatientId,
    "getPrescriptionsByStatus": ()=>getPrescriptionsByStatus,
    "getQueueByPatientId": ()=>getQueueByPatientId,
    "getQueuesByStatus": ()=>getQueuesByStatus,
    "getUserById": ()=>getUserById,
    "getUsersByRole": ()=>getUsersByRole,
    "getWaitingPatients": ()=>getWaitingPatients,
    "initializeData": ()=>initializeData,
    "mockInvoices": ()=>mockInvoices,
    "mockMedicines": ()=>mockMedicines,
    "mockPatients": ()=>mockPatients,
    "mockPrescriptionDetails": ()=>mockPrescriptionDetails,
    "mockPrescriptions": ()=>mockPrescriptions,
    "mockQueues": ()=>mockQueues,
    "mockUsers": ()=>mockUsers,
    "reloadData": ()=>reloadData,
    "searchMedicines": ()=>searchMedicines,
    "searchUsers": ()=>searchUsers,
    "sendQueueToDoctor": ()=>sendQueueToDoctor,
    "setAuthToken": ()=>setAuthToken,
    "updateQueueStatus": ()=>updateQueueStatus
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/axios.customize.service.ts [app-client] (ecmascript)");
;
let mockUsers = [];
let mockQueues = [];
let mockMedicines = [];
let mockPrescriptions = [];
let mockPrescriptionDetails = [];
let mockInvoices = [];
// Biến toàn cục để lưu token xác thực
let authToken = null;
const setAuthToken = (token)=>{
    authToken = token;
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem('authToken', token); // Lưu token vào localStorage để giữ qua refresh
    }
};
const getAuthToken = ()=>{
    // Nếu không có token trong memory, thử lấy từ localStorage
    if (!authToken && "object" !== 'undefined') {
        authToken = localStorage.getItem('authToken');
    }
    return authToken;
};
// Helper function để thực hiện API call có xác thực
const authenticatedGet = async (endpoint)=>{
    try {
        // Lấy token từ localStorage hoặc cookies
        let token = getAuthToken();
        // Thử lấy token từ cookies nếu không tìm thấy trong localStorage
        if (!token && typeof document !== 'undefined') {
            // Check browser cookies if localStorage doesn't have the token
            const cookies = document.cookie.split(';');
            const tokenCookie = cookies.find((c)=>c.trim().startsWith('token='));
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
        console.log("Making authenticated request to ".concat(endpoint));
        console.log("Using token (first 10 chars): ".concat(token.substring(0, 10), "..."));
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(endpoint, {
            headers: {
                Authorization: "Bearer ".concat(token)
            }
        });
        console.log("Successful response from ".concat(endpoint, ":"), response.status);
        if (Array.isArray(response.data)) {
            console.log("Got ".concat(response.data.length, " items from ").concat(endpoint));
        } else {
            console.log("Got data from ".concat(endpoint, ":"), response.data ? 'Object returned' : 'Empty response');
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching from ".concat(endpoint, ":"), error.message);
        // Log more detailed error info
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
            if (error.response.status === 403) {
                console.error("Access forbidden to ".concat(endpoint, " - check user permissions"));
            } else if (error.response.status === 401) {
                console.error("Unauthorized access to ".concat(endpoint, " - token may be expired"));
                // Thử xóa token để người dùng phải đăng nhập lại
                if ("TURBOPACK compile-time truthy", 1) {
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
const fetchUsers = async ()=>{
    console.log('Fetching users from API...');
    // Đầu tiên thử lấy thông tin user hiện tại để biết role
    try {
        const currentUser = await authenticatedGet('/users/me');
        if (currentUser) {
            console.log("Current user role: ".concat(currentUser.role));
            if (currentUser.role === 'ADMIN') {
                // Nếu là ADMIN, có quyền lấy tất cả users
                console.log('User is ADMIN, trying to fetch all users');
                const data = await authenticatedGet('/users');
                if (data && Array.isArray(data)) {
                    console.log("Successfully fetched ".concat(data.length, " users from API"));
                    mockUsers = data;
                    return data;
                }
            }
            // Dù là role nào, thử dùng endpoint mới để lấy danh sách bệnh nhân
            if ([
                'ADMIN',
                'DOCTOR',
                'PHARMACIST',
                'RECEPTIONIST'
            ].includes(currentUser.role)) {
                console.log("Trying to fetch patients using /users/patients endpoint for ".concat(currentUser.role));
                const patients = await authenticatedGet('/users/patients');
                if (patients && Array.isArray(patients)) {
                    console.log("Successfully fetched ".concat(patients.length, " patients from API"));
                    // Kết hợp với dữ liệu hiện có (nếu có)
                    // Giữ lại các user không phải bệnh nhân từ danh sách hiện có (nếu có)
                    const nonPatients = mockUsers.filter((user)=>user.role !== 'PATIENT');
                    mockUsers = [
                        ...nonPatients,
                        ...patients
                    ];
                    console.log("Combined user data: ".concat(mockUsers.length, " users (").concat(nonPatients.length, " non-patients + ").concat(patients.length, " patients)"));
                    return mockUsers;
                }
            }
            // Nếu không thể lấy dữ liệu, giữ nguyên dữ liệu mockUsers hiện tại
            console.log("Using existing mock data with ".concat(mockUsers.length, " users"));
            return [
                ...mockUsers
            ];
        } else {
            console.error('Could not fetch current user info, authentication may be invalid');
            return mockUsers;
        }
    } catch (error) {
        console.error('Error in fetchUsers:', error);
        return mockUsers;
    }
};
const fetchQueues = async ()=>{
    const data = await authenticatedGet('/queues');
    if (data && Array.isArray(data)) {
        mockQueues = data;
        return data;
    }
    return [];
};
const fetchMedicines = async ()=>{
    const data = await authenticatedGet('/medicines');
    if (data && Array.isArray(data)) {
        mockMedicines = data;
        return data;
    }
    return [];
};
const fetchPrescriptions = async ()=>{
    const data = await authenticatedGet('/prescriptions');
    if (data && Array.isArray(data)) {
        mockPrescriptions = data;
        return data;
    }
    return [];
};
const fetchPrescriptionDetails = async ()=>{
    const data = await authenticatedGet('/prescription-details');
    if (data && Array.isArray(data)) {
        mockPrescriptionDetails = data;
        return data;
    }
    return [];
};
const fetchInvoices = async ()=>{
    const data = await authenticatedGet('/invoices');
    if (data && Array.isArray(data)) {
        mockInvoices = data;
        return data;
    }
    return [];
};
const initializeData = async ()=>{
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
            console.log("Token valid, logged in as ".concat(currentUser.username, " (").concat(currentUser.role, ")"));
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
            console.log("Users loaded: ".concat(mockUsers.length, " items"));
        } catch (error) {
            console.error('Error loading users:', error);
        }
        try {
            await fetchQueues();
            results.queues = true;
            console.log("Queues loaded: ".concat(mockQueues.length, " items"));
        } catch (error) {
            console.error('Error loading queues:', error);
        }
        try {
            await fetchMedicines();
            results.medicines = true;
            console.log("Medicines loaded: ".concat(mockMedicines.length, " items"));
        } catch (error) {
            console.error('Error loading medicines:', error);
        }
        try {
            await fetchPrescriptions();
            results.prescriptions = true;
            console.log("Prescriptions loaded: ".concat(mockPrescriptions.length, " items"));
        } catch (error) {
            console.error('Error loading prescriptions:', error);
        }
        try {
            await fetchPrescriptionDetails();
            results.prescriptionDetails = true;
            console.log("Prescription details loaded: ".concat(mockPrescriptionDetails.length, " items"));
        } catch (error) {
            console.error('Error loading prescription details:', error);
        }
        try {
            await fetchInvoices();
            results.invoices = true;
            console.log("Invoices loaded: ".concat(mockInvoices.length, " items"));
        } catch (error) {
            console.error('Error loading invoices:', error);
        }
        const successCount = Object.values(results).filter(Boolean).length;
        console.log("Data initialization complete: ".concat(successCount, "/6 resource types loaded successfully"));
        return successCount > 0;
    } catch (error) {
        console.error('Error in data initialization:', error);
        return false;
    }
};
const getAllUsers = async ()=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    return [
        ...mockUsers
    ];
};
const getUserById = async (id)=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    return mockUsers.find((user)=>user._id === id);
};
const getUsersByRole = async (role)=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    return mockUsers.filter((user)=>user.role === role);
};
const searchUsers = async (searchTerm)=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    const term = searchTerm.toLowerCase();
    return mockUsers.filter((user)=>user.fullName.toLowerCase().includes(term) || user.username.toLowerCase().includes(term) || user.email.toLowerCase().includes(term) || user.phone.includes(term) || user.userId.includes(term));
};
const getAllQueues = async ()=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    return [
        ...mockQueues
    ];
};
const getQueuesByStatus = async (status)=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    return mockQueues.filter((queue)=>queue.status === status);
};
const getQueueByPatientId = async (patientId)=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    return mockQueues.find((queue)=>queue.patient === patientId);
};
const addQueue = async function(patientId) {
    let status = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'waiting';
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
    const newQueue = {
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
const updateQueueStatus = async (queueId, status, doctorId)=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    const index = mockQueues.findIndex((queue)=>queue._id === queueId);
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
const deleteQueue = async (queueId)=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    const index = mockQueues.findIndex((queue)=>queue._id === queueId);
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
const getAllMedicines = async ()=>{
    if (mockMedicines.length === 0) {
        await fetchMedicines();
    }
    return [
        ...mockMedicines
    ];
};
const getMedicineById = async (id)=>{
    if (mockMedicines.length === 0) {
        await fetchMedicines();
    }
    return mockMedicines.find((medicine)=>medicine._id === id);
};
const searchMedicines = async (searchTerm)=>{
    if (mockMedicines.length === 0) {
        await fetchMedicines();
    }
    const term = searchTerm.toLowerCase();
    return mockMedicines.filter((medicine)=>medicine.name.toLowerCase().includes(term) || medicine.customMedicineId.toLowerCase().includes(term));
};
const getAllPrescriptions = async ()=>{
    if (mockPrescriptions.length === 0) {
        await fetchPrescriptions();
    }
    return [
        ...mockPrescriptions
    ];
};
const getPrescriptionById = async (id)=>{
    if (mockPrescriptions.length === 0) {
        await fetchPrescriptions();
    }
    return mockPrescriptions.find((prescription)=>prescription._id === id);
};
const getPrescriptionsByPatientId = async (patientId)=>{
    if (mockPrescriptions.length === 0) {
        await fetchPrescriptions();
    }
    return mockPrescriptions.filter((prescription)=>prescription.patientId === patientId);
};
const getPrescriptionsByDoctorId = async (doctorId)=>{
    if (mockPrescriptions.length === 0) {
        await fetchPrescriptions();
    }
    return mockPrescriptions.filter((prescription)=>prescription.doctorId === doctorId);
};
const getPrescriptionsByStatus = async (status)=>{
    if (mockPrescriptions.length === 0) {
        await fetchPrescriptions();
    }
    return mockPrescriptions.filter((prescription)=>prescription.status === status);
};
const getAllPrescriptionDetails = async ()=>{
    if (mockPrescriptionDetails.length === 0) {
        await fetchPrescriptionDetails();
    }
    return [
        ...mockPrescriptionDetails
    ];
};
const getPrescriptionDetailsByPrescriptionId = async (prescriptionId)=>{
    if (mockPrescriptionDetails.length === 0) {
        await fetchPrescriptionDetails();
    }
    return mockPrescriptionDetails.filter((detail)=>detail.prescriptionId === prescriptionId);
};
const getMedicinesForPrescription = async (prescriptionId)=>{
    const details = await getPrescriptionDetailsByPrescriptionId(prescriptionId);
    const result = [];
    for (const detail of details){
        const medicine = await getMedicineById(detail.medicineId);
        result.push({
            ...detail,
            medicine: medicine || null
        });
    }
    return result;
};
const getAllInvoices = async ()=>{
    if (mockInvoices.length === 0) {
        await fetchInvoices();
    }
    return [
        ...mockInvoices
    ];
};
const getInvoiceById = async (id)=>{
    if (mockInvoices.length === 0) {
        await fetchInvoices();
    }
    return mockInvoices.find((invoice)=>invoice._id === id);
};
const getInvoiceByPrescriptionId = async (prescriptionId)=>{
    if (mockInvoices.length === 0) {
        await fetchInvoices();
    }
    return mockInvoices.find((invoice)=>invoice.prescriptionId === prescriptionId);
};
const getInvoicesByPatientId = async (patientId)=>{
    if (mockInvoices.length === 0) {
        await fetchInvoices();
    }
    return mockInvoices.filter((invoice)=>invoice.patientId === patientId);
};
const getInvoicesByStatus = async (status)=>{
    if (mockInvoices.length === 0) {
        await fetchInvoices();
    }
    return mockInvoices.filter((invoice)=>invoice.status === status);
};
const getPatientFullPrescriptionDetails = async (patientId)=>{
    const prescriptions = await getPrescriptionsByPatientId(patientId);
    const result = [];
    for (const prescription of prescriptions){
        // Lấy thông tin bác sĩ
        const doctor = await getUserById(prescription.doctorId);
        // Lấy chi tiết đơn thuốc và thông tin thuốc
        const details = await getPrescriptionDetailsByPrescriptionId(prescription._id);
        const medicineDetails = [];
        for (const detail of details){
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
const getAllPatients = async ()=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    return mockUsers.filter((user)=>user.role === 'PATIENT');
};
const getAllDoctors = async ()=>{
    if (mockUsers.length === 0) {
        await fetchUsers();
    }
    return mockUsers.filter((user)=>user.role === 'DOCTOR');
};
const mockPatients = getAllPatients;
const getWaitingPatients = async ()=>{
    const waitingQueues = await getQueuesByStatus('waiting');
    const result = [];
    for (const queue of waitingQueues){
        const patient = await getUserById(queue.patient);
        result.push({
            queueInfo: queue,
            patientInfo: patient || null
        });
    }
    return result;
};
const getAllQueuesWithPatientInfo = async ()=>{
    if (mockQueues.length === 0) {
        await fetchQueues();
    }
    const result = [];
    for (const queue of mockQueues){
        const patient = await getUserById(queue.patient);
        result.push({
            ...queue,
            patientInfo: patient || null
        });
    }
    return result;
};
const generateMongoId = ()=>{
    // MongoDB ObjectId format: 24 hex characters
    const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
    const randomPart = Array(16).fill(0).map(()=>Math.floor(Math.random() * 16).toString(16)).join('');
    return timestamp + randomPart;
};
const reloadData = async (dataTypes)=>{
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
const fetchUsersAlternative = async ()=>{
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
const sendQueueToDoctor = async (queueId)=>{
    try {
        // Lấy thông tin queue
        const queue = mockQueues.find((q)=>q._id === queueId);
        if (!queue) {
            console.error("Queue with ID ".concat(queueId, " not found."));
            return null;
        }
        // Kiểm tra xem queue đã được gán cho bác sĩ chưa
        if (!queue.doctorId) {
            console.error("Queue ".concat(queueId, " has no assigned doctor."));
            return null;
        }
        // Trong môi trường thực tế, tại đây sẽ có logic gửi thông báo đến bác sĩ
        // Trong mock data, ta chỉ cần đảm bảo trạng thái là in_progress
        if (queue.status !== 'in_progress') {
            queue.status = 'in_progress';
            queue.updatedAt = new Date().toISOString();
        }
        console.log("Mock: Queue ".concat(queueId, " information sent to doctor ").concat(queue.doctorId));
        return queue;
    } catch (error) {
        console.error('Error sending queue information to doctor:', error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/receptionistPage/Dashboard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Dashboard": ()=>Dashboard
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UsersIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as UsersIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as ClockIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquareIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-check-big.js [app-client] (ecmascript) <export default as CheckSquareIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as CalendarIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as UserIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOutIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOutIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/datats/mockPatients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/api.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function Dashboard(param) {
    let { onNavigate } = param;
    _s();
    const { user, logout, token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // State cho các thống kê từ mock data
    const [patientCount, setPatientCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [waitingCount, setWaitingCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [completedTodayCount, setCompletedTodayCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [newPatientsToday, setNewPatientsToday] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // State cho danh sách queue đã hoàn thành
    const [completedQueues, setCompletedQueues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingQueues, setLoadingQueues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [queueError, setQueueError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Pagination state cho danh sách queue đã hoàn thành
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [queuesPerPage, setQueuesPerPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // Load dữ liệu từ API khi component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            const loadData = {
                "Dashboard.useEffect.loadData": async ()=>{
                    try {
                        // Removed initializeData() call to prevent 403 Forbidden error
                        // This was trying to access medicines data which receptionists don't have permission for
                        // Lấy tổng số bệnh nhân
                        const patients = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllPatients"])();
                        setPatientCount(patients.length);
                        // Tính số bệnh nhân mới hôm nay
                        const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại dạng YYYY-MM-DD
                        const newPatients = patients.filter({
                            "Dashboard.useEffect.loadData": (p)=>p.createdAt.startsWith(today)
                        }["Dashboard.useEffect.loadData"]).length;
                        setNewPatientsToday(newPatients);
                        // Lấy số bệnh nhân đang chờ
                        const waitingQueues = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQueuesByStatus"])('waiting');
                        setWaitingCount(waitingQueues.length);
                        // Lấy số bệnh nhân đã hoàn thành khám hôm nay
                        const todayStart = new Date();
                        todayStart.setHours(0, 0, 0, 0); // Đặt thời gian về đầu ngày
                        const completedQueues = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQueuesByStatus"])('completed');
                        const completedToday = completedQueues.filter({
                            "Dashboard.useEffect.loadData.completedToday": (q)=>{
                                const queueDate = new Date(q.updatedAt);
                                return queueDate >= todayStart;
                            }
                        }["Dashboard.useEffect.loadData.completedToday"]);
                        setCompletedTodayCount(completedToday.length);
                        // Lấy danh sách queue đã hoàn thành
                        await fetchCompletedQueues();
                    } catch (error) {
                        console.error('Error loading dashboard data:', error);
                    }
                }
            }["Dashboard.useEffect.loadData"];
            loadData();
        }
    }["Dashboard.useEffect"], [
        token
    ]);
    // Thống kê hiển thị với dữ liệu từ mock data
    const stats = [
        {
            title: 'Lịch hẹn hôm nay',
            value: "".concat(waitingCount + completedTodayCount),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                className: "h-6 w-6 text-blue-600"
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                lineNumber: 81,
                columnNumber: 13
            }, this),
            change: "".concat(waitingCount, " chờ"),
            changeType: 'neutral'
        },
        {
            title: 'Đang chờ khám',
            value: "".concat(waitingCount),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__["ClockIcon"], {
                className: "h-6 w-6 text-yellow-600"
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this),
            change: waitingCount > 0 ? "".concat(waitingCount, " bệnh nhân") : 'Không có',
            changeType: 'neutral'
        },
        {
            title: 'Hoàn thành hôm nay',
            value: "".concat(completedTodayCount),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquareIcon$3e$__["CheckSquareIcon"], {
                className: "h-6 w-6 text-green-600"
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                lineNumber: 95,
                columnNumber: 13
            }, this),
            change: completedTodayCount > 0 ? "".concat(Math.round(completedTodayCount / (completedTodayCount + waitingCount || 1) * 100), "%") : '0%',
            changeType: 'increase'
        },
        {
            title: 'Tổng bệnh nhân',
            value: patientCount.toString(),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UsersIcon$3e$__["UsersIcon"], {
                className: "h-6 w-6 text-purple-600"
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                lineNumber: 104,
                columnNumber: 13
            }, this),
            change: "+".concat(newPatientsToday, " mới"),
            changeType: 'increase'
        }
    ];
    const appointments = [
        {
            id: 1,
            patient: 'Nguyễn Văn A',
            time: '9:00 AM',
            doctor: 'Dr. Nguyễn Thị Hương',
            department: 'Nội khoa',
            status: 'Đang chờ'
        },
        {
            id: 2,
            patient: 'Trần Văn B',
            time: '9:30 AM',
            doctor: 'Dr. Lê Minh Tuấn',
            department: 'Tim mạch',
            status: 'Đang khám'
        },
        {
            id: 3,
            patient: 'Phạm Thị C',
            time: '10:00 AM',
            doctor: 'Dr. Trần Thị Mai',
            department: 'Da liễu',
            status: 'Đặt trước'
        },
        {
            id: 4,
            patient: 'Hoàng Văn D',
            time: '10:30 AM',
            doctor: 'Dr. Nguyễn Thị Hương',
            department: 'Nội khoa',
            status: 'Đặt trước'
        },
        {
            id: 5,
            patient: 'Lê Thị E',
            time: '11:00 AM',
            doctor: 'Dr. Phạm Văn Nam',
            department: 'Nhãn khoa',
            status: 'Đặt trước'
        }
    ];
    // Hàm lấy danh sách queue đã hoàn thành
    const fetchCompletedQueues = async ()=>{
        setLoadingQueues(true);
        setQueueError(null);
        try {
            if (token) {
                // Sử dụng API với token
                try {
                    console.log("Fetching completed queues from API...");
                    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQueuesByStatus"]('completed', token);
                    console.log("API response:", response);
                    // Format lại dữ liệu nếu cần
                    const formattedQueues = response.map((queue)=>({
                            ...queue,
                            patientName: queue.patient && typeof queue.patient === 'object' ? queue.patient.fullName : 'Không có tên',
                            doctorName: queue.doctorId && typeof queue.doctorId === 'object' ? queue.doctorId.fullName : 'Không rõ bác sĩ'
                        }));
                    // Sắp xếp theo thời gian hoàn thành mới nhất
                    formattedQueues.sort((a, b)=>new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                    setCompletedQueues(formattedQueues);
                    setTotalPages(Math.ceil(formattedQueues.length / queuesPerPage));
                    setCurrentPage(1); // Reset to first page when data changes
                } catch (apiError) {
                    console.error("API error:", apiError);
                    setQueueError("Lỗi khi lấy dữ liệu từ API: ".concat(apiError.message));
                    // Fallback to mock data
                    await fetchCompletedQueuesMock();
                }
            } else {
                // Sử dụng mock data nếu không có token
                await fetchCompletedQueuesMock();
            }
        } catch (error) {
            console.error("Error fetching completed queues:", error);
            setQueueError("Lỗi: ".concat(error.message));
        } finally{
            setLoadingQueues(false);
        }
    };
    // Hàm fallback sử dụng mock data
    const fetchCompletedQueuesMock = async ()=>{
        try {
            console.log("Using mock data for completed queues...");
            // Remove initializeData call here too
            // Lấy danh sách queue đã hoàn thành từ mock data
            const mockCompletedQueues = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQueuesByStatus"])('completed');
            // Format lại dữ liệu để hiển thị
            const formattedMockQueues = await Promise.all(mockCompletedQueues.map(async (queue)=>{
                // Giả sử bạn có các hàm mock để lấy thông tin bệnh nhân và bác sĩ
                let patientName = 'Không có tên';
                // Xử lý các cấu trúc dữ liệu khác nhau có thể có
                if (queue.patientInfo && queue.patientInfo.fullName) {
                    patientName = queue.patientInfo.fullName;
                } else if (queue.patient && typeof queue.patient === 'object' && queue.patient.fullName) {
                    patientName = queue.patient.fullName;
                }
                return {
                    ...queue,
                    patientName: patientName,
                    doctorName: queue.doctorId ? "Bác sĩ ".concat(queue._id.substring(0, 5)) : 'Không rõ bác sĩ',
                    completedAt: new Date(queue.updatedAt).toLocaleString('vi-VN')
                };
            }));
            // Sắp xếp theo thời gian hoàn thành mới nhất
            formattedMockQueues.sort((a, b)=>new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            setCompletedQueues(formattedMockQueues);
            setTotalPages(Math.ceil(formattedMockQueues.length / queuesPerPage));
            setCurrentPage(1); // Reset to first page when data changes
        } catch (mockError) {
            console.error("Error loading mock data for completed queues:", mockError);
            setQueueError("Không thể tải dữ liệu mô phỏng: ".concat(mockError.message));
            setCompletedQueues([]);
            setTotalPages(1);
        }
    };
    // Calculating pagination variables
    const indexOfLastQueue = currentPage * queuesPerPage;
    const indexOfFirstQueue = indexOfLastQueue - queuesPerPage;
    const currentQueues = completedQueues.slice(indexOfFirstQueue, indexOfLastQueue);
    // Function to handle page change
    const paginate = (pageNumber)=>setCurrentPage(pageNumber);
    // Function to handle records per page change
    const handleRecordsPerPageChange = (e)=>{
        const value = parseInt(e.target.value);
        setQueuesPerPage(value);
        setTotalPages(Math.ceil(completedQueues.length / value));
        setCurrentPage(1); // Reset to first page when changing records per page
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white shadow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-gray-900",
                            children: "Hệ thống Lễ tân MediClinic"
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mr-4 text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-gray-900",
                                            children: (user === null || user === void 0 ? void 0 : user.fullName) || 'Người dùng'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 232,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500",
                                            children: "Lễ tân"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 233,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                    lineNumber: 231,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__["UserIcon"], {
                                        className: "h-5 w-5 text-gray-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                        lineNumber: 236,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: logout,
                                    className: "ml-4 p-2 rounded-full text-gray-500 hover:bg-gray-100",
                                    title: "Đăng xuất",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOutIcon$3e$__["LogOutIcon"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                        lineNumber: 243,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6",
                        children: stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white overflow-hidden shadow rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-shrink-0",
                                                    children: stat.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ml-5 w-0 flex-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                className: "text-sm font-medium text-gray-500 truncate",
                                                                children: stat.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                lineNumber: 260,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-lg font-medium text-gray-900",
                                                                    children: stat.value
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 262,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                lineNumber: 261,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 256,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                        lineNumber: 255,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 px-5 py-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium ".concat(stat.changeType === 'increase' ? 'text-green-600' : stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'),
                                                    children: stat.change
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: " so với hôm qua"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 269,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                lineNumber: 254,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white shadow rounded-lg mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-5 sm:px-6 flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-medium leading-6 text-gray-900",
                                        children: "Danh sách bệnh nhân đã hoàn thành khám"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                        lineNumber: 286,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: fetchCompletedQueues,
                                        className: "px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded flex items-center",
                                        disabled: loadingQueues,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                                size: 14,
                                                className: "mr-1 ".concat(loadingQueues ? 'animate-spin' : '')
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                lineNumber: 292,
                                                columnNumber: 15
                                            }, this),
                                            "Làm mới"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this),
                            queueError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3 bg-red-50 text-red-700 border-t border-b border-red-200",
                                children: queueError
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-gray-200",
                                children: loadingQueues ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center items-center py-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 306,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-gray-600",
                                            children: "Đang tải dữ liệu..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 307,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                    lineNumber: 305,
                                    columnNumber: 15
                                }, this) : completedQueues.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "min-w-full divide-y divide-gray-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    className: "bg-gray-50",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                scope: "col",
                                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Bệnh nhân"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                lineNumber: 314,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                scope: "col",
                                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Bác sĩ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                lineNumber: 317,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                scope: "col",
                                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Ngày hoàn thành"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                lineNumber: 320,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                scope: "col",
                                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Trạng thái"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    className: "bg-white divide-y divide-gray-200",
                                                    children: currentQueues.map((queue)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "hover:bg-gray-50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4 whitespace-nowrap",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm font-medium text-gray-900",
                                                                            children: queue.patientName || (queue.patient && typeof queue.patient === 'object' ? queue.patient.fullName : 'Không có tên')
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 332,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm text-gray-500",
                                                                            children: [
                                                                                "ID: ",
                                                                                queue.patient && typeof queue.patient === 'object' ? queue.patient.userId : queue.patient || 'N/A'
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 336,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 331,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4 whitespace-nowrap",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-900",
                                                                        children: queue.doctorName || (queue.doctorId && typeof queue.doctorId === 'object' ? queue.doctorId.fullName : 'Không rõ bác sĩ')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 341,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                                                    children: new Date(queue.updatedAt).toLocaleString('vi-VN')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 347,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4 whitespace-nowrap",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                                                                size: 14,
                                                                                className: "mr-1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                lineNumber: 352,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            " Hoàn thành"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                        lineNumber: 351,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 350,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, queue._id, true, {
                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                            lineNumber: 330,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 311,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-4 sm:hidden",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-700",
                                                                    children: [
                                                                        "Trang ",
                                                                        currentPage,
                                                                        "/",
                                                                        totalPages
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 364,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    className: "border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm",
                                                                    value: queuesPerPage,
                                                                    onChange: (e)=>{
                                                                        setQueuesPerPage(Number(e.target.value));
                                                                        setTotalPages(Math.ceil(completedQueues.length / Number(e.target.value)));
                                                                        setCurrentPage(1); // Reset to first page when changing records per page
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 5,
                                                                            children: "5 mỗi trang"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 376,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 10,
                                                                            children: "10 mỗi trang"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 377,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 20,
                                                                            children: "20 mỗi trang"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 378,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: completedQueues.length,
                                                                            children: "Tất cả"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 379,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 367,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setCurrentPage(Math.max(1, currentPage - 1)),
                                                                    className: "relative inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ".concat(currentPage === 1 ? 'text-gray-400 bg-gray-100' : 'text-blue-600 bg-blue-100 hover:bg-blue-200', " focus:outline-none"),
                                                                    disabled: currentPage === 1,
                                                                    children: "Trước"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 383,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-medium",
                                                                    children: [
                                                                        currentPage,
                                                                        " / ",
                                                                        totalPages
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 394,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setCurrentPage(Math.min(totalPages, currentPage + 1)),
                                                                    className: "relative inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ".concat(currentPage === totalPages ? 'text-gray-400 bg-gray-100' : 'text-blue-600 bg-blue-100 hover:bg-blue-200', " focus:outline-none"),
                                                                    disabled: currentPage === totalPages,
                                                                    children: "Tiếp theo"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 397,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                            lineNumber: 382,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "hidden sm:flex-1 sm:flex sm:justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-700",
                                                                    children: [
                                                                        "Hiển thị",
                                                                        ' ',
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: (currentPage - 1) * queuesPerPage + 1
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 414,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        ' ',
                                                                        "đến",
                                                                        ' ',
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: Math.min(currentPage * queuesPerPage, completedQueues.length)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 416,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        ' ',
                                                                        "trong tổng số",
                                                                        ' ',
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: completedQueues.length
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 418,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        ' ',
                                                                        "bệnh nhân đã hoàn thành khám"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 412,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    className: "ml-3 border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm",
                                                                    value: queuesPerPage,
                                                                    onChange: (e)=>{
                                                                        setQueuesPerPage(Number(e.target.value));
                                                                        setTotalPages(Math.ceil(completedQueues.length / Number(e.target.value)));
                                                                        setCurrentPage(1); // Reset to first page when changing records per page
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 5,
                                                                            children: "5 mỗi trang"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 430,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 10,
                                                                            children: "10 mỗi trang"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 431,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 20,
                                                                            children: "20 mỗi trang"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 432,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: completedQueues.length,
                                                                            children: "Hiển thị tất cả"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                            lineNumber: 433,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                    lineNumber: 421,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                                                className: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
                                                                "aria-label": "Pagination",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setCurrentPage(1),
                                                                        className: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "sr-only",
                                                                                children: "Đến trang đầu"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                lineNumber: 442,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                className: "h-5 w-5",
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                fill: "none",
                                                                                viewBox: "0 0 24 24",
                                                                                strokeWidth: 2,
                                                                                stroke: "currentColor",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    d: "M15 18l-6-6 6-6"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                    lineNumber: 444,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                lineNumber: 443,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                        lineNumber: 438,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setCurrentPage(currentPage - 1),
                                                                        className: "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10",
                                                                        disabled: currentPage === 1,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "sr-only",
                                                                                children: "Trang trước"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                lineNumber: 452,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                className: "h-5 w-5",
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                fill: "none",
                                                                                viewBox: "0 0 24 24",
                                                                                strokeWidth: 2,
                                                                                stroke: "currentColor",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    d: "M15 18l-6-6 6-6"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                    lineNumber: 454,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                lineNumber: 453,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                        lineNumber: 447,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    Array.from({
                                                                        length: Math.min(5, totalPages)
                                                                    }, (_, i)=>{
                                                                        // Logic to show pages around current page
                                                                        let pageToShow;
                                                                        if (totalPages <= 5) {
                                                                            pageToShow = i + 1;
                                                                        } else if (currentPage <= 3) {
                                                                            pageToShow = i + 1;
                                                                        } else if (currentPage >= totalPages - 2) {
                                                                            pageToShow = totalPages - 4 + i;
                                                                        } else {
                                                                            pageToShow = currentPage - 2 + i;
                                                                        }
                                                                        if (pageToShow > 0 && pageToShow <= totalPages) {
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>setCurrentPage(pageToShow),
                                                                                className: "relative inline-flex items-center px-4 py-2 border border-gray-300 ".concat(currentPage === pageToShow ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50', " text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"),
                                                                                children: pageToShow
                                                                            }, pageToShow, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                lineNumber: 474,
                                                                                columnNumber: 31
                                                                            }, this);
                                                                        }
                                                                        return null;
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setCurrentPage(currentPage + 1),
                                                                        className: "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10",
                                                                        disabled: currentPage === totalPages,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "sr-only",
                                                                                children: "Trang tiếp theo"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                lineNumber: 495,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                className: "h-5 w-5",
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                fill: "none",
                                                                                viewBox: "0 0 24 24",
                                                                                strokeWidth: 2,
                                                                                stroke: "currentColor",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    d: "M9 6l6 6-6 6"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                    lineNumber: 497,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                lineNumber: 496,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                        lineNumber: 490,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setCurrentPage(totalPages),
                                                                        className: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "sr-only",
                                                                                children: "Đến trang cuối"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                lineNumber: 504,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                className: "h-5 w-5",
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                fill: "none",
                                                                                viewBox: "0 0 24 24",
                                                                                strokeWidth: 2,
                                                                                stroke: "currentColor",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    d: "M9 6l6 6-6 6"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                    lineNumber: 506,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                                lineNumber: 505,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                        lineNumber: 500,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                                lineNumber: 437,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                            lineNumber: 436,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 361,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                    lineNumber: 310,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8 text-gray-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                            className: "mx-auto h-12 w-12 text-gray-400 mb-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 516,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500",
                                            children: "Không có bệnh nhân nào đã hoàn thành khám"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 517,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                    lineNumber: 515,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white shadow rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-5 sm:px-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium leading-6 text-gray-900",
                                    children: "Thao tác nhanh"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                    lineNumber: 526,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                lineNumber: 525,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-gray-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 cursor-pointer",
                                            onClick: ()=>onNavigate('PatientManagement'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-shrink-0 bg-blue-100 rounded-md p-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UsersIcon$3e$__["UsersIcon"], {
                                                        className: "h-6 w-6 text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                        lineNumber: 536,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 535,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-gray-900",
                                                            children: "Quản lý bệnh nhân"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                            lineNumber: 539,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-500",
                                                            children: "Xem và quản lý thông tin bệnh nhân"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                            lineNumber: 540,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 538,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 531,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 cursor-pointer",
                                            onClick: ()=>onNavigate('QueueManagement'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-shrink-0 bg-green-100 rounded-md p-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                                                        className: "h-6 w-6 text-green-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-gray-900",
                                                            children: "Quản lý lịch hẹn"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                            lineNumber: 553,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-500",
                                                            children: "Thêm và chỉnh sửa lịch hẹn"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                            lineNumber: 554,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 552,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 545,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 cursor-pointer",
                                            onClick: ()=>onNavigate('MedicationHistory'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-shrink-0 bg-purple-100 rounded-md p-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__["ClockIcon"], {
                                                        className: "h-6 w-6 text-purple-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                        lineNumber: 564,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-gray-900",
                                                            children: "Báo cáo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                            lineNumber: 567,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-500",
                                                            children: "Xem báo cáo hoạt động"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                            lineNumber: 568,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                                    lineNumber: 566,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                            lineNumber: 559,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                    lineNumber: 529,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                                lineNumber: 528,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                        lineNumber: 524,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/receptionistPage/Dashboard.tsx",
        lineNumber: 225,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "ojxJoZj6n/I27DeyNnNdmW+v8eA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/receptionistPage/PatientManagement.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PatientManagement": ()=>PatientManagement
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as SearchIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as PlusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as EditIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as TrashIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlusIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/datats/mockPatients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/api.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/axios.customize.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
// === THÊM MỚI: Hàm trợ giúp để định dạng ngày tháng ===
const formatDate = (isoString)=>{
    if (!isoString) return '';
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return "".concat(day, "/").concat(month, "/").concat(year, " ").concat(hours, ":").concat(minutes);
};
// === KẾT THÚC THÊM MỚI ===
// Các hàm CRUD giữ nguyên logic gốc 
const addPatient = async (patientData, authToken)=>{
    try {
        if (authToken) {
            // Sử dụng API nếu có token
            try {
                console.log("Adding patient via API:", patientData);
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUser"](patientData, authToken);
                console.log("API success - new patient added:", result);
                return result;
            } catch (apiError) {
                console.error("API error when adding patient:", apiError);
                // Fallback to mock data nếu API lỗi
                console.log("Falling back to mock data for adding patient");
            }
        }
        // Sử dụng mock data nếu không có token hoặc API lỗi
        const newPatient = {
            ...patientData,
            _id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMongoId"])(),
            userId: patientData.userId || "PA".concat(Date.now()),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            __v: 0
        };
        console.log("Added patient using mock data:", newPatient);
        return newPatient;
    } catch (error) {
        console.error("Error adding patient:", error);
        return null;
    }
};
const updatePatient = async (id, patientData, authToken)=>{
    try {
        if (authToken) {
            // Sử dụng API nếu có token
            try {
                console.log("Updating patient via API - ID ".concat(id, ":"), patientData);
                // Kiểm tra tính hợp lệ của token trước khi gọi API
                const tokenStatus = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateToken"](authToken);
                if (!tokenStatus.valid) {
                    console.error("Invalid token when updating patient:", tokenStatus);
                    throw new Error("Authentication error: ".concat(tokenStatus.reason));
                }
                // Gọi API để cập nhật thông tin bệnh nhân
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateUser"](id, patientData, authToken);
                console.log("API success - patient updated:", result);
                // Trả về dữ liệu từ API để cập nhật UI
                return result;
            } catch (apiError) {
                // Log chi tiết lỗi từ API để debug
                console.error("API error when updating patient ".concat(id, ":"), apiError);
                if (apiError.response) {
                    console.error("Error status:", apiError.response.status);
                    console.error("Error data:", apiError.response.data);
                }
                // Hiển thị thông báo lỗi cụ thể
                if (apiError.response && apiError.response.status === 403) {
                    // Thử lại với vai trò tiếp tân
                    try {
                        console.log("Trying to update patient as receptionist...");
                        const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserById"]('me', authToken);
                        // Nếu người dùng là tiếp tân, thử gửi với tham số đặc biệt
                        if (currentUser && currentUser.role === 'RECEPTIONIST') {
                            console.log("User is a receptionist, trying with receptionist parameter");
                            // Thêm tham số isReceptionist: true để backend biết đây là tiếp tân
                            const updatedData = {
                                ...patientData,
                                isReceptionist: true
                            };
                            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateUser"](id, updatedData, authToken);
                            console.log("Success updating patient as receptionist:", result);
                            return result;
                        } else {
                            throw new Error("Bạn không có quyền cập nhật thông tin bệnh nhân");
                        }
                    } catch (retryError) {
                        console.error("Error when retrying as receptionist:", retryError);
                        throw new Error("Bạn không có quyền cập nhật thông tin bệnh nhân");
                    }
                } else if (apiError.response && apiError.response.status === 401) {
                    throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
                } else if (apiError.response && apiError.response.status === 404) {
                    throw new Error("Không tìm thấy bệnh nhân với ID đã cung cấp");
                } else {
                    throw new Error("Lỗi cập nhật thông tin: ".concat(apiError.message || 'Không thể kết nối đến máy chủ'));
                }
            }
        }
        // Sử dụng mock data nếu không có token
        console.log("No token available, using mock data for updating patient");
        const updatedPatient = {
            ...patientData,
            _id: id,
            updatedAt: new Date().toISOString()
        };
        console.log("Updated patient using mock data - ID ".concat(id, ":"), updatedPatient);
        return updatedPatient;
    } catch (error) {
        // Re-throw để component xử lý và hiển thị
        console.error("Error updating patient ".concat(id, ":"), error);
        throw error;
    }
};
const deletePatient = async (id, authToken)=>{
    try {
        if (authToken) {
            // Sử dụng API nếu có token
            try {
                console.log("Deleting patient via API - ID ".concat(id));
                // Kiểm tra tính hợp lệ của token trước khi gọi API
                const tokenStatus = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateToken"](authToken);
                if (!tokenStatus.valid) {
                    console.error("Invalid token when deleting patient:", tokenStatus);
                    throw new Error("Authentication error: ".concat(tokenStatus.reason));
                }
                // Gọi API để xóa bệnh nhân
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete("/users/".concat(id), {
                    headers: {
                        Authorization: "Bearer ".concat(authToken)
                    }
                });
                console.log("API success - patient deleted");
                return true;
            } catch (apiError) {
                // Log chi tiết lỗi từ API để debug
                console.error("API error when deleting patient ".concat(id, ":"), apiError);
                if (apiError.response) {
                    console.error("Error status:", apiError.response.status);
                    console.error("Error data:", apiError.response.data);
                }
                // Hiển thị thông báo lỗi cụ thể
                if (apiError.response && apiError.response.status === 403) {
                    // Thử lại với vai trò tiếp tân
                    try {
                        console.log("Trying to delete patient as receptionist...");
                        const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserById"]('me', authToken);
                        // Nếu người dùng là tiếp tân, thử gửi với tham số đặc biệt
                        if (currentUser && currentUser.role === 'RECEPTIONIST') {
                            console.log("User is a receptionist, trying with receptionist parameter");
                            // Thêm tham số query isReceptionist=true để backend biết đây là tiếp tân
                            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete("/users/".concat(id, "?isReceptionist=true"), {
                                headers: {
                                    Authorization: "Bearer ".concat(authToken)
                                }
                            });
                            console.log("Success deleting patient as receptionist");
                            return true;
                        } else {
                            throw new Error("Bạn không có quyền xóa bệnh nhân");
                        }
                    } catch (retryError) {
                        console.error("Error when retrying delete as receptionist:", retryError);
                        throw new Error("Bạn không có quyền xóa bệnh nhân");
                    }
                } else if (apiError.response && apiError.response.status === 401) {
                    throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
                } else if (apiError.response && apiError.response.status === 404) {
                    throw new Error("Không tìm thấy bệnh nhân với ID đã cung cấp");
                } else if (apiError.response && apiError.response.status === 400) {
                    throw new Error("Không thể xóa bệnh nhân này. Bệnh nhân có thể đang có dữ liệu liên quan.");
                } else {
                    throw new Error("Lỗi xóa bệnh nhân: ".concat(apiError.message || 'Không thể kết nối đến máy chủ'));
                }
            }
        }
        // Sử dụng mock data nếu không có token
        console.log("No token available, using mock data for deleting patient - ID ".concat(id));
        return true;
    } catch (error) {
        // Re-throw để component xử lý và hiển thị
        console.error("Error deleting patient ".concat(id, ":"), error);
        throw error;
    }
};
function PatientManagement(param) {
    let { onBack } = param;
    _s();
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editingPatient, setEditingPatient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [refreshData, setRefreshData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [patients, setPatients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [authError, setAuthError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notification, setNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('createdAt-desc');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatientManagement.useEffect": ()=>{
            const loadData = {
                "PatientManagement.useEffect.loadData": async ()=>{
                    setLoading(true);
                    setAuthError(null);
                    try {
                        let patientData = []; // Tạm thời cho phép mảng chứa giá trị null
                        if (token) {
                            try {
                                patientData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPatients"](token);
                            } catch (apiError) {
                                if (apiError.response && apiError.response.status === 403) {
                                    setAuthError("Không có quyền truy cập dữ liệu bệnh nhân. Vui lòng đăng nhập lại với tài khoản có quyền.");
                                }
                                // Fallback to mock data
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeData"])();
                                patientData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllPatients"])();
                            }
                        } else {
                            // Fallback to mock data
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeData"])();
                            patientData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllPatients"])();
                        }
                        // === BẮT ĐẦU SỬA LỖI ===
                        // In ra dữ liệu gốc để kiểm tra (bạn có thể xóa dòng này sau khi debug xong)
                        console.log('Raw patient data from source:', patientData);
                        // Lọc bỏ tất cả các giá trị không hợp lệ (như null, undefined) khỏi mảng
                        const validPatients = patientData.filter({
                            "PatientManagement.useEffect.loadData.validPatients": (patient)=>{
                                if (patient === null || patient === undefined) {
                                    console.warn('Filtered out a null or undefined entry from patient data.');
                                    return false; // Loại bỏ phần tử này
                                }
                                return true; // Giữ lại phần tử này
                            }
                        }["PatientManagement.useEffect.loadData.validPatients"]);
                        // Chỉ cập nhật state với mảng dữ liệu đã được làm sạch
                        setPatients(validPatients);
                    // === KẾT THÚC SỬA LỖI ===
                    } catch (error) {
                        console.error("Error loading patients data:", error);
                        setPatients([]);
                    } finally{
                        setLoading(false);
                    }
                }
            }["PatientManagement.useEffect.loadData"];
            loadData();
        }
    }["PatientManagement.useEffect"], [
        refreshData,
        token
    ]);
    const handleEdit = (patient)=>{
        setEditingPatient(patient);
        setShowForm(true);
    };
    const handleDelete = async (id)=>{
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa bệnh nhân này không?");
        if (confirmed) {
            setLoading(true);
            setNotification(null);
            try {
                // Giả sử deletePatient là hàm đã có
                await deletePatient(id, token || undefined);
                setNotification({
                    type: 'success',
                    message: 'Xóa bệnh nhân thành công'
                });
                setRefreshData((prev)=>prev + 1);
            } catch (error) {
                setNotification({
                    type: 'error',
                    message: error.message || 'Lỗi khi xóa.'
                });
            } finally{
                setLoading(false);
                setTimeout(()=>setNotification(null), 5000);
            }
        }
    };
    const handleSavePatient = async (patientData)=>{
        setLoading(true);
        setNotification(null);
        try {
            if (editingPatient && editingPatient._id) {
                // Giả sử updatePatient là hàm đã có
                await updatePatient(editingPatient._id, patientData, token || undefined);
                setNotification({
                    type: 'success',
                    message: 'Cập nhật thành công'
                });
            } else {
                // Giả sử addPatient là hàm đã có
                await addPatient({
                    ...patientData,
                    role: 'PATIENT'
                }, token || undefined);
                setNotification({
                    type: 'success',
                    message: 'Thêm thành công'
                });
            }
            setRefreshData((prev)=>prev + 1);
            handleCloseForm();
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message || 'Lỗi khi lưu.'
            });
        } finally{
            setLoading(false);
            setTimeout(()=>setNotification(null), 5000);
        }
    };
    const handleCloseForm = ()=>{
        setShowForm(false);
        setEditingPatient(null);
    };
    const addToWaitingRoom = async (patientId)=>{
        setLoading(true);
        setNotification(null);
        try {
            if (token) {
                try {
                    const allQueues = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQueues"](token);
                    const existingQueue = allQueues.find((q)=>q.patient === patientId && [
                            'waiting',
                            'in_progress'
                        ].includes(q.status));
                    if (existingQueue) {
                        throw new Error('Bệnh nhân này đã có trong phòng chờ hoặc đang khám!');
                    }
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createQueue"](patientId, token);
                    setNotification({
                        type: 'success',
                        message: 'Đã thêm bệnh nhân vào phòng chờ!'
                    });
                    // === THAY ĐỔI: Ẩn bệnh nhân sau khi thêm thành công ===
                    setPatients((prevPatients)=>prevPatients.filter((p)=>p._id !== patientId));
                    return;
                } catch (apiError) {
                // Fallback to mock
                }
            }
            const existingQueue = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQueueByPatientId"])(patientId);
            if (existingQueue && [
                'waiting',
                'in_progress'
            ].includes(existingQueue.status)) {
                throw new Error('Bệnh nhân này đã có trong phòng chờ hoặc đang khám!');
            }
            const newQueue = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addQueue"])(patientId);
            if (newQueue) {
                setNotification({
                    type: 'success',
                    message: 'Đã thêm bệnh nhân vào phòng chờ! (dữ liệu mô phỏng)'
                });
                // === THAY ĐỔI: Ẩn bệnh nhân sau khi thêm thành công (fallback) ===
                setPatients((prevPatients)=>prevPatients.filter((p)=>p._id !== patientId));
            } else {
                throw new Error('Có lỗi khi thêm bệnh nhân vào phòng chờ!');
            }
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message || 'Có lỗi xảy ra!'
            });
        } finally{
            setLoading(false);
            setTimeout(()=>setNotification(null), 5000);
        }
    };
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatientManagement.useEffect": ()=>{
            const handleSearch = {
                "PatientManagement.useEffect.handleSearch": async ()=>{
                    if (searchTerm.trim() === '') {
                        setSearchResults([]);
                        return;
                    }
                    try {
                        const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchUsers"])(searchTerm);
                        setSearchResults(results.filter({
                            "PatientManagement.useEffect.handleSearch": (user)=>user.role === 'PATIENT'
                        }["PatientManagement.useEffect.handleSearch"]));
                    } catch (error) {
                        setSearchResults([]);
                    }
                }
            }["PatientManagement.useEffect.handleSearch"];
            handleSearch();
        }
    }["PatientManagement.useEffect"], [
        searchTerm
    ]);
    const filteredPatients = searchTerm.trim() === '' ? patients : searchResults;
    const sortedPatients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PatientManagement.useMemo[sortedPatients]": ()=>{
            const [key, direction] = sortKey.split('-');
            if (!key || !direction) return filteredPatients;
            return [
                ...filteredPatients
            ].sort({
                "PatientManagement.useMemo[sortedPatients]": (a, b)=>{
                    const aValue = a[key];
                    const bValue = b[key];
                    let comparison = 0;
                    if (aValue > bValue) comparison = 1;
                    else if (aValue < bValue) comparison = -1;
                    return direction === 'desc' ? comparison * -1 : comparison;
                }
            }["PatientManagement.useMemo[sortedPatients]"]);
        }
    }["PatientManagement.useMemo[sortedPatients]"], [
        filteredPatients,
        sortKey
    ]);
    return(// Toàn bộ cấu trúc và class JSX được giữ nguyên như giao diện gốc
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full px-4 sm:px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onBack,
                    className: "px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-gray-700",
                    children: "← Quay lại"
                }, void 0, false, {
                    fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                    lineNumber: 426,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                lineNumber: 425,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 border-b border-gray-200 pb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-black tracking-tight",
                                children: "Quản lý bệnh nhân"
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                lineNumber: 435,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowForm(true),
                                className: "bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg flex items-center font-medium shadow-sm transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__["PlusIcon"], {
                                        size: 18,
                                        className: "mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                        lineNumber: 440,
                                        columnNumber: 13
                                    }, this),
                                    "Thêm bệnh nhân"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                lineNumber: 436,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                        lineNumber: 434,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-black mt-2",
                        children: "Quản lý thông tin bệnh nhân và thêm vào phòng chờ"
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                        lineNumber: 444,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                lineNumber: 433,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white",
                children: [
                    authError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded",
                        children: authError
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                        lineNumber: 451,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border-b border-gray-300 bg-gray-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchIcon$3e$__["SearchIcon"], {
                                                size: 18,
                                                className: "text-black"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                lineNumber: 460,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                            lineNumber: 459,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Tìm kiếm theo tên, ID, email hoặc SĐT...",
                                            className: "pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black placeholder-gray-500 shadow-sm",
                                            value: searchTerm,
                                            onChange: (e)=>setSearchTerm(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                            lineNumber: 462,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                    lineNumber: 458,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black shadow-sm",
                                                value: sortKey,
                                                onChange: (e)=>setSortKey(e.target.value),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "createdAt-desc",
                                                        children: "Sắp xếp: Mới nhất"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "createdAt-asc",
                                                        children: "Sắp xếp: Cũ nhất"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "fullName-asc",
                                                        children: "Sắp xếp: Tên (A-Z)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "fullName-desc",
                                                        children: "Sắp xếp: Tên (Z-A)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                        lineNumber: 481,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                lineNumber: 473,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
                                                    size: 16,
                                                    className: "text-black"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                    lineNumber: 484,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                lineNumber: 483,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                        lineNumber: 472,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                    lineNumber: 471,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                            lineNumber: 457,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                        lineNumber: 456,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6",
                        children: [
                            sortedPatients.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto border border-gray-200 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "min-w-full divide-y divide-gray-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "bg-gray-50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200",
                                                        children: "Họ và tên"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                        lineNumber: 498,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200",
                                                        children: "User ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200",
                                                        children: "Username"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200",
                                                        children: "Email"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200",
                                                        children: "Điện thoại"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200",
                                                        children: "Vai trò"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                        lineNumber: 503,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-200",
                                                        children: "Thao tác"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                lineNumber: 497,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                            lineNumber: 496,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "bg-white divide-y divide-gray-200",
                                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 7,
                                                    className: "px-6 py-10 text-center",
                                                    children: "Đang tải dữ liệu..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                    lineNumber: 509,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                lineNumber: 509,
                                                columnNumber: 21
                                            }, this) : sortedPatients.map((patient, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-3.5 whitespace-nowrap text-sm font-medium text-black cursor-pointer",
                                                            title: patient.createdAt ? "Đã tạo vào: ".concat(formatDate(patient.createdAt)) : 'Không có thông tin ngày tạo',
                                                            children: patient.fullName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                            lineNumber: 514,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-3.5 whitespace-nowrap text-sm text-black",
                                                            children: patient.userId
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                            lineNumber: 520,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-3.5 whitespace-nowrap text-sm text-black",
                                                            children: patient.username
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                            lineNumber: 521,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-3.5 whitespace-nowrap text-sm text-black",
                                                            children: patient.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                            lineNumber: 522,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-3.5 whitespace-nowrap text-sm text-black",
                                                            children: patient.phone
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                            lineNumber: 523,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-3.5 whitespace-nowrap text-sm text-black",
                                                            children: patient.role
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                            lineNumber: 524,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-3.5 whitespace-nowrap text-sm text-black",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>handleEdit(patient),
                                                                        className: "p-1.5 rounded-full hover:bg-gray-100 text-black border border-gray-300",
                                                                        title: "Chỉnh sửa",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditIcon$3e$__["EditIcon"], {
                                                                            size: 16
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                                            lineNumber: 527,
                                                                            columnNumber: 174
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                                        lineNumber: 527,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>handleDelete(patient._id),
                                                                        className: "p-1.5 rounded-full hover:bg-gray-100 text-black border border-gray-300",
                                                                        title: "Xóa",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__["TrashIcon"], {
                                                                            size: 16
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                                            lineNumber: 528,
                                                                            columnNumber: 174
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                                        lineNumber: 528,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>addToWaitingRoom(patient._id),
                                                                        className: "text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm flex items-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlusIcon$3e$__["UserPlusIcon"], {
                                                                                size: 16,
                                                                                className: "mr-1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                                                lineNumber: 530,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            "Thêm vào phòng chờ"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                                        lineNumber: 529,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                                lineNumber: 526,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, patient._id, true, {
                                                    fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                    lineNumber: 512,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                            lineNumber: 507,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                    lineNumber: 495,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                lineNumber: 494,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center py-16 border border-dashed border-gray-300 rounded-lg"
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                lineNumber: 542,
                                columnNumber: 13
                            }, this),
                            sortedPatients.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-black",
                                        children: [
                                            "Hiển thị ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: sortedPatients.length
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                lineNumber: 549,
                                                columnNumber: 58
                                            }, this),
                                            " bệnh nhân"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                        lineNumber: 549,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex shadow-sm rounded-md",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-black rounded-l-md hover:bg-gray-50",
                                                children: "Trước"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                lineNumber: 551,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-4 py-2 bg-gray-200 text-black text-sm font-medium border border-gray-300 relative -ml-px hover:bg-gray-300",
                                                children: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                lineNumber: 552,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-black rounded-r-md hover:bg-gray-50",
                                                children: "Sau"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                                lineNumber: 553,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                        lineNumber: 550,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                lineNumber: 548,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                        lineNumber: 492,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                lineNumber: 449,
                columnNumber: 7
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                lineNumber: 561,
                columnNumber: 9
            }, this),
            notification && // ... (Component thông báo giữ nguyên) ...
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-6 right-6 max-w-sm w-full shadow-lg rounded-lg p-4 flex items-start space-x-4 z-50 ".concat(notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 h-5 w-5 relative mt-0.5 ".concat(notification.type === 'success' ? 'text-green-600' : 'text-red-600'),
                        children: notification.type === 'success' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fillRule: "evenodd",
                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                clipRule: "evenodd"
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                lineNumber: 576,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                            lineNumber: 575,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fillRule: "evenodd",
                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                                clipRule: "evenodd"
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                lineNumber: 580,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                            lineNumber: 579,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                        lineNumber: 571,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-medium ".concat(notification.type === 'success' ? 'text-green-800' : 'text-red-800'),
                                children: notification.type === 'success' ? 'Thành công' : 'Lỗi'
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                lineNumber: 585,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm ".concat(notification.type === 'success' ? 'text-green-700' : 'text-red-700'),
                                children: notification.message
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                lineNumber: 590,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                        lineNumber: 584,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setNotification(null),
                        className: "flex-shrink-0 text-gray-500 hover:text-gray-700 focus:outline-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "h-4 w-4",
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fillRule: "evenodd",
                                d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                                clipRule: "evenodd"
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                                lineNumber: 601,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                            lineNumber: 600,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                        lineNumber: 596,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
                lineNumber: 568,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/receptionistPage/PatientManagement.tsx",
        lineNumber: 424,
        columnNumber: 5
    }, this));
}
_s(PatientManagement, "XM3WmYe81FZ7sQHqSzQSLB8D5qk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = PatientManagement;
var _c;
__turbopack_context__.k.register(_c, "PatientManagement");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/receptionistPage/QueueManagement.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "QueueManagement": ()=>QueueManagement
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveRightIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/move-right.js [app-client] (ecmascript) <export default as MoveRightIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as ClockIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as UserIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/datats/mockPatients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/api.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function QueueManagement(param) {
    let { onBack } = param;
    _s();
    // State để lưu trữ danh sách queue đã được fetch từ API
    const [queues, setQueues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // State để lưu trữ danh sách bệnh nhân đang chờ
    const [waitingPatients, setWaitingPatients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // State để lưu trữ danh sách bệnh nhân đang khám
    const [inProgressPatients, setInProgressPatients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Lấy danh sách bác sĩ từ API
    const [doctors, setDoctors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // State để theo dõi modal chọn bác sĩ
    const [showDoctorModal, setShowDoctorModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedQueue, setSelectedQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // State để theo dõi trạng thái loading
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Lấy authentication token từ context
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Function để format dữ liệu từ API về đúng định dạng cần dùng
    const formatApiQueueResponse = (apiData)=>{
        return apiData.map((item)=>({
                ...item,
                // Map thông tin bệnh nhân từ phản hồi API sang format patientInfo cho tương thích
                patientInfo: item.patient && typeof item.patient === 'object' ? {
                    _id: item.patient._id,
                    userId: item.patient.userId,
                    fullName: item.patient.fullName,
                    phone: item.patient.phone,
                    role: item.patient.role,
                    email: item.patient.email
                } : null
            }));
    };
    // Format dữ liệu từ mock data để tương thích với kiểu QueueWithPatientInfo
    const formatMockQueueData = (mockData)=>{
        return mockData.map((item)=>({
                ...item,
                // Đảm bảo kiểu dữ liệu phù hợp với QueueWithPatientInfo
                patient: item.patient
            }));
    };
    // Effect để fetch dữ liệu queue từ API khi component được render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QueueManagement.useEffect": ()=>{
            const loadData = {
                "QueueManagement.useEffect.loadData": async ()=>{
                    setLoading(true);
                    setError(null);
                    try {
                        if (token) {
                            // Fetch data từ API nếu có token
                            try {
                                console.log("Fetching queues from API...");
                                const apiQueues = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQueuesWithPatients"](token);
                                console.log("API response:", apiQueues);
                                // Format lại dữ liệu từ API
                                const formattedQueues = formatApiQueueResponse(apiQueues);
                                setQueues(formattedQueues);
                                // Lọc ra các trạng thái khác nhau
                                const waiting = formattedQueues.filter({
                                    "QueueManagement.useEffect.loadData.waiting": (q)=>q.status === 'waiting'
                                }["QueueManagement.useEffect.loadData.waiting"]);
                                const inProgress = formattedQueues.filter({
                                    "QueueManagement.useEffect.loadData.inProgress": (q)=>q.status === 'in_progress'
                                }["QueueManagement.useEffect.loadData.inProgress"]);
                                setWaitingPatients(waiting);
                                setInProgressPatients(inProgress);
                            // Không lấy danh sách bác sĩ ở đây nữa, sẽ lấy khi mở modal
                            } catch (apiError) {
                                console.error("API error:", apiError);
                                setError("Lỗi khi lấy dữ liệu từ API: ".concat(apiError.message));
                                // Fallback to mock data
                                console.log("Falling back to mock data...");
                                await fallbackToMockData();
                            }
                        } else {
                            // Không có token, sử dụng mock data
                            console.log("No token available, using mock data...");
                            await fallbackToMockData();
                        }
                    } catch (error) {
                        console.error("Error loading data:", error);
                        setError("Lỗi: ".concat(error.message));
                    } finally{
                        setLoading(false);
                    }
                }
            }["QueueManagement.useEffect.loadData"];
            const fallbackToMockData = {
                "QueueManagement.useEffect.fallbackToMockData": async ()=>{
                    try {
                        // Đảm bảo mock data được khởi tạo
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeData"])();
                        // Lấy toàn bộ queue cùng với thông tin bệnh nhân từ mock data
                        const allQueues = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllQueuesWithPatientInfo"])();
                        const formattedMockQueues = formatMockQueueData(allQueues);
                        setQueues(formattedMockQueues);
                        // Lọc ra các trạng thái khác nhau
                        const waiting = formattedMockQueues.filter({
                            "QueueManagement.useEffect.fallbackToMockData.waiting": (q)=>q.status === 'waiting'
                        }["QueueManagement.useEffect.fallbackToMockData.waiting"]);
                        const inProgress = formattedMockQueues.filter({
                            "QueueManagement.useEffect.fallbackToMockData.inProgress": (q)=>q.status === 'in_progress'
                        }["QueueManagement.useEffect.fallbackToMockData.inProgress"]);
                        setWaitingPatients(waiting);
                        setInProgressPatients(inProgress);
                    // Không lấy danh sách bác sĩ ở đây nữa, sẽ lấy khi mở modal
                    } catch (mockError) {
                        console.error("Error loading mock data:", mockError);
                        setError("Không thể tải dữ liệu: ".concat(mockError));
                    }
                }
            }["QueueManagement.useEffect.fallbackToMockData"];
            loadData();
        }
    }["QueueManagement.useEffect"], [
        token
    ]);
    // Tính thời gian chờ dựa trên createdAt (giả lập)
    const calculateWaitingTime = (createdAt)=>{
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const diffMs = currentDate.getTime() - createdDate.getTime();
        const diffMins = Math.round(diffMs / 60000);
        if (diffMins < 60) {
            return "".concat(diffMins, " phút");
        } else {
            const hours = Math.floor(diffMins / 60);
            const mins = diffMins % 60;
            return "".concat(hours, " giờ ").concat(mins, " phút");
        }
    };
    // Hàm xử lý khi click vào nút "Chuyển vào khám"
    const handleMoveToExamination = async (queueId)=>{
        // Mở modal để chọn bác sĩ
        setSelectedQueue(queueId);
        setShowDoctorModal(true);
        // Lấy danh sách bác sĩ vào lúc này, không phải lúc load trang
        setLoading(true);
        setError(null);
        try {
            let doctorsList = [];
            if (token) {
                // Thử sử dụng endpoint mới dành riêng cho việc lấy danh sách bác sĩ
                try {
                    console.log("Fetching doctors from API...");
                    doctorsList = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoctors"](token);
                    console.log("Retrieved ".concat(doctorsList.length, " doctors from API"));
                } catch (apiError) {
                    console.error("API error when fetching doctors:", apiError);
                    // Fallback to mock data
                    console.log("Falling back to mock data for doctors...");
                    doctorsList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUsersByRole"])('DOCTOR');
                }
            } else {
                // Sử dụng mock data nếu không có token
                console.log("Using mock data for doctors list...");
                doctorsList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUsersByRole"])('DOCTOR');
            }
            // Cập nhật state với danh sách bác sĩ
            setDoctors(doctorsList);
        } catch (error) {
            console.error("Error loading doctors:", error);
            setError("Lỗi khi tải danh sách bác sĩ: ".concat(error.message));
        } finally{
            setLoading(false);
        }
    };
    // Hàm xử lý khi đã chọn bác sĩ và xác nhận chuyển bệnh nhân vào khám
    const handleConfirmMoveToExamination = async (doctorId)=>{
        setLoading(true);
        try {
            if (token) {
                // Sử dụng API nếu có token
                try {
                    console.log("Updating queue ".concat(selectedQueue, " via API..."));
                    const updatedQueue = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateQueueStatus"](selectedQueue, token, 'in_progress', doctorId);
                    console.log("API update successful:", updatedQueue);
                    // Cập nhật UI với dữ liệu mới
                    await refreshData();
                } catch (apiError) {
                    console.error("API error when updating queue:", apiError);
                    // Fallback to mock function
                    await fallbackUpdateQueue(selectedQueue, 'in_progress', doctorId);
                }
            } else {
                // Sử dụng mock function nếu không có token
                await fallbackUpdateQueue(selectedQueue, 'in_progress', doctorId);
            }
            // Đóng modal
            setShowDoctorModal(false);
            setSelectedQueue('');
        } catch (error) {
            console.error("Error moving patient to examination:", error);
            setError("Lỗi khi chuyển bệnh nhân vào khám: ".concat(error));
        } finally{
            setLoading(false);
        }
    };
    // Hàm xử lý khi hoàn thành khám bệnh
    const handleCompleteExamination = async (queueId)=>{
        setLoading(true);
        try {
            if (token) {
                // Sử dụng API nếu có token
                try {
                    // Bước 1: Gửi thông tin bệnh nhân đến bác sĩ
                    console.log("Sending queue ".concat(queueId, " information to doctor..."));
                    try {
                        const sendResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendQueueToDoctor"](queueId, token);
                        console.log("Queue sent to doctor successfully:", sendResult);
                        setError("Đã gửi thông tin bệnh nhân đến bác sĩ thành công!");
                    } catch (sendError) {
                        console.error("Error sending queue to doctor:", sendError);
                        setError("Lỗi khi gửi thông tin đến bác sĩ: ".concat(sendError.message, ". Nhưng vẫn hoàn thành thay đổi trạng thái."));
                    }
                    // Bước 2: Cập nhật trạng thái queue
                    console.log("Updating queue ".concat(queueId, " status to completed..."));
                    const updatedQueue = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateQueueStatus"](queueId, token, 'completed');
                    console.log("API update successful:", updatedQueue);
                    // Cập nhật UI với dữ liệu mới
                    await refreshData();
                } catch (apiError) {
                    console.error("API error when completing examination:", apiError);
                    // Fallback to mock function
                    await fallbackUpdateQueue(queueId, 'completed');
                }
            } else {
                // Sử dụng mock function nếu không có token
                await fallbackUpdateQueue(queueId, 'completed');
            }
        } catch (error) {
            console.error("Error completing examination:", error);
            setError("Lỗi khi hoàn thành khám bệnh: ".concat(error.message));
        } finally{
            setLoading(false);
            // Tự động ẩn thông báo lỗi sau 5 giây
            setTimeout(()=>{
                setError(null);
            }, 5000);
        }
    };
    // Fallback function để sử dụng mock data khi API lỗi
    const fallbackUpdateQueue = async (queueId, status, doctorId)=>{
        try {
            console.log("Using mock data to update queue ".concat(queueId, " to ").concat(status));
            // Nếu đang chuyển sang trạng thái completed, gửi thông tin đến bác sĩ trước
            if (status === 'completed') {
                try {
                    // Trong trường hợp thực, thông tin này đã được gửi qua API
                    // Đối với mock data, ta giả lập việc gửi thông tin
                    console.log("Sending queue ".concat(queueId, " information to doctor (mock)..."));
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendQueueToDoctor"])(queueId);
                    console.log('Mock: Information successfully sent to doctor');
                } catch (sendError) {
                    console.error("Error sending information to doctor (mock):", sendError);
                }
            }
            const updatedQueue = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateQueueStatus"])(queueId, status, doctorId);
            if (updatedQueue) {
                // Cập nhật lại state để re-render UI
                const allQueues = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllQueuesWithPatientInfo"])();
                const formattedMockQueues = formatMockQueueData(allQueues);
                setQueues(formattedMockQueues);
                // Lọc lại các danh sách
                const waiting = formattedMockQueues.filter((q)=>q.status === 'waiting');
                const inProgress = formattedMockQueues.filter((q)=>q.status === 'in_progress');
                setWaitingPatients(waiting);
                setInProgressPatients(inProgress);
            }
        } catch (mockError) {
            console.error("Error using mock data:", mockError);
            setError("Không thể cập nhật trạng thái: ".concat(mockError.message || mockError));
        }
    };
    // Lấy thông tin bác sĩ được chỉ định cho bệnh nhân
    const getAssignedDoctor = (doctorId)=>{
        if (!doctorId) return null;
        // Nếu doctorId là object (từ API)
        if (typeof doctorId === 'object' && doctorId !== null) {
            return doctorId;
        }
        // Nếu doctorId là string (từ mock data)
        return doctors.find((doctor)=>doctor._id === doctorId) || null;
    };
    // Hàm để refresh dữ liệu
    const refreshData = async ()=>{
        setLoading(true);
        setError(null);
        try {
            if (token) {
                console.log("Refreshing data from API...");
                const apiQueues = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQueuesWithPatients"](token);
                const formattedQueues = formatApiQueueResponse(apiQueues);
                setQueues(formattedQueues);
                setWaitingPatients(formattedQueues.filter((q)=>q.status === 'waiting'));
                setInProgressPatients(formattedQueues.filter((q)=>q.status === 'in_progress'));
            } else {
                console.log("Refreshing data from mock data...");
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeData"])();
                const allQueues = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllQueuesWithPatientInfo"])();
                const formattedMockQueues = formatMockQueueData(allQueues);
                setQueues(formattedMockQueues);
                setWaitingPatients(formattedMockQueues.filter((q)=>q.status === 'waiting'));
                setInProgressPatients(formattedMockQueues.filter((q)=>q.status === 'in_progress'));
            }
        // Không cần refresh danh sách bác sĩ, vì danh sách này sẽ được load khi cần thiết
        } catch (error) {
            console.error("Error refreshing data:", error);
            setError("Lỗi khi làm mới dữ liệu: ".concat(error.message));
        } finally{
            setLoading(false);
        }
    };
    // Trích xuất thông tin bệnh nhân từ mỗi queue, xử lý cả từ API và mock data
    const getPatientInfo = (queue)=>{
        // Ưu tiên patientInfo (đã được chuẩn hoá)
        if (queue.patientInfo) {
            return queue.patientInfo;
        }
        // Nếu patient là object (từ API)
        if (queue.patient && typeof queue.patient === 'object') {
            return {
                _id: queue.patient._id,
                userId: queue.patient.userId,
                fullName: queue.patient.fullName,
                phone: queue.patient.phone,
                role: queue.patient.role,
                email: queue.patient.email
            };
        }
        // Trường hợp khác (có thể là null hoặc không có thông tin)
        return null;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full px-4 sm:px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-gray-700",
                        children: "← Quay lại"
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                        lineNumber: 441,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: refreshData,
                        disabled: loading,
                        className: "px-4 py-2 rounded-md flex items-center ".concat(loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700', " text-white"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                size: 16,
                                className: "mr-2 ".concat(loading ? 'animate-spin' : '')
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            loading ? 'Đang tải...' : 'Làm mới dữ liệu'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                        lineNumber: 448,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                lineNumber: 440,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 border-b border-gray-200 pb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-black tracking-tight",
                        children: "Quản lý phòng chờ"
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                        lineNumber: 459,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-black mt-2",
                        children: "Quản lý danh sách bệnh nhân đang chờ khám và theo dõi trạng thái"
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                        lineNumber: 460,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                        lineNumber: 464,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                lineNumber: 458,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-b border-gray-300 bg-gray-50 flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__["ClockIcon"], {
                                                size: 20,
                                                className: "text-black mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                lineNumber: 476,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold text-black",
                                                children: "Bệnh nhân đang chờ"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                lineNumber: 477,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 475,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-gray-800 text-white text-sm px-3.5 py-1 rounded-full font-medium flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__["UserIcon"], {
                                                size: 14,
                                                className: "mr-1.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                lineNumber: 482,
                                                columnNumber: 15
                                            }, this),
                                            waitingPatients.length,
                                            " bệnh nhân"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 481,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                lineNumber: 474,
                                columnNumber: 11
                            }, this),
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 489,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-black",
                                        children: "Đang tải dữ liệu..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 490,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                lineNumber: 488,
                                columnNumber: 13
                            }, this) : waitingPatients.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-gray-200",
                                children: waitingPatients.map((queue, index)=>{
                                    // Lấy thông tin bệnh nhân từ đúng nguồn dữ liệu
                                    const patientInfo = getPatientInfo(queue);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-5 hover:bg-gray-50 transition-colors ".concat(index % 2 === 0 ? 'bg-white' : 'bg-gray-50'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-medium text-black text-base",
                                                                children: (patientInfo === null || patientInfo === void 0 ? void 0 : patientInfo.fullName) || 'Không có tên'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 502,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-black mt-1",
                                                                children: [
                                                                    "ID: ",
                                                                    (patientInfo === null || patientInfo === void 0 ? void 0 : patientInfo.userId) || 'N/A'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 505,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-black mt-1",
                                                                children: [
                                                                    "SĐT: ",
                                                                    (patientInfo === null || patientInfo === void 0 ? void 0 : patientInfo.phone) || 'N/A'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 508,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-200 border border-gray-300 text-black px-3 py-1 rounded-full text-sm font-medium",
                                                        children: "Chờ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                        lineNumber: 512,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                lineNumber: 500,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-black flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__["ClockIcon"], {
                                                                size: 16,
                                                                className: "mr-1.5 text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 518,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Thời gian chờ: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium ml-1",
                                                                children: calculateWaitingTime(queue.createdAt)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 519,
                                                                columnNumber: 40
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleMoveToExamination(queue._id),
                                                        disabled: loading,
                                                        className: "flex items-center text-sm ".concat(loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700', " text-white px-3.5 py-1.5 rounded-md transition-colors shadow-sm"),
                                                        children: [
                                                            "Chuyển vào khám",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveRightIcon$3e$__["MoveRightIcon"], {
                                                                size: 16,
                                                                className: "ml-1.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 527,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                        lineNumber: 521,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                lineNumber: 516,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, queue._id, true, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 499,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                lineNumber: 493,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__["ClockIcon"], {
                                        size: 40,
                                        className: "mx-auto text-gray-400 mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 536,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-black font-medium",
                                        children: "Không có bệnh nhân nào đang chờ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 537,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-black mt-1",
                                        children: "Hãy thêm bệnh nhân vào danh sách chờ từ màn hình Quản lý bệnh nhân"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 538,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                lineNumber: 535,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                        lineNumber: 473,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-b border-gray-300 bg-gray-50 flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                                size: 20,
                                                className: "text-black mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                lineNumber: 547,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold text-black",
                                                children: "Đang khám"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                lineNumber: 548,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 546,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-gray-800 text-white text-sm px-3.5 py-1 rounded-full font-medium flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__["UserIcon"], {
                                                size: 14,
                                                className: "mr-1.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                lineNumber: 551,
                                                columnNumber: 15
                                            }, this),
                                            inProgressPatients.length,
                                            " bệnh nhân"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 550,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                lineNumber: 545,
                                columnNumber: 11
                            }, this),
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 558,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-black",
                                        children: "Đang tải dữ liệu..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 559,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                lineNumber: 557,
                                columnNumber: 13
                            }, this) : inProgressPatients.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-gray-200",
                                children: inProgressPatients.map((queue, index)=>{
                                    // Lấy thông tin bệnh nhân từ đúng nguồn dữ liệu
                                    const patientInfo = getPatientInfo(queue);
                                    // Lấy thông tin bác sĩ được chỉ định
                                    const assignedDoctor = getAssignedDoctor(queue.doctorId);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-5 hover:bg-gray-50 transition-colors ".concat(index % 2 === 0 ? 'bg-white' : 'bg-gray-50'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-medium text-black text-base",
                                                                children: (patientInfo === null || patientInfo === void 0 ? void 0 : patientInfo.fullName) || 'Không có tên'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 574,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-black mt-1",
                                                                children: [
                                                                    "ID: ",
                                                                    (patientInfo === null || patientInfo === void 0 ? void 0 : patientInfo.userId) || 'N/A'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 577,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-black mt-1",
                                                                children: [
                                                                    "SĐT: ",
                                                                    (patientInfo === null || patientInfo === void 0 ? void 0 : patientInfo.phone) || 'N/A'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 580,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                        lineNumber: 573,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-blue-100 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium",
                                                        children: "Đang khám"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                        lineNumber: 584,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                lineNumber: 572,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4 mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-medium text-black uppercase tracking-wide",
                                                                children: "Bác sĩ khám"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 590,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-black mt-1",
                                                                children: assignedDoctor ? typeof assignedDoctor === 'object' ? assignedDoctor.fullName : assignedDoctor : 'Chưa chỉ định'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 591,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                        lineNumber: 589,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-medium text-black uppercase tracking-wide",
                                                                children: "Phòng khám"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 596,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-black mt-1",
                                                                children: assignedDoctor ? "Phòng ".concat(typeof assignedDoctor === 'object' ? 100 + parseInt(assignedDoctor._id.slice(-2), 16) % 10 : 100 + parseInt(String(assignedDoctor).slice(-2), 16) % 10) : 'N/A'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                                lineNumber: 597,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                        lineNumber: 595,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                lineNumber: 588,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, queue._id, true, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 571,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                lineNumber: 562,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                        size: 40,
                                        className: "mx-auto text-gray-400 mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 612,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-black font-medium",
                                        children: "Không có bệnh nhân nào đang khám"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 613,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-black mt-1",
                                        children: "Chuyển bệnh nhân từ phòng chờ vào khám"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 614,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                lineNumber: 611,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                        lineNumber: 544,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                lineNumber: 471,
                columnNumber: 7
            }, this),
            showDoctorModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-xl p-6 w-full max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold text-black",
                                    children: "Chọn bác sĩ"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                    lineNumber: 625,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowDoctorModal(false),
                                    className: "text-gray-500 hover:text-gray-700",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                        lineNumber: 630,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                    lineNumber: 626,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                            lineNumber: 624,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-black mb-4",
                            children: "Vui lòng chọn bác sĩ để chuyển bệnh nhân vào khám:"
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                            lineNumber: 634,
                            columnNumber: 13
                        }, this),
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                    lineNumber: 638,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-black",
                                    children: "Đang tải..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                    lineNumber: 639,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                            lineNumber: 637,
                            columnNumber: 15
                        }, this) : doctors.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 max-h-60 overflow-auto",
                            children: doctors.map((doctor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>!loading && handleConfirmMoveToExamination(doctor._id),
                                    className: "p-3 border border-gray-300 rounded-md ".concat(loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50 cursor-pointer', " transition-colors flex justify-between items-center"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium text-black",
                                                    children: doctor.fullName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                    lineNumber: 650,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-600",
                                                    children: doctor.email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                                    lineNumber: 651,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                            lineNumber: 649,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-100 text-black text-xs px-2 py-1 rounded",
                                            children: [
                                                "Phòng ",
                                                100 + parseInt(doctor._id.slice(-2), 16) % 10
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                            lineNumber: 653,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, doctor._id, true, {
                                    fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                    lineNumber: 644,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                            lineNumber: 642,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center py-4 text-black",
                            children: "Không có bác sĩ nào"
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                            lineNumber: 660,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowDoctorModal(false),
                                className: "px-4 py-2 bg-gray-200 rounded-md mr-2 text-black hover:bg-gray-300",
                                disabled: loading,
                                children: "Hủy"
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                                lineNumber: 664,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                            lineNumber: 663,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                    lineNumber: 623,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
                lineNumber: 622,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/receptionistPage/QueueManagement.tsx",
        lineNumber: 439,
        columnNumber: 5
    }, this);
}
_s(QueueManagement, "QvQOD2lmg1gpN1zmi6aCVtOJ4YE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = QueueManagement;
var _c;
__turbopack_context__.k.register(_c, "QueueManagement");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/receptionistPage/MedicationHistory.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MedicationHistory": ()=>MedicationHistory
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pill.js [app-client] (ecmascript) <export default as Pill>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/api.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function MedicationHistory(param) {
    let { onBack } = param;
    _s();
    const [startDate, setStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [endDate, setEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [medicationRecords, setMedicationRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [allStatuses, setAllStatuses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true); // Toggle to show all statuses - default to true to show all
    const [debugInfo, setDebugInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Pagination state
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [recordsPerPage, setRecordsPerPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load medication data from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MedicationHistory.useEffect": ()=>{
            if (!token) return;
            const initializeData = {
                "MedicationHistory.useEffect.initializeData": async ()=>{
                    const isTokenValid = await verifyToken();
                    if (!isTokenValid) return;
                    if (allStatuses) {
                        loadAllPrescriptions();
                    } else {
                        loadDispensedPrescriptions();
                    }
                }
            }["MedicationHistory.useEffect.initializeData"];
            initializeData();
        }
    }["MedicationHistory.useEffect"], [
        token,
        allStatuses
    ]);
    // Function to load prescriptions with DISPENSED status
    const loadDispensedPrescriptions = async ()=>{
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            // Get prescriptions with status DISPENSED from the API
            console.log('MedicationHistory: Fetching DISPENSED prescriptions');
            const prescriptions = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptions"]({
                status: 'DISPENSED'
            }, token);
            console.log("MedicationHistory: Found ".concat(prescriptions.length, " DISPENSED prescriptions"));
            if (prescriptions.length === 0) {
                console.log('No DISPENSED prescriptions found, checking if they exist with other statuses');
                const allPrescriptions = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptions"]({}, token);
                console.log("Total prescriptions: ".concat(allPrescriptions.length));
                // Filter them manually to see if any have DISPENSED status
                const dispensedPrescriptions = allPrescriptions.filter((p)=>p.status === 'DISPENSED');
                console.log("Manually filtered DISPENSED prescriptions: ".concat(dispensedPrescriptions.length));
                if (dispensedPrescriptions.length > 0) {
                    console.log('Found DISPENSED prescriptions when not filtering by status, using those');
                    await processPrescriptions(dispensedPrescriptions);
                } else {
                    console.log('No DISPENSED prescriptions found even in unfiltered results');
                    setMedicationRecords([]);
                }
            } else {
                await processPrescriptions(prescriptions);
            }
        } catch (error) {
            console.error("Error loading dispensed medication data:", error);
            // Handle specific error cases
            if (error.response) {
                if (error.response.status === 403) {
                    setError("Bạn không có quyền xem dữ liệu này. Vui lòng liên hệ với quản trị viên.");
                } else if (error.response.status === 401) {
                    setError("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
                } else {
                    var _error_response_data;
                    setError("Lỗi từ máy chủ: ".concat(error.response.status, " - ").concat(((_error_response_data = error.response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || error.message));
                }
            } else {
                setError(error.message || "Không thể tải dữ liệu lịch sử thuốc");
            }
            setMedicationRecords([]);
        } finally{
            setLoading(false);
        }
    };
    // Function to load all prescriptions regardless of status
    const loadAllPrescriptions = async ()=>{
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            console.log('Loading all prescriptions regardless of status');
            const prescriptions = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptions"]({}, token);
            console.log("Found ".concat(prescriptions.length, " total prescriptions"));
            // Check if we have prescriptions to process
            if (prescriptions.length === 0) {
                console.log('No prescriptions found at all');
                setMedicationRecords([]);
            } else {
                console.log('Processing prescription data for display');
                await processPrescriptions(prescriptions);
                // Log the first few prescriptions to debug
                prescriptions.slice(0, 3).forEach((prescription, index)=>{
                    var _prescription_patientId;
                    console.log("Prescription ".concat(index + 1, ":"), {
                        id: prescription._id,
                        status: prescription.status,
                        patientName: ((_prescription_patientId = prescription.patientId) === null || _prescription_patientId === void 0 ? void 0 : _prescription_patientId.fullName) || 'Unknown',
                        diagnosis: prescription.diagnosis
                    });
                });
            }
        } catch (error) {
            console.error("Error loading all medication data:", error);
            // Handle specific error cases
            if (error.response) {
                if (error.response.status === 403) {
                    setError("Bạn không có quyền xem dữ liệu này. Vui lòng liên hệ với quản trị viên.");
                } else if (error.response.status === 401) {
                    setError("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
                } else {
                    var _error_response_data;
                    setError("Lỗi từ máy chủ: ".concat(error.response.status, " - ").concat(((_error_response_data = error.response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || error.message));
                }
            } else {
                setError(error.message || "Không thể tải dữ liệu lịch sử thuốc");
            }
            setMedicationRecords([]);
        } finally{
            setLoading(false);
        }
    };
    // Common function to process prescriptions data
    const processPrescriptions = async (prescriptions)=>{
        try {
            console.log("Processing ".concat(prescriptions.length, " prescriptions"));
            // Sort prescriptions by newest first - using createdAt field if available, or date
            const sortedPrescriptions = [
                ...prescriptions
            ].sort((a, b)=>{
                // Use createdAt if available, otherwise fall back to date field
                const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.date);
                const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.date);
                // Sort in descending order (newest first)
                return dateB.getTime() - dateA.getTime();
            });
            console.log('Sorted prescriptions by newest first');
            // Transform prescriptions to the format we need for display
            const records = [];
            for (const prescription of sortedPrescriptions){
                try {
                    // Verify that the prescription object is valid
                    if (!prescription || !prescription._id) {
                        console.error('Invalid prescription object:', prescription);
                        continue;
                    }
                    // Get prescription details (medicines)
                    console.log("MedicationHistory: Fetching details for prescription ".concat(prescription._id));
                    // Fix for TypeScript errors - ensure token is not null
                    if (!token) {
                        console.error('Token is null, cannot fetch prescription details');
                        continue;
                    }
                    // Add error handling for prescription details with detailed logging
                    let prescriptionDetails = [];
                    try {
                        console.log("Calling getPrescriptionDetails API for prescriptionId: ".concat(prescription._id));
                        prescriptionDetails = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptionDetails"](prescription._id, token);
                        console.log("Got ".concat(prescriptionDetails.length, " medication details for prescription ").concat(prescription._id), prescriptionDetails);
                        // Log the first detail if available for debugging
                        if (prescriptionDetails.length > 0) {
                            console.log('First prescription detail:', prescriptionDetails[0]);
                        }
                    } catch (detailsError) {
                        console.error("Error fetching details for prescription ".concat(prescription._id, ":"), detailsError);
                        if (detailsError.response) {
                            console.error('Details error status:', detailsError.response.status);
                            console.error('Details error data:', detailsError.response.data);
                        }
                        // Try a direct fetch as a backup
                        try {
                            const url = "http://localhost:5000/api/prescriptiondetails?prescriptionId=".concat(prescription._id);
                            console.log("Trying direct fetch to: ".concat(url));
                            const response = await fetch(url, {
                                headers: {
                                    'Authorization': "Bearer ".concat(token),
                                    'Content-Type': 'application/json'
                                }
                            });
                            if (!response.ok) {
                                console.error("Direct fetch error: ".concat(response.status));
                            } else {
                                prescriptionDetails = await response.json();
                                console.log("Direct fetch success: Got ".concat(prescriptionDetails.length, " details"));
                            }
                        } catch (directError) {
                            console.error('Direct fetch also failed:', directError);
                        }
                    }
                    // Transform prescription details to medication details
                    const medications = [];
                    console.log("Processing ".concat(prescriptionDetails.length, " medication details for prescription ").concat(prescription._id));
                    // For each medicine in the prescription
                    for (const detail of prescriptionDetails){
                        try {
                            console.log('Processing prescription detail:', detail);
                            // Get medicine details if medicineId is an object with _id
                            let medicineId;
                            if (detail.medicineId) {
                                medicineId = typeof detail.medicineId === 'object' ? detail.medicineId._id || detail.medicineId.id : detail.medicineId;
                            } else {
                                console.error('Missing medicineId in prescription detail:', detail);
                                continue;
                            }
                            console.log("Extracted medicineId: ".concat(medicineId));
                            // Fix for TypeScript errors - ensure token is not null
                            if (!token) {
                                console.error('Token is null, cannot fetch medicine details');
                                continue;
                            }
                            let medicine = null;
                            // Check if medicineId is already populated
                            if (detail.medicineId && typeof detail.medicineId === 'object') {
                                medicine = detail.medicineId;
                                console.log("Medicine already populated: ".concat(JSON.stringify(medicine)));
                                console.log("Medicine name from populated object: ".concat(medicine.name));
                            } else {
                                try {
                                    console.log("Fetching medicine details for ID: ".concat(medicineId));
                                    medicine = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMedicineById"](medicineId, token);
                                    console.log("Successfully fetched medicine: ".concat(medicine.name));
                                } catch (medicineError) {
                                    console.error("Error fetching medicine ".concat(medicineId, ":"), medicineError);
                                }
                            }
                            // Parse dosage to extract frequency and duration (with error handling)
                            let frequency = 'Không có thông tin';
                            try {
                                if (detail.dosage) {
                                    const dosageInfo = detail.dosage.split(' ');
                                    frequency = dosageInfo.length > 0 ? dosageInfo.join(' ') : 'Không có thông tin';
                                }
                            } catch (parseError) {
                                console.error('Error parsing dosage:', parseError);
                            }
                            // Calculate duration based on quantity and dosage (with error handling)
                            let duration = 'Không xác định';
                            try {
                                if (detail.dosage && detail.quantity) {
                                    const dosageInfo = detail.dosage.split(' ');
                                    const firstNumberInDosage = parseInt(dosageInfo[0]);
                                    if (!isNaN(firstNumberInDosage) && firstNumberInDosage > 0) {
                                        duration = "".concat(Math.round(detail.quantity / firstNumberInDosage), " ngày");
                                    }
                                }
                            } catch (durationError) {
                                console.error('Error calculating duration:', durationError);
                            }
                            medications.push({
                                name: (medicine === null || medicine === void 0 ? void 0 : medicine.name) || 'Không xác định thuốc',
                                dosage: detail.dosage || 'Không xác định liều lượng',
                                frequency: frequency,
                                duration: duration
                            });
                        } catch (medErr) {
                            console.error("Error processing medicine details for ".concat(detail.medicineId, ":"), medErr);
                            medications.push({
                                name: 'Lỗi dữ liệu thuốc',
                                dosage: 'Không xác định',
                                frequency: 'Không xác định',
                                duration: 'Không xác định'
                            });
                        }
                    }
                    // Format date for display (with error handling)
                    let formattedDate = 'Không xác định';
                    let originalDate; // Store the original date for sorting
                    try {
                        const dateObj = new Date(prescription.date);
                        originalDate = dateObj;
                        if (!isNaN(dateObj.getTime())) {
                            formattedDate = "".concat(dateObj.getDate().toString().padStart(2, '0'), "/").concat((dateObj.getMonth() + 1).toString().padStart(2, '0'), "/").concat(dateObj.getFullYear());
                        }
                    } catch (dateError) {
                        console.error('Error formatting date:', dateError);
                    }
                    // Get patient and doctor info directly from populated fields if available (with error handling)
                    let patient = {
                        fullName: 'Không xác định',
                        _id: 'Unknown'
                    };
                    let doctor = {
                        fullName: 'Không xác định'
                    };
                    try {
                        if (prescription.patientId && typeof prescription.patientId === 'object') {
                            patient = prescription.patientId;
                        }
                    } catch (patientError) {
                        console.error('Error processing patient info:', patientError);
                    }
                    try {
                        if (prescription.doctorId && typeof prescription.doctorId === 'object') {
                            doctor = prescription.doctorId;
                        }
                    } catch (doctorError) {
                        console.error('Error processing doctor info:', doctorError);
                    }
                    // Create the record with proper error handling for all fields
                    const record = {
                        id: prescription._id || 'unknown',
                        name: patient.fullName || 'Không xác định',
                        patientId: patient._id || 'Unknown',
                        date: formattedDate,
                        originalDate: prescription.createdAt || prescription.date,
                        doctor: doctor.fullName || 'Không xác định',
                        diagnosis: prescription.diagnosis || 'Không có chẩn đoán',
                        medications: medications,
                        status: prescription.status || 'Unknown' // Add status to the record
                    };
                    records.push(record);
                    console.log("Added record for patient ".concat(record.name, " with ").concat(medications.length, " medications"));
                } catch (prescErr) {
                    console.error("Error processing prescription ".concat((prescription === null || prescription === void 0 ? void 0 : prescription._id) || 'unknown', ":"), prescErr);
                }
            }
            console.log("Finished processing ".concat(records.length, " records out of ").concat(prescriptions.length, " prescriptions"));
            // Reset to first page when data changes
            setCurrentPage(1);
            setMedicationRecords(records);
            setError(null);
        } catch (error) {
            console.error("Error processing prescriptions:", error);
            setError("Lỗi xử lý dữ liệu đơn thuốc: " + (error.message || error));
        }
    };
    // Add debug function to show available data
    const debugMedicationData = async ()=>{
        if (!token) {
            setError("Bạn chưa đăng nhập. Vui lòng đăng nhập để xem dữ liệu.");
            return;
        }
        try {
            var _tokenStatus_data, _tokenStatus_data1, _tokenStatus_data2, _tokenStatus_data3, _tokenStatus_data4, _tokenStatus_data5;
            console.log('Debug: Checking token validity');
            const tokenStatus = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateToken"](token);
            if (!tokenStatus.valid) {
                console.error('Debug: Token is invalid:', tokenStatus.reason);
                setError("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
                return;
            }
            console.log('Debug: Token is valid, user role:', (_tokenStatus_data = tokenStatus.data) === null || _tokenStatus_data === void 0 ? void 0 : _tokenStatus_data.role);
            console.log('Debug: Token data object:', tokenStatus.data);
            // Show the user's information - this is helpful for debugging permission issues
            console.log('Debug: User details:', {
                id: (_tokenStatus_data1 = tokenStatus.data) === null || _tokenStatus_data1 === void 0 ? void 0 : _tokenStatus_data1._id,
                username: (_tokenStatus_data2 = tokenStatus.data) === null || _tokenStatus_data2 === void 0 ? void 0 : _tokenStatus_data2.username,
                role: (_tokenStatus_data3 = tokenStatus.data) === null || _tokenStatus_data3 === void 0 ? void 0 : _tokenStatus_data3.role
            });
            // Manually test API access with a direct fetch - bypassing any frontend caching or filtering
            console.log('Debug: Making direct fetch to prescriptions API with DISPENSED filter');
            try {
                const url = 'http://localhost:5000/api/prescriptions?status=DISPENSED';
                const response = await fetch(url, {
                    headers: {
                        'Authorization': "Bearer ".concat(token),
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Debug: Direct fetch status:', response.status);
                if (!response.ok) {
                    console.error('Debug: Direct fetch error:', await response.text());
                } else {
                    const data = await response.json();
                    console.log("Debug: Direct fetch found ".concat(data.length, " DISPENSED prescriptions"));
                    if (data.length > 0) {
                        console.log('Debug: First direct fetch result:', data[0]);
                    }
                }
            } catch (directFetchError) {
                console.error('Debug: Direct fetch error:', directFetchError);
            }
            console.log('Debug: Fetching all prescriptions to see available statuses');
            const allPrescriptions = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptions"]({}, token);
            console.log('Debug: First 3 prescriptions raw data:', allPrescriptions.slice(0, 3));
            // Group by status to see what we have
            const statusCounts = {};
            allPrescriptions.forEach((prescription)=>{
                const status = prescription.status || 'unknown';
                statusCounts[status] = (statusCounts[status] || 0) + 1;
            });
            console.log('Debug: Available prescription statuses:', statusCounts);
            setDebugInfo({
                statusCounts,
                totalPrescriptions: allPrescriptions.length,
                firstPrescription: allPrescriptions.length > 0 ? allPrescriptions[0] : null,
                userRole: (_tokenStatus_data4 = tokenStatus.data) === null || _tokenStatus_data4 === void 0 ? void 0 : _tokenStatus_data4.role,
                userId: (_tokenStatus_data5 = tokenStatus.data) === null || _tokenStatus_data5 === void 0 ? void 0 : _tokenStatus_data5._id
            });
            // Check if we have any 'DISPENSED' prescriptions
            if (statusCounts['DISPENSED'] && statusCounts['DISPENSED'] > 0) {
                console.log('Debug: We have DISPENSED prescriptions, should be showing them');
                // Let's check those DISPENSED prescriptions
                const dispensedPrescriptions = allPrescriptions.filter((p)=>p.status === 'DISPENSED');
                console.log('Debug: First DISPENSED prescription:', dispensedPrescriptions[0]);
                // Check why it's not showing up in the main view
                console.log('Debug: Testing specific API call for DISPENSED prescriptions');
                const specificDispensedPrescriptions = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptions"]({
                    status: 'DISPENSED'
                }, token);
                console.log("Debug: API call found ".concat(specificDispensedPrescriptions.length, " DISPENSED prescriptions"));
            } else {
                console.log('Debug: No DISPENSED prescriptions found, this is why no data appears');
                // Let's try to manually search for a few other statuses
                const tryOtherStatuses = async ()=>{
                    try {
                        console.log('Debug: Trying with status=PENDING_DISPENSE');
                        const pendingPrescriptions = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptions"]({
                            status: 'PENDING_DISPENSE'
                        }, token);
                        console.log("Debug: Found ".concat(pendingPrescriptions.length, " PENDING_DISPENSE prescriptions"));
                        if (pendingPrescriptions.length > 0) {
                            console.log('Debug: Example PENDING_DISPENSE prescription:', pendingPrescriptions[0]);
                        }
                        // Check the specific prescription you mentioned by ID
                        const specificId = '68614f3d994cbb5f5a751225';
                        console.log("Debug: Checking for specific prescription with ID ".concat(specificId));
                        try {
                            const specificPrescription = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptionById"](specificId, token);
                            console.log('Debug: Found specific prescription:', specificPrescription);
                            console.log('Debug: Status of specific prescription:', specificPrescription === null || specificPrescription === void 0 ? void 0 : specificPrescription.status);
                        } catch (err) {
                            console.error("Debug: Error fetching specific prescription ".concat(specificId, ":"), err);
                        }
                    } catch (err) {
                        console.error('Debug: Error fetching PENDING_DISPENSE prescriptions', err);
                    }
                };
                tryOtherStatuses();
            }
        } catch (error) {
            console.error('Debug: Error fetching all prescriptions:', error);
        }
    };
    // Call debug function when component loads
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MedicationHistory.useEffect": ()=>{
            if (token) {
                // Instead of calling debugMedicationData directly, try to load the data properly first
                const initializeData = {
                    "MedicationHistory.useEffect.initializeData": async ()=>{
                        try {
                            console.log('Component mounted, verifying token and loading data');
                            const isTokenValid = await verifyToken();
                            if (isTokenValid) {
                                // Try to load prescriptions
                                if (allStatuses) {
                                    await loadAllPrescriptions();
                                } else {
                                    await loadDispensedPrescriptions();
                                }
                                // If no medication records were loaded, try the debug function
                                if (medicationRecords.length === 0) {
                                    console.log('No medication records loaded, running debug function');
                                    await debugMedicationData();
                                }
                            }
                        } catch (err) {
                            console.error('Error during initialization:', err);
                        }
                    }
                }["MedicationHistory.useEffect.initializeData"];
                initializeData();
            }
        }
    }["MedicationHistory.useEffect"], [
        token
    ]);
    // Function to verify token is valid
    const verifyToken = async ()=>{
        if (!token) {
            setError("Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn");
            return false;
        }
        try {
            // Verify token is valid using validateToken function
            console.log('Verifying token validity...');
            const tokenStatus = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateToken"](token);
            if (!tokenStatus.valid) {
                console.error('Token is invalid:', tokenStatus.reason);
                setError("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
                return false;
            }
            console.log('Token is valid, checking permissions...');
            // Check if user has specific role with permissions
            if (tokenStatus.data && tokenStatus.data.role) {
                console.log('User role:', tokenStatus.data.role);
                // Check specific role permissions for viewing prescriptions
                if (![
                    'ADMIN',
                    'RECEPTIONIST',
                    'PHARMACIST',
                    'DOCTOR'
                ].includes(tokenStatus.data.role)) {
                    console.error('User role does not have permission:', tokenStatus.data.role);
                    setError("Bạn không có quyền xem lịch sử thuốc");
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error('Error verifying token:', error);
            setError("Không thể xác thực phiên làm việc. Vui lòng đăng nhập lại.");
            return false;
        }
    };
    // Filter medications based on search term and date range
    const filteredMedications = medicationRecords.filter((record)=>{
        // Filter by search term
        const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) || record.patientId && record.patientId.toLowerCase().includes(searchTerm.toLowerCase());
        // Filter by date range if applicable
        let matchesDateRange = true;
        if (startDate && endDate) {
            let recordDate;
            try {
                // Try to parse the date from the formatted string (DD/MM/YYYY format)
                recordDate = new Date(record.date.split('/').reverse().join('-'));
            } catch (e) {
                // If that fails, use the original date field if available
                recordDate = record.originalDate ? new Date(record.originalDate) : new Date();
            }
            const start = new Date(startDate);
            const end = new Date(endDate);
            // Add one day to end date to include the end date in results
            end.setDate(end.getDate() + 1);
            matchesDateRange = recordDate >= start && recordDate <= end;
        }
        return matchesSearch && matchesDateRange;
    });
    // Function to show a prescription from the debug data
    const showDebugPrescription = async ()=>{
        try {
            setLoading(true);
            setError(null);
            // Create a set of mock prescriptions to demonstrate pagination
            const mockPrescriptions = [];
            const baseDate = new Date("2024-06-01T10:00:00.000Z");
            // Create 15 mock prescriptions with different dates to show pagination
            for(let i = 0; i < 15; i++){
                const mockDate = new Date(baseDate);
                mockDate.setDate(baseDate.getDate() - i); // Each record is a day older
                mockPrescriptions.push({
                    _id: "debug-prescription-".concat(i + 1),
                    customPrescriptionId: "pr".concat(i + 1),
                    patientId: {
                        _id: "patient-".concat(i + 1),
                        username: "nguyen.an",
                        email: "an.nguyen@mediclinic.com",
                        fullName: "Bệnh nhân mẫu ".concat(i + 1),
                        phone: "0901234567"
                    },
                    doctorId: {
                        _id: "doctor-1",
                        username: "tran.hoa",
                        email: "hoa.tran@mediclinic.com",
                        fullName: "Trần Thị Hoa",
                        phone: "0912345678"
                    },
                    diagnosis: i % 3 === 0 ? "Cảm cúm" : i % 3 === 1 ? "Đau họng" : "Đau đầu",
                    date: mockDate.toISOString(),
                    status: "DISPENSED",
                    createdAt: mockDate.toISOString(),
                    updatedAt: mockDate.toISOString()
                });
            }
            // Process the mock prescriptions to create records
            console.log('Using mock prescription data for debugging pagination');
            const records = mockPrescriptions.map((mockPrescription, index)=>{
                // Generate 1-3 mock medications for each prescription
                const medicationCount = index % 3 + 1;
                const mockMedications = [];
                for(let j = 0; j < medicationCount; j++){
                    const medicationTypes = [
                        {
                            name: 'Paracetamol',
                            dosage: '2 viên x 3 lần/ngày',
                            frequency: '3 lần/ngày',
                            duration: '5 ngày'
                        },
                        {
                            name: 'Vitamin C',
                            dosage: '1 viên x 2 lần/ngày',
                            frequency: '2 lần/ngày',
                            duration: '7 ngày'
                        },
                        {
                            name: 'Amoxicillin',
                            dosage: '1 viên x 3 lần/ngày',
                            frequency: '3 lần/ngày',
                            duration: '5 ngày'
                        }
                    ];
                    mockMedications.push(medicationTypes[j % 3]);
                }
                const formattedDate = new Date(mockPrescription.date).toLocaleDateString('vi-VN');
                return {
                    id: mockPrescription._id,
                    name: mockPrescription.patientId.fullName,
                    patientId: mockPrescription.patientId._id,
                    date: formattedDate,
                    originalDate: mockPrescription.createdAt,
                    doctor: mockPrescription.doctorId.fullName,
                    diagnosis: mockPrescription.diagnosis,
                    medications: mockMedications,
                    status: mockPrescription.status
                };
            });
            // Sort the records by newest first
            records.sort((a, b)=>{
                const dateA = new Date(a.originalDate || a.date);
                const dateB = new Date(b.originalDate || b.date);
                return dateB.getTime() - dateA.getTime();
            });
            // Set the medication records directly
            setMedicationRecords(records);
            console.log("Set ".concat(records.length, " mock medication records for pagination testing"));
        } catch (err) {
            console.error('Error creating mock records:', err);
            setError('Lỗi khi tạo dữ liệu mẫu');
        } finally{
            setLoading(false);
        }
    };
    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredMedications.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredMedications.length / recordsPerPage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onBack,
                    className: "px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-gray-700",
                    children: "← Quay lại"
                }, void 0, false, {
                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                    lineNumber: 737,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                lineNumber: 736,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 border-b border-gray-200 pb-5 flex justify-between items-center flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-gray-900 tracking-tight",
                                children: "Lịch sử thuốc"
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                lineNumber: 747,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mt-2 flex items-center",
                                children: [
                                    "Xem lịch sử thuốc đã kê cho bệnh nhân",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 inline-flex items-center text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 20 20",
                                                fill: "currentColor",
                                                className: "w-4 h-4 mr-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z",
                                                    clipRule: "evenodd"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                    lineNumber: 752,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 751,
                                                columnNumber: 15
                                            }, this),
                                            "Mới nhất lên đầu"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 750,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                lineNumber: 748,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                        lineNumber: 746,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 items-center flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-600",
                                children: [
                                    filteredMedications.length,
                                    " kết quả (",
                                    recordsPerPage,
                                    " mỗi trang)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                lineNumber: 759,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setAllStatuses(!allStatuses),
                                className: "px-4 py-2 rounded-md text-sm font-medium transition-colors ".concat(allStatuses ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'),
                                children: allStatuses ? 'Chỉ hiển thị đã phát thuốc' : 'Hiển thị tất cả đơn thuốc'
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                lineNumber: 762,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                        lineNumber: 758,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                lineNumber: 745,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border-b border-gray-300 bg-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row md:items-end md:justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                size: 18,
                                                className: "text-black"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 782,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                            lineNumber: 781,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Tìm theo TÊN hoặc ID...",
                                            className: "pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm transition-all text-black placeholder-gray-500",
                                            value: searchTerm,
                                            onChange: (e)=>setSearchTerm(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                            lineNumber: 784,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                    lineNumber: 780,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col md:flex-row gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "start-date",
                                                    className: "block text-sm font-medium text-black mb-1 pl-1",
                                                    children: "Từ ngày"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                    lineNumber: 795,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                size: 16,
                                                                className: "text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 798,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                            lineNumber: 797,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "start-date",
                                                            type: "date",
                                                            className: "pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm transition-all text-black",
                                                            value: startDate,
                                                            onChange: (e)=>setStartDate(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                            lineNumber: 800,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                    lineNumber: 796,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                            lineNumber: 794,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "end-date",
                                                    className: "block text-sm font-medium text-black mb-1 pl-1",
                                                    children: "Đến ngày"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                    lineNumber: 811,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                size: 16,
                                                                className: "text-black"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 814,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                            lineNumber: 813,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "end-date",
                                                            type: "date",
                                                            className: "pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm transition-all text-black",
                                                            value: endDate,
                                                            onChange: (e)=>setEndDate(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                            lineNumber: 816,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                    lineNumber: 812,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                            lineNumber: 810,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                    lineNumber: 793,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                            lineNumber: 779,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                        lineNumber: 778,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6",
                        children: [
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-16 border border-dashed border-gray-300 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 833,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-medium text-gray-700",
                                        children: "Đang tải dữ liệu..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 834,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 mt-2",
                                        children: "Vui lòng đợi trong khi chúng tôi tải dữ liệu từ máy chủ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 837,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                lineNumber: 832,
                                columnNumber: 13
                            }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-16 border border-dashed border-gray-300 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                                            size: 24,
                                            className: "text-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                            lineNumber: 844,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 843,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-medium text-gray-700",
                                        children: "Không thể tải dữ liệu"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 846,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 mt-2 max-w-md mx-auto",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 849,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row gap-3 justify-center mt-4 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>window.location.reload(),
                                                className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
                                                children: "Thử lại"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 853,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: verifyToken,
                                                className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors",
                                                children: "Kiểm tra quyền truy cập"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 860,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: showDebugPrescription,
                                                className: "px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors",
                                                children: "Dùng dữ liệu mẫu"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 867,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 852,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 text-sm text-gray-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    children: "Gợi ý khắc phục:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                    lineNumber: 876,
                                                    columnNumber: 20
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 876,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "list-disc pl-8 mt-2 text-left max-w-lg mx-auto",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Hãy chắc chắn bạn đã đăng nhập với tài khoản có quyền RECEPTIONIST"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 878,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Đảm bảo backend đã được cấu hình cho phép RECEPTIONIST xem đơn thuốc"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 879,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Kiểm tra kết nối mạng đến server API"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 880,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Nếu vẫn gặp vấn đề, hãy liên hệ quản trị viên"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 881,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 877,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 875,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                lineNumber: 842,
                                columnNumber: 13
                            }, this) : currentRecords.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: currentRecords.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border border-gray-300 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-b border-gray-300 bg-gradient-to-r from-gray-50 to-white p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-semibold text-lg text-gray-900",
                                                                children: record.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 891,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-700 mt-0.5",
                                                                children: [
                                                                    "ID: ",
                                                                    record.patientId
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 894,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 890,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-600 uppercase tracking-wide font-medium",
                                                                        children: "Ngày khám"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 900,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-gray-800 mt-1",
                                                                        children: record.date
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 901,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 899,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-600 uppercase tracking-wide font-medium",
                                                                        children: "Bác sĩ"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 904,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-gray-800 mt-1",
                                                                        children: record.doctor
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 905,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 903,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-600 uppercase tracking-wide font-medium",
                                                                        children: "Chẩn đoán"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 908,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-gray-800 mt-1",
                                                                        children: record.diagnosis
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 909,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 907,
                                                                columnNumber: 23
                                                            }, this),
                                                            record.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-600 uppercase tracking-wide font-medium",
                                                                        children: "Trạng thái"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 913,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium mt-1 px-2 py-0.5 rounded inline-block ".concat(record.status === 'DISPENSED' ? 'bg-green-100 text-green-800' : record.status === 'PENDING_DISPENSE' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'),
                                                                        children: record.status === 'DISPENSED' ? 'Đã phát thuốc' : record.status === 'PENDING_DISPENSE' ? 'Chờ phát thuốc' : 'Đã hủy'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 914,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 912,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 898,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 889,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-medium text-gray-900 mb-4 flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                                                                size: 18,
                                                                className: "mr-2 text-indigo-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 935,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Danh sách thuốc"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 934,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "overflow-x-auto rounded-lg border border-gray-300",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                            className: "min-w-full divide-y divide-gray-300",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                                    className: "bg-gray-50",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                className: "px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b",
                                                                                children: "Tên thuốc"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                lineNumber: 942,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                className: "px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b",
                                                                                children: "Liều lượng"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                lineNumber: 945,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                className: "px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b",
                                                                                children: "Tần suất"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                lineNumber: 948,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                className: "px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b",
                                                                                children: "Thời gian dùng"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                lineNumber: 951,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 941,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                    lineNumber: 940,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                                    className: "bg-white divide-y divide-gray-300",
                                                                    children: record.medications.map((med, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                            className: "hover:bg-gray-50 transition-colors",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                                                                                    children: med.name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                    lineNumber: 959,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-6 py-4 whitespace-nowrap text-sm text-gray-700",
                                                                                    children: med.dosage
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                    lineNumber: 962,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-6 py-4 whitespace-nowrap text-sm text-gray-700",
                                                                                    children: med.frequency
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                    lineNumber: 965,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-6 py-4 whitespace-nowrap text-sm text-gray-700",
                                                                                    children: med.duration
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                    lineNumber: 968,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, index, true, {
                                                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                            lineNumber: 958,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                    lineNumber: 956,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                            lineNumber: 939,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 938,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 933,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, record.id, true, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 888,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                lineNumber: 886,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-16 border border-dashed border-gray-300 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                                        size: 48,
                                        className: "mx-auto text-gray-400 mb-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 982,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-medium text-gray-700",
                                        children: allStatuses ? 'Không tìm thấy đơn thuốc nào' : 'Không tìm thấy đơn thuốc đã phát'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 983,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 mt-2 max-w-md mx-auto",
                                        children: allStatuses ? 'Không có đơn thuốc nào trong hệ thống' : 'Không có đơn thuốc nào ở trạng thái đã phát (DISPENSED) trong hệ thống.'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 986,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 flex flex-col sm:flex-row gap-4 justify-center flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: debugMedicationData,
                                                className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors",
                                                children: "Kiểm tra trạng thái đơn thuốc"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 993,
                                                columnNumber: 17
                                            }, this),
                                            !allStatuses && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setAllStatuses(true),
                                                className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors",
                                                children: "Hiển thị tất cả đơn thuốc"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 1001,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: async ()=>{
                                                    try {
                                                        setLoading(true);
                                                        // Try multiple IDs if needed
                                                        const specificIds = [
                                                            '68614f3d994cbb5f5a751225',
                                                            '685face23fc4c04e1bd96c13' // First prescription from debug data
                                                        ];
                                                        // Try each ID until one works
                                                        for (const id of specificIds){
                                                            try {
                                                                console.log("Checking specific prescription: ".concat(id));
                                                                const prescription = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrescriptionById"](id, token || '');
                                                                if (prescription) {
                                                                    console.log("Found prescription with ID ".concat(id, ":"), prescription);
                                                                    console.log("Status: ".concat(prescription.status));
                                                                    // Process and display this single prescription
                                                                    await processPrescriptions([
                                                                        prescription
                                                                    ]);
                                                                    setLoading(false);
                                                                    setError(null);
                                                                    return; // Exit the loop if successful
                                                                }
                                                            } catch (idError) {
                                                                console.error("Error fetching prescription with ID ".concat(id, ":"), idError);
                                                            // Continue to next ID
                                                            }
                                                        }
                                                        // If we get here, none of the IDs worked
                                                        console.error('Could not find any specific prescriptions');
                                                        setError("Không thể tìm thấy đơn thuốc cụ thể. Hãy kiểm tra lại ID hoặc quyền truy cập.");
                                                        setLoading(false);
                                                    } catch (err) {
                                                        console.error('Error in specific prescription check:', err);
                                                        setError("Lỗi khi tìm đơn thuốc cụ thể: ".concat(err.message || err));
                                                        setLoading(false);
                                                    }
                                                },
                                                className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors",
                                                children: "Kiểm tra đơn thuốc cụ thể"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 1009,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: showDebugPrescription,
                                                className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors",
                                                children: "Hiển thị dữ liệu từ debug"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 1056,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 992,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-sm text-gray-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Trạng thái đơn thuốc hợp lệ:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 1065,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "mt-2 inline-flex flex-wrap gap-2 justify-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md",
                                                        children: "PENDING_DISPENSE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1067,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "px-2 py-1 bg-green-100 text-green-800 rounded-md",
                                                        children: "DISPENSED"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1068,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "px-2 py-1 bg-red-100 text-red-800 rounded-md",
                                                        children: "CANCELLED"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1069,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 1066,
                                                columnNumber: 17
                                            }, this),
                                            debugInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-left overflow-auto",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-medium mb-2 text-gray-800",
                                                        children: "Debug Information:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1074,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                children: "User Role:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                lineNumber: 1077,
                                                                                columnNumber: 28
                                                                            }, this),
                                                                            " ",
                                                                            debugInfo.userRole || 'Unknown'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 1077,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                children: "User ID:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                lineNumber: 1078,
                                                                                columnNumber: 28
                                                                            }, this),
                                                                            " ",
                                                                            debugInfo.userId || 'Unknown'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 1078,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                children: "Total Prescriptions:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                lineNumber: 1079,
                                                                                columnNumber: 28
                                                                            }, this),
                                                                            " ",
                                                                            debugInfo.totalPrescriptions || 0
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 1079,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 1076,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                            children: "Status Counts:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                            lineNumber: 1082,
                                                                            columnNumber: 28
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 1082,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                        className: "list-disc pl-5",
                                                                        children: debugInfo.statusCounts && Object.entries(debugInfo.statusCounts).map((param)=>{
                                                                            let [status, count] = param;
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                children: [
                                                                                    status,
                                                                                    ": ",
                                                                                    String(count)
                                                                                ]
                                                                            }, status, true, {
                                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                                lineNumber: 1085,
                                                                                columnNumber: 29
                                                                            }, this);
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                        lineNumber: 1083,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 1081,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1075,
                                                        columnNumber: 21
                                                    }, this),
                                                    debugInfo.firstPrescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                    children: "First Prescription:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                    lineNumber: 1092,
                                                                    columnNumber: 28
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 1092,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                className: "text-xs bg-gray-100 p-2 mt-1 max-h-40 overflow-auto rounded",
                                                                children: JSON.stringify(debugInfo.firstPrescription, null, 2)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                                lineNumber: 1093,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1091,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 1073,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 1064,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                lineNumber: 981,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-5 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-sm text-black",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Hiển thị ",
                                                    filteredMedications.length > 0 ? "".concat(indexOfFirstRecord + 1, " - ").concat(Math.min(indexOfLastRecord, filteredMedications.length), " của ").concat(filteredMedications.length, " kết quả") : "0 kết quả"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 1107,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "ml-2 border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
                                                value: recordsPerPage,
                                                onChange: (e)=>{
                                                    setRecordsPerPage(Number(e.target.value));
                                                    setCurrentPage(1); // Reset to first page when changing items per page
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 10,
                                                        children: "10 mỗi trang"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1121,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 20,
                                                        children: "20 mỗi trang"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1122,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 50,
                                                        children: "50 mỗi trang"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1123,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 100,
                                                        children: "100 mỗi trang"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1124,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: filteredMedications.length,
                                                        children: "Hiển thị tất cả"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1125,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 1113,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 1106,
                                        columnNumber: 13
                                    }, this),
                                    totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex shadow-sm rounded-md",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setCurrentPage(Math.max(1, currentPage - 1)),
                                                disabled: currentPage === 1,
                                                className: "px-4 py-2 border border-gray-300 text-sm font-medium rounded-l-md ".concat(currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-50', " focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"),
                                                children: "Trước"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 1131,
                                                columnNumber: 17
                                            }, this),
                                            Array.from({
                                                length: Math.min(5, totalPages)
                                            }, (_, i)=>{
                                                // Logic to show pages around current page
                                                let pageToShow;
                                                if (totalPages <= 5) {
                                                    pageToShow = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageToShow = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    pageToShow = totalPages - 4 + i;
                                                } else {
                                                    pageToShow = currentPage - 2 + i;
                                                }
                                                if (pageToShow > 0 && pageToShow <= totalPages) {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCurrentPage(pageToShow),
                                                        className: "px-4 py-2 border border-gray-300 relative -ml-px ".concat(currentPage === pageToShow ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-gray-50', " text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"),
                                                        children: pageToShow
                                                    }, pageToShow, false, {
                                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                        lineNumber: 1157,
                                                        columnNumber: 23
                                                    }, this);
                                                }
                                                return null;
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setCurrentPage(Math.min(totalPages, currentPage + 1)),
                                                disabled: currentPage === totalPages,
                                                className: "px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md ".concat(currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-50', " focus:z-10 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"),
                                                children: "Sau"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                                lineNumber: 1173,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                        lineNumber: 1130,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                                lineNumber: 1105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                        lineNumber: 830,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
                lineNumber: 776,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/receptionistPage/MedicationHistory.tsx",
        lineNumber: 735,
        columnNumber: 5
    }, this);
}
_s(MedicationHistory, "VWcEkMAr6E66admuGtDwm8WXDuY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = MedicationHistory;
var _c;
__turbopack_context__.k.register(_c, "MedicationHistory");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AppointmentForm": ()=>AppointmentForm
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as UserIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as SearchIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/datats/mockPatients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/api.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function AppointmentForm(param) {
    let { onClose } = param;
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        patientId: '',
        patientName: '',
        patientPhone: '',
        appointmentDate: new Date().toISOString().split('T')[0],
        appointmentTime: '09:00',
        status: 'pending' // Default status for appointments
    });
    const [selectedPatient, setSelectedPatient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [patients, setPatients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Tải dữ liệu bệnh nhân khi component được tạo
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppointmentForm.useEffect": ()=>{
            const loadPatients = {
                "AppointmentForm.useEffect.loadPatients": async ()=>{
                    const allUsers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllUsers"])();
                    const patientUsers = allUsers.filter({
                        "AppointmentForm.useEffect.loadPatients.patientUsers": (user)=>user.role === 'PATIENT'
                    }["AppointmentForm.useEffect.loadPatients.patientUsers"]);
                    setPatients(patientUsers);
                }
            }["AppointmentForm.useEffect.loadPatients"];
            loadPatients();
        }
    }["AppointmentForm.useEffect"], []);
    // Xử lý tìm kiếm bệnh nhân
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppointmentForm.useEffect": ()=>{
            const searchPatientsAsync = {
                "AppointmentForm.useEffect.searchPatientsAsync": async ()=>{
                    if (searchTerm.length > 0) {
                        // Sử dụng hàm searchUsers từ mockPatients.ts và lọc chỉ lấy các user có role='PATIENT'
                        const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchUsers"])(searchTerm);
                        const filteredResults = results.filter({
                            "AppointmentForm.useEffect.searchPatientsAsync.filteredResults": (user)=>user.role === 'PATIENT'
                        }["AppointmentForm.useEffect.searchPatientsAsync.filteredResults"]);
                        setSearchResults(filteredResults);
                    } else {
                        setSearchResults([]);
                    }
                }
            }["AppointmentForm.useEffect.searchPatientsAsync"];
            searchPatientsAsync();
        }
    }["AppointmentForm.useEffect"], [
        searchTerm
    ]);
    const handleSearchChange = (e)=>{
        setSearchTerm(e.target.value);
    };
    const selectPatient = (patient)=>{
        setSelectedPatient(patient);
        setFormData({
            ...formData,
            patientId: patient._id,
            patientName: patient.fullName,
            patientPhone: patient.phone
        });
        setSearchTerm('');
        setSearchResults([]);
    };
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!selectedPatient) {
            alert('Vui lòng chọn bệnh nhân');
            return;
        }
        try {
            setLoading(true);
            // Create appointment object
            const appointmentData = {
                patientId: formData.patientId,
                patientName: formData.patientName,
                patientPhone: formData.patientPhone,
                appointmentDate: formData.appointmentDate,
                appointmentTime: formData.appointmentTime,
                status: formData.status
            };
            // Create appointment via API if token exists
            let success = false;
            if (token) {
                try {
                    const createdAppointment = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAppointment"](appointmentData, token);
                    if (createdAppointment && createdAppointment._id) {
                        success = true;
                    }
                } catch (apiError) {
                    console.error("API Error creating appointment:", apiError);
                }
            }
            // Fallback: Add to queue directly if API fails or no token
            if (!success) {
                // Add the patient to queue as a fallback
                const queueStatus = 'waiting';
                const newQueue = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addQueue"])(formData.patientId, queueStatus);
                if (newQueue) {
                    console.log('Patient added to queue as fallback:', newQueue);
                    success = true;
                }
            }
            if (success) {
                alert("Đã đặt lịch hẹn cho bệnh nhân ".concat(selectedPatient.fullName, "!"));
                onClose();
            } else {
                alert('Không thể đặt lịch hẹn. Vui lòng thử lại sau.');
            }
        } catch (error) {
            console.error("Error creating appointment:", error);
            alert('Đã xảy ra lỗi khi đặt lịch hẹn. Vui lòng thử lại sau.');
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center border-b p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-gray-800",
                        children: "Đặt lịch khám"
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-500 mr-3",
                                children: "ID và version sẽ được tạo tự động"
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-1 rounded-full hover:bg-gray-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {
                                    size: 20,
                                    className: "text-gray-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-700 mb-2",
                                children: [
                                    "Tìm bệnh nhân (patient) ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-500",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                        lineNumber: 156,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchIcon$3e$__["SearchIcon"], {
                                            size: 18,
                                            className: "text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Tìm theo tên, CCCD hoặc số điện thoại...",
                                        className: "pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                        value: searchTerm,
                                        onChange: handleSearchChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            searchResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 border border-gray-200 rounded-md max-h-60 overflow-y-auto bg-white shadow-md",
                                children: searchResults.map((patient)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer flex items-center",
                                        onClick: ()=>selectPatient(patient),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__["UserIcon"], {
                                                size: 20,
                                                className: "text-gray-500 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                                lineNumber: 180,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-gray-800",
                                                        children: patient.fullName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-500",
                                                        children: [
                                                            "ID: ",
                                                            patient.userId,
                                                            " | SĐT: ",
                                                            patient.phone
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                                lineNumber: 181,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, patient._id, true, {
                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this),
                            selectedPatient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 p-3 border border-blue-200 rounded-md bg-blue-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserIcon$3e$__["UserIcon"], {
                                                    size: 20,
                                                    className: "text-blue-500 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-gray-800",
                                                            children: selectedPatient.fullName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                                            lineNumber: 199,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-gray-600",
                                                            children: [
                                                                "ID: ",
                                                                selectedPatient.userId,
                                                                " | SĐT: ",
                                                                selectedPatient.phone
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setSelectedPatient(null);
                                                setFormData({
                                                    ...formData,
                                                    patientId: '',
                                                    patientName: '',
                                                    patientPhone: ''
                                                });
                                            },
                                            className: "text-gray-500 hover:text-red-500",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                                lineNumber: 213,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                            lineNumber: 205,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-700 mb-2",
                                        htmlFor: "appointmentDate",
                                        children: [
                                            "Ngày hẹn ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-500",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                                lineNumber: 225,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        id: "appointmentDate",
                                        name: "appointmentDate",
                                        min: new Date().toISOString().split('T')[0],
                                        className: "w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                        value: formData.appointmentDate,
                                        onChange: handleInputChange,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-700 mb-2",
                                        htmlFor: "appointmentTime",
                                        children: [
                                            "Thời gian ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-500",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                                lineNumber: 242,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "time",
                                        id: "appointmentTime",
                                        name: "appointmentTime",
                                        className: "w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                        value: formData.appointmentTime,
                                        onChange: handleInputChange,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-700 mb-2",
                                htmlFor: "status",
                                children: "Trạng thái cuộc hẹn"
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "status",
                                name: "status",
                                className: "w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                value: formData.status,
                                onChange: handleInputChange,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "pending",
                                        children: "Đang chờ xác nhận (pending)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "confirmed",
                                        children: "Đã xác nhận (confirmed)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                        lineNumber: 269,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "canceled",
                                        children: "Đã hủy (canceled)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                        lineNumber: 270,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex justify-end space-x-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                className: "px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50",
                                disabled: loading,
                                children: "Hủy bỏ"
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed",
                                disabled: !selectedPatient || loading,
                                children: loading ? 'Đang xử lý...' : 'Đặt lịch'
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_s(AppointmentForm, "GlI6OcFIx/mRE6ZD1Fx2/ImC5/o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AppointmentForm;
var _c;
__turbopack_context__.k.register(_c, "AppointmentForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/receptionistPage/AppointmentBooking.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AppointmentBooking": ()=>AppointmentBooking
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as CalendarIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as SearchIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$components$2f$Appointments$2f$AppointmentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/receptionistPage/components/Appointments/AppointmentForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/datats/mockPatients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/api.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function AppointmentBooking(param) {
    let { onBack } = param;
    _s();
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [appointments, setAppointments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Load appointments from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppointmentBooking.useEffect": ()=>{
            const loadAppointments = {
                "AppointmentBooking.useEffect.loadAppointments": async ()=>{
                    try {
                        setLoading(true);
                        // Get patients for mapping 
                        const patients = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllPatients"])();
                        // In a real implementation, fetch appointments from the API
                        // For now, generate mock appointments from patient data
                        if (token) {
                            // Try to get appointments from API
                            try {
                                const apiAppointments = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppointments"](token);
                                if (apiAppointments && Array.isArray(apiAppointments)) {
                                    // Format appointments from API
                                    const formattedAppointments = apiAppointments.map({
                                        "AppointmentBooking.useEffect.loadAppointments.formattedAppointments": (appt)=>({
                                                id: appt._id,
                                                name: appt.patientName || 'Unknown',
                                                userId: appt.patientId || '',
                                                phone: appt.patientPhone || '',
                                                appointmentDate: new Date(appt.appointmentDate).toISOString().split('T')[0],
                                                appointmentTime: appt.appointmentTime,
                                                status: appt.status
                                            })
                                    }["AppointmentBooking.useEffect.loadAppointments.formattedAppointments"]);
                                    setAppointments(formattedAppointments);
                                    setLoading(false);
                                    return;
                                }
                            } catch (apiError) {
                                console.log('Could not fetch appointments from API, falling back to mock data', apiError);
                            }
                        }
                        // Fallback: Generate mock appointments from patient data
                        const today = new Date();
                        const mockAppointments = patients.slice(0, 5).map({
                            "AppointmentBooking.useEffect.loadAppointments.mockAppointments": (patient, index)=>{
                                const appointmentHour = 9 + index;
                                const appointmentDate = new Date();
                                appointmentDate.setDate(today.getDate() + index % 3); // Distribute over next 3 days
                                return {
                                    id: patient._id,
                                    name: patient.fullName,
                                    userId: patient.userId,
                                    phone: patient.phone,
                                    appointmentDate: appointmentDate.toISOString().split('T')[0],
                                    appointmentTime: "".concat(appointmentHour < 10 ? '0' + appointmentHour : appointmentHour, ":00"),
                                    status: index % 2 === 0 ? 'pending' : 'confirmed'
                                };
                            }
                        }["AppointmentBooking.useEffect.loadAppointments.mockAppointments"]);
                        setAppointments(mockAppointments);
                    } catch (err) {
                        console.error("Error loading appointments:", err);
                        setError("Could not load appointments. Please try again later.");
                    } finally{
                        setLoading(false);
                    }
                }
            }["AppointmentBooking.useEffect.loadAppointments"];
            loadAppointments();
        }
    }["AppointmentBooking.useEffect"], [
        token
    ]);
    const filteredAppointments = appointments.filter((appointment)=>appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) || appointment.userId.includes(searchTerm) || appointment.phone.includes(searchTerm));
    const handleMoveToQueue = async (appointmentId)=>{
        try {
            // Add patient to queue using the addQueue function (now async)
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$datats$2f$mockPatients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addQueue"])(appointmentId, 'waiting');
            if (result) {
                // Update appointment status
                setAppointments(appointments.map((appt)=>appt.id === appointmentId ? {
                        ...appt,
                        status: 'completed'
                    } : appt));
                // In a real implementation, update the appointment status in the API
                if (token) {
                    try {
                        const appointmentToUpdate = appointments.find((a)=>a.id === appointmentId);
                        if (appointmentToUpdate) {
                            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAppointment"](appointmentId, {
                                status: 'completed'
                            }, token);
                        }
                    } catch (apiError) {
                        console.error("Failed to update appointment status in API:", apiError);
                    }
                }
                alert('Đã chuyển bệnh nhân vào phòng chờ!');
            } else {
                alert('Bệnh nhân đã có trong phòng chờ hoặc không thể thêm!');
            }
        } catch (error) {
            console.error("Error adding patient to queue:", error);
            alert('Đã xảy ra lỗi khi chuyển bệnh nhân vào phòng chờ!');
        }
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 text-center",
        children: "Đang tải dữ liệu..."
    }, void 0, false, {
        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
        lineNumber: 145,
        columnNumber: 23
    }, this);
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 text-center text-red-500",
        children: error
    }, void 0, false, {
        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
        lineNumber: 147,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onBack,
                    className: "mr-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-gray-700",
                    children: "← Quay lại"
                }, void 0, false, {
                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 border-b border-gray-200 pb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-black tracking-tight",
                        children: "Đặt lịch khám"
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-black mt-2",
                        children: "Quản lý các cuộc hẹn khám bệnh và điều phối lịch"
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow border border-gray-200 overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center p-6 border-b border-gray-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold text-black",
                                            children: "Lịch hẹn"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowForm(true),
                                            className: "bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center text-sm font-medium transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                                                    className: "w-4 h-4 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 17
                                                }, this),
                                                "Thêm lịch hẹn"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 border-b border-gray-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchIcon$3e$__["SearchIcon"], {
                                                    size: 18,
                                                    className: "text-black"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Tìm kiếm theo tên, ID hoặc số điện thoại...",
                                                className: "pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm",
                                                value: searchTerm,
                                                onChange: (e)=>setSearchTerm(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "min-w-full divide-y divide-gray-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            scope: "col",
                                                            className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                            children: "Bệnh nhân"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            scope: "col",
                                                            className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                            children: "Thời gian"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                            lineNumber: 201,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            scope: "col",
                                                            className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                            children: "Trạng thái"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            scope: "col",
                                                            className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                            children: "Thao tác"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                lineNumber: 196,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "bg-white divide-y divide-gray-200",
                                                children: filteredAppointments.length > 0 ? filteredAppointments.map((appointment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-gray-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 whitespace-nowrap",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm font-medium text-gray-900",
                                                                        children: appointment.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                        lineNumber: 217,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-500",
                                                                        children: [
                                                                            "ID: ",
                                                                            appointment.userId
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                        lineNumber: 218,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-500",
                                                                        children: [
                                                                            "SĐT: ",
                                                                            appointment.phone
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                        lineNumber: 219,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                lineNumber: 216,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 whitespace-nowrap",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-900",
                                                                        children: new Date(appointment.appointmentDate).toLocaleDateString('vi-VN')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                        lineNumber: 222,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-500",
                                                                        children: appointment.appointmentTime
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                        lineNumber: 225,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                lineNumber: 221,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 whitespace-nowrap",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ".concat(appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : appointment.status === 'canceled' ? 'bg-red-100 text-red-800' : appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'),
                                                                    children: appointment.status === 'confirmed' ? 'Đã xác nhận' : appointment.status === 'canceled' ? 'Đã hủy' : appointment.status === 'completed' ? 'Đã hoàn thành' : 'Đang chờ'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                    lineNumber: 228,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                lineNumber: 227,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 whitespace-nowrap text-sm font-medium",
                                                                children: appointment.status !== 'completed' && appointment.status !== 'canceled' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleMoveToQueue(appointment.id),
                                                                    className: "text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md mr-2 flex items-center",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                                                            className: "w-4 h-4 mr-1"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                            lineNumber: 252,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        "Chuyển vào phòng chờ"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                    lineNumber: 248,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                lineNumber: 246,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, appointment.id, true, {
                                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 23
                                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 4,
                                                        className: "px-6 py-10 text-center text-sm text-gray-500",
                                                        children: "Không tìm thấy lịch hẹn nào"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                lineNumber: 212,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-gray-50 border-t border-gray-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-700",
                                            children: [
                                                "Hiển thị ",
                                                filteredAppointments.length,
                                                " trong tổng số ",
                                                appointments.length,
                                                " lịch hẹn"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow border border-gray-200 overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 border-b border-gray-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold text-black",
                                            children: "Lịch hẹn hôm nay"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                            lineNumber: 283,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-gray-500",
                                            children: new Date().toLocaleDateString('vi-VN', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                            lineNumber: 284,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                    lineNumber: 282,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6",
                                    children: appointments.filter((a)=>a.appointmentDate === new Date().toISOString().split('T')[0]).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "divide-y divide-gray-200",
                                        children: appointments.filter((a)=>a.appointmentDate === new Date().toISOString().split('T')[0]).map((appointment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium text-black",
                                                                    children: appointment.appointmentTime
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                    lineNumber: 297,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-1",
                                                                    children: appointment.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                                    lineNumber: 298,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ".concat(appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : appointment.status === 'canceled' ? 'bg-red-100 text-red-800' : appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'),
                                                            children: appointment.status === 'confirmed' ? 'Đã xác nhận' : appointment.status === 'canceled' ? 'Đã hủy' : appointment.status === 'completed' ? 'Đã hoàn thành' : 'Đang chờ'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 25
                                                }, this)
                                            }, appointment.id, false, {
                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                lineNumber: 294,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                        lineNumber: 290,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                                                className: "mx-auto h-12 w-12 text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                lineNumber: 324,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mt-2 text-sm font-medium text-gray-900",
                                                children: "Không có lịch hẹn hôm nay"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                lineNumber: 325,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm text-gray-500",
                                                children: "Chưa có lịch hẹn nào được đặt cho hôm nay."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                lineNumber: 326,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setShowForm(true),
                                                    className: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                                                            className: "-ml-1 mr-2 h-5 w-5",
                                                            "aria-hidden": "true"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                            lineNumber: 335,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Thêm lịch hẹn"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                                lineNumber: 329,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                        lineNumber: 323,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                            lineNumber: 281,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$components$2f$Appointments$2f$AppointmentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppointmentForm"], {
                        onClose: ()=>setShowForm(false)
                    }, void 0, false, {
                        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                        lineNumber: 350,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                    lineNumber: 349,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
                lineNumber: 348,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/receptionistPage/AppointmentBooking.tsx",
        lineNumber: 149,
        columnNumber: 10
    }, this);
}
_s(AppointmentBooking, "su3kzAvxl34wjiV8eQ5Geroy490=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AppointmentBooking;
var _c;
__turbopack_context__.k.register(_c, "AppointmentBooking");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/receptionistPage/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ReceptionistPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$Dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/receptionistPage/Dashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$PatientManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/receptionistPage/PatientManagement.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$QueueManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/receptionistPage/QueueManagement.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$MedicationHistory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/receptionistPage/MedicationHistory.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$AppointmentBooking$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/receptionistPage/AppointmentBooking.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function ReceptionistPage() {
    _s();
    const { user, isAuthenticated, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [currentView, setCurrentView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Dashboard');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReceptionistPage.useEffect": ()=>{
            if (!isAuthenticated) {
                router.push('/login');
            } else if ((user === null || user === void 0 ? void 0 : user.role) !== 'RECEPTIONIST') {
                logout();
                router.push('/login');
            }
        }
    }["ReceptionistPage.useEffect"], [
        isAuthenticated,
        router,
        user,
        logout
    ]);
    if (!isAuthenticated || !user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
            }, void 0, false, {
                fileName: "[project]/src/app/receptionistPage/page.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/receptionistPage/page.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this);
    }
    const renderCurrentView = ()=>{
        switch(currentView){
            case 'PatientManagement':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$PatientManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientManagement"], {
                    onBack: ()=>setCurrentView('Dashboard')
                }, void 0, false, {
                    fileName: "[project]/src/app/receptionistPage/page.tsx",
                    lineNumber: 37,
                    columnNumber: 16
                }, this);
            case 'QueueManagement':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$QueueManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueueManagement"], {
                    onBack: ()=>setCurrentView('Dashboard')
                }, void 0, false, {
                    fileName: "[project]/src/app/receptionistPage/page.tsx",
                    lineNumber: 39,
                    columnNumber: 16
                }, this);
            case 'MedicationHistory':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$MedicationHistory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicationHistory"], {
                    onBack: ()=>setCurrentView('Dashboard')
                }, void 0, false, {
                    fileName: "[project]/src/app/receptionistPage/page.tsx",
                    lineNumber: 41,
                    columnNumber: 16
                }, this);
            case 'AppointmentBooking':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$AppointmentBooking$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppointmentBooking"], {
                    onBack: ()=>setCurrentView('Dashboard')
                }, void 0, false, {
                    fileName: "[project]/src/app/receptionistPage/page.tsx",
                    lineNumber: 43,
                    columnNumber: 16
                }, this);
            case 'Dashboard':
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$receptionistPage$2f$Dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dashboard"], {
                    onNavigate: (view)=>setCurrentView(view)
                }, void 0, false, {
                    fileName: "[project]/src/app/receptionistPage/page.tsx",
                    lineNumber: 46,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col w-full min-h-screen bg-gray-50",
        children: renderCurrentView()
    }, void 0, false, {
        fileName: "[project]/src/app/receptionistPage/page.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(ReceptionistPage, "uH40+5E3/huXxG/UpglMdLd5tqg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ReceptionistPage;
var _c;
__turbopack_context__.k.register(_c, "ReceptionistPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_5825d1e5._.js.map