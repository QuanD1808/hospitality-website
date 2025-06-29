import axiosInstance from './axios.customize.service';

// Đăng nhập
export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/users/login', { email, password });
  return response.data;
};

// Lấy danh sách thuốc (cần token)
export const getMedicines = async (token: string) => {
  const response = await axiosInstance.get('/medicines', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get a specific medicine by ID
export const getMedicineById = async (medicineId: string, token: string) => {
  const response = await axiosInstance.get(`/medicines/${medicineId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Appointments API methods
export const getAppointments = async (token: string) => {
  const response = await axiosInstance.get('/appointments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createAppointment = async (appointmentData: any, token: string) => {
  const response = await axiosInstance.post('/appointments', appointmentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateAppointment = async (appointmentId: string, appointmentData: any, token: string) => {
  const response = await axiosInstance.put(`/appointments/${appointmentId}`, appointmentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteAppointment = async (appointmentId: string, token: string) => {
  const response = await axiosInstance.delete(`/appointments/${appointmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Patient/User API methods
export const createUser = async (userData: any, token: string) => {
  const response = await axiosInstance.post('/users', userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUser = async (userId: string, userData: any, token: string) => {
  const response = await axiosInstance.put(`/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUsers = async (token: string) => {
  const response = await axiosInstance.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserById = async (userId: string, token: string) => {
  const response = await axiosInstance.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Lấy danh sách bệnh nhân từ API
export const getPatients = async (token: string) => {
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
    const meResponse = await axiosInstance.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const currentUser = meResponse.data;
    console.log('Current user role:', currentUser.role);
    
    // Thử sử dụng endpoint mới dành cho tất cả nhân viên y tế
    if (['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PHARMACIST'].includes(currentUser.role)) {
      console.log(`${currentUser.role} user detected, using dedicated patient endpoint`);
      try {
        // Sử dụng endpoint /users/patients mới đã tạo
        const response = await axiosInstance.get('/users/patients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        patients = response.data;
        console.log(`Successfully fetched ${patients.length} patients using /users/patients endpoint`);
        return patients;
      } catch (error: any) {
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
        const response = await axiosInstance.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        patients = response.data.filter((user: any) => user.role === 'PATIENT');
        console.log(`Successfully fetched ${patients.length} patients by filtering all users`);
        return patients;
      } catch (error: any) {
        console.error('Error fetching all users as ADMIN:', error);
        throw error;
      }
    } else {
      // Nếu không có quyền và không có endpoint phù hợp
      console.warn(`User role ${currentUser.role} may not have sufficient permissions`);
      throw new Error(`Insufficient permissions: ${currentUser.role} cannot fetch patients`);
    }
  } catch (error: any) {
    console.error('Error fetching patients from API:', error.message);
    
    // Log thêm chi tiết về lỗi để debug
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    throw error;
  }
};

// Kiểm tra tính hợp lệ của token
export const validateToken = async (token: string) => {
  try {
    // Gọi một endpoint đơn giản để kiểm tra token có hợp lệ không
    const response = await axiosInstance.get('/users/validate-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { valid: true, data: response.data };
  } catch (error: any) {
    console.error('Token validation error:', error);
    
    if (error.response && error.response.status === 401) {
      // Token không hợp lệ hoặc đã hết hạn
      return { valid: false, reason: 'expired' };
    } else if (error.response && error.response.status === 403) {
      // Token hợp lệ nhưng không có quyền
      return { valid: true, reason: 'insufficient_permissions' };
    }
    
    return { valid: false, reason: 'unknown', error };
  }
};

// Queue API methods
export const getQueues = async (token: string) => {
  const response = await axiosInstance.get('/queues', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getQueuesWithPatients = async (token: string) => {
  const response = await axiosInstance.get('/queues/with-patients', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getQueuesByStatus = async (status: string, token: string) => {
  const response = await axiosInstance.get(`/queues/status/${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createQueue = async (patientId: string, token: string, notes?: string) => {
  const response = await axiosInstance.post('/queues', 
    { 
      patientId,
      status: 'waiting',
      notes
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateQueueStatus = async (queueId: string, token: string, status: string, doctorId?: string, notes?: string) => {
  const response = await axiosInstance.put(`/queues/${queueId}`, 
    { 
      status,
      doctorId,
      notes
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteQueue = async (queueId: string, token: string) => {
  const response = await axiosInstance.delete(`/queues/${queueId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Gửi thông tin bệnh nhân đến bác sĩ đã chỉ định
export const sendQueueToDoctor = async (queueId: string, token: string) => {
  try {
    const response = await axiosInstance.put(`/queues/${queueId}/send-to-doctor`, 
      {}, // Không cần gửi dữ liệu vì server sẽ lấy thông tin từ queueId
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error sending queue to doctor:", error);
    
    // Log thêm chi tiết về lỗi để debug
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    throw error;
  }
};

// Lấy danh sách bác sĩ từ API
export const getDoctors = async (token: string) => {
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
    const response = await axiosInstance.get('/users/doctors', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log(`Successfully fetched ${response.data.length} doctors using dedicated endpoint`);
    return response.data;
  } catch (error: any) {
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
        const allUsers = await axiosInstance.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const doctors = allUsers.data.filter((user: any) => user.role === 'DOCTOR');
        console.log(`Successfully fetched ${doctors.length} doctors by filtering all users`);
        return doctors;
      } catch (fallbackError: any) {
        console.error('Failed to fetch doctors using fallback method:', fallbackError);
        throw fallbackError;
      }
    }
    
    throw error;
  }
};

// Prescription API methods
export const createPrescription = async (prescriptionData: any, token: string) => {
  console.log('API Call: createPrescription with data:', JSON.stringify(prescriptionData, null, 2));
  try {
    const response = await axiosInstance.post('/prescriptions', prescriptionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API Response: createPrescription success:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('API Error: createPrescription failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getPrescriptions = async (queryParams: { patientId?: string, doctorId?: string, status?: string } = {}, token: string) => {
  const response = await axiosInstance.get('/prescriptions', {
    params: queryParams,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getPrescriptionById = async (prescriptionId: string, token: string) => {
  const response = await axiosInstance.get(`/prescriptions/${prescriptionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updatePrescriptionStatus = async (prescriptionId: string, status: string, token: string) => {
  const response = await axiosInstance.put(`/prescriptions/${prescriptionId}`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Prescription Detail API methods
export const createPrescriptionDetail = async (prescriptionDetailData: any, token: string) => {
  const response = await axiosInstance.post('/prescriptiondetails', prescriptionDetailData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Create multiple prescription details in batch
export const createBatchPrescriptionDetails = async (prescriptionId: string, details: any[], token: string) => {
  console.log('API Call: createBatchPrescriptionDetails with data:', {
    prescriptionId,
    details: JSON.stringify(details, null, 2)
  });
  try {
    const response = await axiosInstance.post('/prescriptiondetails/batch', {
      prescriptionId,
      details
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API Response: createBatchPrescriptionDetails success:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('API Error: createBatchPrescriptionDetails failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getPrescriptionDetails = async (prescriptionId: string, token: string) => {
  const response = await axiosInstance.get('/prescriptiondetails', {
    params: { prescriptionId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getDoctorQueues = async (token: string, status?: string) => {
  // URL và params
  const url = '/queues/doctor';
  const params = status ? { status } : {};
  
  // Gọi API
  const response = await axiosInstance.get(url, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};
