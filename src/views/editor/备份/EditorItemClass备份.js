class EditorItem{
    constructor(value,type) {
        this.value = value
        this.type = type
    }
}
class BrNode {
    constructor() {
       this.type = 'br'
    }
}

class TextNode extends EditorItem{
    constructor(value) {
        super()
    }
}

class TextItem extends  EditorItem{
    constructor(value) {
        super(value,'text');
        this.childList = []
    }
}

class InfoItem extends  EditorItem{
    constructor(label,value) {
        super(value,'info');
        this.label = label
        this.placeholder=`请输入${label}`
    }
}





export  {TextItem,InfoItem}
