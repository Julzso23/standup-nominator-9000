<template>
  <div>
    <form @submit.prevent="addPerson"><input type="text" placeholder="Add someone" class="add-person-input" v-model="newPerson" /></form>

    <person v-for="(person, index) in people" :key="person.name" :person="person" @remove="removePerson(index)" />
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
    newPerson: ''
  }),
  methods: {
    addPerson () {
      this.$emit('addPerson', this.newPerson)
      this.newPerson = ''
    },
    removePerson (index) {
      this.$emit('removePerson', index)
    }
  }
}
</script>

<style>
  .add-person-input {
    background: #2a2a2a;
    border: solid 1px #444;
    padding: 0.5rem 1rem;
    color: #eee;
    margin-bottom: 1rem;
    display: block;
    width: 100%;
  }
</style>
