<template>
  <audio ref="audio" :src="source" loop="true" />
</template>

<script>
export default {
  name: 'audio-source',
  props: {
    source: String,
    duration: Number,
    volume: Number
  },
  methods: {
    play () {
      if (!this.isValid()) return

      this.$refs.audio.play()
      this.fade()
    },
    pause () {
      if (!this.isValid()) return

      this.$refs.audio.pause()
    },
    isValid () {
      return (this.$refs.audio !== null || this.$refs.audio.src !== null)
    },
    fade () {
      this.$refs.audio.volume = 0
      const intervalTime = 100
      const fadeTime = 1000
      const fadeIncrement = (intervalTime / fadeTime) * this.volume
      let currentTime = 0
      const fadeInterval = setInterval(() => {
        currentTime += intervalTime

        if (currentTime < fadeTime) {
          if (this.$refs.audio.volume < this.volume) {
            if (this.$refs.audio.volume + fadeIncrement > this.volume) {
              this.$refs.audio.volume = this.volume
            } else {
              this.$refs.audio.volume += fadeIncrement
            }
          }
        } else if (currentTime > this.duration - fadeTime) {
          if (this.$refs.audio.volume > 0) {
            if (this.$refs.audio.volume - fadeIncrement < 0) {
              this.$refs.audio.volume = 0
            } else {
              this.$refs.audio.volume -= fadeIncrement
            }
          }
        } else {
          this.$refs.audio.volume = this.volume
        }

        if (currentTime >= this.duration) {
          clearInterval(fadeInterval)
        }
      }, intervalTime)
    }
  }
}
</script>
