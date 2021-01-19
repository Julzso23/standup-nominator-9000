import Vue from 'vue'
import App from './App.vue'

import VueConfetti from 'vue-confetti'
Vue.use(VueConfetti)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCog, faTimes)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
