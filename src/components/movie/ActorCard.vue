<script setup lang="ts">
import { getImageUrl, type Actor } from '@/service';
import { handleImageError } from '@/service/helpers/handleImageError';

const { actor } = defineProps<{
  actor: Actor;
}>();
</script>

<template>
  <div
    class="group relative w-full h-fit rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-800"
  >
    <div class="w-full h-72 lg:h-96 overflow-hidden">
      <img
        :src="getImageUrl(actor.profile_path)"
        :alt="actor.name || 'Movie poster'"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        @error="handleImageError"
      />
    </div>

    <div class="px-4 py-2">
      <p class="text-l font-medium">{{ actor.name }}</p>
      <p class="text-md text-blue-300">{{ actor.character }}</p>
    </div>
  </div>
</template>
