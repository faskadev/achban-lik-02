import { useMutation } from '@tanstack/react-query';
import api from '../api';
import { useAuthStore } from '../../store/authStore';

export const useLogin = () => {
    const { setAuth } = useAuthStore();

    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.post('/auth/login', credentials);
            return data;
        },
        onSuccess: (data) => {
            setAuth(data.user, data.token);
        },
    });
};

export const useRegister = () => {
    const { setAuth } = useAuthStore();

    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.post('/auth/register', credentials);
            return data;
        },
        onSuccess: (data) => {
            setAuth(data.user, data.token);
             // Router redirection is now handled by the protected layout logic
        },
    });
};
