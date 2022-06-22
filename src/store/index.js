import { app } from '../main'
import { createStore } from 'vuex'
import people from './people'
import options from './options'
import spotify from './spotify'

export default createStore ({
  modules: {
    people,
    options,
    spotify
  }
})
