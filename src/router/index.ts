import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth/cordova';

const router = createRouter({
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

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      router.push('/login');
    }
  } else {
    next();
  }
});

export default router;
