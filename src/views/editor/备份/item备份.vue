<template>
  <span
      :class="['editor-item',{'is-focus':isFocus}]"
      @click="handlerEditorItemClick"
  >
    <span class="bracket left-bracket" ref="leftBracket">【</span>
    <!--<span class="label" ref="label">11111</span>-->
    <input type="text" value="11111" ref="label"/>
    <span class="bracket right-bracket" ref="rightBracket">】</span>
  </span>
</template>

<script>
/**
 * 1：点击括号中的内容，内容要高亮
 * 2：整体删除
 * 3：有label时显示label，没有label时显示placeholder
 * */
import Clickoutside from './outside'

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {
          label: '',
          value: '',
          placeholder: ''
        }
      }
    }
  },
  data() {
    return {
      isFocus: false
    }
  },
  computed: {
    _leftBracketNode() {
      return this.$refs.leftBracket
    },
    _labelNode() {
      return this.$refs.label
    },
    _rightBracketNode() {
      return this.$refs.rightBracket
    },
  },
  methods: {
    async handlerEditorItemClick() {
      // 点击后，要变成可编辑的
      // this.isFocus = true
      // await this.$nextTick()
      const selection = window.getSelection()
      this._labelNode.focus()
      // console.log(selection)
      // this.setPosition(selection)
    },
    setPosition(selection) {
      selection.isCollapsed ? this.setPositionByCaret(selection) : this.setPositionByRange(selection)
    },
    setPositionByRange(selection) {
    },
    // 【abc】
    setPositionByCaret(selection) {
      const {anchorNode, anchorOffset} = selection
      if (!this.$el.contains(anchorNode)) {
        return
      }
      // selection.removeAllRanges()
      // const {childNodes} = this._labelNode
      // const isEmptyNode = !childNodes.length
      // const focusNode = isEmptyNode ? this._labelNode : childNodes[0]
      // const position = isEmptyNode || this._leftBracketNode.contains(anchorNode) ? 0 : this._rightBracketNode.contains(anchorNode) ? childNodes[0].nodeValue.length - 1 : anchorOffset
      // selection.collapse(focusNode, position)


      // selection.removeAllRanges()
      if(this._leftBracketNode.contains(anchorNode) || this._rightBracketNode.contains(anchorNode)){
        setTimeout(()=>{
          console.log('aaaaaa')
          this._labelNode.focus()
        },2000)
      }
    },
  },
  directives: {Clickoutside},
}
</script>

<style scoped lang="scss">
.editor-item {
  -webkit-user-modify: read-only;
  font-size: 14px;

  .bracket {
    color: #188ffe;
    background: pink;
  }

  .label {
    -webkit-user-modify: read-write;
    &:focus-visible {
      outline: none;
    }
  }

  //&.is-focus {
  //
  //  .label {
  //    -webkit-user-modify: read-write;
  //    background: #e5e5e5;
  //  }
  //}
}
</style>
