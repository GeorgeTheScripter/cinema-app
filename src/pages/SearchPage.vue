<script setup lang="ts">
import { useBreakpoint } from '@/comopsables/useBreakpoint';
import { Pagination } from '@/components/layout/pagination';
import MovieCard from '@/components/movie/MovieCard.vue';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import { useSearchStore } from '@/stores/search.store';
import { computed, onMounted } from 'vue';
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

const { isMobile } = useBreakpoint();

const maxVisiblePages = computed(() => {
  return isMobile.value ? 5 : 10;
});
</script>

<template>
  <div class="pt-[120px] max-w-7xl mx-auto flex flex-col lg:flex-row lg:gap-8 px-4 sm:px-6 lg:px-8">
    <aside
      class="flex flex-col lg:flex-col sm:flex-row gap-2 w-full h-fit lg:sticky lg:top-[120px] static"
    >
      <SearchInput v-model="searchStore.query" placeholder="Поиск..." class="w-full" />

      <Input type="number" v-model="searchStore.filters.year" placeholder="Введите год" />

      <Button @click="handleSearch" class="px-10 py-3 sm:py-auto">Найти</Button>
    </aside>

    <div class="mt-10 lg:mt-0">
      <div class="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 w-full">
        <RouterLink
          v-for="movie in searchStore.filteredMovies"
          :key="movie.id"
          :to="{ name: 'movie', params: { id: movie.id } }"
        >
          <MovieCard :movie="movie" />
        </RouterLink>
      </div>

      <Pagination v-if="searchStore.totalPages > 1" :maxVisiblePages="maxVisiblePages" />
    </div>
  </div>
</template>

<style scoped></style>
