<template>
  <div class="person" :class="{ unavailable: !person.available }" @click="click">
    {{ person.name }}

    <button @click.stop="remove" class="delete">delete</button>
  </div>
</template>

<script>
export default {
  name: 'person',
  props: {
    person: {
      name: String,
      available: Boolean
    }
  },
  methods: {
    click () {
      this.$set(this.$props.person, 'available', !this.$props.person.available)
    },
    remove () {
      this.$emit('remove')
    }
  }
}
</script>

<style>
  .person {
    cursor: pointer;
    font-size: 1.2rem;
    border: solid 1px #444;
    background: #2a2a2a;
    padding: 0.5rem 1rem;
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

  .delete {
    float: right;
    background: #3a3a3a;
    border: solid 1px #444;
    color: #aaa;
  }
</style>
