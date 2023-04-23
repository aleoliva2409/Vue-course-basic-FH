const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [],
  },
];

export default routes;
