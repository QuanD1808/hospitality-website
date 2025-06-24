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
