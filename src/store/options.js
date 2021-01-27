export default {
  namespaced: true,

  state: {
    wheelAudio: null,
    volume: 1,
    wheelSpinDuration: 10000
  },

  mutations: {
    setWheelAudio (state, wheelAudio) {
      state.wheelAudio = wheelAudio
    },
    setVolume (state, volume) {
      state.volume = volume
    },
    setWheelSpinDuration (state, wheelSpinDuration) {
      state.wheelSpinDuration = wheelSpinDuration
    }
  },

  actions: {
    load ({ commit }) {
      const wheelAudio = localStorage.getItem('wheelAudio')
      if (wheelAudio) commit('setWheelAudio', wheelAudio)

      const volume = localStorage.getItem('volume')
      if (volume) commit('setVolume', parseFloat(volume))

      const wheelSpinDuration = localStorage.getItem('wheelSpinDuration')
      if (wheelSpinDuration) commit('setWheelSpinDuration', parseInt(wheelSpinDuration))
    },

    save ({ state }) {
      if (state.wheelAudio) localStorage.setItem('wheelAudio', state.wheelAudio)
      localStorage.setItem('volume', state.volume)
      localStorage.setItem('wheelSpinDuration', state.wheelSpinDuration)
    },

    setWheelAudio ({ commit, dispatch }, wheelAudio) {
      commit('setWheelAudio', wheelAudio)
      dispatch('save')
    },

    setVolume ({ commit, dispatch }, volume) {
      commit('setVolume', volume)
      dispatch('save')
    },

    setWheelSpinDuration ({ commit, dispatch }, wheelSpinDuration) {
      commit('setWheelSpinDuration', wheelSpinDuration)
      dispatch('save')
    }
  }
}
