import Vue from 'vue'
import VueConfetti from 'vue-confetti'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import App from './App.vue'

Vue.use(VueConfetti)

library.add(faCog, faTimes)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

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
