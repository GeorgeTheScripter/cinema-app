<script setup lang="ts">
import type { Movie } from '@/service';
import Rating from '../ui/Rating.vue';
import InfoBage from '../ui/InfoBage.vue';

const { movie } = defineProps<{
  movie: Movie;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 text-sm sm:text-base">
    <InfoBage title="Жанр">
      <template #descr>
        <span class="ml-2 font-bold" v-for="genre in movie.genres" :key="genre.id">{{
          genre.name
        }}</span>
      </template>
    </InfoBage>

    <InfoBage title="Год выпуска">
      <template #descr>
        <span class="ml-2 font-bold">{{ new Date(movie.release_date).getFullYear() }}</span>
      </template>
    </InfoBage>

    <InfoBage title="Рейтинг">
      <template #descr>
        <Rating :rating="movie.vote_average" />
      </template>
    </InfoBage>
  </div>
</template>
