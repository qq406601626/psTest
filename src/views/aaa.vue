<template>
<div class="aaa">
  <span>value:{{value}}</span>
  <el-input v-model="value"></el-input>
</div>
</template>

<script>
export default {
  data(){
    return {
      value:''
    }
  }
}
</script>

<style scoped>

</style>
