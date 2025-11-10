<script setup lang="ts">
import { Header } from '@/components/layout/header';
import { RouterView } from 'vue-router';
import { useMovieStore } from './stores/movie.store';
import { Footer } from './components/layout/footer';
import { onMounted } from 'vue';

const searchStore = useMovieStore();
onMounted(() => {
  searchStore.getPopularMovies();
});
</script>

<template>
  <Header />
  <div class="my-0 mx-auto md:w-11 lg:w-9 pt-100px">
    <RouterView></RouterView>
  </div>
  <Footer />
</template>

<style scoped>
.pt-100px {
  padding-top: 100px;
}
</style>
