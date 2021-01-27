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
