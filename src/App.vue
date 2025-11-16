<script setup lang="ts">
import { Header } from '@/components/layout/header';
import { RouterView } from 'vue-router';
import { Footer } from './components/layout/footer';
import { onMounted, onUnmounted } from 'vue';
import { useFavoriteStore } from './stores/favorite.store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const favoritesStore = useFavoriteStore();
const auth = getAuth(); // Используем getAuth() для доступа к Auth

// Переменная для хранения функции отписки от Auth Listener
let authUnsubscribe: (() => void) | null = null;

onMounted(() => {
  // Подписываемся на изменения статуса авторизации
  authUnsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // 1. ПОЛЬЗОВАТЕЛЬ ВОШЕЛ: Запускаем подписку на Firestore
      favoritesStore.startListeningToFavorites();
    } else {
      // 2. ПОЛЬЗОВАТЕЛЬ ВЫШЕЛ: Останавливаем подписку и очищаем данные
      favoritesStore.stopListeningToFavorites();
    }
  });
});

onUnmounted(() => {
  // 3. Очистка ресурсов при демонтаже App.vue
  if (authUnsubscribe) {
    authUnsubscribe();
  }
  favoritesStore.stopListeningToFavorites();
});
</script>

<template>
  <Header />
  <div class="">
    <RouterView></RouterView>
  </div>
  <Footer />
</template>

<style scoped>
.pt-100px {
  padding-top: 100px;
}
</style>
