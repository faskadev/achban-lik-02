import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantAPI } from '../../config/api';

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => restaurantAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['restaurants']);
    },
  });
};

export const useUpdateRestaurant = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => restaurantAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['restaurants']);
      queryClient.invalidateQueries(['restaurant', id]);
    },
  });
};

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => restaurantAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['restaurants']);
    },
  });
};
