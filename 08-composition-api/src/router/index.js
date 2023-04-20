import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/counter',
      name: 'counter',
      component: () => import('../views/CounterView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/pokemon-search',
      name: 'pokemon-search',
      component: () => import('../views/SearchPokemon.vue'),
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon-id',
      component: () => import('../views/Pokemon.vue'),
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoVuex.vue'),
    },
    {
      path: '/slots',
      name: 'slots',
      component: () => import('../views/CustomSlots.vue'),
    },
  ],
});

export default router;
