<script setup lang="ts">
import { GenreMultiSelect } from '@/components/layout/select';
import MovieCard from '@/components/movie/MovieCard.vue';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/SearchInput.vue';
import { useSearchStore } from '@/stores/search.store';
import { RouterLink } from 'vue-router';

const searchStore = useSearchStore();

const handleSearch = () => {
  searchStore.searchingMovies();
};
</script>

<template>
  <div class="pt-[120px] max-w-7xl mx-auto flex gap-2">
    <aside class="flex flex-col gap-2">
      <Input v-model="searchStore.query" placeholder="Поиск..." />
      <GenreMultiSelect :options="searchStore.genres" v-model="searchStore.filters.genre_ids" />
      <Button @click="handleSearch">Найти</Button>
    </aside>

    <div>
      <div class="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        <RouterLink
          v-for="movie in searchStore.filteredMovies"
          :key="movie.id"
          :to="{ name: 'movie', params: { id: movie.id } }"
        >
          <MovieCard :movie="movie" />
        </RouterLink>
      </div>

      <div>pagination</div>
    </div>
  </div>
</template>

<style scoped></style>
