<template>
  <div :class="{overlay: true, hidden: !visible}" v-if="prizes.length !== 0">
    <FortuneWheel
      ref="wheel"
      class="wheel"
      :canvas="canvasOptions"
      :prizes="prizes"
      :verify="false"
      :useWeight="true"
      :duration="10000"
      @rotateEnd="onRotateEnd"
    />
  </div>
</template>

<script>
import FortuneWheel from 'vue-fortune-wheel'
import 'vue-fortune-wheel/lib/vue-fortune-wheel.css'

export default {
  name: 'wheel',
  components: {
    FortuneWheel
  },
  props: {
    people: Array,
    visible: Boolean
  },
  data: () => ({
    canvasOptions: {
      borderWidth: 6,
      borderColor: '#584b43',
      textDirection: 'vertical',
      fontSize: 20,
      textLength: 10,
      textRadius: 230,
      btnText: ''
    }
  }),
  computed: {
    prizes () {
      const results = []

      const colours = [
        '#ff5555',
        '#55ff55',
        '#5555ff',
        '#ffff55',
        '#ff55ff',
        '#55ffff'
      ]

      let id = 0
      for (const person of this.people) {
        if (!person.available) continue
        id++
        results.push({
          id: id, //* The unique id of each prize, an integer greater than 0
          name: person.name, // Prize name, display value when type is canvas (this parameter is not needed when type is image)
          value: person.name, //* Prize value, return value after spinning
          bgColor: colours[(id - 1) % colours.length], // Background color (no need for this parameter when type is image)
          color: '#111', // Font color (this parameter is not required when type is image)
          weight: 1 // Weight, if useWeight is true, the probability is calculated by weight (weight must be an integer), so probability is invalid
        })
      }

      return results
    }
  },
  methods: {
    onRotateEnd (prize) {
      this.$emit('nominate', prize.value)
    },
    spin () {
      this.$nextTick(() => this.$refs.wheel.handleClick())
    }
  },
  watch: {
    prizes () {
      this.$nextTick(() => this.$refs.wheel.drawCanvas())
    }
  }
}
</script>

<style scoped>
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
  }

  .wheel {
    width: 90%;
    left: 5%;
  }

  .hidden {
    display: none;
  }
</style>

<style>
  .fw-btn__btn {
    cursor: pointer !important;
  }
</style>
