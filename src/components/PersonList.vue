<template>
  <div>
    <form @submit.prevent="addPerson"><input type="text" placeholder="Add someone" class="text-input" :class="error ? 'error' : ''" v-model="newPerson" /></form>

    <person v-for="person in people" :key="person.id" :person="person" />
  </div>
</template>

<script>
import Person from './Person'

export default {
  name: 'person-list',
  props: {
    people: Array
  },
  components: {
    Person
  },
  data: () => ({
    newPerson: '',
    error: false
  }),
  methods: {
    addPerson () {
      if (!this.error) {
        this.$store.dispatch('people/addPerson', this.newPerson)
        this.newPerson = ''
      }
    }
  },
  watch: {
    newPerson () {
      if (this.newPerson === '') {
        this.error = false
        return
      }
      if (!this.newPerson.trim()) {
        this.error = true
        return
      }
      if (this.people.find(person => person.name === this.newPerson)) {
        this.error = true
        return
      }
      this.error = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-input {
    background: #2a2a2a;
    border: solid 1px #444;
    padding: 0.5rem 1rem;
    color: #eee;
    margin-bottom: 1rem;
    display: block;
    width: 100%;
    outline: none;
  }

  .error {
    border-color: red;
  }
</style>
