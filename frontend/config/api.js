
import api from "../services/api";


export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};


export const restaurantAPI = {
  getAll: (params) => api.get('/restaurants', { params }),

  getById: (id) => api.get(`/restaurants/${id}`),

  getCities: () => api.get('/restaurants/filters/cities'),

  create: (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'mainImage' && value?.uri) {
        
        formData.append('image', {
          uri: value.uri,
          type: value.type || 'image/jpeg',
          name: value.fileName || `restaurant-${Date.now()}.jpg`,
        });
      } else if (key === 'latitude' || key === 'longitude') {
        formData.append(key, String(parseFloat(value)));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return api.post('/restaurants', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data, headers) => {
        return formData; 
      },
    });
  },

  update: (id, data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'mainImage' && value?.uri) {
        formData.append('image', {
          uri: value.uri,
          type: value.type || 'image/jpeg',
          name: value.fileName || `restaurant-${Date.now()}.jpg`,
        });
      } else if (key === 'latitude' || key === 'longitude') {
        formData.append(key, String(parseFloat(value)));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return api.put(`/restaurants/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  delete: (id) => api.delete(`/restaurants/${id}`),
};



export const reviewAPI = {
  getMyReviews: () => api.get('/reviews/me'),
  canReview: (restaurantId) => api.get(`/reviews/can-review/${restaurantId}`),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};
