import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
// import UploadPageVue from '@/pages/upload/UploadPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/preprint/upload',
      name: 'preprint-upload',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/prePrint/UploadPage.vue')
    },
    {
      path: '/desci/upload',
      name: 'desci-upload',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/deSci/UploadPage.vue')
    }
  ]
})

export default router
