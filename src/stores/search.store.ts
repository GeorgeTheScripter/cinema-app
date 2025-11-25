import { movieService, type Filters, type Genre, type Movie } from '@/service';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

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
  const allMovies = ref<Movie[]>(initializeMovies());

  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const query = ref<string>('');
  const filters = ref<Filters>({
    genre_ids: [],
    country: null,
    genre: null,
    year: null,
  });
  const genres = ref<Genre[]>([]);
  const countries = ref<Genre[]>([]);

  const currentPage = ref<number>(1);
  const totalPages = ref<number>(0);

  const searchingMovies = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await movieService.searchMovies(
        query.value,
        currentPage.value,
        filters.value,
      );
      allMovies.value = response.data.results;
      currentPage.value = response.data.page;
      totalPages.value = response.data.total_pages;
      saveMovies(allMovies.value);
    } catch (err: any) {
      error.value = err.message || 'Не удалось загрузить популярные фильмы';
      console.error('Popular movies error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const filteredMovies = computed(() => {
    const selectedGenres = filters.value.genre_ids;
    if (selectedGenres.length === 0) {
      return allMovies.value;
    }

    return allMovies.value.filter((movie: Movie) => {
      return selectedGenres.every((selectedId) => movie.genre_ids.includes(selectedId));
    });
  });

  const getGenres = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await movieService.getGenres();
      genres.value = response.data.genres;
    } catch (err: any) {
      error.value = err.message || 'Не удалось загрузить жанры';
      console.error('Genres error:', err);
    }
  };

  const getCountries = () => {};

  return {
    allMovies,
    filteredMovies,
    isLoading,
    error,
    filters,
    genres,
    countries,
    query,
    currentPage,
    totalPages,

    searchingMovies,
    getGenres,
    getCountries,
  };
});
