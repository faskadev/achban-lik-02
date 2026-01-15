import { useQuery } from '@tanstack/react-query';
import { reviewAPI } from '../../config/api';

export const useMyReviews = () => {
  return useQuery({
    queryKey: ['myReviews'],
    queryFn: async () => {
      const response = await reviewAPI.getMyReviews();
      return response.data;
    },
  });
};

export const useCanReview = (restaurantId) => {
  return useQuery({
    queryKey: ['canReview', restaurantId],
    queryFn: async () => {
      const response = await reviewAPI.canReview(restaurantId);
      return response.data;
    },
    enabled: !!restaurantId,
  });
};
