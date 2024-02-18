const obConfig = {
    subtree: true,
    characterData: true
}

const map = new Map()

const emit = (node,closetClassName)=>{
    let parent = node.parentNode
    while (parent && !parent.classList.contains(closetClassName)) {
        parent = parent.parentNode;
    }
    if(parent&&parent.classList.contains(closetClassName)){
        const {_editorItem,_context,_updateProp} = parent;
        _editorItem && (_editorItem[_updateProp] = node.nodeValue);
        _context && _context.$emit('input',_context._list)
    }
}


const obCallback = (mutationsList) => {
    mutationsList.forEach(({type, target}) => {
        if (type === 'characterData') {
            // emit(target,'plain-text')
            console.log(mutationsList)
        }
    })
}
const observer = new MutationObserver(obCallback)

export default {
    observe(el,{value:editorItem,arg},vnode) {
        // map.set(el,'')
        // el._editorItem = editorItem
        // el._context = vnode.context
        // el._updateProp = arg
        // observer.observe(el,obConfig)
    }
}

