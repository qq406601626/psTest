<template>
  <el-scrollbar style="height: 400px">
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </el-scrollbar>
</template>
<script>
// import {Table} from 'element-ui'
export default {
  // extends:Table
}
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  text-align: center;
  border-radius: 4px;
  background: rosybrown;
  color: saddlebrown;
}
</style>
