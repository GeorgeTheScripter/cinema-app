<script setup lang="ts">
import { useSearchStore } from '@/stores/search.store';
import { getImageUrl } from '@/service/posterUtils';
import { Card } from 'primevue';

const searchStore = useSearchStore();
</script>

<template>
  <div class="cards">
    <Card v-for="movie in searchStore.popular" :key="movie.id" style="overflow: hidden">
      <template #header>
        <img alt="user header" :src="getImageUrl(movie.poster_path)" class="w-full" />
      </template>
      <template #title>{{ movie.title }}</template>
    </Card>
  </div>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}
</style>
