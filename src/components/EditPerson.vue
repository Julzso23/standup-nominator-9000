<template>
  <div class="overlay" v-if="modifiedPerson !== null">
    <div>
      <a href="#" class="icon-button" @click="close"><fa-icon icon="times" /></a>
    </div>

    <person-name-input editing v-model="modifiedPerson.name" @errorStateChanged="state => nameError = state" />
    <label for="background-input">Background image:</label> <input type="file" ref="file" id="background-input" accept="image/*" />
    <large-button @click="submit">Save</large-button>
  </div>
</template>

<script>
import LargeButton from './LargeButton'
import PersonNameInput from './PersonNameInput'

export default {
  name: 'edit-person',
  components: {
    LargeButton,
    PersonNameInput
  },
  props: {
    person: {
      id: String,
      name: String,
      available: Boolean
    }
  },
  data: () => ({
    modifiedPerson: null,
    nameError: false
  }),
  mounted () {
    this.modifiedPerson = Object.assign({}, this.person)
  },
  methods: {
    close () {
      this.$emit('finished')
    },
    submit () {
      if (!this.nameError) {
        this.$emit('finished')

        if (JSON.stringify(this.modifiedPerson) !== JSON.stringify(this.person)) {
          this.$store.dispatch('people/editPerson', {
            id: this.person.id,
            modifiedPerson: this.modifiedPerson
          })
        }
      }
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
</style>
