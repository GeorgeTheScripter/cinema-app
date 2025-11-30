<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import type { Video } from '@/service';
import { computed, ref, watch } from 'vue';

const { isOpen, trailers = [] } = defineProps<{
  isOpen: boolean;
  trailers?: Video[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleClose = () => {
  emit('close');
};

const activeVideo = ref<string | undefined>('');
const activeTitle = ref<string | undefined>('');

watch(
  () => trailers,
  (newTrailers) => {
    if (newTrailers.length > 0) {
      activeVideo.value = newTrailers[0]?.key;
      activeTitle.value = newTrailers[0]?.name;
    }
  },
  { immediate: true },
);

const videoUrl = computed(() => {
  const baseURL = 'https://www.youtube.com/embed/';
  const currentURL = baseURL + activeVideo.value;
  return currentURL;
});

const changeVideo = (video: Video) => {
  activeVideo.value = video.key;
  activeTitle.value = video.name;
};
</script>
<template>
  <div
    v-if="isOpen"
    class="px-3 fixed top-0 right-0 left-0 bottom-0 backdrop-blur-xl z-30 flex items-center justify-center"
    @click="handleClose"
  >
    <div
      @click.stop
      class="w-[960px] p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700 overflow-hidden rounded-2xl relative md:p-10"
    >
      <button
        @click="handleClose"
        class="text-white hover:text-red-200 duration-500 absolute text-xl cursor-pointer top-2 right-4"
      >
        &times;
      </button>
      <div class="w-full max-w-4xl mx-auto">
        <div class="relative w-full aspect-video rounded-xl overflow-hidden">
          <iframe
            class="absolute top-0 left-0 w-full h-full"
            :src="videoUrl"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div class="mt-4 w-fit">
        <h3 class="text-white text-2xl">{{ activeTitle }}</h3>
      </div>

      <div class="overflow-x-scroll hide-scrollbar">
        <div v-if="trailers.length > 1" class="flex gap-2 mt-6 w-max">
          <Button
            v-for="(trailer, index) in trailers"
            :key="trailer.id"
            :class="{
              'bg-blue-700': trailer.key === activeVideo,
            }"
            class="px-4 py-3"
            @click="changeVideo(trailer)"
          >
            Трейлер {{ index + 1 }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  width: 0;
}
</style>
