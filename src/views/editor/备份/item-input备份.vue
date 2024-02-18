<template>
  <label class="editor-item" >
    <span class="bracket left-bracket" ref="leftBracket">【</span>
    <input
        class="label"
        type="text"
        value="11111"
        ref="label"
        :style="{width:`${iptWidth}px`}"
        @input="handlerIpt"
        placeholder="请输入aaaa"
    />
    <span class="bracket right-bracket" ref="rightBracket">】</span>
  </label>
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
      iptWidth: 50
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
    handlerIpt(e) {
      const {value} = e.target
      const hideIpt = document.createElement('input')
      hideIpt.type = 'text'
      hideIpt.value = value || '请输入aaaa'
      hideIpt.style.width = 0
      hideIpt.style.height = 0
      hideIpt.style.visibility = 'hidden'
      document.body.appendChild(hideIpt)
      this.iptWidth = hideIpt.scrollWidth
      document.body.removeChild(hideIpt)
    }
  },
  mounted() {

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

    //background: pink;
  }

  .label {
    -webkit-user-modify: read-write;
    outline: none;
    border: none;
    appearance: none;
    height: 14px;
    line-height: 14px;
    margin: 0;
    padding: 0;
    min-width: 0;

    &:focus {
      background: #e5e5e5;
    }
  }
}
</style>
