<template>
  <div class="pt-[120px] px-4 sm:px-6 lg:px-8">
    <div v-if="movieStore.loading" class="text-white text-center text-xl">Загрузка...</div>
    <div v-else-if="movieStore.error" class="text-red-500 text-center text-xl">
      {{ movieStore.error }}
    </div>

    <div v-else-if="movieStore.currentMovie" class="max-w-7xl mx-auto text-white">
      <div class="flex flex-col md:flex-row gap-6 md:gap-10">
        <img
          :src="getImageUrl(movieStore.currentMovie.poster_path)"
          :alt="movieStore.currentMovie.title"
          class="w-full h-auto max-h-[500px] md:w-1/3 md:max-h-full rounded-xl object-cover shadow-xl"
        />

        <div class="flex flex-col pt-2 md:pt-0">
          <h1 class="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            {{ movieStore.currentMovie.title }}
          </h1>
          <p class="text-base sm:text-lg mb-4 sm:mb-6">
            {{ movieStore.currentMovie.overview }}
          </p>

          <div class="space-y-3 text-sm sm:text-base">
            <p>
              <strong class="text-gray-400">Год выпуска:</strong>
              <span class="ml-2">{{
                new Date(movieStore.currentMovie.release_date).getFullYear()
              }}</span>
            </p>
            <p>
              <strong class="text-gray-400">Рейтинг:</strong>
              <span class="ml-2 text-yellow-400 font-bold">{{
                movieStore.currentMovie.vote_average.toFixed(1)
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-white text-center text-xl">Фильм не найден.</div>
  </div>
</template>

<script setup lang="ts">
import { getImageUrl } from '@/service';
import { useMovieStore } from '@/stores/movie.store';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const movieStore = useMovieStore();
const route = useRoute();

const movieId = Array.isArray(route.params.id)
  ? Number(route.params.id[0])
  : Number(route.params.id);

onMounted(() => {
  if (movieId && !isNaN(movieId)) {
    movieStore.getMovieById(movieId);
  } else {
    // Здесь можно установить ошибку, если ID некорректен
    movieStore.error = 'Некорректный ID фильма.';
    movieStore.loading = false;
  }
});
</script>

<style scoped></style>
