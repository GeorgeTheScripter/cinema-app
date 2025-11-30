<template>
  <button
    class="bg-blue-500 hover:bg-blue-600 duration-500 px-3 py-1 rounded-lg cursor-pointer text-white flex items-center justify-center gap-2"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped></style>
