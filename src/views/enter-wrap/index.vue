<template>
  <div>
    <slot/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterConfig: {
        'ElInput': true,
        'ElSelect': true,
        'ElCheckbox': true,
        'ElRadio': true,
        'ElDatePicker': true,
      },
      controlData: {
        list: [],
        map: new Map(),
      }
    }
  },
  updated() {
    this.setControlDataList()
  },
  methods: {
    getMap(controlComponent) {
      return this.controlData.map.get(controlComponent)
    },
    getMapValue(controlComponent, prop) {
      const mapValue = this.getMap(controlComponent)
      return mapValue?.[prop]
    },
    setMapValue(controlComponent, data) {
      const mapValue = this.getMap(controlComponent)
      mapValue ? Object.assign(mapValue, data) : this.controlData.map.set(controlComponent, data)
    },
    dispatch(componentName, eventName, params, context) {
      let parent = context.$parent || context.$root;
      let name = parent.$options.name;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    getNextControl(controlComponent) {
      const currentCurrentControlComponentIndex = this.controlData.list.findIndex(control => control === controlComponent)
      return this.controlData.list[(currentCurrentControlComponentIndex + 1) % this.controlData.list.length]
    },
    expandControl(controlComponent) {
      const componentName = this.getComponentName(controlComponent)
      const handler = {
        'ElInput': this.expandInput,
        'ElSelect': this.expandSelect,
        'ElCheckbox': this.expandCheckbox,
        'ElRadio': this.expandRadio,
        'ElDatePicker': this.expandDatePicker,
      }[componentName]
      handler && handler(controlComponent)
    },
    expandInput(controlComponent) {
      if (!this.getMapValue(controlComponent, 'keydownCb')) {
        const el = controlComponent.getInput()
        const keydownCb = (e) => {
          if (e.key === 'Enter' && !controlComponent.isComposing) {
            controlComponent.blur()
            const nextControlComponent = this.getNextControl(controlComponent)
            this.execFocus(nextControlComponent)
            // this.dispatch('ElDatePicker','enterWrap',[],controlComponent)
          }
        }
        this.setMapValue(controlComponent, {keydownCb})
        el && el.addEventListener('keydown', keydownCb)
      }
    },
    expandSelect(controlComponent) {
      if (!this.getMapValue(controlComponent, 'selectOption')) {
        const self = this
        const selectOption = function () {
          if (!this.visible) {
            this.toggleMenu();
          } else {
            if (this.options[this.hoverIndex]) {
              this.handleOptionSelect(this.options[this.hoverIndex]);
            }
            this.blur()
            const nextControlComponent = self.getNextControl(controlComponent)
            self.execFocus(nextControlComponent)
          }
        }
        controlComponent.selectOption = selectOption.bind(controlComponent)
        this.setMapValue(controlComponent, {selectOption})
      }
    },
    expandCheckbox(controlComponent) {
      if (!this.getMapValue(controlComponent, 'keydownCb')) {
        const self = this
        const input = controlComponent.$el.querySelector('input')
        controlComponent.handFocus = function () {
          input.focus()
        }
        const keydownCb = (e) => {
          if (e.key === 'Enter') {
            input.blur()
            setTimeout(() => {
              const nextControlComponent = self.getNextControl(controlComponent)
              self.execFocus(nextControlComponent)
            }, 0)
          }
        }
        this.setMapValue(controlComponent, {keydownCb})
        input.addEventListener('keydown', keydownCb)
      }
    },
    expandRadio(controlComponent) {
      if (!this.getMapValue(controlComponent, 'keydownCb')) {
        const self = this
        const input = controlComponent.$el
        controlComponent.handFocus = function () {
          input.focus()
        }
        const keydownCb = (e) => {
          if (e.key === 'Enter') {
            input.blur()
            const nextControlComponent = self.getNextControl(controlComponent)
            self.execFocus(nextControlComponent)
          }
        }
        this.setMapValue(controlComponent, {keydownCb})
        input.addEventListener('keydown', keydownCb)
      }
    },
    expandDatePicker(controlComponent) {
      if (!this.getMapValue(controlComponent, 'handleKeydown')) {
        const self = this
        const handleKeydown = function (event) {
          const keyCode = event.keyCode;
          // ESC
          if (keyCode === 27) {
            this.pickerVisible = false;
            event.stopPropagation();
            return;
          }
          // Tab
          if (keyCode === 9) {
            if (!this.ranged) {
              this.handleChange();
              this.pickerVisible = this.picker.visible = false;
              this.blur();
              event.stopPropagation();
            } else {
              // user may change focus between two input
              setTimeout(() => {
                if (this.refInput.indexOf(document.activeElement) === -1) {
                  this.pickerVisible = false;
                  this.blur();
                  event.stopPropagation();
                }
              }, 0);
            }
            return;
          }
          // Enter
          if (keyCode === 13) {
            if (this.userInput === '' || this.displayValue === '' || this.isValidValue(this.parseString(this.displayValue))) {
              this.handleChange()
              this.pickerVisible = this.picker.visible = false
              this.blur()
              const nextControlComponent = self.getNextControl(controlComponent)
              self.execFocus(nextControlComponent)
            }
            event.stopPropagation();
            return;
          }
          // if user is typing, do not let picker handle key input
          if (this.userInput) {
            event.stopPropagation();
            return;
          }
          // delegate other keys to panel
          if (this.picker && this.picker.handleKeydown) {
            this.picker.handleKeydown(event);
          }
        }
        controlComponent.handleKeydown = handleKeydown
        this.setMapValue(controlComponent, {handleKeydown})
      }
    },
    execFocus(controlComponent) {
      if (!controlComponent) {
        return
      }
      const {focus} = controlComponent
      if (typeof focus === 'function') {
        return focus.call(controlComponent)
      }
      const {handFocus} = controlComponent
      handFocus && handFocus.call(controlComponent)
    },
    isControlComponentDisabled(controlComponent) {
      const propName = {
        'ElInput': 'inputDisabled',
        'ElSelect': 'selectDisabled',
        'ElCheckbox': 'isDisabled',
        'ElRadio': 'isDisabled',
        'ElDatePicker': 'pickerDisabled',
      }[controlComponent.$options.name]
      return controlComponent[propName]
    },
    getComponentName(controlComponent) {
      return controlComponent.$options.name
    },
    isClosest(componentName, context) {
      let parent = context.$parent
      let name = parent.$options.name
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name;
        }
      }
      return !!parent
    },
    isCanExpand(controlComponent) {
      const componentName = this.getComponentName(controlComponent)
      if (!(componentName in this.filterConfig)) {
        return false
      }
      if (this.isControlComponentDisabled(controlComponent)) {
        return false
      }
      if (componentName === 'ElInput' && this.isClosest('ElDatePicker', controlComponent)) {
        return false
      }
      if (componentName === 'ElSelect') {
        return true
      }
      return !controlComponent.readonly
    },
    getAllControlList(parentComponent) {
      const {$children = []} = parentComponent
      $children.forEach(childComponent => {
        if (childComponent) {
          if (this.isCanExpand(childComponent)) {
            this.expandControl(childComponent)
            this.controlData.list.push(childComponent)
          }
          this.getAllControlList(childComponent)
        }
      })
    },
    setControlDataList() {
      this.controlData.list = []
      this.getAllControlList({$children: this.$slots.default.map(node => node.componentInstance)})
    },
  },
  mounted() {
    this.setControlDataList()
  }
}
</script>


