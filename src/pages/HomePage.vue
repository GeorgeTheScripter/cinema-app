<script setup lang="ts">
import MovieSlider from '@/components/movie/MovieSlider.vue';
import Title from '@/components/ui/Title.vue';
</script>

<template>
  <div>
    <MovieSlider>
      <template #title>
        <Title :level="3" color="white">Популярные</Title>
      </template>
    </MovieSlider>
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
