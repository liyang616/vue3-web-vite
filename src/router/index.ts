import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from '@/plugins/nprogress'
import i18n from '@/i18n/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue'),
    meta: {
      title: '首页',
      i18nKey: 'router.Home'
    }
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.i18nKey) {
    document.title = i18n.global.t(to.meta.i18nKey as string)
  } else {
    document.title = to.meta.title as string
  }
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
