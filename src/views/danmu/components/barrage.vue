<template>
  <div class="barrage" :style="_barrageStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  inject: ['barragePanel', 'barrageTrack'],
  data() {
    return {
      playState: 'running', // stop
      speed: 60,
    }
  },
  computed: {
    _barrage() {
      return this.$el
    },
    _speed() {
      if (this.barragePanel.isSameSpeed) {
        return this.speed
      }
      const max = this.speed + 20
      const min = this.speed - 20
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    _barrageStyle() {
      return {
        '--startPosition': '1000px',
        '--endPosition': '0px',
        '--duration': `${document.documentElement.clientWidth / 10 / this._speed}s`
      }
    },
  },
  // 1、当前弹幕开始播放的时候，需要准备下一条弹幕,并获取下一条弹幕的长度
  // 2、根据当前弹幕的速度和下一条弹幕的速度，如果当前弹幕的速度大于等于下一条弹幕的速度，那么取间隔时间然后通知分发弹幕。如果当前弹幕速度小于下一条弹幕的速度，那么取间隔时间个最小超速时间，然后通知分发弹幕
  methods: {
    computedElWidth() {
      return this.$el.scrollWidth
    },
    startRun() {
      this._barrage.style.animationPlayState = 'running'
    },
    stopRun() {
      this._barrage.style.animationPlayState = 'paused'
    },
    animateStart() {
      console.log('1111')
    },
    animateEnd() {

    },
    on() {
      this._barrage.addEventListener('animationstart', this.animateStart)
      this._barrage.addEventListener('animationend', this.animateEnd)
    },
    off() {
      this._barrage.removeEventListener('animationstart')
      this._barrage.removeEventListener('animationend')
    }
  },
  watch: {
    // playState: {
    //   handler(v) {
    //     ({stop: this.stopRun, running: this.startRun}[v]())
    //   },
    //   immediate: true
    // }
  },
  mounted() {
    this.on()
    this.barrageTrack.currentBarrage = this
  },
  destroyed() {
    this.off()
  }
}
</script>

<style lang="scss" scoped>
.barrage {
  --startPosition: 0px;
  --endPosition: 0px;
  --duration: 0s;
  @keyframes marquee {
    from {
      transform: translateX(var(--startPosition));
    }
    to {
      transform: translateX(var(--endPosition));
    }
  }
  animation-name: marquee;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-duration: var(--duration);
}

</style>
