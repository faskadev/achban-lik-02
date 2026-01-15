import { useQuery } from '@tanstack/react-query';
import { restaurantAPI } from '../../config/api';

export const useRestaurants = (params) => {
  return useQuery({
    queryKey: ['restaurants', params],
    queryFn: async () => {
      const response = await restaurantAPI.getAll(params);
      return response.data;
    },
  });
};

export const useRestaurant = (id) => {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      const response = await restaurantAPI.getById(id);
      return response.data.restaurant;
    },
    enabled: !!id,
  });
};

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const response = await restaurantAPI.getCities();
      return response.data;
    },
  });
};
