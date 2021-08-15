import { RouteRecordRaw, useRouter } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') },
      {
        path: '/listUrl',
        component: () => import('components/listUrl.vue'),
        meta:{
          required: true
        }
      }
    ]
  },
  {
    path: '/login',
    name:'login',
    component: () => import('components/login.vue'),

  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
