<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue';
import MovieCard from '@/components/movie/MovieCard.vue';
import type { Movie } from '@/service';
import { RouterLink } from 'vue-router';
import { useMovieStore } from '@/stores/movie.store';
import { MovieCardSkeleton } from '../../skeleton';

const { movies } = defineProps<{
  movies: Movie[];
}>();

const movieStore = useMovieStore();

const swiperInstance = ref<any>(null);

const breakpoints = {
  // mobile first
  320: {
    slidesPerView: 2,
    spaceBetween: 8,
  },
  640: {
    slidesPerView: 3,
    spaceBetween: 8,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 12,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 12,
  },
  1440: {
    slidesPerView: 5,
    spaceBetween: 12,
  },
};

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper;
};

const onSlideChange = () => {};
</script>

<template>
  <div class="movies-slider">
    <swiper
      :slides-per-view="4"
      :space-between="12"
      :breakpoints="breakpoints"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <template v-if="movieStore.loading">
        <swiper-slide v-for="movie in 10" :key="movie">
          <MovieCardSkeleton class="w-full" />
        </swiper-slide>
      </template>

      <template v-else>
        <swiper-slide v-for="movie in movies" :key="movie.id">
          <RouterLink :to="{ name: 'movie', params: { id: movie.id } }">
            <MovieCard :movie="movie" />
          </RouterLink>
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<style scoped>
.movies-slider {
  padding: 1rem 0;
}

:deep(.swiper-slide) {
  height: auto;
  display: flex;
  justify-content: center;
}

:deep(.swiper-wrapper) {
  align-items: stretch;
}
</style>
