<script>
import {isTextItem, isInfoItem, TextItem, TextNode} from '@/views/editor/EditorItemClass'
import textItem from '@/views/editor/textItem'
import infoItem from '@/views/editor/infoItem'

export default {
  components: {},
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    _list() {
      const list = []
      for (let i = 0; i < this.value.length; i++) {
        const item = this.value[i]
        list.push(item)
        // list.push(Object.freeze(item))
        if (isTextItem(item)) {
          continue
        }
        const lastItem = this.value[i + 1]
        if (!lastItem || isInfoItem(lastItem)) {
          list.push(new TextItem([new TextNode('\u200b')]))
          // list.push(Object.freeze(new TextItem([new TextNode('\u200b')])))
        }
      }
      const firstItem = this.value[0]
      if (!firstItem || isInfoItem(firstItem)) {
        list.unshift(new TextItem([new TextNode('\u200b')]))
        // list.unshift(Object.freeze(new TextItem([new TextNode('\u200b')])))
      }
      return list
    }
  },
  render(c) {
    return c('div',
        {
          class: 'editor',
        },
        this._list.map((item,itemIndex) => {
          const component = isTextItem(item) ? textItem : isInfoItem(item) ? infoItem : null
          const propName = isTextItem(item) ? 'textItem' : isInfoItem(item) ? 'infoItem' : ''
          return c(component, {props: {[propName]: item,textItemIndex:itemIndex}})
        }))
  },
  methods:{}
}
</script>

<style lang="scss">
.editor {
  -webkit-user-modify: read-only;
  height: 100px;
  border: 1px solid bisque;
  padding: 0;

  * {
    -webkit-user-modify: read-only;
  }

  *:focus-visible {
    outline: none;
  }

  .info-item .plain-text:focus-visible{
    background: #e5e5e5;
  }
  .plain-text {
    -webkit-user-modify: read-write;
  }

}
</style>
