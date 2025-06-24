import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Đổi lại nếu BE chạy port khác hoặc deploy
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Nếu BE dùng cookie/session
});

export default axiosInstance;
