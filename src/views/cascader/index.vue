<template>
  <el-cascader
      v-model="_model"
      :options="options"
      :props="{ multiple: true,checkStrictly: false }"
      clearable
      collapse-tags
   />
</template>

<script>
export default {
  data() {
    return {
      value:[],
      options: [
        {
          value: '1',
          label: '指南',
          children: [
            {
              value: '11',
              label: '设计原则',
            },
            {
              value: '12',
              label: '一致'
            },
            {
              value: '13',
              label: '反馈'
            },
            {
              value: '14',
              label: '效率'
            },
            {
              value: '15',
              label: '可控'
            }
          ]
        },
        {
          value: '2',
          label: '组件',
          children: [
            {
              value: '21',
              label: 'Basic',
            },
            {
              value: '22',
              label: 'Form',
            },
            {
              value: '23',
              label: 'Data',
            },
            {
              value: '24',
              label: 'Notice',
            },
            {
              value: '25',
              label: 'Navigation',
            },
            {
              value: '26',
              label: 'Others',
            }
          ]
        }
      ]
    }
  },
  computed:{
    _model:{
      get(){
      return this.value.map(({ newClassesId, newClassesStateId }) => {
          return newClassesStateId ? [newClassesId, newClassesStateId] : [newClassesId]
        })
      },
      set(v){
        const selectedObj = {}
        v.forEach(([classedId, stateId = '']) => {
          selectedObj[classedId] = stateId
        })
        const classesList = Object.entries(selectedObj).map(([key, value]) => Object.assign({}, {
          'newClassesId': key,
          'newClassesStateId': value
        }))
        this.value = classesList
      }
    }
  },
  methods:{}
}
</script>

<style scoped>

</style>
