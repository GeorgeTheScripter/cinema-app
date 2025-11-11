<script setup lang="ts">
import { useMovieStore } from '@/stores/movie.store';
import MovieSlider from './MovieSlider.vue';
import Title from '../ui/Title.vue';
import { computed } from 'vue';

const movieStore = useMovieStore();

const collection = computed(() => {
  return [
    {
      id: '1',
      title: 'Популярные',
      movies: movieStore.popularMovies,
    },
    {
      id: '2',
      title: 'Скоро в кино',
      movies: movieStore.upcomingMovies,
    },
    {
      id: '3',
      title: 'Новинки за неделю',
      movies: movieStore.trandingMovies,
    },
  ];
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <MovieSlider v-for="movies in collection" :key="movies.id" :movies="movies.movies">
      <template #title>
        <Title :level="3" color="white">{{ movies.title }}</Title>
      </template>
    </MovieSlider>
  </div>
</template>
