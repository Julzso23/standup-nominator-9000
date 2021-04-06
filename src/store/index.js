import Vue from 'vue'
import Vuex from 'vuex'
import people from './people'
import options from './options'
import spotify from './spotify'
Vue.use(Vuex)

export default new Vuex.Store ({
  modules: {
    people,
    options,
    spotify
  }
})
