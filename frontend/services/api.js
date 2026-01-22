import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import {Platform} from "react-native"
export const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://192.168.1.127:3000';
const API_URL = `${BASE_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 (Unauthorized) errors globally if needed
    if (error.response && error.response.status === 401) {
      // You might want to logout the user here
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
