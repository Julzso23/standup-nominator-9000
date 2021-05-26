import Vue from 'vue'
import VueConfetti from 'vue-confetti'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import router from './router'
import Main from './Main.vue'

Vue.use(VueConfetti)

library.add(faCog, faTimes)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(Main)
})

window.urlData.receive((event, data) => {
  const url = new URL(data)
  switch (url.pathname.replace(/^\/+|\/$/g, '')) {
    case 'spotifyAuth': {
      const params = new URLSearchParams(url.search)
      store.dispatch('spotify/getToken', params.get('code'))
      break
    }
  }
})
