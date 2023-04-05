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
      component: () => import('@/pages/deSci/UploadPage.vue'),
      children: [
        {
          path: ':address',
          name: 'desci-upload-metainfo',
          component: () => import('@/pages/deSci/MetaInfoForm.vue'),
          props: true
        },
      ]
    },
    {
      path: '/desci',
      name: 'desci-assign',
      component: () => import('@/components/SuspenseWraper.vue'),
      children: [
        {
          path: 'owner/assignEditors/:address',
          name: 'desci-assign-editor-journal',
          component: () => import('@/pages/deSci/OwnerPages/AssignEditors.vue'),
          props: true
        },
        {
          path: 'editor/assignReviewers/:address/:paperId',
          name: 'desci-assign-reviewer-paper',
          component: () => import('@/pages/deSci/EditorPages/AssignReviewers.vue'),
          props: true
        }
      ]
    }
  ]
})

export default router
