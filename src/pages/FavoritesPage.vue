<script setup lang="ts">
import MovieCard from '@/components/movie/MovieCard.vue';

import { useFavoriteStore } from '@/stores/favorite.store';

const favoritesStore = useFavoriteStore();
</script>

<template>
  <div
    class="pt-[100px] max-w-7xl mx-auto grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <RouterLink
      v-for="movie in favoritesStore.favorites"
      :key="movie.id"
      :to="{ name: 'movie', params: { id: movie.id } }"
    >
      <MovieCard :movie="movie" />
    </RouterLink>
  </div>
</template>

<style scoped></style>
