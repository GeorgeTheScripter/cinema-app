import { movieService, type Movie } from '@/service';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const MOVIES_LS_KEY = 'search_movies';

const initializeMovies = (): Movie[] => {
  try {
    const storedMovies = localStorage.getItem(MOVIES_LS_KEY);
    if (storedMovies) {
      return JSON.parse(storedMovies) as Movie[];
    }
  } catch (e) {
    console.error('Ошибка при чтении movies из localStorage:', e);
    // Если парсинг не удался, возвращаем пустой массив
    localStorage.removeItem(MOVIES_LS_KEY);
  }
  return [];
};

const saveMovies = (movies: Movie[]) => {
  try {
    localStorage.setItem(MOVIES_LS_KEY, JSON.stringify(movies));
  } catch (e) {
    console.error('Ошибка при записи movies в localStorage:', e);
  }
};

export const useSearchStore = defineStore('search', () => {
  const movies = ref<Movie[]>(initializeMovies());
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const currentPage = ref<number>(1);
  const totalPages = ref<number>(0);

  const searchingMovies = async (query: string, page: number = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await movieService.searchMovies(query, page);
      movies.value = response.data.results;
      currentPage.value = response.data.page;
      totalPages.value = response.data.total_pages;
      saveMovies(movies.value);
    } catch (err: any) {
      error.value = err.message || 'Не удалось загрузить популярные фильмы';
      console.error('Popular movies error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    movies,
    isLoading,
    error,

    searchingMovies,
  };
});
