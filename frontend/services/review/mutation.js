import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewAPI } from '../../config/api';

export const useCreateReview = (restaurantId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => reviewAPI.create(data),
    onSuccess: () => {
      if (restaurantId) {
        queryClient.invalidateQueries(['restaurant', restaurantId]);
        queryClient.invalidateQueries(['canReview', restaurantId]);
      }
      queryClient.invalidateQueries(['myReviews']);
    },
  });
};

export const useUpdateReview = (reviewId, restaurantId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => reviewAPI.update(reviewId, data),
    onSuccess: () => {
      if (restaurantId) {
        queryClient.invalidateQueries(['restaurant', restaurantId]);
        queryClient.invalidateQueries(['canReview', restaurantId]);
      }
      queryClient.invalidateQueries(['myReviews']);
    },
  });
};

export const useDeleteReview = (restaurantId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId) => reviewAPI.delete(reviewId),
    onSuccess: () => {
      if (restaurantId) {
        queryClient.invalidateQueries(['restaurant', restaurantId]);
        queryClient.invalidateQueries(['canReview', restaurantId]);
      }
      queryClient.invalidateQueries(['myReviews']);
    },
  });
};
