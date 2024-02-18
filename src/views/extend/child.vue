<template>
  <el-button type="primary" @click="print">user.name:{{user.name}}</el-button>
</template>
<script>
import parent from './parent'
export default {
  extends:parent,
}
</script>

<style scoped>

</style>
