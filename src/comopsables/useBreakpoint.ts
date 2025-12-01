import { onBeforeUnmount, onMounted, ref } from 'vue';

export const useBreakpoint = () => {
  const isMobile = ref<boolean>(false);

  const checkBreakpoint = () => {
    isMobile.value = window.innerWidth < 768;
  };

  onMounted(() => {
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkBreakpoint);
  });

  return {
    isMobile,
  };
};
