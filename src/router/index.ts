import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
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
      path: '/preprint/:address',
      name: 'preprint-journal-home',
      component: () => import('@/pages/prePrint/JournalHomePage.vue'),
      props: true,
      children: [
        {
          path: 'published',
          name: 'preprint-journal-published',
          component: () => import('@/pages/prePrint/RecentPublished.vue'),
          props: true
        },
        {
          path: 'author',
          name: 'preprint-journal-author',
          component: () => import('@/pages/prePrint/AuthorHomePage.vue'),
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
          path: 'upload/:address',
          name: 'preprint-upload',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/pages/prePrint/UploadPage.vue'),
          props: true
        },
        {
          path: 'paperinfo/:address/:paperCID',
          name: 'preprint-paper-info',
          component: () => import('@/pages/prePrint/PaperInfoPage.vue'),
          props: true,
        },
      ]
    },
    {
      path: '/desci',
      // name: 'desci-assign',
      component: () => import('@/components/SuspenseWraper.vue'),
      children: [
        {
          path: ':address',
          name: 'desci-journal-home',
          component: () => import('@/pages/deSci/JournalHomePage.vue'),
          props: true,
          children: [
            {
              path: 'published',
              name: 'desci-journal-published',
              component: () => import('@/pages/deSci/PublishedPaperList.vue'),
              props: true
            },
            {
              path: 'author',
              name: 'desci-journal-author',
              component: () => import('@/pages/deSci/AuthorPages/AuthorHomePage.vue'),
              props: true
            },
            {
              path: 'editor',
              name: 'desci-journal-editor',
              component: () => import('@/pages/deSci/EditorPages/EditorHomePage.vue'),
              props: true
            },
            {
              path: 'reviewer',
              name: 'desci-journal-reviewer',
              component: () => import('@/pages/deSci/ReviewerPages/ReviewerHomePage.vue'),
              props: true
            },
            {
              path: 'withdraw',
              name: 'desci-journal-withdraw',
              component: () => import('@/pages/deSci/WithdrawalPage.vue'),
              props: true
            }
          ]
        },
        {
          path: 'replycomment/:address/:paperCID',
          component: () => import('@/pages/deSci/AuthorPages/ReplyCommentPage.vue'),
          name: 'desci-reply-comment',
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
          path: 'editor/assignReviewers/:address/:paperCID',
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
