<script setup lang="ts">
import { useSearchStore } from '@/stores/search.store';
import { computed } from 'vue';
import Button from '@/components/ui/Button.vue';

const { maxVisiblePages } = defineProps<{
  maxVisiblePages: number;
}>();

const searchStore = useSearchStore();

const visiblePageNumbers = computed(() => {
  let startPage = Math.max(1, searchStore.currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(searchStore.totalPages, startPage + maxVisiblePages - 1);

  if (endPage === searchStore.totalPages && endPage - startPage + 1 < maxVisiblePages) {
    const newStart = endPage - maxVisiblePages + 1;
    startPage = Math.max(1, newStart);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const cangePage = (page: number) => {
  searchStore.currentPage = page;
  searchStore.searchingMovies();
};

const handlePrev = () => {
  if (searchStore.currentPage > 1) {
    searchStore.currentPage--;
    searchStore.searchingMovies();
  }
};

const handleNext = () => {
  if (searchStore.currentPage < searchStore.totalPages) {
    searchStore.currentPage++;
    searchStore.searchingMovies();
  }
};
</script>
<template>
  <div class="w-full">
    <div class="flex gap-1 w-fit m-auto mt-16">
      <Button class="text-white" @click="handlePrev"><</Button>
      <div
        class="flex items-center justify-center w-14 h-14 cursor-pointer rounded hover:bg-blue-300"
        :class="{
          'bg-blue-500 text-white': page === searchStore.currentPage,
          'bg-white text-black': page !== searchStore.currentPage,
        }"
        v-for="page in visiblePageNumbers"
        :key="page"
        @click="cangePage(page)"
      >
        {{ page }}
      </div>
      <Button class="text-white" @click="handleNext">></Button>
    </div>
  </div>
</template>

<style scoped></style>
