<template>
  <div class="container">
    <editor v-model="list" ref="editor"></editor>
    <el-button @click="print">print</el-button>
    <el-button @click="del">del</el-button>
    <el-button @click="add">add</el-button>
    <!--{{ aaa }}-->
  </div>
</template>

<script>
import editor from '@/views/editor'
import {TextItem, InfoItem, TextNode, BrNode, refModel} from '@/views/editor/EditorItemClass'

export default {
  components: {editor},
  data() {
    return {
      // list: Object.freeze([
      //       new InfoItem(new TextItem([new TextNode('111')])),
      //       {
      //         "type": "text-item",
      //         "childNodeList": [
      //           {
      //             "value": "dfdsf",
      //             "type": "text"
      //           }
      //         ]
      //       }
      //     ]
      // )
      // list: [
      //   new InfoItem(new TextItem([new TextNode('111')])),
      //   {
      //     "type": "text-item",
      //     "childNodeList": [
      //       {
      //         "value": "dfdsf",
      //         "type": "text"
      //       }
      //     ]
      //   }
      // ],
      // list: [
      //   Object.freeze(new InfoItem(new TextItem([new TextNode('111')]))),
      //   Object.freeze({
      //     "type": "text-item",
      //     "childNodeList": [
      //       {
      //         "value": "dfdsf",
      //         "type": "text"
      //       }
      //     ]
      //   })
      // ],
      list: refModel([
        new InfoItem(new TextItem([new TextNode('111')])),
        {
          "type": "text-item",
          "childNodeList": [
            {
              "value": "dfdsf",
              "type": "text"
            }
          ]
        }
      ]),
      // aaa: [
      //   Object.freeze({
      //     list: []
      //   })
      // ]
    }
  },
  methods: {
    print() {
      console.log(this.list)
    },
    del() {
      this.list.splice(1, 1)
    },
    add() {
      this.list.push(new InfoItem(new TextItem([new TextNode('111')])))
      // this.aaa[0].list.push({name:'111'})
      // console.log(this.aaa)
      // this.$forceUpdate()
    }
  },
}
</script>

<style scoped lang="scss">

</style>
