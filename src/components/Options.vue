<template>
  <div class="overlay">
    <a href="#" class="icon-button" @click="close"><fa-icon icon="times" /></a>

    <nominate-button @click="$refs.audioFile.click()">Change the wheel audio</nominate-button>
    <input type="file" ref="audioFile" @change="audioSourceChanged" accept="audio/*" style="display:none;" />

    <label for="volume">Volume</label>
    <input type="range" :value="volume" @change="volumeChanged" id="volume" min="0" max="1" step="0.1" />
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
    volume: Number
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
    volumeChanged (event) {
      localStorage.setItem('volume', parseFloat(event.target.value))
      this.$emit('volumeChanged', parseFloat(event.target.value))
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
