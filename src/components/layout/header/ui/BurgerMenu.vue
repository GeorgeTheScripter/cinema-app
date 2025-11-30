<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import LinkItems from './LinkItems.vue';

const { isLoggedIn } = defineProps<{ isLoggedIn: boolean }>();
</script>

<template>
  <nav
    class="absolute top-24 left-4 right-4 text-white flex flex-col gap-5 items-center justify-center rounded-2xl bg-gray-900/80 border border-gray-700 p-6 backdrop-blur-sm"
  >
    <div class="flex flex-col items-center justify-center">
      <LinkItems />
    </div>

    <div class="w-full">
      <Button @click="$emit('signIn')" v-if="!isLoggedIn" class="bg-blue-400 w-full py-3"
        >Вход</Button
      >
      <Button @click="$emit('signOut')" v-if="isLoggedIn" class="bg-red-400 w-full py-3"
        >Выход</Button
      >
    </div>
  </nav>
</template>
