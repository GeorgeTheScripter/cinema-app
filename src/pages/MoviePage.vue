<script setup lang="ts">
import HeartButton from '@/components/ui/HeartButton.vue';
import Title from '@/components/ui/Title.vue';
import { getImageUrl } from '@/service';
import { useMovieStore } from '@/stores/movie.store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ActorSlider from '@/components/layout/slider/ui/ActorSlider.vue';
import Button from '@/components/ui/Button.vue';
import PlayIcon from '@/components/ui/PlayIcon.vue';
import { TrailerModal } from '@/components/layout/modal';

const movieStore = useMovieStore();

const route = useRoute();
const isOpen = ref<boolean>(false);

const movieId = Array.isArray(route.params.id)
  ? Number(route.params.id[0])
  : Number(route.params.id);

onMounted(() => {
  if (movieId && !isNaN(movieId)) {
    movieStore.getMovieById(movieId);
  } else {
    movieStore.error = 'Некорректный ID фильма.';
    movieStore.loading = false;
  }
});

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

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
          <div class="flex items-start mb-4 md:items-center sm:mb-6 gap-3">
            <HeartButton :movie="movieStore.currentMovie" />
            <h1 class="text-3xl sm:text-4xl font-bold">
              {{ movieStore.currentMovie.title }}
            </h1>
          </div>

          <p class="text-base sm:text-lg mb-4 sm:mb-6">
            {{ movieStore.currentMovie.overview }}
          </p>

          <div class="space-y-3 text-sm sm:text-base">
            <p>
              <strong class="text-gray-400">Жанр:</strong>
              <span
                class="ml-2 text-white font-bold"
                v-for="genre in movieStore.currentMovie.genres"
                :key="genre.id"
                >{{ genre.name }}</span
              >
            </p>
            <p>
              <strong class="text-gray-400">Год выпуска:</strong>
              <span class="ml-2 font-bold">{{
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

          <div v-if="movieStore.currentMovie.videos.results.length !== 0" class="mt-8 md:mt-20">
            <Button @click="openModal" class="py-4 px-8 w-full md:w-fit">
              <template #icon>
                <PlayIcon />
              </template>
              Смотреть
            </Button>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <Title :level="3" color="white">Актеры</Title>
        <ActorSlider :actors="movieStore.currentMovie.credits.cast" class="mt-3" />
      </div>
    </div>

    <div v-else class="text-white text-center text-xl">Фильм не найден.</div>

    <TrailerModal
      v-if="movieStore.currentMovie"
      @close="closeModal"
      :isOpen="isOpen"
      :trailers="movieStore.currentMovie.videos.results"
    />
  </div>
</template>

<style scoped>
.Favorite {
  color: red;
}

.notFavorite {
  color: grey;
}
</style>
