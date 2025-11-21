import { tmdbClient } from './client';

import type { Filters, Genre, MoviesResponse, Period } from '..';

export const movieService = {
  // Поиск
  searchMovies(query: string, page: number = 1, filters?: Filters) {
    return tmdbClient.get<MoviesResponse>('/search/movie', {
      params: { query, page, filters },
    });
  },

  // Популярные и trending фильмы
  getPopularMovies(page: number = 1) {
    return tmdbClient.get<MoviesResponse>('/movie/popular', {
      params: { page },
    });
  },

  getUpcomingMovies(page: number = 1) {
    return tmdbClient.get<MoviesResponse>('/movie/upcoming', {
      params: { page },
    });
  },

  getNowPlayingMovies(page: number = 1) {
    return tmdbClient.get<MoviesResponse>('/movie/now_playing', {
      params: { page },
    });
  },

  getTopRatedMovies(page: number = 1) {
    return tmdbClient.get<MoviesResponse>('/movie/top_rated', {
      params: { page },
    });
  },

  // Trending (популярные за период)
  getTrendingMovies(timeWindow: Period = 'week') {
    return tmdbClient.get<MoviesResponse>(`/trending/movie/${timeWindow}`);
  },

  // Genres
  getGenres() {
    return tmdbClient.get<{ genres: Genre[] }>('/genre/movie/list');
  },

  getMoviesByGenre(genreId: number, page: number = 1) {
    return tmdbClient.get<MoviesResponse>('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      },
    });
  },

  // Фильмы по нескольким жанрам
  getMoviesByMultipleGenres(genreIds: number[], page: number = 1) {
    return tmdbClient.get<MoviesResponse>('/discover/movie', {
      params: {
        with_genres: genreIds.join(','),
        page,
        sort_by: 'popularity.desc',
      },
    });
  },

  // Детальная информация о фильме
  getMovieById(id: number) {
    return tmdbClient.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,videos,similar,recommendations',
      },
    });
  },

  // Похожие фильмы
  getSimilarMovies(movieId: number, page: number = 1) {
    return tmdbClient.get<MoviesResponse>(`/movie/${movieId}/similar`, {
      params: { page },
    });
  },

  // Рекомендации
  getRecommendedMovies(movieId: number, page: number = 1) {
    return tmdbClient.get<MoviesResponse>(`/movie/${movieId}/recommendations`, {
      params: { page },
    });
  },

  // Фильмы по году
  getMoviesByYear(year: number, page: number = 1) {
    return tmdbClient.get<MoviesResponse>('/discover/movie', {
      params: {
        primary_release_year: year,
        page,
        sort_by: 'popularity.desc',
      },
    });
  },

  // Фильмы по рейтингу
  getMoviesByRating(minRating: number = 7, page: number = 1) {
    return tmdbClient.get<MoviesResponse>('/discover/movie', {
      params: {
        'vote_average.gte': minRating,
        page,
        sort_by: 'vote_average.desc',
      },
    });
  },
};
