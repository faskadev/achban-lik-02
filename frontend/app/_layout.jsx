import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const queryClient = new QueryClient();

function AuthGuard({ children }) {
    const segments = useSegments();
    const router = useRouter();
    const { isAuthenticated, isLoading, loadAuth } = useAuthStore();

    useEffect(() => {
        loadAuth();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        // Check if the current route is in the auth group (public routes)
        // Adjusted checks to match the flat file structure in app/
        const inAuthGroup = ['auth-choice', 'login', 'register'].includes(segments[0]);

        if (!isAuthenticated && !inAuthGroup) {
            // Redirect to auth choice if not authenticated
            router.replace('/auth-choice');
        } else if (isAuthenticated && inAuthGroup) {
            // Redirect to restaurants if authenticated
            router.replace('/restaurants');
        }
    }, [isAuthenticated, segments, isLoading]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B6B" />
            </View>
        );
    }

    return children;
}

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthGuard>
                <Slot />
            </AuthGuard>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
