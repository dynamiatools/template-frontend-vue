import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { title: 'Dashboard' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | {{PROJECT_NAME}}` : '{{PROJECT_NAME}}'
  next()
})

export default router
