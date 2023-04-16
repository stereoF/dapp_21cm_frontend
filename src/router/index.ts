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
      path: '/preprint',
      // name: 'desci-assign',
      component: () => import('@/components/SuspenseWraper.vue'),
      children: [
        {
          path: 'upload/:address',
          name: 'preprint-upload',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/pages/prePrint/UploadPage.vue'),
          props: true
        },
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
          path: 'replycomment/:address/:paperCID',
          component: () => import('@/pages/deSci/AuthorPages/ReplyCommentPage.vue'),
          props: true
        },
        {
          path: 'paperinfo/:address/:paperCID',
          name: 'desci-paper-info',
          component: () => import('@/pages/deSci/PaperInfoPage.vue'),
          props: true,
        },
        {
          path: 'submit/:address',
          name: 'desci-submit',
          component: () => import('@/pages/deSci/AuthorPages/SubmitPage.vue'),
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
          component: () => import('@/pages/deSci/AuthorPages/ReplyNewPage.vue'),
          props: true
        }
      ]
    },
  ]
})

export default router
