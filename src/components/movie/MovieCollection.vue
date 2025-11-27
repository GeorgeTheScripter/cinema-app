<script setup lang="ts">
import type { Movie } from '@/service';
import { MovieSlider } from '@/components/layout/slider';

const { movies } = defineProps<{
  movies: Movie[];
}>();
</script>

<template>
  <div class="">
    <slot name="title"></slot>
    <MovieSlider :movies="movies" />
  </div>
</template>

<style scoped></style>
