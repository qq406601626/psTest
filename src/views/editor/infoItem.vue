<template>
  <span class="info-item">
    <span class="bracket left-bracket" ref="leftBracket">【</span>
     <text-node :text-item="infoItem.textNode"></text-node>
    <span class="bracket right-bracket" ref="rightBracket">】</span>
  </span>
</template>

<script>

import textNode from "@/views/editor/textNode";
export default {
  components:{textNode},
  props: {
    infoItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed: { },
  methods: {},
  directives: {}
}
</script>

