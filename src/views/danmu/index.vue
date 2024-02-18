<template>
  <div class="barrage-panel" :style="_positionStyle">
    <barrage-track
        v-for="trackIndex in trackNum"
        :key="trackIndex"
        ref="barrageTrack"
    >
      <template #default="scope">
        <slot v-bind="scope"></slot>
      </template>
    </barrage-track>
    <div ref="prepareBarrageBox" style="width: 0;height: 0;visibility: hidden" />
  </div>
</template>

<script>
import barrageTrack from './components/track'

export default {
  components: {barrageTrack},
  props: {
    // todo：
    // 每次list的变化，都认为当前list为最新的数据
    barrageList: {
      type: Array,
      default() {
        return []
      }
    },
    trackNum: {
      type: Number,
      default: 3
    },
    position: {
      type: String,
      validate(v) {
        return ['full', 'top', 'middle', 'bottom'].includes(v)
      }
    },
    isSameSpeed: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      barragePanel: this
    }
  },
  data() {
    return {
      barragePoor: []
    }
  },
  computed: {
    _positionStyle() {
      return {
        justifyContent: {full: 'space-between', top: 'flex-start', middle: 'center', bottom: 'flex-end'}[this.position]
      }
    }
  },
  methods: {
    giveOutBarrage(cb) {
      if (this.barragePoor.length) {
        cb(this.barragePoor.shift())
      }
    },
    on() {
      this.$on('giveOut', this.giveOutBarrage)
    }
  },

  watch: {
    barrageList:{
      handler(v){
        this.barragePoor = this.barragePoor.concat(v)
      },
      immediate:true
    }
  },
  created() {
    this.on()
  }
}
</script>

<style lang="scss" scoped>
.barrage-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
