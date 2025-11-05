import { movieService, type Movie } from '@/service';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useMovieStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([]);
  const popularMovies = ref<Movie[]>([]);
  const upcomingMovies = ref<Movie[]>([]);

  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const currentPage = ref<number>(1);
  const totalPages = ref<number>(0);

  // GETTERS
  const hasMovies = computed(() => movies.value.length > 0);
  const movieCount = computed(() => movies.value.length);
  const popularMovieCount = computed(() => popularMovies.value.length);

  // ACTIONS
  const getPopularMovies = async (page: number = 1) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await movieService.getPopularMovies(page);
      popularMovies.value = response.data.results;
      currentPage.value = response.data.page;
      totalPages.value = response.data.total_pages;
    } catch (err: any) {
      error.value = err.message || 'Не удалось загрузить популярные фильмы';
      console.error('Popular movies error:', err);
    } finally {
      loading.value = false;
    }
  };

  const getUpcomingMovies = async (page: number = 1) => {
    loading.value = true;

    try {
      const response = await movieService.getUpcomingMovies(page);
      upcomingMovies.value = response.data.results;
    } catch (err: any) {
      error.value = err.message || 'Не удалось загрузить upcoming фильмы';
    } finally {
      loading.value = false;
    }
  };

  const getMovieById = async (id: number) => {
    loading.value = true;

    try {
      const response = await movieService.getMovieById(id);
      return response.data; // Возвращаем данные фильма
    } catch (err: any) {
      error.value = err.message || 'Не удалось загрузить информацию о фильме';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    movies,
    popularMovies,
    upcomingMovies,
    loading,
    error,
    currentPage,
    totalPages,

    // Getters
    hasMovies,
    movieCount,
    popularMovieCount,

    // Actions
    getPopularMovies,
    getUpcomingMovies,
    getMovieById,
    clearError,
  };
});
