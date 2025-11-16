<script setup lang="ts">
import MovieCard from '@/components/movie/MovieCard.vue';
import type { Favorite, Movie } from '@/service';

import { useFavoriteStore } from '@/stores/favorite.store';

const favoritesStore = useFavoriteStore();

const mapFavoriteToMovie = (favorite: Favorite): Movie => {
  const baseMovie: Movie = {
    id: favorite.movieId,
    title: favorite.title,
    poster_path: favorite.posterUrl,
    vote_average: 0,
    overview: 'Доступно только название и постер, полные данные не сохранены.',
    release_date: '',
    backdrop_path: favorite.posterUrl,
    genre_ids: [],
  };

  return baseMovie;
};
</script>

<template>
  <div
    class="pt-[100px] max-w-7xl mx-auto grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <MovieCard
      v-for="movie in favoritesStore.favorites"
      :key="movie.movieId"
      :movie="mapFavoriteToMovie(movie)"
    />
  </div>
</template>

<style scoped></style>
