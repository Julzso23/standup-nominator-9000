<template>
  <main>
    <a href="#" class="icon-button" @click="showOptions = true"><fa-icon icon="cog" /></a>

    <person-list :people="people" @nominate="setNominee" @rigWheel="rigWheel" />

    <row>
      <large-button @click="nominate">Nominate Someone</large-button>
      <large-button @click="spinWheel">Spin the wheel!</large-button>
    </row>

    <nominated-overlay v-if="nominee !== ''" @click.native="endNomination" :nominee="nominee" />

    <wheel :availablePeople="availablePeople" :duration="wheelSpinDuration" :rigged="rigged" @onRotateEnd="setNominee" v-if="showWheel" />

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
import Row from './components/Row'

export default {
  name: 'App',
  components: {
    PersonList,
    LargeButton,
    NominatedOverlay,
    Wheel,
    Options,
    AudioSource,
    Row
  },
  data: () => ({
    nominee: '',
    showWheel: false,
    showOptions: false,
    rigged: null
  }),
  mounted () {
    this.$store.dispatch('people/load')
    this.$store.dispatch('options/load')

    this.$confetti.stop()

    document.addEventListener('keydown', this.onKeyDown)
  },
  methods: {
    nominate () {
      if (this.availablePeople.length === 0) {
        this.nominee = ''
        return
      }

      this.setNominee(this.availablePeople[Math.floor(Math.random() * this.availablePeople.length)])
    },
    endNomination () {
      this.nominee = ''
      this.$confetti.stop()
    },
    setNominee (nominee) {
      this.nominee = nominee.name
      this.showWheel = false
      this.rigged = null

      this.$store.commit('people/setAvailable', {
        id: nominee.id,
        available: false
      })

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
    },
    rigWheel (person) {
      this.rigged = this.availablePeople.findIndex(p => p.id === person.id)
      this.spinWheel()
    },
    onKeyDown (event) {
      if (document.activeElement.nodeName === 'INPUT') return

      switch (event.code) {
        case 'Space':
        case 'KeyS':
        {
          this.endNomination()
          this.spinWheel()
          event.preventDefault()
          break
        }
        case 'KeyN':
        {
          this.endNomination()
          this.nominate()
          event.preventDefault()
          break
        }
      }
    }
  },
  computed: {
    people () {
      return this.$store.state.people.people
    },
    availablePeople () {
      return this.people.filter(person => person.available)
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
