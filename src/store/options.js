import hashCode from '../hashCode'
import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    wheelAudio: null,
    wheelImage: null,
    volume: 1,
    wheelSpinDuration: 10000,
    colours: []
  },

  mutations: {
    setWheelAudio (state, wheelAudio) {
      state.wheelAudio = wheelAudio
    },
    setWheelImage (state, wheelImage) {
      state.wheelImage = wheelImage
    },
    setVolume (state, volume) {
      state.volume = volume
    },
    setWheelSpinDuration (state, wheelSpinDuration) {
      state.wheelSpinDuration = wheelSpinDuration
    },
    addColour (state) {
      state.colours.push({
        id: hashCode(new Date() + Math.random().toString()),
        hex: '#f00'
      })
    },
    editColour (state, updatedColour) {
      const index = state.colours.findIndex(colour => colour.id === updatedColour.id)
      Vue.set(state.colours, index, updatedColour)
    },
    removeColour (state, id) {
      state.colours = state.colours.filter(colour => colour.id !== id)
    },
    setColours (state, colours) {
      state.colours = colours
    }
  },

  actions: {
    load ({ commit }) {
      const wheelAudio = localStorage.getItem('wheelAudio')
      if (wheelAudio) commit('setWheelAudio', wheelAudio)

      const wheelImage = localStorage.getItem('wheelImage')
      if (wheelImage) commit('setWheelImage', wheelImage)

      const volume = localStorage.getItem('volume')
      if (volume) commit('setVolume', parseFloat(volume))

      const wheelSpinDuration = localStorage.getItem('wheelSpinDuration')
      if (wheelSpinDuration) commit('setWheelSpinDuration', parseInt(wheelSpinDuration))

      const colours = localStorage.getItem('colours')
      if (colours) commit('setColours', JSON.parse(colours))
    },

    save ({ state }) {
      if (state.wheelAudio) {
        localStorage.setItem('wheelAudio', state.wheelAudio)
      } else {
        localStorage.removeItem('wheelAudio')
      }
      if (state.wheelImage) {
        localStorage.setItem('wheelImage', state.wheelImage)
      } else {
        localStorage.removeItem('wheelImage')
      }
      localStorage.setItem('volume', state.volume)
      localStorage.setItem('wheelSpinDuration', state.wheelSpinDuration)
      localStorage.setItem('colours', JSON.stringify(state.colours))
    },

    setWheelAudio ({ commit, dispatch }, wheelAudio) {
      commit('setWheelAudio', wheelAudio)
      dispatch('save')
    },

    setWheelImage ({ commit, dispatch }, wheelImage) {
      commit('setWheelImage', wheelImage)
      dispatch('save')
    },

    setVolume ({ commit, dispatch }, volume) {
      commit('setVolume', volume)
      dispatch('save')
    },

    setWheelSpinDuration ({ commit, dispatch }, wheelSpinDuration) {
      commit('setWheelSpinDuration', wheelSpinDuration)
      dispatch('save')
    },

    addColour ({ commit, dispatch }) {
      commit('addColour')
      dispatch('save')
    },

    editColour ({ commit, dispatch }, colour) {
      commit('editColour', colour)
      dispatch('save')
    },

    removeColour ({ commit, dispatch }, id) {
      commit('removeColour', id)
      dispatch('save')
    }
  }
}
