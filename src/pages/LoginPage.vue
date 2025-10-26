<template>
  <div class="min-h-screen flex flex-column align-items-center justify-content-center">
    <div v-if="isLoading"><h1 class="text-center">Загрузка</h1></div>
    <div v-else>
      <h1 class="text-center">Вход</h1>

      <div class="flex flex-column gap-2">
        <form @submit.prevent="handleSubmit" class="flex flex-column gap-4 mt-4">
          <p v-if="error" class="text-red-500 text-center">
            {{ error }}
          </p>
          <div class="gap-2 flex flex-column">
            <PrimeInput type="text" placeholder="Почта" v-model="email" />
            <PrimeInput type="text" placeholder="Пароль" v-model="password" />
          </div>

          <Button type="submit">Войти</Button>
        </form>

        <RouterLink to="/register" class="text-center text-primary">Регистрация</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthFlow } from '@/features/auth/lib/auth.flow';
import PrimeInput from '@/shared/ui/PrimeInput.vue';
import { Button } from 'primevue';
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

const password = ref<string>('');
const email = ref<string>('');

const { handleLogin, isLoading, error, clearError } = useAuthFlow();

const handleSubmit = async () => {
  await handleLogin(email.value, password.value);
};
</script>
