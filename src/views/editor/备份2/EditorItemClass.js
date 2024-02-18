class TextNode {
    constructor(value) {
        this.value = value
        this.type = 'text'
    }
}

class BrNode {
    constructor() {
        this.type = 'br'
    }
}

class Item {
    constructor(value, type) {
        this.value = value
        this.type = type
    }
}

class TextItem extends Item {
    constructor(childNodeList) {
        super(undefined, 'text-item');
        delete this.value
        this.childNodeList = childNodeList || []
    }
}

class InfoItem extends Item {
    constructor(textItem) {
        super(undefined, 'info-item');
        this.textItem = textItem
    }
}

const isTextNode = (item)=>item.type ==='text'

const isBrNode = (item)=>item.type ==='br'

const isTextItem = (item)=>item.type ==='text-item'

const isInfoItem = (item)=>item.type ==='info-item'
const refModel = (list)=>list.map(item=>Object.freeze(item))
export {
    TextNode,
    BrNode,
    TextItem,
    InfoItem,
    isTextNode,
    isBrNode,
    isTextItem,
    isInfoItem,
    refModel
}

