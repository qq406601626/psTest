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
    constructor(value) {
        super(value, 'text-item');
        this.childNodeList = []
    }
}

class InfoItem extends Item {
    constructor(label, value) {
        super(value, 'info-item');
        this.label = label
        this.textItem = null
    }
}
