<script setup lang="ts">
const currentYear = new Date().getFullYear();
const developer = {
  name: 'GeorgeTheScripter',
  url: 'https://github.com/GeorgeTheScripter',
};
</script>

<template>
  <footer class="flex flex-column gap-2 align-items-center py-4 mt-8 p-menubar">
    <p>© {{ currentYear }} Cinematica. Все права защищены.</p>

    <p>
      Разработано
      <a :href="developer.url" target="_blank" class="text-primary">{{ developer.name }}</a>
    </p>
  </footer>
</template>
