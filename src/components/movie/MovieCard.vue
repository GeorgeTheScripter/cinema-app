<script setup lang="ts">
import { getImageUrl, type Movie } from '@/service';
import Rating from '../ui/Rating.vue';

const { movie } = defineProps<{
  movie: Movie;
}>();

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/placeholder-movie.jpg';
};
</script>

<template>
  <div
    class="movie-card surface-0 border-round-lg shadow-2 hover:shadow-4 transition-all transition-duration-300 cursor-pointer"
  >
    <div class="poster-container relative overflow-hidden border-round-top">
      <img
        :src="getImageUrl(movie.poster_path)"
        :alt="movie.title || 'Movie poster'"
        class="poster-image w-full h-auto border-round-top"
        @error="handleImageError"
      />

      <div class="rating-overlay absolute top-0 right-0 m-2 z-2">
        <Rating :rating="movie.vote_average" />
      </div>

      <div
        class="image-overlay absolute w-full h-full top-0 left-0 bg-black-alpha-40 opacity-0 hover:opacity-100 transition-all transition-duration-300"
      >
        <div class="flex align-items-center justify-content-center h-full">
          <i class="pi pi-eye text-white text-2xl"></i>
        </div>
      </div>
    </div>

    <div class="movie-info p-3">
      <h3 class="movie-title text-lg font-semibold mb-2 line-clamp-2">
        {{ movie.title }}
      </h3>

      <div class="movie-meta flex justify-content-between align-items-center text-sm text-500">
        <span class="release-year">
          {{ new Date(movie.release_date).getFullYear() }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: column;
}

.poster-container {
  position: relative;
  aspect-ratio: 2/3;
  background: var(--surface-100);
}

.poster-image {
  height: 100%;
  object-fit: cover;
}

.rating-overlay {
  z-index: 10;
}

.image-overlay {
  z-index: 5;
  transition: opacity 0.3s ease;
}

.movie-title {
  min-height: 3rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .movie-card {
    max-width: 200px;
    min-height: 350px;
  }

  .movie-info {
    padding: 1rem;
  }
}

.movie-card:hover {
  transform: translateY(-8px);
}

.movie-card:hover .poster-image {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
