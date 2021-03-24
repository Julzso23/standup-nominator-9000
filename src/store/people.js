import hashCode from '../hashCode'

export default {
  namespaced: true,

  state: {
    people: []
  },

  mutations: {
    setPeople (state, people) {
      state.people = people
    },
    addPerson (state, name) {
      state.people.push({
        id: hashCode(name + new Date()),
        name,
        available: true
      })
    },
    removePerson (state, id) {
      state.people = state.people.filter(person => person.id !== id)
    },
    sortPeople (state) {
      state.people.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    },
    editPerson (state, { id, modifiedPerson }) {
      const index = state.people.findIndex(person => person.id === id)
      state.people[index] = modifiedPerson
    },
    setAvailable (state, { id, available }) {
      const index = state.people.findIndex(person => person.id === id)
      state.people[index].available = available
    }
  },

  actions: {
    load ({ commit }) {
      if (localStorage.getItem('people')) {
        const people = JSON.parse(localStorage.getItem('people'))
        for (let person of people) {
          person.available = true
        }

        commit('setPeople', people)
      }
    },
    save ({ state }) {
      localStorage.setItem('people', JSON.stringify(state.people))
    },
    addPerson ({ commit, dispatch }, name) {
      commit('addPerson', name)
      commit('sortPeople')
      dispatch('save')
    },
    removePerson ({ commit, dispatch }, id) {
      commit('removePerson', id)
      dispatch('save')
    },
    editPerson ({ commit, dispatch }, payload) {
      commit('editPerson', payload)
      commit('sortPeople')
      dispatch('save')
    }
  }
}
