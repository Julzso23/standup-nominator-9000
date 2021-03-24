<template>
  <main>
    <a href="#" class="icon-button" @click="showOptions = true"><fa-icon icon="cog" /></a>

    <person-list :people="people" />

    <div class="row">
      <large-button @click="nominate">Nominate Someone</large-button>
      <large-button @click="spinWheel">Spin the wheel!</large-button>
    </div>

    <nominated-overlay v-if="nominee !== ''" @click.native="endNomination" :nominee="nominee" />

    <wheel :people="people" :duration="wheelSpinDuration" @onRotateEnd="setNominee" v-if="showWheel" />

    <options v-if="showOptions" @close="showOptions = false" />

    <audio-source :source="wheelAudio" ref="audio" :duration="wheelSpinDuration" :volume="volume" />
  </main>
</template>

<script>
import PersonList from './components/PersonList'
import LargeButton from './components/LargeButton'
import NominatedOverlay from './components/NominatedOverlay'
import Wheel from './components/Wheel'
import Options from './components/Options'
import AudioSource from './components/AudioSource'

export default {
  name: 'App',
  components: {
    PersonList,
    LargeButton,
    NominatedOverlay,
    Wheel,
    Options,
    AudioSource
  },
  data: () => ({
    nominee: '',
    showWheel: false,
    showOptions: false
  }),
  mounted () {
    this.$store.dispatch('people/load')
    this.$store.dispatch('options/load')

    this.$confetti.stop()
  },
  methods: {
    nominate () {
      if (this.availablePeople.length === 0) {
        this.nominee = ''
        return
      }

      this.setNominee(this.availablePeople[Math.floor(Math.random() * this.availablePeople.length)].name)
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
      if (this.availablePeople.length > 0) {
        this.showWheel = true

        if (this.wheelAudio !== null) {
          this.$refs.audio.play()
        }
      }
    }
  },
  computed: {
    people () {
      return this.$store.state.people.people
    },
    availablePeople () {
      const availablePeople = []

      for (let person of this.people) {
        if (person.available) {
          availablePeople.push(person)
        }
      }

      return availablePeople
    },
    wheelAudio () {
      return this.$store.state.options.wheelAudio
    },
    volume () {
      return this.$store.state.options.volume
    },
    wheelSpinDuration () {
      return this.$store.state.options.wheelSpinDuration
    }
  }
}
</script>

<style lang="scss">
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

<style lang="scss" scoped>
  .row {
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
  }
</style>
