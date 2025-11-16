<script setup lang="ts">
import { Header } from '@/components/layout/header';
import { RouterView } from 'vue-router';
import { Footer } from './components/layout/footer';
import { onMounted, onUnmounted } from 'vue';
import { useFavoriteStore } from './stores/favorite.store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const favoritesStore = useFavoriteStore();
const auth = getAuth();

let authUnsubscribe: (() => void) | null = null;

onMounted(() => {
  authUnsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      favoritesStore.startListeningToFavorites(user.uid);
    } else {
      favoritesStore.stopListeningToFavorites();
    }
  });
});

onUnmounted(() => {
  if (authUnsubscribe) {
    authUnsubscribe();
  }
  favoritesStore.stopListeningToFavorites();
});
</script>

<template>
  <Header />
  <div>
    <RouterView></RouterView>
  </div>
  <Footer />
</template>

<style scoped>
.pt-100px {
  padding-top: 100px;
}
</style>
