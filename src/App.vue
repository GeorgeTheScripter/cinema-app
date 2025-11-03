<script setup lang="ts">
import PrimeHeader from '@/components/layout/PrimeHeader.vue';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useSearchStore } from './stores/search.store';

const searchStore = useSearchStore();
onMounted(() => {
  searchStore.getPopularMovies();
});
</script>

<template>
  <PrimeHeader />
  <div class="my-0 mx-auto md:w-11 lg:w-9 pt-100px">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.pt-100px {
  padding-top: 100px;
}
</style>
