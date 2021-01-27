import Vue from 'vue'
import Vuex from 'vuex'
import people from './people'
import options from './options'
Vue.use(Vuex)

export default new Vuex.Store ({
  modules: {
    people,
    options
  }
})
