module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/src/app/services/axios.customize.service.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    timeout: 10000
});
// Add request interceptor for logging
axiosInstance.interceptors.request.use((config)=>{
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
}, (error)=>{
    console.error('[API Request Error]', error);
    return Promise.reject(error);
});
// Add response interceptor for logging
axiosInstance.interceptors.response.use((response)=>{
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
}, (error)=>{
    if (error.response) {
        console.error(`[API Error] ${error.response.status} ${error.config?.url}:`, error.response.data);
    } else if (error.request) {
        console.error('[API Error] No response received:', error.request);
    } else {
        console.error('[API Error] Request setup error:', error.message);
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = axiosInstance;
}),
"[project]/src/app/services/api.service.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "calculatePrescriptionRevenue": ()=>calculatePrescriptionRevenue,
    "calculateRevenue": ()=>calculateRevenue,
    "calculateYearlyRevenue": ()=>calculateYearlyRevenue,
    "createAppointment": ()=>createAppointment,
    "createBatchPrescriptionDetails": ()=>createBatchPrescriptionDetails,
    "createMedicine": ()=>createMedicine,
    "createPrescription": ()=>createPrescription,
    "createPrescriptionDetail": ()=>createPrescriptionDetail,
    "createQueue": ()=>createQueue,
    "createUser": ()=>createUser,
    "deductMedicineStock": ()=>deductMedicineStock,
    "deleteAppointment": ()=>deleteAppointment,
    "deleteMedicine": ()=>deleteMedicine,
    "deleteQueue": ()=>deleteQueue,
    "deleteUser": ()=>deleteUser,
    "getAppointments": ()=>getAppointments,
    "getDoctors": ()=>getDoctors,
    "getMedicineById": ()=>getMedicineById,
    "getMedicines": ()=>getMedicines,
    "getPatients": ()=>getPatients,
    "getPendingDispensePrescriptions": ()=>getPendingDispensePrescriptions,
    "getPrescriptionById": ()=>getPrescriptionById,
    "getPrescriptionDetails": ()=>getPrescriptionDetails,
    "getPrescriptions": ()=>getPrescriptions,
    "getQueues": ()=>getQueues,
    "getQueuesByDoctor": ()=>getQueuesByDoctor,
    "getQueuesByStatus": ()=>getQueuesByStatus,
    "getQueuesWithPatients": ()=>getQueuesWithPatients,
    "getUserById": ()=>getUserById,
    "getUsers": ()=>getUsers,
    "login": ()=>login,
    "sendQueueToDoctor": ()=>sendQueueToDoctor,
    "updateAppointment": ()=>updateAppointment,
    "updateMedicine": ()=>updateMedicine,
    "updatePrescriptionStatus": ()=>updatePrescriptionStatus,
    "updateQueueStatus": ()=>updateQueueStatus,
    "updateUser": ()=>updateUser,
    "validateToken": ()=>validateToken
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/axios.customize.service.ts [app-ssr] (ecmascript)");
;
const login = async (email, password)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/users/login', {
        email,
        password
    });
    return response.data;
};
const getMedicines = async (token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/medicines', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const getMedicineById = async (medicineId, token)=>{
    console.log(`API Call: getMedicineById for id: ${medicineId}`);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/medicines/${medicineId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(`API Response: Found medicine with name: ${response.data.name}`);
        return response.data;
    } catch (error) {
        console.error(`API Error: getMedicineById failed for id ${medicineId}:`, error.response?.data || error.message);
        console.error('Error response status:', error.response?.status);
        throw error;
    }
};
const createMedicine = async (medicineData, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/medicines', medicineData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const updateMedicine = async (medicineId, medicineData, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/medicines/${medicineId}`, medicineData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const deleteMedicine = async (medicineId, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/medicines/${medicineId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const getAppointments = async (token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/appointments', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const createAppointment = async (appointmentData, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/appointments', appointmentData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const updateAppointment = async (appointmentId, appointmentData, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/appointments/${appointmentId}`, appointmentData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const deleteAppointment = async (appointmentId, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/appointments/${appointmentId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const createUser = async (userData, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/users', userData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const updateUser = async (userId, userData, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/users/${userId}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const getUsers = async (token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const getUserById = async (userId, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const getPatients = async (token)=>{
    try {
        // Kiểm tra token trước khi gửi request
        if (!token) {
            console.error('No authentication token provided for getPatients request');
            throw new Error('Authentication token is required');
        }
        // Log token để debug (chỉ hiện 10 ký tự đầu để đảm bảo an toàn)
        console.log('Using token (first 10 chars):', token.substring(0, 10) + '...');
        let patients = [];
        // Trước tiên, thử lấy role của người dùng hiện tại
        const meResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const currentUser = meResponse.data;
        console.log('Current user role:', currentUser.role);
        // Thử sử dụng endpoint mới dành cho tất cả nhân viên y tế
        if ([
            'ADMIN',
            'DOCTOR',
            'RECEPTIONIST',
            'PHARMACIST'
        ].includes(currentUser.role)) {
            console.log(`${currentUser.role} user detected, using dedicated patient endpoint`);
            try {
                // Sử dụng endpoint /users/patients mới đã tạo
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/users/patients', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                patients = response.data;
                console.log(`Successfully fetched ${patients.length} patients using /users/patients endpoint`);
                return patients;
            } catch (error) {
                console.error(`Error fetching patients for ${currentUser.role}:`, error);
                // Nếu endpoint mới chưa được triển khai, thử dùng cách thức cũ
                if (error.response && error.response.status === 404) {
                    console.warn('The /users/patients endpoint may not exist yet, falling back to other methods');
                } else {
                    throw error; // Re-throw for other types of errors
                }
            }
        }
        // Nếu là ADMIN và endpoint /users/patients không hoạt động, thử dùng /users
        if (currentUser.role === 'ADMIN') {
            console.log('Admin user detected, falling back to /users endpoint');
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                patients = response.data.filter((user)=>user.role === 'PATIENT');
                console.log(`Successfully fetched ${patients.length} patients by filtering all users`);
                return patients;
            } catch (error) {
                console.error('Error fetching all users as ADMIN:', error);
                throw error;
            }
        } else {
            // Nếu không có quyền và không có endpoint phù hợp
            console.warn(`User role ${currentUser.role} may not have sufficient permissions`);
            throw new Error(`Insufficient permissions: ${currentUser.role} cannot fetch patients`);
        }
    } catch (error) {
        console.error('Error fetching patients from API:', error.message);
        // Log thêm chi tiết về lỗi để debug
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        throw error;
    }
};
const validateToken = async (token)=>{
    console.log('Validating token (first 10 chars):', token.substring(0, 10) + '...');
    try {
        // Gọi một endpoint đơn giản để kiểm tra token có hợp lệ không
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/users/validate-token', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Token validation successful, user data:', response.data);
        // Get detailed user info to check role
        try {
            const meResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Current user role from /users/me:', meResponse.data?.role);
            return {
                valid: true,
                data: meResponse.data || response.data
            };
        } catch (meError) {
            console.error('Failed to get additional user info:', meError);
            return {
                valid: true,
                data: response.data
            };
        }
    } catch (error) {
        console.error('Token validation error:', error);
        console.error('Error response status:', error.response?.status);
        console.error('Error response data:', error.response?.data);
        if (error.response && error.response.status === 401) {
            // Token không hợp lệ hoặc đã hết hạn
            return {
                valid: false,
                reason: 'expired'
            };
        } else if (error.response && error.response.status === 403) {
            // Token hợp lệ nhưng không có quyền
            return {
                valid: true,
                reason: 'insufficient_permissions'
            };
        }
        return {
            valid: false,
            reason: 'unknown',
            error
        };
    }
};
const getQueues = async (token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/queues', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const getQueuesByDoctor = async (token, status)=>{
    const url = status ? `/queues/doctor?status=${status}` : '/queues/doctor';
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const getQueuesWithPatients = async (token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/queues/with-patients', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const getQueuesByStatus = async (status, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/queues/status/${status}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const createQueue = async (patientId, token, notes)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/queues', {
        patientId,
        status: 'waiting',
        notes
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const updateQueueStatus = async (queueId, token, status, doctorId, notes)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/queues/${queueId}`, {
        status,
        doctorId,
        notes
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const deleteQueue = async (queueId, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/queues/${queueId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const sendQueueToDoctor = async (queueId, token)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/queues/${queueId}/send-to-doctor`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error sending queue to doctor:", error);
        // Log thêm chi tiết về lỗi để debug
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        throw error;
    }
};
const getDoctors = async (token)=>{
    try {
        // Kiểm tra token trước khi gửi request
        if (!token) {
            console.error('No authentication token provided for getDoctors request');
            throw new Error('Authentication token is required');
        }
        // Log token để debug (chỉ hiện 10 ký tự đầu để đảm bảo an toàn)
        console.log('Using token (first 10 chars):', token.substring(0, 10) + '...');
        // Gọi API endpoint chuyên biệt cho bác sĩ
        console.log('Fetching doctors using /users/doctors endpoint');
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/users/doctors', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(`Successfully fetched ${response.data.length} doctors using dedicated endpoint`);
        return response.data;
    } catch (error) {
        console.error('Error fetching doctors from API:', error.message);
        // Log thêm chi tiết về lỗi để debug
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        // Nếu endpoint chuyên biệt không tồn tại, thử dùng cách thức khác
        if (error.response && error.response.status === 404) {
            console.warn('The /users/doctors endpoint may not exist yet, falling back to filtering all users');
            try {
                // Thử lấy tất cả người dùng rồi lọc
                const allUsers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const doctors = allUsers.data.filter((user)=>user.role === 'DOCTOR');
                console.log(`Successfully fetched ${doctors.length} doctors by filtering all users`);
                return doctors;
            } catch (fallbackError) {
                console.error('Failed to fetch doctors using fallback method:', fallbackError);
                throw fallbackError;
            }
        }
        throw error;
    }
};
const createPrescription = async (prescriptionData, token)=>{
    console.log('API Call: createPrescription with data:', JSON.stringify(prescriptionData, null, 2));
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/prescriptions', prescriptionData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('API Response: createPrescription success:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error: createPrescription failed:', error.response?.data || error.message);
        throw error;
    }
};
const getPrescriptions = async (queryParams = {}, token)=>{
    console.log('API Call: getPrescriptions with params:', queryParams);
    console.log('Using token (first 10 chars):', token.substring(0, 10) + '...');
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/prescriptions', {
            params: queryParams,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(`API Response: Found ${response.data.length} prescriptions`);
        return response.data;
    } catch (error) {
        console.error('API Error: getPrescriptions failed:', error.response?.data || error.message);
        console.error('Error response status:', error.response?.status);
        console.error('Error response headers:', error.response?.headers);
        throw error;
    }
};
const getPendingDispensePrescriptions = async (token)=>{
    return getPrescriptions({
        status: 'PENDING_DISPENSE'
    }, token);
};
const getPrescriptionById = async (prescriptionId, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/prescriptions/${prescriptionId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const updatePrescriptionStatus = async (prescriptionId, status, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/prescriptions/${prescriptionId}`, {
        status
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const createPrescriptionDetail = async (prescriptionDetailData, token)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/prescriptiondetails', prescriptionDetailData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
const createBatchPrescriptionDetails = async (prescriptionId, details, token)=>{
    console.log('API Call: createBatchPrescriptionDetails with data:', {
        prescriptionId,
        details: JSON.stringify(details, null, 2)
    });
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/prescriptiondetails/batch', {
            prescriptionId,
            details
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('API Response: createBatchPrescriptionDetails success:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error: createBatchPrescriptionDetails failed:', error.response?.data || error.message);
        throw error;
    }
};
const getPrescriptionDetails = async (prescriptionId, token)=>{
    console.log(`API Call: getPrescriptionDetails for prescriptionId: ${prescriptionId}`);
    console.log('Using token (first 10 chars):', token.substring(0, 10) + '...');
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/prescriptiondetails', {
            params: {
                prescriptionId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(`API Response: Found ${response.data.length} prescription details`);
        if (response.data.length > 0) {
            console.log('First prescription detail sample:', {
                id: response.data[0]._id,
                prescriptionId: response.data[0].prescriptionId,
                medicineId: response.data[0].medicineId,
                quantity: response.data[0].quantity,
                dosage: response.data[0].dosage
            });
        }
        return response.data;
    } catch (error) {
        console.error('API Error: getPrescriptionDetails failed:', error.response?.data || error.message);
        console.error('Error response status:', error.response?.status);
        console.error('Error response headers:', error.response?.headers);
        throw error;
    }
};
const deductMedicineStock = async (medicineId, quantity, token)=>{
    console.log(`API Call: Deducting ${quantity} units from medicine ID: ${medicineId}`);
    try {
        // Đầu tiên lấy thông tin hiện tại của thuốc
        const medicine = await getMedicineById(medicineId, token);
        if (!medicine) {
            throw new Error(`Medicine with ID ${medicineId} not found`);
        }
        // Kiểm tra số lượng hợp lệ
        if (medicine.totalPills < quantity) {
            console.warn(`Warning: Attempting to deduct ${quantity} pills but only ${medicine.totalPills} available`);
        // Trong trường hợp thực tế, bạn có thể muốn ném lỗi ở đây
        }
        // Tính toán số lượng mới
        const newQuantity = Math.max(0, medicine.totalPills - quantity);
        // Cập nhật số lượng thuốc
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/medicines/${medicineId}`, {
            totalPills: newQuantity
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(`API Success: Updated medicine ${medicine.name}, new quantity: ${newQuantity}`);
        return response.data;
    } catch (error) {
        console.error('API Error: deductMedicineStock failed:', error.response?.data || error.message);
        throw error;
    }
};
const calculateRevenue = async (token, startDate, endDate)=>{
    console.log(`API Call: calculateRevenue from ${startDate || 'all time'} to ${endDate || 'now'}`);
    try {
        const params = {
            status: 'DISPENSED'
        };
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/prescriptions/revenue', {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(`API Response: Revenue calculation successful`);
        return response.data;
    } catch (error) {
        console.error(`API Error: calculateRevenue failed:`, error.response?.data || error.message);
        console.error('Error response status:', error.response?.status);
        throw error;
    }
};
const calculateYearlyRevenue = async (token, year)=>{
    console.log(`API Call: calculateYearlyRevenue for year: ${year}`);
    try {
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;
        const response = await calculateRevenue(token, startDate, endDate);
        return response;
    } catch (error) {
        console.error(`API Error: calculateYearlyRevenue failed for year ${year}:`, error);
        throw error;
    }
};
const calculatePrescriptionRevenue = async (prescriptionId, token)=>{
    console.log(`API Call: calculatePrescriptionRevenue for id: ${prescriptionId}`);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/prescriptions/${prescriptionId}/revenue`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(`API Response: Prescription revenue calculation successful`);
        return response.data;
    } catch (error) {
        console.error(`API Error: calculatePrescriptionRevenue failed for id ${prescriptionId}:`, error.response?.data || error.message);
        console.error('Error response status:', error.response?.status);
        throw error;
    }
};
const deleteUser = async (id, authToken)=>{
    console.log(`[API Service] Sending request to delete user with ID: ${id}`);
    try {
        // Sử dụng axiosInstance đã được cấu hình để gửi yêu cầu DELETE
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$axios$2e$customize$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/users/${id}`, {
            headers: {
                // Gửi token trong header Authorization để backend xác thực quyền
                Authorization: `Bearer ${authToken}`
            }
        });
        // Trả về dữ liệu từ server (ví dụ: { message: "User deleted successfully" })
        return response.data;
    } catch (error) {
        // Log lỗi để debug và ném lỗi ra ngoài để component có thể bắt và xử lý
        console.error(`[API Service] An error occurred while deleting user ${id}:`, error);
        throw error;
    }
};
}),
"[project]/src/app/context/AuthContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "AuthProvider": ()=>AuthProvider,
    "useAuth": ()=>useAuth
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/api.service.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null); // Added token state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check for existing session
        const storedUser = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('user');
        const storedToken = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('token'); // Get stored token
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove('user');
            }
        }
        // Set token from cookie if available
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    const login = async (email, password)=>{
        try {
            console.log('AuthContext - Login attempt:', email);
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["login"])(email, password);
            console.log('AuthContext - Login response data:', data);
            // Tách token và thông tin người dùng
            const { token: authToken, ...userData } = data;
            // Đảm bảo role là chuỗi và được lưu dưới dạng chữ hoa để nhất quán
            if (userData.role) {
                console.log('AuthContext - Original role:', userData.role);
                const normalizedRole = typeof userData.role === 'string' ? userData.role.toUpperCase() : userData.role;
                userData.role = normalizedRole;
                console.log('AuthContext - Normalized role:', userData.role);
            }
            setUser(userData);
            setIsAuthenticated(true);
            setToken(authToken); // Save token to state
            console.log('AuthContext - Setting user cookie with data:', userData);
            // Lưu thông tin người dùng và token vào cookie riêng biệt
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set('user', JSON.stringify(userData), {
                expires: 1
            });
            if (authToken) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set('token', authToken, {
                    expires: 1
                });
            }
        } catch (error) {
            console.error('AuthContext - Login error:', error);
            throw error;
        }
    };
    const logout = ()=>{
        setUser(null);
        setIsAuthenticated(false);
        setToken(null); // Clear token
        // Xóa cả hai cookie khi đăng xuất
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove('user');
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove('token');
    };
    // Hàm để làm mới token khi token hiện tại không hợp lệ
    const refreshToken = async ()=>{
        console.log('AuthContext - Attempting to refresh token');
        // Trong triển khai thực tế, bạn sẽ gọi endpoint refresh-token của API
        // Hiện tại chúng ta chỉ kiểm tra nếu user object còn tồn tại
        if (user && user.email) {
            try {
                // Giả lập request refresh token bằng cách đăng nhập lại
                // Trong thực tế sẽ là gọi API refresh-token
                console.log('Would call refresh token API here with existing user:', user.email);
                return true;
            } catch (error) {
                console.error('AuthContext - Token refresh error:', error);
                // Đăng xuất người dùng nếu không thể làm mới token
                logout();
                return false;
            }
        } else {
            return false;
        }
    };
    const validateCurrentToken = async ()=>{
        const storedToken = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('token');
        if (!storedToken) {
            setIsAuthenticated(false);
            return false;
        }
        try {
            const tokenStatus = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$api$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateToken"])(storedToken);
            const isValid = tokenStatus.valid;
            setIsAuthenticated(isValid);
            return isValid;
        } catch (error) {
            console.error('AuthContext - Token validation error:', error);
            setIsAuthenticated(false);
            return false;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isAuthenticated,
            token,
            login,
            logout,
            refreshToken,
            validateCurrentToken
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/context/AuthContext.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__c0e58a51._.js.map