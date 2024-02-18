<template>
  <div class="container">
    <div class="table-wrap">
      <custom-table :data="list" :height="600">
        <custom-table-column label="姓名" prop="name" width="800"/>
        <custom-table-column label="年龄" prop="age" width="800"/>
      </custom-table>
    </div>
  </div>
</template>

<script>
import customTable from './custom-table'
import customTableColumn from './custom-table/table-column'
export default {
  components:{customTable,customTableColumn},
  data() {
    return {
      list:Array(30).fill({
        name:'zhangsan',
        age:18
      })
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style >
.el-scrollbar__wrap::-webkit-scrollbar{
  display: none;
}
.el-scrollbar__bar.is-vertical:hover,.el-scrollbar__bar.is-vertical:active{
  width: 20px !important;
}
.el-scrollbar__bar.is-horizontal:hover,.el-scrollbar__bar.is-horizontal:active{
  height: 20px !important;
}
.table-wrap{
  width: 800px;
}
</style>
