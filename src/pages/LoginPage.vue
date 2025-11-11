<script setup lang="ts">
import { useAuthFlow } from '@/stores/auth.flow';
import Button from '@/components/ui/Button.vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Input from '@/components/ui/Input.vue';

const password = ref<string>('');
const email = ref<string>('');

const { handleLogin, isLoading, error } = useAuthFlow();

const handleSubmit = async () => {
  await handleLogin(email.value, password.value);
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 p-4">
    <div v-if="isLoading" class="text-white">
      <h1 class="text-2xl font-bold text-center">Загрузка...</h1>
    </div>

    <div v-else class="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl">
      <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">Вход</h1>

      <div class="flex flex-col gap-4">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <p v-if="error" class="text-red-500 text-center text-sm font-medium">
            {{ error }}
          </p>

          <div class="gap-4 flex flex-col">
            <Input type="text" placeholder="Почта" v-model="email" />
            <Input type="password" placeholder="Пароль" v-model="password" />
          </div>

          <Button type="submit" class="w-full mt-2">Войти</Button>
        </form>

        <RouterLink
          to="/register"
          class="text-blue-600 hover:text-blue-500 text-center text-sm font-medium mt-2"
        >
          Регистрация
        </RouterLink>
      </div>
    </div>
  </div>
</template>
