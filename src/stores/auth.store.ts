import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref<boolean>(false);
  const error = ref<string>('');

  const clearError = () => {
    error.value = '';
  };

  const handleAuthError = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Не верная почта';
      case 'auth/user-not-found':
        return 'Пользователь не найден';
      case 'auth/wrong-password':
        return 'Не верный пароль';
      case 'auth/email-already-in-use':
        return 'Пользователь уже зарегистрирован';
      case 'auth/weak-password':
        return 'Пароль слишком слабый';
      default:
        return 'Произошла ошибка при авторизации';
    }
  };

  const register = async (email: string, password: string) => {
    try {
      isLoading.value = true;
      error.value = '';
      const result = await createUserWithEmailAndPassword(getAuth(), email, password);
      return { success: true, user: result.user };
    } catch (err: any) {
      error.value = handleAuthError(err.code);
      return { success: false, error: err };
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true;
      error.value = '';
      const result = await signInWithEmailAndPassword(getAuth(), email, password);
      return { success: true, user: result.user };
    } catch (err: any) {
      error.value = handleAuthError(err.code);
      return { success: false, error: err };
    } finally {
      isLoading.value = false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      isLoading.value = true;
      error.value = '';
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(getAuth(), provider);
      return { success: true, user: result.user };
    } catch (err: any) {
      error.value = 'Ошибка при входе через Google';
      return { success: false, error: err };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,

    register,
    login,
    loginWithGoogle,
    clearError,
  };
});
