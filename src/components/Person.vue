<template>
  <div class="person" :class="{ unavailable: !person.available }" @click.self="click">
    <span class="name" @click="click">{{ person.name }}</span>

    <div class="button-container">
      <button @click="editing = true" class="button">edit</button>
      <button @click="remove" class="button">delete</button>
    </div>

    <edit-person v-if="editing" @finished="finishedEditing" :person="person" />
  </div>
</template>

<script>
import EditPerson from './EditPerson.vue'
export default {
  components: { EditPerson },
  name: 'person',
  props: {
    person: {
      id: Number,
      name: String,
      available: Boolean
    }
  },
  data: () => ({
    editing: false
  }),
  methods: {
    click () {
      this.$set(this.$props.person, 'available', !this.$props.person.available)
    },
    remove () {
      this.$store.dispatch('people/removePerson', this.person.id)
    },
    finishedEditing () {
      this.editing = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .person {
    cursor: pointer;
    font-size: 1.2rem;
    border: solid 1px #444;
    background: #2a2a2a;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      padding-right: 1rem;
      min-width: 0;
    }

    .button {
      background: #3a3a3a;
      border: solid 1px #444;
      color: #aaa;
      margin-left: 0.5rem;
    }
    .button-container {
      margin-left: auto;
    }
  }
  .person:not(:last-child) {
    border-bottom: none;
  }
  .person:nth-child(odd) {
    background: #333;
  }

  .unavailable {
    text-decoration: line-through;
    color: #aaa;
  }
</style>
