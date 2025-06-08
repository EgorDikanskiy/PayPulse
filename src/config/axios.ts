import axios from 'axios';
import { getApiConfig } from './api';
import { apiRoutes } from './apiRoutes';

const { baseURL } = getApiConfig();

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
