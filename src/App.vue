<template>
  <main>
    <person-list :people="people" @addPerson="addPerson" @removePerson="removePerson" />

    <nominate-button @click="nominate">Nominate Someone</nominate-button>
    <nominate-button @click="spinWheel">Spin the wheel!</nominate-button>

    <nominated-overlay v-if="nominee !== ''" @click.native="endNomination" :nominee="nominee" />

    <wheel :people="people" @nominate="setNominee" :visible="showWheel && nominee === ''" ref="wheel" />
  </main>
</template>

<script>
import PersonList from './components/PersonList'
import NominateButton from './components/NominateButton'
import NominatedOverlay from './components/NominatedOverlay'
import Vue from 'vue'
import VueConfetti from 'vue-confetti'
import Wheel from './components/Wheel'

Vue.use(VueConfetti)

export default {
  name: 'App',
  components: {
    PersonList,
    NominateButton,
    NominatedOverlay,
    Wheel
  },
  data: () => ({
    people: [],
    nominee: '',
    showWheel: false
  }),
  methods: {
    nominate () {
      let availablePeople = []

      for (let person of this.people) {
        if (person.available) {
          availablePeople.push(person)
        }
      }

      if (availablePeople.length === 0) {
        this.nominee = ''
        return
      }

      this.setNominee(availablePeople[Math.floor(Math.random() * availablePeople.length)].name)
    },
    addPerson (name) {
      this.people.push({
        name,
        available: true
      })
      this.people.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

      this.save()
    },
    removePerson (index) {
      this.people.splice(index, 1)
      this.save()
    },
    save () {
      localStorage.setItem('people', JSON.stringify(this.people))
    },
    endNomination () {
      this.nominee = ''
      this.$confetti.stop()
    },
    setNominee (nominee) {
      this.nominee = nominee
      this.showWheel = false

      for (const person of this.people) {
        if (person.name === nominee) {
          this.$set(person, 'available', false)
          break
        }
      }

      this.$confetti.start({
        defaultDropRate: 5,
        defaultSize: 4,
        windSpeedMax: 0.5,
        particlesPerFrame: 1
      })
    },
    spinWheel () {
      this.showWheel = true
      this.$refs.wheel.spin()
    }
  },
  mounted () {
    if (localStorage.getItem('people')) {
      this.people = JSON.parse(localStorage.getItem('people'))
      for (let person of this.people) {
        person.available = true
      }
    }

    this.$confetti.stop()
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    background: #222;
    color: #eee;
    font-family: sans-serif;
  }
</style>
