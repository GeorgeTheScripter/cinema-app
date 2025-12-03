import { movieService, type Actor } from '@/service';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePersonStore = defineStore('person', () => {
  const person = ref<Actor>();
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const getPersonById = async (personId: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await movieService.getPersonById(personId);
      person.value = response.data;
    } catch (err: any) {
      error.value = err.message || 'Не удалось загрузить актёра';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    person,
    isLoading,
    error,
    getPersonById,
  };
});
