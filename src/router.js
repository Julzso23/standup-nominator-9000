import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
