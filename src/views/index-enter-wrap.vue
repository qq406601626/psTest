<template>
  <div class="container">
    <enter-wrap>
      <el-input v-if="testInputVisible" v-model="testInputModel"/>
      <hr>
      <el-form
          v-if="formVisible"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
      >
        <el-form-item label="活动名称" prop="name" >
          <el-input v-model="form.name" :asyncValidate="checkInput" @input="regionDisabled=$event==='abc'"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="活动区域">
          <el-select  v-model="form.region" placeholder="请选择活动区域" :disabled="regionDisabled">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" clearable style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <!--<el-form-item label="即时配送">-->
        <!--  <el-switch v-model="form.delivery"></el-switch>-->
        <!--</el-form-item>-->
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="print" >立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="testInputVisible = !testInputVisible">change test input visible</el-button>
      <el-button @click="formVisible = !formVisible">change test form visible</el-button>
    </enter-wrap>
  </div>
</template>

<script>
// 1，不带下拉列表的，在得到焦点时，如果触发了回车键，则跳转到下一个表单项。
// 2，带下拉列表的，如果不是点击方式获取到焦点的方式，则在select-item/date-picker-item 的enter事件后，失去焦点
import enterWrap from '@/views/enter-wrap'
export default {
  components:{ enterWrap},
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules:{
        name:[{required:true,message:'请输入内容',trigger:'blur'}]
      },
      testInputVisible:false,
      testInputModel:'',
      formVisible:false,
      regionDisabled:false
    }
  },
  computed:{

  },
  methods: {
    async checkInput(){},
    print(){
      console.log(this.$refs.form)
    }
  },
  mounted() {

  },
  directives:{
    ew:{
      // bind (el, {value}, vnode) {
      //   const {componentInstance} = vnode
      //   if(!componentInstance.disabled) {
      //     // const {controlData,asyncValidate} = value
      //     // const $inputInner = componentInstance.$el.querySelector('.el-input__inner')
      //     // const keydownCb = (e)=>{
      //     //   if(e.key==='Enter'){
      //     //     $inputInner.blur()
      //     //     const nextEl = controlData.list[1]
      //     //     const nextControl = controlData.map.get(nextEl)
      //     //     nextControl.vnode.componentInstance.focus()
      //     //   }
      //     // }
      //     // $inputInner.addEventListener('keydown',keydownCb)
      //     // controlData.list.push(el)
      //     // controlData.map.set(el,{vnode,asyncValidate})
      //
      //     // const {controlData,asyncValidate} = value
      //     // const selectOption = function (){
      //     //   if (!this.visible) {
      //     //     this.toggleMenu();
      //     //   } else {
      //     //     if (this.options[this.hoverIndex]) {
      //     //       this.handleOptionSelect(this.options[this.hoverIndex]);
      //     //     }
      //     //   }
      //     //   const nextEl = controlData.list[1]
      //     //   const nextControl = controlData.map.get(nextEl)
      //     //   nextControl.vnode.componentInstance.focus()
      //     // }
      //     // componentInstance.selectOption = selectOption.bind(componentInstance)
      //     // controlData.list.push(el)
      //     // controlData.map.set(el,{vnode,asyncValidate})
      //
      //   }
      // }
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  width: 100%;
  height: 500px;
}
</style>
