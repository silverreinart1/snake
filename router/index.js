import { createRouter, createWebHistory } from 'vue-router';
import Login from '/src/components/Login.vue';
import SnakeGame from '/src/components/SnakeGame.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/game',
    name: 'SnakeGame',
    component: SnakeGame,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
