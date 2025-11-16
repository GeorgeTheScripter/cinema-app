<template>
  <button
    @click.stop.prevent="handleToggleFavorite"
    class="rounded-full transition-colors duration-200"
    :class="{
      'text-red-500': isMovieFavorite,
      'text-gray-400': !isMovieFavorite,
    }"
    :title="isMovieFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :fill="isMovieFavorite ? 'currentColor' : 'none'"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      class="w-8 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.098 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import type { Movie } from '@/service';
import { useFavoriteStore } from '@/stores/favorite.store';
import { computed } from 'vue';

const { movie } = defineProps<{
  movie: Movie;
}>();

const favoritesStore = useFavoriteStore();

const isMovieFavorite = computed(() => {
  return favoritesStore.isFavorite(movie.id);
});

const favoriteData = computed(() => {
  return {
    movieId: movie.id,
    title: movie.title,
    posterUrl: movie.poster_path,
  };
});

const handleToggleFavorite = () => {
  favoritesStore.toggleFavorite(favoriteData.value);
};
</script>

<style scoped></style>
