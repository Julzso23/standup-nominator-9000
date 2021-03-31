<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'row'
}
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
  }
</style>
