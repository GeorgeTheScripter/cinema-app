import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const searchedMovies = ref<[]>([]);

  return {
    searchedMovies,
  };
});
