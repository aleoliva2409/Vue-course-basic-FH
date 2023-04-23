const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../views/Index.vue') },
      {
        path: 'typography',
        name: 'typography',
        component: () => import('../views/Typography.vue'),
      },
      {
        path: 'flex',
        name: 'flex',
        component: () => import('../views/Flex.vue'),
      },
      {
        path: 'dialogs',
        name: 'dialogs',
        component: () => import('../views/Dialogs.vue'),
      },
      {
        path: 'forms',
        name: 'forms',
        component: () => import('../views/Forms.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../views/Error404.vue'),
  },
];

export default routes;
