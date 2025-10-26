import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

export const useAuthFlow = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    const result = await authStore.register(email, password);
    if (result.success) {
      router.push('/');
    }
    return result;
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await authStore.login(email, password);
    if (result.success) {
      router.push('/');
    }
    return result;
  };

  const handleGoogleLogin = async () => {
    const result = await authStore.loginWithGoogle();
    if (result.success) {
      router.push('/');
    }
    return result;
  };

  return {
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    isLoading: authStore.isLoading,
    error: authStore.error,
    clearError: authStore.clearError,
  };
};
