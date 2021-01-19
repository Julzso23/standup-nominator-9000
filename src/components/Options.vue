<template>
  <div class="overlay">
    <a href="#" class="icon-button" @click="close"><fa-icon icon="times" /></a>

    <nominate-button @click="$refs.audioFile.click()">Change the wheel audio</nominate-button>
    <input type="file" ref="audioFile" @change="audioSourceChanged" accept="audio/*" style="display:none;" />

    <div>
      <label for="volume">Volume </label>
      <input type="range" :value="volume" @change="volumeChanged" id="volume" min="0" max="1" step="0.1" @input="onInput" />
      <output>{{ volume }}</output>
    </div>

    <div>
      <label for="duration">Wheel spin duration </label>
      <input type="range" :value="duration" @change="durationChanged" id="duration" min="1000" max="20000" step="1000" @input="onInput" />
      <output>{{ duration }}</output>
    </div>
  </div>
</template>

<script>
import NominateButton from './NominateButton.vue'
export default {
  name: 'options',
  components: {
    NominateButton
  },
  props: {
    volume: Number,
    duration: Number
  },
  data: () => ({
    audioFileReader: new FileReader()
  }),
  mounted () {
    this.audioFileReader.onload = this.audioSourceLoaded
  },
  methods: {
    audioSourceChanged () {
      this.audioFileReader.readAsDataURL(this.$refs.audioFile.files[0])
    },
    audioSourceLoaded () {
      localStorage.setItem('wheelAudio', this.audioFileReader.result)
      this.$emit('audioSourceUpdated', this.audioFileReader.result)
    },
    close () {
      this.$emit('close')
    },
    onInput (event) {
      event.target.nextElementSibling.value = event.target.value
    },
    volumeChanged (event) {
      localStorage.setItem('volume', parseFloat(event.target.value))
      this.$emit('volumeChanged', parseFloat(event.target.value))
    },
    durationChanged (event) {
      localStorage.setItem('wheelSpinDuration', parseFloat(event.target.value))
      this.$emit('durationChanged', parseFloat(event.target.value))
    }
  }
}
</script>

<style scoped>
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    padding: 1rem;
  }
</style>
