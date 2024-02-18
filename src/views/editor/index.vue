<template>
  <div class="editor">
    <row
        ref="row"
        v-for="(rowItem,rowItemIndex) in value"
        :key="rowItemIndex"
        :row-item="rowItem"
        :row-item-index="rowItemIndex"
    >
      <template v-for="(childItem,childItemIndex) in rowItem.childList">
        <text-node
            v-if="isTextNode(childItem)"
            :key="`text-node-${rowItemIndex}-${childItemIndex}`"
            :text-item="childItem"/>
        <info-item
            v-if="isInfoItem(childItem)"
            :key="`info-item-${rowItemIndex}-${childItemIndex}`"
            :info-item="childItem"/>
      </template>
    </row>
  </div>
</template>
<script>
import row from './row'
import textNode from './textNode'
import {isTextNode, isInfoItem} from './EditorItemClass'
import InfoItem from "./infoItem";

export default {
  components: { row, textNode,InfoItem},
  provide(){
    return {
      editor:this
    }
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed:{
    _rows(){
      return this.$refs.row
    }
  },
  methods: {
    isTextNode,
    isInfoItem
  }
}
</script>

<style lang="scss">
.editor {
  -webkit-user-modify: read-write;
  height: 100px;
  border: 1px solid bisque;
  padding: 0;

  //* {
  //  -webkit-user-modify: read-only;
  //}

  *:focus-visible {
    outline: none;
  }

  .edit-row {
    //-webkit-user-modify: read-write;
    margin: 0;
  }


}
</style>
