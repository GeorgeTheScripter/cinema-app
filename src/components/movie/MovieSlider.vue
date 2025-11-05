<script setup lang="ts">
import { useMovieStore } from '@/stores/movie.store';
import { Slider } from '../layout/slider';

const movieStore = useMovieStore();
</script>

<template>
  <div class="flex flex-column gap-2">
    <slot name="title"></slot>
    <Slider :movies="movieStore.popularMovies" />
  </div>
</template>

<style scoped></style>
