<script setup lang="ts">
const currentYear = new Date().getFullYear();
const developer = {
  name: 'GeorgeTheScripter',
  url: 'https://github.com/GeorgeTheScripter',
};
</script>

<template>
  <footer
    class="w-full mt-20 py-8 bg-gray-900 text-center text-gray-400 text-sm border-t border-gray-700"
  >
    <p class="mb-1">© {{ currentYear }} Cinematica. Все права защищены.</p>

    <p class="mt-1">
      Разработано
      <a
        :href="developer.url"
        target="_blank"
        class="text-blue-500 hover:text-blue-400 transition-colors font-medium"
        >{{ developer.name }}</a
      >
    </p>
  </footer>
</template>
