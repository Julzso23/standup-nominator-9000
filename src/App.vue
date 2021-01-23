<template>
  <main>
    <a href="#" class="icon-button" @click="showOptions = true"><fa-icon icon="cog" /></a>

    <person-list :people="people" @addPerson="addPerson" @removePerson="removePerson" />

    <nominate-button @click="nominate">Nominate Someone</nominate-button>
    <nominate-button @click="spinWheel">Spin the wheel!</nominate-button>

    <nominated-overlay v-if="nominee !== ''" @click.native="endNomination" :nominee="nominee" />

    <wheel :people="people" :duration="duration" @onRotateEnd="setNominee" v-if="showWheel" />

    <options v-if="showOptions" @close="showOptions = false" @audioSourceUpdated="audioSourceUpdated" :volume="volume" @volumeChanged="value => volume = value" :duration="duration" @durationChanged="value => duration = value" />

    <audio-source :source="audioSource" ref="audio" :duration="duration" :volume="volume" />
  </main>
</template>

<script>
import PersonList from './components/PersonList'
import NominateButton from './components/NominateButton'
import NominatedOverlay from './components/NominatedOverlay'
import Wheel from './components/Wheel'
import Options from './components/Options'
import AudioSource from './components/AudioSource'

export default {
  name: 'App',
  components: {
    PersonList,
    NominateButton,
    NominatedOverlay,
    Wheel,
    Options,
    AudioSource
  },
  data: () => ({
    people: [],
    nominee: '',
    showWheel: false,
    showOptions: false,
    audioSource: null,
    volume: 1,
    duration: 10000
  }),
  mounted () {
    if (localStorage.getItem('people')) {
      this.people = JSON.parse(localStorage.getItem('people'))
      for (let person of this.people) {
        person.available = true
      }
    }

    this.$confetti.stop()

    this.audioSource = localStorage.getItem('wheelAudio')
    this.volume = localStorage.getItem('volume') && parseFloat(localStorage.getItem('volume')) || 1
    this.duration = localStorage.getItem('wheelSpinDuration') && parseInt(localStorage.getItem('wheelSpinDuration')) || 10000
  },
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

      this.$refs.audio.pause()
    },
    spinWheel () {
      this.showWheel = true
      this.$refs.audio.play()
    },
    audioSourceUpdated (source) {
      this.audioSource = source
    }
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

  .icon-button {
    color: #eee;
    text-decoration: none !important;
    font-size: 1.5rem;
  }
</style>
