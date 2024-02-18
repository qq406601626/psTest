<template>
  <span class="info-item">
    <span class="bracket left-bracket" ref="leftBracket">【</span>
    <text-item :text-item="infoItem.textItem"/>
    <span class="bracket right-bracket" ref="rightBracket">】</span>
  </span>
</template>

<script>

import textItem from "@/views/editor/textItem";
export default {
  components:{textItem},
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

