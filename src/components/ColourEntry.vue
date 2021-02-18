<template>
  <div class="entry">
    <div class="row">
      <div :style="{ background: modifiedColour.hex }" class="colour-square" @click="editing = !editing"></div>
      <button class="button" v-if="modified" @click="updateColour">Save</button>
      <button class="button" v-if="modified" @click="discardChanges">Discard</button>
      <button class="button" @click="removeColour">Delete</button>
    </div>
    <colour-picker v-if="editing" v-model="modifiedColour" :disableAlpha="true" />
  </div>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'colour-entry',
  components: {
    'colour-picker': Chrome
  },
  props: {
    colour: {
      id: Number,
      hex: String
    }
  },
  data: () => ({
    editing: false,
    modifiedColour: {
      hex: '#000'
    }
  }),
  methods: {
    updateColour () {
      this.modifiedColour.id = this.colour.id
      this.$store.dispatch('options/editColour', this.modifiedColour)
      this.editing = false
    },
    removeColour () {
      this.$store.dispatch('options/removeColour', this.colour.id)
    },
    discardChanges () {
      this.modifiedColour = Object.assign({}, this.colour)
      this.editing = false
    }
  },
  computed: {
    modified () {
      return JSON.stringify(this.colour) !== JSON.stringify(this.modifiedColour)
    }
  },
  mounted () {
    this.discardChanges()
  },
  watch: {
    colour () {
      this.discardChanges()
    }
  }
}
</script>

<style lang="scss" scoped>
  .entry {
    margin-bottom: 0.2rem;
  }

  .colour-square {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }

  .row {
    display: flex;
  }

  .button {
    background: #222;
    color: #eee;
    padding: 0 0.5rem;
    border: solid 1px #333;
    border-left: none;
    cursor: pointer;
  }
</style>
