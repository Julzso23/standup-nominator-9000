<template>
  <div>
    <form @submit.prevent="addPerson"><person-name-input v-model="newPerson" @errorStateChanged="state => inputError = state" /></form>

    <person v-for="person in people" :key="person.id" :person="person" />
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
    }
  }
}
</script>
