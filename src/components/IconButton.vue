<template>
  <router-link :to="to" class="icon-button"><fa-icon :icon="icon" /></router-link>
</template>

<script>
export default {
  name: 'icon-button',
  props: {
    to: String,
    icon: String
  }
}
</script>

<style lang="scss" scoped>
  .icon-button {
    color: #eee;
    text-decoration: none !important;
    font-size: 1.5rem;
  }
</style>
