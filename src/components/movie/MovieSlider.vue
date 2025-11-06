<script setup lang="ts">
import type { Movie } from '@/service';
import { Slider } from '../layout/slider';

const { movies } = defineProps<{
  movies: Movie[];
}>();
</script>

<template>
  <div class="flex flex-column gap-2">
    <slot name="title"></slot>
    <Slider :movies="movies" />
  </div>
</template>

<style scoped></style>
