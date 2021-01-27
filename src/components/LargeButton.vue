<template>
  <button class="button" @click="click"><slot></slot></button>
</template>

<script>
export default {
  name: 'large-button',
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .button {
    background: #444;
    border: solid 1px #4a4a4a;
    cursor: pointer;
    padding: 0.75rem;
    color: #eee;
    font-size: 1.2rem;
    margin-top: 1rem;
    display: block;
    width: 100%;
  }
  .button:not(:last-child) {
    margin-right: 0.5rem;
  }
</style>
