import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});

api.interceptors.request.use((config: any) => {
  const token: string | null = sessionStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    if (error.response?.status === 401) {
      try {
        const res = await axios.post(
          'http://localhost:3000/user/auth/refresh',
          {},
          { withCredentials: true },
        );
        const newAccessToken: string = res.data.token;
        sessionStorage.setItem('access_token', newAccessToken);

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(error.config);
      } catch (refreshError) {
        console.error('Refresh token expired', refreshError);
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('user');
        // Ném lỗi ra ngoài để nhận và xử lý
        return Promise.reject({ ...error, isAuthError: true });
      }
    }
    return Promise.reject(error);
  },
);

export default api;
