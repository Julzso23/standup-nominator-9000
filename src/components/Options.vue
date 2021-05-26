<template>
  <div class="options">
    <icon-button to="/" icon="times" />

    <row>
      <large-button @click="$refs.audioFile.click()">Set wheel audio</large-button>
      <large-button @click="removeAudio">Remove wheel audio</large-button>
    </row>
    <input type="file" ref="audioFile" @change="audioSourceChanged" accept="audio/*" style="display:none;" />

    <row>
      <large-button @click="$refs.imageFile.click()">Set wheel image</large-button>
      <large-button @click="removeImage">Remove wheel image</large-button>
    </row>
    <input type="file" ref="imageFile" @change="imageSourceChanged" accept="image/png,image/jpeg" style="display:none;" />

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

    <div class="slider-container row">
      <label for="imageSize">Wheel image size </label>
      <input type="range" :value="wheelImageSize" @change="imageSizeChanged" id="imageSize" min="0.5" max="4" step="0.1" @input="onInput" class="slider" />
      <output data-multiplier="100">{{ wheelImageSize * 100 }}</output>%
    </div>

    <spotify-authorise-button v-if="!spotifyConnected" />
    <spotify-unlink-button v-else />

    <colour-list />
  </div>
</template>

<script>
import LargeButton from './LargeButton'
import ColourList from './ColourList'
import Row from './Row'
import SpotifyAuthoriseButton from './SpotifyAuthoriseButton'
import SpotifyUnlinkButton from './SpotifyUnlinkButton'
import IconButton from './IconButton'

export default {
  name: 'options',
  components: {
    LargeButton,
    ColourList,
    Row,
    SpotifyAuthoriseButton,
    SpotifyUnlinkButton,
    IconButton
  },
  data: () => ({
    audioFileReader: new FileReader(),
    imageFileReader: new FileReader()
  }),
  mounted () {
    this.audioFileReader.onload = this.audioSourceLoaded
    this.imageFileReader.onload = this.imageSourceLoaded
  },
  methods: {
    audioSourceChanged () {
      if (this.$refs.audioFile.files.length > 0) {
        this.audioFileReader.readAsDataURL(this.$refs.audioFile.files[0])
        this.$refs.audioFile.value = ''
      }
    },
    imageSourceChanged () {
      if (this.$refs.imageFile.files.length > 0) {
        this.imageFileReader.readAsDataURL(this.$refs.imageFile.files[0])
        this.$refs.imageFile.value = ''
      }
    },
    audioSourceLoaded () {
      this.$store.dispatch('options/setWheelAudio', this.audioFileReader.result)
    },
    imageSourceLoaded () {
      this.$store.dispatch('options/setWheelImage', this.imageFileReader.result)
    },
    onInput (event) {
      const multiplier = parseFloat(event.target.nextElementSibling.dataset.multiplier)
      event.target.nextElementSibling.value = Math.floor(event.target.value * multiplier)
    },
    volumeChanged (event) {
      this.$store.dispatch('options/setVolume', parseFloat(event.target.value))
    },
    durationChanged (event) {
      this.$store.dispatch('options/setWheelSpinDuration', parseInt(event.target.value))
    },
    imageSizeChanged (event) {
      this.$store.dispatch('options/setWheelImageSize', parseFloat(event.target.value))
    },
    removeAudio () {
      this.$store.dispatch('options/setWheelAudio', null)
    },
    removeImage () {
      this.$store.dispatch('options/setWheelImage', null)
    }
  },
  computed: {
    volume () {
      return this.$store.state.options.volume
    },
    wheelSpinDuration () {
      return this.$store.state.options.wheelSpinDuration
    },
    spotifyConnected () {
      return this.$store.state.spotify.accessToken !== null
    },
    wheelImageSize () {
      return this.$store.state.options.wheelImageSize
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider-container {
    display: flex;

    .slider {
      flex-grow: 1;
    }
  }

  .row {
    margin-bottom: 0.5rem;
  }
</style>
