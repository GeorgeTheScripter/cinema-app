<template>
  <div>
    <PrimeInput
      type="text"
      v-model="searchInput"
      placeholder="Search movies..."
      @keyup.enter="search"
    />

    <Button @click="search" :disabled="searchStore.loading">{{
      searchStore.loading ? 'Поиск...' : 'Найти'
    }}</Button>

    <div v-if="searchStore.error" style="color: red">
      {{ searchStore.error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search.store';
import { ref } from 'vue';
import PrimeInput from '../ui/PrimeInput.vue';
import { Button } from 'primevue';

const searchStore = useSearchStore();
const searchInput = ref('');

const search = () => {
  searchStore.searchMovies(searchInput.value);
};
</script>
