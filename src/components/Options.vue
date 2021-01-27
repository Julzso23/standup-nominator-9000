<template>
  <div class="overlay">
    <a href="#" class="icon-button" @click="close"><fa-icon icon="times" /></a>

    <large-button @click="$refs.audioFile.click()">Change the wheel audio</large-button>
    <input type="file" ref="audioFile" @change="audioSourceChanged" accept="audio/*" style="display:none;" />

    <div class="slider-container">
      <label for="volume">Volume </label>
      <input type="range" :value="volume" @change="volumeChanged" id="volume" min="0" max="1" step="0.1" @input="onInput" class="slider" />
      <output data-multiplier="100">{{ volume * 100 }}</output>%
    </div>

    <div class="slider-container">
      <label for="duration">Wheel spin duration </label>
      <input type="range" :value="wheelSpinDuration" @change="durationChanged" id="duration" min="5000" max="200000" step="1000" @input="onInput" class="slider" />
      <output data-multiplier="0.001">{{ wheelSpinDuration * 0.001 }}</output>s
    </div>
  </div>
</template>

<script>
import LargeButton from './LargeButton'

export default {
  name: 'options',
  components: {
    LargeButton
  },
  data: () => ({
    audioFileReader: new FileReader()
  }),
  mounted () {
    this.audioFileReader.onload = this.audioSourceLoaded
  },
  methods: {
    audioSourceChanged () {
      if (this.$refs.audioFile.files.length > 0) {
        this.audioFileReader.readAsDataURL(this.$refs.audioFile.files[0])
      }
    },
    audioSourceLoaded () {
      this.$store.dispatch('options/setWheelAudio', this.audioFileReader.result)
    },
    close () {
      this.$emit('close')
    },
    onInput (event) {
      const multiplier = parseFloat(event.target.nextElementSibling.dataset.multiplier)
      event.target.nextElementSibling.value = event.target.value * multiplier
    },
    volumeChanged (event) {
      this.$store.dispatch('options/setVolume', parseFloat(event.target.value))
    },
    durationChanged (event) {
      this.$store.dispatch('options/setWheelSpinDuration', parseInt(event.target.value))
    }
  },
  computed: {
    volume () {
      return this.$store.state.options.volume
    },
    wheelSpinDuration () {
      return this.$store.state.options.wheelSpinDuration
    }
  }
}
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    padding: 1rem;
  }

  .slider-container {
    display: flex;

    .slider {
      flex-grow: 1;
    }
  }
</style>
