<script setup lang="ts">
import type { Genre } from '@/service';
import { useSearchStore } from '@/stores/search.store';
import { ref } from 'vue';

const props = defineProps<{
  options: Genre[];
  modelValue: number[];
}>();

const searchStore = useSearchStore();

const isOpen = ref<boolean>(false);

const emit = defineEmits<{ (e: 'update:modelValue', value: number[]): void }>();

const toggleOption = (id: number) => {
  const newSelectedId = [...props.modelValue];
  searchStore.searchingMovies();

  if (newSelectedId.includes(id)) {
    const idx = newSelectedId.indexOf(id);
    newSelectedId.splice(idx, 1);
  } else {
    newSelectedId.push(id);
  }

  emit('update:modelValue', newSelectedId);
};
</script>

<template>
  <div class="relative">
    <div
      @click="isOpen = !isOpen"
      class="w-[200px] border p-2 cursor-pointer bg-white rounded select-none"
    >
      {{ props.modelValue.length < 1 ? 'Выберите жанры' : `Выбрано: ${props.modelValue.length}` }}
      <span class="float-right">{{ isOpen ? '▲' : '▼' }}</span>
    </div>
    <div
      v-if="isOpen"
      class="w-[200px] absolute top-12 left-0 max-h-60 overflow-y-auto shadow-lg z-10 flex flex-col gap-1 rounded-xl scrollfree"
    >
      <div
        v-for="genre in props.options"
        :key="genre.id"
        @click="toggleOption(genre.id)"
        class="p-2 cursor-pointer bg-white hover:bg-gray-100 flex justify-between items-center rounded-xl"
        :class="{ 'bg-blue-50 text-blue-600': props.modelValue.includes(genre.id) }"
      >
        {{ genre.name }}
        <span v-if="props.modelValue.includes(genre.id)">✔</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollfree::-webkit-scrollbar {
  width: 0;
}
</style>
