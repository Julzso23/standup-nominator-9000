<template>
  <a :href="link" target="_blank">Authorise Spotify</a>
</template>

<script>
export default {
  name: 'spotify-authorise-link',
  computed: {
    link () {
      return this.$store.getters['spotify/authoriseLink']
    }
  }
}
</script>
