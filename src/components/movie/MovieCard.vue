<script setup lang="ts">
import { getImageUrl, type Movie } from '@/service';
import defaultImage from '@/assets/images/not-found-img.jpg';
import Rating from '../ui/Rating.vue';

const { movie } = defineProps<{
  movie: Movie;
}>();

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = defaultImage;
};
</script>

<template>
  <div
    class="group relative w-full h-fit rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-800"
  >
    <div class="relative w-full h-72 lg:h-96">
      <img
        :src="getImageUrl(movie.poster_path)"
        :alt="movie.title || 'Movie poster'"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        @error="handleImageError"
      />

      <div
        class="absolute top-2 right-2 bg-opacity-70 rounded-full p-1 flex items-center justify-center"
      >
        <Rating :rating="movie.vote_average" class="text-sm" />
      </div>

      <div
        class="absolute bottom-0 left-0 right-0 h-fit opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-end p-4 bg-linear-to-t from-black to-transparent"
      >
        <div class="text-white text-sm">
          <h3 class="font-semibold text-lg mb-1 leading-6">{{ movie.title }}</h3>
          <p class="text-gray-300 text-xs line-clamp-3">
            {{ movie.overview || 'Описание отсутствует.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
