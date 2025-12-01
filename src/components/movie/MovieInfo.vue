<script setup lang="ts">
import type { Movie } from '@/service';
import Rating from '../ui/Rating.vue';

const { movie } = defineProps<{
  movie: Movie;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 text-sm sm:text-base">
    <div class="flex">
      <div>
        <strong class="text-gray-400">Жанр:</strong>
      </div>
      <div class="flex flex-wrap">
        <span class="ml-2 text-white font-bold" v-for="genre in movie.genres" :key="genre.id">{{
          genre.name
        }}</span>
      </div>
    </div>

    <div class="flex">
      <div><strong class="text-gray-400">Год выпуска:</strong></div>
      <span class="ml-2 font-bold">{{ new Date(movie.release_date).getFullYear() }}</span>
    </div>

    <div class="flex items-center gap-2">
      <strong class="text-gray-400">Рейтинг:</strong>
      <Rating :rating="movie.vote_average" />
    </div>
  </div>
</template>
