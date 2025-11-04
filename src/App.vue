<script setup lang="ts">
import { Header } from '@/components/layout/header';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useSearchStore } from './stores/search.store';

const searchStore = useSearchStore();
onMounted(() => {
  searchStore.getPopularMovies();
});
</script>

<template>
  <Header />
  <div class="my-0 mx-auto md:w-11 lg:w-9 pt-100px">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.pt-100px {
  padding-top: 100px;
}
</style>
