<template>
  <span class="editor-item"  >
    <span class="bracket left-bracket" ref="leftBracket">【</span>
    <span class="label plain-text" ref="label" v-observe:label="item">{{item.label}}</span>
    <span class="bracket right-bracket" ref="rightBracket">】</span>
  </span>
</template>

<script>
/**
 * 1：点击括号中的内容，内容要高亮
 * 2：整体删除
 * 3：有label时显示label，没有label时显示placeholder
 * */
import observe from "@/views/editor/Observe";

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

  },
  directives: {
    ...observe
  }
}
</script>

<style scoped lang="scss">
.editor-item {
  -webkit-user-modify: read-only;
  font-size: 14px;

  .bracket {
    color: #188ffe;
  }

  .label {
    -webkit-user-modify: read-write;
    &:focus-visible {
      outline: none;
      background: #e5e5e5;
    }
  }

}
</style>
