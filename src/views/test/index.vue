<template>
<div class="test-container">
  <slot :userName="name"></slot>
</div>
</template>

<script>
export default {
  data(){
    return{
      name:'test'
    }
  }
}
</script>

<style scoped>

</style>
