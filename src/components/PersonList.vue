<template>
  <div class="person-list">
    <form @submit.prevent="addPerson"><person-name-input v-model="newPerson" @errorStateChanged="state => inputError = state" /></form>

    <person v-for="person in people" :key="person.id" :person="person" @nominate="nominate" @rigWheel="rigWheel" />
  </div>
</template>

<script>
import Person from './Person'
import PersonNameInput from './PersonNameInput'

export default {
  name: 'person-list',
  props: {
    people: Array
  },
  components: {
    Person,
    PersonNameInput
  },
  data: () => ({
    newPerson: '',
    inputError: false
  }),
  methods: {
    addPerson () {
      if (!this.inputError) {
        this.$store.dispatch('people/addPerson', this.newPerson)
        this.newPerson = ''
      }
    },
    nominate (person) {
      this.$emit('nominate', person)
    },
    rigWheel (person) {
      this.$emit('rigWheel', person)
    }
  }
}
</script>

<style lang="scss" scoped>
  .person-list {
    margin-bottom: 1rem;
  }
</style>
