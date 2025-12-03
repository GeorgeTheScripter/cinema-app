<script setup lang="ts">
import InfoBage from '@/components/ui/InfoBage.vue';
import { getImageUrl } from '@/service';
import { usePersonStore } from '@/stores/person.store';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const personStore = usePersonStore();

const personId = Array.isArray(route.params.id)
  ? Number(route.params.id[0])
  : Number(route.params.id);

onMounted(() => {
  if (personId && !isNaN(personId)) {
    personStore.getPersonById(personId);
  } else {
    personStore.error = 'Некорректный ID фильма.';
    personStore.isLoading = false;
  }
});
</script>

<template>
  <div class="pt-[120px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <MoviePageSkeleton v-if="personStore.isLoading" class="text-white text-center text-xl" />

    <div v-else-if="personStore.error" class="text-red-500 text-center text-xl">
      {{ personStore.error }}
    </div>

    <div v-else-if="personStore.person" class="max-w-7xl mx-auto text-white">
      <div class="flex flex-col md:flex-row gap-6 md:gap-10">
        <img
          :src="getImageUrl(personStore.person.profile_path)"
          :alt="personStore.person.name"
          class="w-full h-auto max-h-[500px] md:w-1/3 md:max-h-full rounded-xl object-cover"
        />

        <div class="flex flex-col pt-2 md:pt-0">
          <div class="flex items-start mb-4 md:items-center sm:mb-6 gap-3">
            <h1 class="text-3xl sm:text-4xl font-bold">
              {{ personStore.person.name }}
            </h1>
          </div>

          <p class="text-base sm:text-lg mb-4 sm:mb-6">
            {{ personStore.person.biography }}
          </p>

          <InfoBage title="Место рождния">
            <template #descr>
              <span class="ml-2 font-bold">{{ personStore.person.place_of_birth }}</span>
            </template>
          </InfoBage>
        </div>
      </div>

      <div></div>
    </div>
  </div>
</template>
