<template>
  <a :href="link" target="_blank" class="link"><large-button>Link Spotify</large-button></a>
</template>

<script>
import LargeButton from './LargeButton'

export default {
  name: 'spotify-authorise-button',
  components: {
    LargeButton
  },
  computed: {
    link () {
      return this.$store.getters['spotify/authoriseLink']
    }
  }
}
</script>

<style lang="scss" scoped>
  .link {
    text-decoration: none;
  }
</style>
