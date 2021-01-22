<template>
  <div class="person" :class="{ unavailable: !person.available }" @click="click">
    <span class="name">{{ person.name }}</span>

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

    .delete {
      margin-left: auto;
      order: 2;
      background: #3a3a3a;
      border: solid 1px #444;
      color: #aaa;
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
