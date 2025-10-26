<template>
  <div class="min-h-screen flex flex-column align-items-center justify-content-center">
    <div v-if="isLoading"><h1 class="text-center">Загрузка</h1></div>
    <div v-else>
      <h1 class="text-center">Создать аккаунт</h1>

      <div class="flex flex-column gap-2">
        <form class="flex flex-column gap-4 mt-4">
          <p v-if="error" class="text-red-500 text-center">
            {{ error }}
          </p>
          <div class="gap-2 flex flex-column">
            <PrimeInput type="text" placeholder="Почта" v-model="email" />
            <PrimeInput type="text" placeholder="Пароль" v-model="password" />
          </div>

          <Button @click="handleSubmit">Зарегистрироваться</Button>
        </form>

        <Button class="bg-indigo-600 border-0 text-white" @click="handleGoogleLogin"
          >Войти с помощью Google</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthFlow } from '@/features/auth/lib/auth.flow';
import PrimeInput from '@/shared/ui/PrimeInput.vue';

import { Button } from 'primevue';
import { ref, watch } from 'vue';

const password = ref<string>('');
const email = ref<string>('');

const { handleRegister, handleGoogleLogin, isLoading, error, clearError } = useAuthFlow();

const handleSubmit = async () => {
  await handleRegister(email.value, password.value);
};

watch([email, password], clearError);
</script>
