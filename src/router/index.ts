import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth/cordova';

const router = createRouter({
  linkActiveClass: 'text-blue-200',
  linkExactActiveClass: 'text-blue-400',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject,
    );
  });
};

router.beforeEach(async (to) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = await getCurrentUser();

    if (user) {
      return true;
    } else {
      return '/login';
    }
  }
  return true;
});

export default router;
