<template>
  <large-button @click="unlink">Unlink Spotify</large-button>
</template>

<script>
import LargeButton from './LargeButton'

export default {
  name: 'spotify-unlink-button',
  components: {
    LargeButton
  },
  methods: {
    unlink () {
      this.$store.dispatch('spotify/unlink')
    }
  }
}
</script>
