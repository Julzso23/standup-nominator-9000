import { createApp } from 'vue'
import VueConfetti from 'vue-confetti'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import router from './router'
import Main from './Main.vue'

export const app = createApp(Main)
app.use(router)
app.use(store)
app.use(VueConfetti)
app.mount('#app')

library.add(faCog, faTimes)
app.component('fa-icon', FontAwesomeIcon)

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
