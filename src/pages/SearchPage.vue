<script setup lang="ts">
import { Pagination } from '@/components/layout/pagination';
// import { GenreMultiSelect } from '@/components/layout/select';
import MovieCard from '@/components/movie/MovieCard.vue';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import { useSearchStore } from '@/stores/search.store';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const searchStore = useSearchStore();

const clearData = () => {
  searchStore.currentPage = 1;
  searchStore.filters.year = null;
  searchStore.query = '';
  searchStore.searchingMovies();
};

onMounted(() => {
  clearData();
});

const handleSearch = () => {
  searchStore.currentPage = 1;
  searchStore.searchingMovies();
};
</script>

<template>
  <div class="pt-[120px] max-w-7xl mx-auto flex gap-2">
    <aside class="flex flex-col gap-2 w-[300px]">
      <SearchInput v-model="searchStore.query" placeholder="Поиск..." />

      <Input type="number" v-model="searchStore.filters.year" placeholder="Введите год" />

      <Button @click="handleSearch">Найти</Button>
    </aside>

    <div>
      <div class="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 w-full">
        <RouterLink
          v-for="movie in searchStore.filteredMovies"
          :key="movie.id"
          :to="{ name: 'movie', params: { id: movie.id } }"
        >
          <MovieCard :movie="movie" />
        </RouterLink>
      </div>

      <Pagination v-if="searchStore.totalPages > 1" :maxVisiblePages="10" />
    </div>
  </div>
</template>

<style scoped></style>
