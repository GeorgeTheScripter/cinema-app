import { movieService } from '@/service/movieService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const useSearchStore = defineStore('search', () => {
  const movies = ref<Movie[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string>('');
  const popular = ref<Movie[]>([]);

  const searchMovies = async (query: string) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await movieService.searchMovies(query);
      movies.value = response.data.results;
    } catch (err) {
      console.error(err);
      error.value = 'Ошибка поиска';
    } finally {
      loading.value = false;
    }
  };

  const getPopularMovies = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await movieService.getPopularMovies();
      popular.value = response.data.results;
    } catch (err) {
      console.error(err);
      error.value = 'Ошибка поиска';
    } finally {
      loading.value = false;
    }
  };

  return {
    movies,
    popular,
    loading,
    error,
    searchMovies,
    getPopularMovies,
  };
});
