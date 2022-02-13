import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Manage from '@/views/Manage.vue';
import store from '@/store';
import Song from '@/views/Song.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/manage-music',
    meta: {
      requiredAuth: true,
    },
    alias: '/manage',
    name: 'manage',
    component: Manage,
  },
  {
    path: '/song/:id',
    name: 'song',
    component: Song,
  },

  // {
  //   path: '/manage',
  //   redirect: { name: 'manage' },
  // },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiredAuth)) {
    next();
    return;
  }
  if (store.state.auth.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});
export default router;
