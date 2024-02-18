<template>
  <div class="container">
    <el-popover
        :value="popoverVisible"
        placement="bottom"
        width="400"
        trigger="manual"
    >
      <el-radio-group v-model="dateType" style="margin-bottom: 30px;">
        <el-radio-button label="year">年</el-radio-button>
        <!--<el-radio-button label="quarter">季度</el-radio-button>-->
        <el-radio-button label="month">月</el-radio-button>
      </el-radio-group>
      <el-input v-model="value" slot="reference" @focus="popoverVisible=true" style="width: 200px"/>
      <div class="date-panel" ref="datePanel"></div>
    </el-popover>
  </div>
</template>

<script>
import {DatePicker} from 'element-ui'
import Vue from 'vue'

export default {
  components: {},
  data() {
    return {
      popoverVisible: false,
      dateType: 'year',
      value: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }
        ]
      },
    }
  },
  methods: {
    appendDatePicker() {
      if (this.datePicker && this.datePicker.popperElm) {
        this.datePicker.popperElm.parentNode.removeChild(this.datePicker.popperElm)
      }
      const datePicker = new Vue(DatePicker).$mount()
      this.datePicker = datePicker
      datePicker.$on('input', (v) => {
        this.value = v
        datePicker.value = this.value
        this.popoverVisible = false
      })
      datePicker.format = 'yyyy-MM-dd'
      datePicker.valueFormat = 'yyyy-MM-dd'
      datePicker.type = this.dateType
      datePicker.align = 'right'
      datePicker.pickerOptions = this.pickerOptions
      this.$nextTick(() => {
        datePicker.showPicker()
        const datePickerEl = datePicker.popperElm
        datePickerEl.style.border = 'none'
        const panel = datePickerEl.querySelector('.el-picker-panel__body-wrapper')
        const panelTables = panel.querySelectorAll('.el-date-table,.el-year-table,.el-month-table')
        panelTables.forEach(el => {
          el.style.width = '100%'
        })
        this.$refs.datePanel.innerHTML = ''
        this.$refs.datePanel.appendChild(panel)
      })
    }
  },
  mounted() {
    this.$watch('dateType', this.appendDatePicker, {
      immediate: true
    })
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 500px;
}
</style>
