class Row{
    constructor() {
        this.childList = []
    }
}
class TextNode {
    constructor() {
        this.value = undefined
        this.type = 'text'
    }
}


class InfoItem {
    constructor() {
        this.textNode = new TextNode()
        this.type = 'info-item'
        this.value = undefined
    }
}
const isTextNode = (item)=>item.type ==='text'



const isInfoItem = (item)=>item.type ==='info-item'

const shallowRef = (list)=>list.map(item=>Object.freeze(item))
export {
    Row,
    TextNode,
    InfoItem,
    isTextNode,
    isInfoItem,
    shallowRef
}
