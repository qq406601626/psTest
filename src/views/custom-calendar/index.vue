<template>
  <div class="calendar-container">
    <el-button style="position: absolute;z-index: 99;top: 0;left: 0" @click="print">print</el-button>
    <diy-table
        ref="table"
        :data="_list"
        border
        height="100vh"
        :cell-class-name="getCellClassName"
        @selection-change="handlerSelectionChange"
    >
      <el-table-column
          v-for="(label,value) in valueMap"
          :key="value"
          :prop="value"
          :label="label"
          #default="{row}"
      >
        <span>{{ row[value].data.date }}</span>
      </el-table-column>
    </diy-table>
  </div>
</template>

<script>
import moment from 'moment'
import chunk from 'lodash/chunk'
import keyBy from 'lodash/keyBy'
import diyTable from './table'

export default {
  components:{diyTable},
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    height: {
      type: [String, Number],
      default: 'auto'
    }
  },
  data() {
    return {
      valueMap: {1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '日'},
    }
  },
  computed: {
    _list() {
      const list = this.list.map(item => {
        return {
          data: item,
          day: moment(item.date).day() || 7,
          isSelected: false
        }
      })
      const rowData = chunk(list, 7)
      const rows = rowData.map(itemList => {
        return keyBy(itemList, 'day')
      })
      return rows
    }
  },
  methods: {
    print(){
      console.log(this._list)
    },
    getCellClassName({row, column}) {
      return row[column.property].isSelected ? 'selected-cell' : ''
    },
    handlerSelectionChange(newList,oldList){
      oldList.forEach(item=>item.isSelected= false)
      newList.forEach(item=>item.isSelected= true)
    },
  },
}
</script>

<style lang="scss">
.calendar-container {
  .el-table__cell {
    &.selected-cell{
      background: red !important;
    }
  }
}
</style>
