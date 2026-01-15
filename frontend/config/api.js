import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Change this to your computer's IP address if testing on physical device
// Or use 10.0.2.2 for Android emulator
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - could handle logout here
      SecureStore.deleteItemAsync('authToken');
    }
    return Promise.reject(error);
  }
);

export default api;

// API endpoints

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Restaurants
export const restaurantAPI = {
  getAll: (params) => api.get('/restaurants', { params }),
  getById: (id) => api.get(`/restaurants/${id}`),
  getCities: () => api.get('/restaurants/filters/cities'),
  create: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'mainImage' && data[key]) {
        formData.append('mainImage', {
          uri: data[key].uri,
          type: data[key].type || 'image/jpeg',
          name: data[key].fileName || 'restaurant.jpg',
        });
      } else {
        formData.append(key, data[key]);
      }
    });
    return api.post('/restaurants', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  update: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'mainImage' && data[key]?.uri) {
        formData.append('mainImage', {
          uri: data[key].uri,
          type: data[key].type || 'image/jpeg',
          name: data[key].fileName || 'restaurant.jpg',
        });
      } else {
        formData.append(key, data[key]);
      }
    });
    return api.put(`/restaurants/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (id) => api.delete(`/restaurants/${id}`),
};

// Reviews
export const reviewAPI = {
  getMyReviews: () => api.get('/reviews/me'),
  canReview: (restaurantId) => api.get(`/reviews/can-review/${restaurantId}`),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};
