<script>
import {isTextNode, isBrNode} from '@/views/editor/EditorItemClass'
import observe from '@/views/editor/Observe';

export default {
  props: {
    textItem: {
      type: Object,
      default() {
        return {}
      }
    },
    textItemIndex:Number
  },
  render(c) {
    return c('span',
        {
          class: 'plain-text',
          directives: [
            {
              name: 'observe',
              value: this.textItem,
            }
          ],
          on: {
            keydown: this.handlerKeyDown
          },
        },
        (this.textItem.childNodeList || []).map(item => {
          if (isTextNode(item)) {
            return item.value
          }
          if (isBrNode(item)) {
            return c('br')
          }
        }))
  },
  computed:{
    _editor(){
      return this.$parent
    },
    _editorList(){
      return this.$parent._list
    }
  },
  methods:{
    handlerKeyDown(e){
      if (e.keyCode !== 8) {
        return
      }
      const selection = window.getSelection()
      const { anchorOffset} = selection
      if(anchorOffset===0){
        this._editorList.splice(this.textItemIndex-1,1)
        this._editor.$emit('input',this._editorList)
      }
    }
  },
  directives:{
    observe
  }
}
</script>
