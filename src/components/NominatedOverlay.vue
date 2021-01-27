<template>
  <div class="overlay">
    <div class="nominee">{{ nominee }}</div>
  </div>
</template>

<script>
export default {
  name: 'nominated-overlay',
  props: {
    nominee: String
  }
}
</script>

<style scoped>
  .overlay {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .nominee {
    color: white;
    font-size: 5rem;
    font-weight: bold;
    animation: jiggle 1s infinite;
  }

  @keyframes jiggle {
    0% {
      transform: rotate(-2deg);
    }
    50% {
      transform: rotate(2deg);
    }
    100% {
      transform: rotate(-2deg);
    }
}
</style>
