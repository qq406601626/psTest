<template>
  <div
      class="editor"
      @keydown="handlerKeyDown"
      ref="editor"
      @click.capture="focused = true"
  >
    <template v-for="(item,itemIndex) in _list">
      <span
          v-if="isPlainTextNode(item)"
          :key="`plain-text-${itemIndex}`"
          class="plain-text"
          ref="plainTextNode"
          v-observe="item"
      >
      </span>
      <editor-item v-if="isInfoNode(item)" :key="`editor-item-${itemIndex}`" :item="item"></editor-item>
    </template>
    <!--<button @click="print">{{_list[2].value}}</button>-->
  </div>
</template>

<script>
import {TextItem, InfoItem} from './EditorItemClass'
import observe from '@/views/editor/Observe'
/**
 * 1：点击括号中的内容，内容要高亮
 * 2：可以整体删除
 * 3：有label时显示label，没有label时显示placeholder
 * */

import editorItem from './editorItem'
import Vue from 'vue'

// [text]
// [node] => [text,node,text]
// [node,node] => [text,node,text,node,text]
// [text,node,text]

export default {
  components: {editorItem},
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      focused: false
    }
  },
  computed: {
    _list() {
      const list = []
      for (let i = 0; i < this.list.length; i++) {
        const item = this.list[i]
        list.push(item)
        if (this.isPlainTextNode(item)) {
          continue
        }
        const lastItem = this.list[i + 1]
        if (!lastItem || this.isInfoNode(lastItem)) {
          list.push(new TextItem())
        }
      }
      const firstItem = this.list[0]
      if (!firstItem || this.isInfoNode(firstItem)) {
        list.unshift(new TextItem())
      }
      return Vue.observable(list)
    }
  },
  watch: {
    // list(v) {
    //   // 如果没有focus过,那么则把焦点放在$el最后
    //   // 如果focus过,如果父元素是$el,那么把$el focus,否则设置text元素的焦点
    //
    //   // this.$nextTick(() => {
    //   //   const selection = window.getSelection()
    //   //   if(this.focused){
    //   //     // selection.anchorNode.focus()
    //   //     const {anchorNode,anchorOffset} = selection
    //   //     anchorNode.parentNode === this.$el? this.$el.focus():selection.collapse(anchorNode,anchorOffset)
    //   //   }else {
    //   //     selection.collapse(this.$el, Math.max(0, this.$el.childNodes.length))
    //   //   }
    //   //   // console.log( window.getSelection())
    //   //   // if (this.focused) {
    //   //   //   const selection = window.getSelection()
    //   //   //   selection.anchorNode.focus()
    //   //   //   // this.$el.focus()
    //   //   // } else {
    //   //   //   // const selection = window.getSelection()
    //   //   //   selection.collapse(this.$el, Math.max(0, this.$el.childNodes.length))
    //   //   // }
    //   // })
    // }
  },
  methods: {
    isPlainTextNode(item) {
      return item.type === 'text'
    },
    isInfoNode(item) {
      return item.type === 'info'
    },
    print() {
      console.log(this._list[2].value)
    },
    handlerKeyDown(e) {
      this.focused = true
      if (e.keyCode !== 8) {
        return
      }
      const selection = window.getSelection()
      const {anchorNode, anchorOffset} = selection
      if (anchorNode === this.$el && this.$el.childNodes.length) {
        this.$el.removeChild(this.$el.childNodes[anchorOffset - 1])
      }
    },
  },
  directives: {
    ...observe
  }
}
</script>

<style scoped lang="scss">
.editor {
  -webkit-user-modify: read-only;
  height: 100px;
  border: 1px solid bisque;
  padding: 0px;

  *:focus-visible {
    outline: none;
  }

  .plain-text {
    -webkit-user-modify: read-write;
  }
}
</style>
