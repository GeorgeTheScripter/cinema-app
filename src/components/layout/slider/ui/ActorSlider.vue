<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue';
import type { Actor } from '@/service';
import { RouterLink } from 'vue-router';
import ActorCard from '@/components/movie/ActorCard.vue';

const { actors } = defineProps<{
  actors: Actor[];
}>();

const swiperInstance = ref<any>(null);

const breakpoints = {
  // mobile first
  320: {
    slidesPerView: 2,
    spaceBetween: 8,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 8,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 12,
  },
  1024: {
    slidesPerView: 4,
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
      <swiper-slide v-for="actor in actors" :key="actor.id">
        <RouterLink :to="{ name: 'actor', params: { id: actor.id } }">
          <ActorCard :actor="actor" />
        </RouterLink>
      </swiper-slide>
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
