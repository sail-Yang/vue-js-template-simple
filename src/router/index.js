import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/Login.vue'

export const publicRouters = [
  {
    path: '/login',
    name: 'login',
    meta: {
      roles: ['worker','admin']
    },
    component: Login
  },
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
      roles: ['admin','worker']
    },
    component: () => import('../pages/Home.vue'),
    children: [
      {
        path: '/addworker',
        meta: {
          requiresAuth: true,
          title: '添加员工',
          roles: ['admin']
        },
        component: () => import('../pages/AddWorker.vue'),
      },
      {
        path: '/addwage',
        meta: {
          requiresAuth: true,
          title: '添加工资',
          roles: ['admin']
        },
        component: () => import('../pages/AddWage.vue'),
      },
      {
        path: '/updatewage',
        meta: {
          requiresAuth: true,
          title: '修改工资',
          roles: ['admin']
        },
        component: () => import('../pages/UpdateWage.vue'),
      },
      {
        path: '/listwage',
        meta: {
          requiresAuth: true,
          title: '查询工资',
          roles: ['admin']
        },
        component: () => import('../pages/ListWage.vue'),
      },
      {
        path: '/workerwage',
        meta: {
          requiresAuth: true,
          title: '查询工资',
          roles: ['worker']
        },
        component: () => import('../pages/WorkerWage.vue'),
      },
      {
        path: '/password',
        meta: {
          requiresAuth: true,
          title: '修改密码',
          roles: ['worker']
        },
        component: () => import('../pages/UpdatePassword.vue'),
      },
    ]
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRouters,
})


export default router
