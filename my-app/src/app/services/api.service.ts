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
  console.log(`API Call: getMedicineById for id: ${medicineId}`);
  try {
    const response = await axiosInstance.get(`/medicines/${medicineId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`API Response: Found medicine with name: ${response.data.name}`);
    return response.data;
  } catch (error: any) {
    console.error(`API Error: getMedicineById failed for id ${medicineId}:`, error.response?.data || error.message);
    console.error('Error response status:', error.response?.status);
    throw error;
  }
};

// Create a new medicine
export const createMedicine = async (medicineData: any, token: string) => {
  const response = await axiosInstance.post('/medicines', medicineData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update an existing medicine
export const updateMedicine = async (medicineId: string, medicineData: any, token: string) => {
  const response = await axiosInstance.put(`/medicines/${medicineId}`, medicineData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete a medicine
export const deleteMedicine = async (medicineId: string, token: string) => {
  const response = await axiosInstance.delete(`/medicines/${medicineId}`, {
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
  console.log('Validating token (first 10 chars):', token.substring(0, 10) + '...');
  try {
    // Gọi một endpoint đơn giản để kiểm tra token có hợp lệ không
    const response = await axiosInstance.get('/users/validate-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Token validation successful, user data:', response.data);
    
    // Get detailed user info to check role
    try {
      const meResponse = await axiosInstance.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Current user role from /users/me:', meResponse.data?.role);
      return { valid: true, data: meResponse.data || response.data };
    } catch (meError) {
      console.error('Failed to get additional user info:', meError);
      return { valid: true, data: response.data };
    }
  } catch (error: any) {
    console.error('Token validation error:', error);
    console.error('Error response status:', error.response?.status);
    console.error('Error response data:', error.response?.data);
    
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

export const getQueuesByDoctor = async (token: string, status?: string) => {
  const url = status ? `/queues/doctor?status=${status}` : '/queues/doctor';
  const response = await axiosInstance.get(url, {
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
  console.log('API Call: getPrescriptions with params:', queryParams);
  console.log('Using token (first 10 chars):', token.substring(0, 10) + '...');
  try {
    const response = await axiosInstance.get('/prescriptions', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`API Response: Found ${response.data.length} prescriptions`);
    return response.data;
  } catch (error: any) {
    console.error('API Error: getPrescriptions failed:', error.response?.data || error.message);
    console.error('Error response status:', error.response?.status);
    console.error('Error response headers:', error.response?.headers);
    throw error;
  }
};

// Helper function specifically for pharmacy to get pending prescriptions
export const getPendingDispensePrescriptions = async (token: string) => {
  return getPrescriptions({ status: 'PENDING_DISPENSE' }, token);
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
  console.log(`API Call: getPrescriptionDetails for prescriptionId: ${prescriptionId}`);
  console.log('Using token (first 10 chars):', token.substring(0, 10) + '...');
  try {
    const response = await axiosInstance.get('/prescriptiondetails', {
      params: { prescriptionId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  } catch (error: any) {
    console.error('API Error: getPrescriptionDetails failed:', error.response?.data || error.message);
    console.error('Error response status:', error.response?.status);
    console.error('Error response headers:', error.response?.headers);
    throw error;
  }
};

// Deduct medicine quantity from inventory
export const deductMedicineStock = async (medicineId: string, quantity: number, token: string) => {
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
    const response = await axiosInstance.put(`/medicines/${medicineId}`, 
      { totalPills: newQuantity }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log(`API Success: Updated medicine ${medicine.name}, new quantity: ${newQuantity}`);
    return response.data;
  } catch (error: any) {
    console.error('API Error: deductMedicineStock failed:', error.response?.data || error.message);
    throw error;
  }
};

// Tính doanh thu từ đơn thuốc đã phát
export const calculateRevenue = async (token: string, startDate?: string, endDate?: string) => {
  console.log(`API Call: calculateRevenue from ${startDate || 'all time'} to ${endDate || 'now'}`);
  try {
    const params: any = { status: 'DISPENSED' };
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    const response = await axiosInstance.get('/prescriptions/revenue', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log(`API Response: Revenue calculation successful`);
    return response.data;
  } catch (error: any) {
    console.error(`API Error: calculateRevenue failed:`, error.response?.data || error.message);
    console.error('Error response status:', error.response?.status);
    throw error;
  }
};

// Tính doanh thu theo năm
export const calculateYearlyRevenue = async (token: string, year: string) => {
  console.log(`API Call: calculateYearlyRevenue for year: ${year}`);
  try {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    
    const response = await calculateRevenue(token, startDate, endDate);
    return response;
  } catch (error: any) {
    console.error(`API Error: calculateYearlyRevenue failed for year ${year}:`, error);
    throw error;
  }
};

// Tính doanh thu chi tiết từ một đơn thuốc cụ thể
export const calculatePrescriptionRevenue = async (prescriptionId: string, token: string) => {
  console.log(`API Call: calculatePrescriptionRevenue for id: ${prescriptionId}`);
  try {
    const response = await axiosInstance.get(`/prescriptions/${prescriptionId}/revenue`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log(`API Response: Prescription revenue calculation successful`);
    return response.data;
  } catch (error: any) {
    console.error(`API Error: calculatePrescriptionRevenue failed for id ${prescriptionId}:`, error.response?.data || error.message);
    console.error('Error response status:', error.response?.status);
    throw error;
  }
};

export const deleteUser = async (id: string, authToken: string) => {
  console.log(`[API Service] Sending request to delete user with ID: ${id}`);
  try {
    // Sử dụng axiosInstance đã được cấu hình để gửi yêu cầu DELETE
    const response = await axiosInstance.delete(`/users/${id}`, {
      headers: {
        // Gửi token trong header Authorization để backend xác thực quyền
        Authorization: `Bearer ${authToken}`,
      },
    });
    
    // Trả về dữ liệu từ server (ví dụ: { message: "User deleted successfully" })
    return response.data;
  } catch (error) {
    // Log lỗi để debug và ném lỗi ra ngoài để component có thể bắt và xử lý
    console.error(`[API Service] An error occurred while deleting user ${id}:`, error);
    throw error;
  }
};
