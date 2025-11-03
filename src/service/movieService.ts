import { tmdbClient } from './client';

export const movieService = {
  searchMovies(query: string) {
    return tmdbClient.get('/search/movie', {
      params: { query },
    });
  },

  getPopularMovies() {
    return tmdbClient.get('/movie/upcoming');
  },

  getMovieById(id: number) {
    return tmdbClient.get(`/movie/${id}`);
  },
};
