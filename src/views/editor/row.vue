<template>
  <p class="edit-row" @keydown.enter.prevent="aaa">
    <slot/>
  </p>
</template>

<script>
import {Row} from '@/views/editor/EditorItemClass'

export default {
  inject:['editor'],
  props:{
    rowItem:{
      type:Object,
      default(){
        return {}
      }
    },
    rowItemIndex:Number
  },
  methods:{
    aaa(){
      this.editor.value.splice(this.rowItemIndex,0,new Row())
      this.$nextTick(()=>{
        const selection = window.getSelection()
        selection.collapse(this.editor._rows[this.rowItemIndex+1].$el,0)
      })
    }
  }
}
</script>

<style scoped>

</style>
