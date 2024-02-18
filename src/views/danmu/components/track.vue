<template>
  <div class="barrage-track">
    <el-button @click="test">test</el-button>
    <barrage
        v-for="(barrageItem,barrageItemIndex) in displayingBarrageList"
        :key="barrageItemIndex"
        ref="barrage"
    >
      <slot :barrageItem="barrageItem" :barrageItemIndex="barrageItemIndex"></slot>
    </barrage>
  </div>
</template>

<script>

import barrage  from "./barrage"
export default {
  components: {barrage},
  inject: ['barragePanel'],
  provide() {
    return {
      barrageTrack: this
    }
  },
  data() {
    return {
      currentBarrage:null,
      nextBarrageData:{
        content:'',
        width:''
      },
      displayingBarrageList:[]
    }
  },
  methods:{
    test(){
      this.getNextBarrage()
    },
    setCurrentBarrage(barrage){
      this.currentBarrage = barrage
      this.displayingBarrageList.push(barrage)
    },
    setNextBarrage(barrage){
      this.nextBarrageData.content = barrage
      const barrageVnode = this.$scopedSlots.default({barrage})
      const barrageDom =  this.__patch__(null,barrageVnode[0])
      this.barragePanel.$refs.prepareBarrageBox.innerHTML = barrageDom.outerHTML
      this.nextBarrageData.width = this.barragePanel.$refs.prepareBarrageBox.scrollWidth
      console.log(this.nextBarrageData.width)
    },
    getCurrentBarrage(){
      this.barragePanel.$emit('giveOut',this.setCurrentBarrage)
    },
    getNextBarrage(){
      this.barragePanel.$emit('giveOut',this.setNextBarrage)
    },
  },
  computed: {},
  created() {

  }
}
</script>

<style lang="scss" scoped>
.barrage-track{
  display: flex;
}
</style>
