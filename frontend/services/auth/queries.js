import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const { data } = await api.get('/auth/me');
            return data;
        },
    });
};
