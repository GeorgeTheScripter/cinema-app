import { useMovieStore } from '@/stores/movie.store';

export const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue'),
  },

  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    beforeEnter: () => {
      const movieStore = useMovieStore();
      movieStore.getPopularMovies(1);
      movieStore.getUpcomingMovies(1);
      movieStore.getTrendingByWeek();
    },
  },

  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('@/pages/FavoritesPage.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/search',
    name: 'search',
    component: () => import('@/pages/SearchPage.vue'),
  },

  {
    path: '/movie/:id',
    name: 'movie',
    component: () => import('@/pages/MoviePage.vue'),
  },

  {
    path: '/actor/:id',
    name: 'actor',
    component: () => import('@/pages/ActorPage.vue'),
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/RegisterPage.vue'),
  },
];
