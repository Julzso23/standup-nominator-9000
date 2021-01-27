<template>
  <div class="overlay" v-if="modifiedPerson !== null">
    <div>
      <a href="#" class="icon-button" @click="close"><fa-icon icon="times" /></a>
    </div>

    <input type="text" placeholder="Name" class="text-input" v-model="modifiedPerson.name" />
    <label for="background-input">Background image:</label> <input type="file" ref="file" id="background-input" accept="image/*" />
    <large-button @click="submit">Save</large-button>
  </div>
</template>

<script>
import LargeButton from './LargeButton'

export default {
  name: 'edit-person',
  components: {
    LargeButton
  },
  props: {
    person: {
      id: String,
      name: String,
      available: Boolean
    }
  },
  data: () => ({
    modifiedPerson: null
  }),
  mounted () {
    this.modifiedPerson = this.person
  },
  methods: {
    close () {
      this.$emit('finished')
    },
    submit () {
      this.$emit('finished')

      this.$store.commit('editPerson', {
        id: this.person.id,
        modifiedPerson: this.modifiedPerson
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .overlay {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.75);
    cursor: default;
    padding: 1rem;
  }

  .text-input {
    background: #2a2a2a;
    border: solid 1px #444;
    padding: 0.5rem 1rem;
    color: #eee;
    margin-bottom: 1rem;
    display: block;
    width: 100%;
  }
</style>
