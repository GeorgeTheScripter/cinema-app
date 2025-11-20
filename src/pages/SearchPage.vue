<script setup lang="ts">
import MovieCard from '@/components/movie/MovieCard.vue';
import Input from '@/components/ui/SearchInput.vue';
import { useSearchStore } from '@/stores/search.store';
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

const query = ref<string>('');
const searchStore = useSearchStore();

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

watch(query, (newQuery) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(() => {
    if (newQuery.length > 3) {
      searchStore.searchingMovies(newQuery);
    }
  }, 500);
});
</script>

<template>
  <div class="pt-[120px] max-w-7xl mx-auto">
    <Input v-model="query" placeholder="Поиск..." />

    <div>filters</div>

    <div class="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <RouterLink
        v-for="movie in searchStore.movies"
        :key="movie.id"
        :to="{ name: 'movie', params: { id: movie.id } }"
      >
        <MovieCard :movie="movie" />
      </RouterLink>
    </div>

    <div>pagination</div>
  </div>
</template>

<style scoped></style>
