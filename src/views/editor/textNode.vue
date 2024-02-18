<template>
  <span class="plain-text">{{textItem.value}}</span>
</template>
<script>


export default {
  props: {
    textItem: {
      type: Object,
      default() {
        return {}
      }
    },
  },

  computed:{

  },
  methods:{

  },
  directives:{
  }
}
</script>
