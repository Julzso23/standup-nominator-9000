<template>
  <div class="overlay">
    <div class="wheel-container">
      <svg preserveAspectRatio="xMidYMid meet" :viewBox="`0 0 ${size} ${size}`" class="wheel" :style="wheelStyle" @transitionend="onRotateEnd">
        <defs>
          <clipPath id="clippath">
            <path :d="clipPath"></path>
          </clipPath>
        </defs>
        <circle :cx="halfSize" :cy="halfSize" :r="size"></circle>
        <path v-for="(path, index) in svgPaths" :key="'segment' + index" :d="path.d" :fill="path.fill"></path>
        <text v-for="(path, index) in svgPaths" :key="'label' + index" :x="5" :y="halfSize" dominant-baseline="central" :clip-path="`url(#clippath)`" :transform="`rotate(${(index + 0.5) * (360 / availablePeople.length) - 180}, ${halfSize}, ${halfSize})`">{{ path.name }}</text>
        <image v-if="wheelImage" preserveAspectRatio="xMinYMid meet" :width="size / 10" :height="size / 10" :x="size / 2 - size / 20" :y="size / 2 - size / 20" transform-origin="center" :href="wheelImage" />
      </svg>

      <div class="arrow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wheel',
  props: {
    availablePeople: Array,
    duration: Number,
    rigged: Number
  },
  data: () => ({
    winner: -1,
    size: 400
  }),
  mounted () {
    setTimeout(() => {
      if (this.rigged === null) {
        this.winner = Math.floor(Math.random() * this.availablePeople.length)
      } else {
        this.winner = this.rigged
      }
    }, 100)
  },
  computed: {
    wheelStyle () {
      return `
        transition-duration: ${this.duration}ms;
        transform: rotate(${this.angle}deg);`
    },
    halfSize () {
      return this.size / 2
    },
    colours () {
      return this.$store.state.options.colours
    },
    svgPaths () {
      const paths = []

      const defaultColours = [
        '#ff5555',
        '#55ff55',
        '#5555ff',
        '#ffff55',
        '#ff55ff',
        '#55ffff'
      ]

      for (const i in this.availablePeople) {
        const largeArc = this.availablePeople.length === 1 ? 1 : 0
        let angleSize = Math.PI * 2 / this.availablePeople.length
        if (this.availablePeople.length === 1) angleSize = Math.PI * 2 - 0.0001
        const anglePosition = angleSize * i

        let colour = '#100'
        if (this.colours.length > 0) {
          if (this.availablePeople.length % this.colours.length === 1 && parseInt(i) === this.availablePeople.length - 1) {
            colour = this.colours[1 % this.colours.length].hex
          } else {
            colour = this.colours[i % this.colours.length].hex
          }
        } else {
          if (this.availablePeople.length % defaultColours.length === 1 && parseInt(i) === this.availablePeople.length - 1) {
            colour = defaultColours[1 % defaultColours.length]
          } else {
            colour = defaultColours[i % defaultColours.length]
          }
        }

        paths.push({
          name: this.availablePeople[i].name,
          d: `
            M${this.halfSize},${this.halfSize}
            L${this.halfSize + this.halfSize * Math.cos(anglePosition)},${this.halfSize + this.halfSize * Math.sin(anglePosition)}
            A${this.halfSize},${this.halfSize} 0 ${largeArc},1 ${this.halfSize + this.halfSize * Math.cos(anglePosition + angleSize)},${this.halfSize + this.halfSize * Math.sin(anglePosition + angleSize)} z`,
          fill: colour
        })
      }

      return paths
    },
    clipPath () {
      if (this.availablePeople.length === 0) return ''

      const largeArc = this.availablePeople.length === 1 ? 1 : 0
      let angleSize = Math.PI * 2 / this.availablePeople.length
      if (this.availablePeople.length === 1) angleSize = Math.PI * 2 - 0.0001
      const anglePosition = Math.PI - (angleSize / 2)
      return `
        M${this.halfSize},${this.halfSize}
        L${this.halfSize + this.halfSize * Math.cos(anglePosition)},${this.halfSize + this.halfSize * Math.sin(anglePosition)}
        A${this.halfSize},${this.halfSize} 0 ${largeArc},1 ${this.halfSize + this.halfSize * Math.cos(anglePosition + angleSize)},${this.halfSize + this.halfSize * Math.sin(anglePosition + angleSize)} z`
    },
    angle () {
      if (this.winner === -1) return 0
      return -90 - (this.winner + Math.random()) * (360 / this.availablePeople.length) + (360 * (this.duration / 1000))
    },
    wheelImage () {
      return this.$store.state.options.wheelImage
    }
  },
  methods: {
    onRotateEnd () {
      this.$emit('onRotateEnd', this.availablePeople[this.winner])
    }
  }
}
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    .wheel-container {
      overflow: hidden;
      position: relative;
      width: 90%;

      .wheel {
        border-radius: 50%;
        overflow: hidden;
        border: solid 0.5rem #333;
        width: 100%;
      }

      .arrow {
        width: 0;
        height: 0;
        border-left: 1rem solid transparent;
        border-right: 1rem solid transparent;
        border-top: 2rem solid #333;
        position: absolute;
        top: 0.4rem;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  }
</style>
