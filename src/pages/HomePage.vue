<script setup lang="ts">
import MovieCollections from '@/components/movie/MovieCollections.vue';
</script>

<template>
  <div>
    <MovieCollections />
  </div>
</template>

<style scoped>
.cards {
  margin-top: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px;
}
</style>
