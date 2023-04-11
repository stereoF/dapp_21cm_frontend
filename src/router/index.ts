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
      path: '/successsubmit',
      name: 'success-submit',
      component: () => import('@/pages/results/SuccessSubmit.vue')
    },
    {
      path: '/preprint/upload',
      name: 'preprint-upload',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/prePrint/UploadPage.vue'),
      children: [
        {
          path: ':address',
          name: 'preprint-upload-metainfo',
          component: () => import('@/pages/prePrint/MetaInfoForm.vue'),
          props: true
        },
      ]
    },
    {
      path: '/preprint',
      // name: 'desci-assign',
      component: () => import('@/components/SuspenseWraper.vue'),
      children: [
        {
          path: 'recentPublished/:address',
          name: 'recent-published',
          component: () => import('@/pages/prePrint/RecentPublished.vue'),
          props: true
        },
      ]
    },
    {
      path: '/desci',
      // name: 'desci-assign',
      component: () => import('@/components/SuspenseWraper.vue'),
      children: [
        {
          path: '/test/:address',
          component: () => import('@/components/InTest/TestPage.vue'),
          props: true
        },
        {
          path: 'submit/:address',
          name: 'desci-submit',
          component: () => import('@/pages/deSci/SubmitPage.vue'),
          props: true
        },
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
        },
        {
          path: 'review/:address/:paperCID',
          name: 'desci-review-paper',
          component: () => import('@/pages/deSci/ReviewerPages/SubmitCommentPage.vue'),
          props: true
        },
        {
          path: 'replynew/:address/:prevCID',
          name: 'desci-replynew',
          component: () => import('@/pages/deSci/ReplyNewPage.vue'),
          props: true
        }
      ]
    },
  ]
})

export default router
