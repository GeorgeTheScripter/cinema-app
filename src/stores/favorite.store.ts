import { arrayRemove, arrayUnion, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { db } from '@/service/firebase/config';
import type { Movie } from '@/service';

export const useFavoriteStore = defineStore('favorites', () => {
  const favorites = ref<Movie[]>([]);
  const isListening = ref<boolean>(false);
  const unsubscribe = ref<(() => void) | null>(null);

  const userUid = computed<string | null>(() => getAuth().currentUser?.uid || null);

  const isFavorite = computed(() => (movieId: number): boolean => {
    return favorites.value.some((movie) => movie.id === movieId);
  });

  const startListeningToFavorites = (uid: string) => {
    if (isListening.value) return;

    const userRef = doc(db, 'users', uid);

    unsubscribe.value = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        favorites.value = (userData.favorites || []) as Movie[];
      } else {
        favorites.value = [];
      }
    });
    isListening.value = true;
  };

  const stopListeningToFavorites = () => {
    if (unsubscribe.value) {
      unsubscribe.value();
      unsubscribe.value = null;
    }
    favorites.value = [];
    isListening.value = false;
  };

  const addFavorite = async (movieData: Movie) => {
    const uid = userUid.value;
    if (!uid) {
      console.error('Необходима авторизация.');
      return;
    }

    const userRef = doc(db, 'users', uid);

    try {
      await updateDoc(userRef, {
        favorites: arrayUnion(movieData),
      });
    } catch (e: any) {
      // Если документа нет, создаем его
      if (e.code === 'not-found') {
        await setDoc(userRef, { favorites: [movieData] });
      } else {
        console.error('Ошибка при добавлении в избранное:', e);
      }
    }
  };

  const toggleFavorite = (movieData: Movie) => {
    if (isFavorite.value(movieData.id)) {
      // Для удаления нам нужен объект, идентичный тому, что был добавлен
      removeFavorite(movieData);
    } else {
      addFavorite(movieData);
    }
  };

  const removeFavorite = async (movieData: Movie) => {
    const uid = userUid.value;
    if (!uid) return;

    const userRef = doc(db, 'users', uid);

    // arrayRemove ищет и удаляет элемент по полному совпадению объекта
    await updateDoc(userRef, {
      favorites: arrayRemove(movieData),
    });
  };

  return {
    favorites,
    isFavorite,
    startListeningToFavorites,
    stopListeningToFavorites,
    toggleFavorite,
    userUid,
  };
});
