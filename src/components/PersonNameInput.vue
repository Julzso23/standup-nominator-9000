<template>
  <input type="text" :placeholder="editing ? 'Name' : 'Add someone'" class="text-input" :class="error ? 'error' : ''" v-model="name" @input="nameChanged" />
</template>

<script>
export default {
  name: 'person-name-input',
  props: {
    editing: Boolean,
    name: String
  },
  data: () => ({
    error: false
  }),
  methods: {
    nameChanged (event) {
      this.$emit('update:name', event.target.value)
    }
  },
  watch: {
    error () {
      this.$emit('errorStateChanged', this.error)
    },
    name () {
      if (this.name === '') {
        this.error = false
        return
      }
      if (!this.name.trim()) {
        this.error = true
        return
      }
      if (this.people.find(person => person.name === this.name)) {
        this.error = true
        return
      }
      this.error = false
    }
  },
  computed: {
    people () {
      return this.$store.state.people.people
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
