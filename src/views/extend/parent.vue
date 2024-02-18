<template>
<div class="parent-container">
  <el-button @click="print">user.name:{{user.name}}</el-button>
</div>
</template>

<script>
export default {
  data(){
    return {
      user:{
        name:'zhangsan',
        age:18
      }
    }
  },
  methods:{
    print(){
      console.log(this.user.name)
    }
  }
}
</script>

<style scoped>

</style>
