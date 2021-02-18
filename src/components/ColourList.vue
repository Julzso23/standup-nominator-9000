<template>
  <div>
    <h1 class="header">Wheel Colours:</h1>
    <div class="list">
      <colour-entry v-for="colour in colours" :key="colour.id" :colour="colour" />
    </div>
    <button @click="addColour" class="button">Add colour</button>
  </div>
</template>

<script>
import ColourEntry from './ColourEntry'

export default {
  name: 'colour-list',
  components: {
    ColourEntry
  },
  methods: {
    addColour () {
      this.$store.dispatch('options/addColour')
    }
  },
  computed: {
    colours () {
      return this.$store.state.options.colours
    }
  }
}
</script>

<style lang="scss" scoped>
  .button {
    background: #444;
    color: #eee;
    padding: 0.5rem 1rem;
    border: solid 1px #4a4a4a;
    cursor: pointer;
  }

  .list {
    display: flex;
    flex-wrap: wrap;

    .entry {
      flex: 0 50%;
    }
  }

  .header {
    margin: 1rem 0 0 0;
    font-weight: bold;
    font-size: 1.2rem;
  }
</style>
