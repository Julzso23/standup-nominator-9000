import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  base: '/',
  routes: [
    {
      path: '/',
      component: () => import('./App')
    },
    {
      path: '/options',
      component: () => import('./components/Options')
    }
  ]
})
