import {TextNode, BrNode} from '@/views/editor/EditorItemClass'
import {log} from "qrcode/lib/core/galois-field";

const obConfig = {
    subtree: true,
    characterData: true,
    childList: true
}

const map = new Map()

const emit = (node, closetClassName) => {
    let parent = node.parentNode
    while (parent && !parent.classList.contains(closetClassName)) {
        parent = parent.parentNode;
    }
    if (parent && parent.classList.contains(closetClassName)) {
        const {_editorItem, _context, _updateProp} = parent;
        _editorItem && (_editorItem[_updateProp] = node.nodeValue);
        _context && _context.$emit('input', _context._list)
    }
}

const isObserveNode = (node) => {
    return node && !!node?.classList?.contains('plain-text')
}

const getObserveNode = (target) => {
    if (!target) {
        return null
    }
    while (target && !isObserveNode(target)) {
        target = target.parentNode
    }
    return isObserveNode(target) ? target : null
}

let a = 0
const obCallback = (mutationsList) => {
    a += 1
    if (a > 20) {
        return
    }
    const childNodeList = []
    const observeNode = getObserveNode(mutationsList[0]?.target)
    if (observeNode) {
        const {childNodes} = observeNode
        childNodes.forEach(({nodeName, nodeValue}) => {
            if (nodeName === '#text') {
                childNodeList.push(new TextNode(nodeValue))
            }
            if (nodeName === 'BR') {
                childNodeList.push(new BrNode())
            }
        })
        const {_editorItem, _context} = observeNode
        // _editorItem && (_editorItem.childNodeList = childNodeList);
        // _context && _context._editor.$emit('input', _context._editorList)
        if(_editorItem){
            _editorItem.childNodeList.length = 0
            childNodeList.forEach(item=>_editorItem.childNodeList.push(item))
        }
        _context && _context._editor.$emit('input', _context._editorList)
    }


}
const observer = new MutationObserver(obCallback)
const observe = (el, {value: editorItem}, vnode) => {
    el._editorItem = editorItem
    el._context = vnode.context
    observer.observe(el, obConfig)
}

export default observe

