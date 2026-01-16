

// API endpoints

import api from "../services/api";

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
