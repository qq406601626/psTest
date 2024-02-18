import { Table } from 'element-ui'
import { getCell, getColumnByCell } from 'element-ui/packages/table/src/util'
import { getStyle, hasClass } from 'element-ui/src/utils/dom'
import tableRow from './table-row'
const { components: { TableBody }} = Table
export default {
  extends: TableBody,
  components: { TableRow: tableRow },
  methods: {
    handlerMouseDownUp(event, row, emitType) {
      const table = this.table
      const cell = getCell(event)

      if (cell) {
        const column = getColumnByCell(table, cell)
        const hoverState = table.hoverState = { cell, column, row }
        table.$emit(emitType, hoverState.row, hoverState.column, hoverState.cell, event)
        this.$emit(emitType, hoverState.row, hoverState.column, hoverState.cell, event)
      }
    },
    handleCellMouseDown(event, row) {
      this.handlerMouseDownUp(event, row, 'cell-mouse-down')
    },
    handleCellMouseUp(event, row) {
      this.handlerMouseDownUp(event, row, 'cell-mouse-up')
    },

    handleCellMouseMove(event, row){
      this.handlerMouseDownUp(event, row, 'cell-mouse-move')
    },
    handleCellMouseEnter(event, row) {
      const table = this.table
      const cell = getCell(event)

      if (cell) {
        const column = getColumnByCell(table, cell)
        const hoverState = table.hoverState = { cell, column, row }
        table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event)
        this.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event)
      }

      // 判断是否text-overflow, 如果是就显示tooltip
      const cellChild = event.target.querySelector('.cell')
      if (!(hasClass(cellChild, 'el-tooltip') && cellChild.childNodes.length)) {
        return
      }
      // use range width instead of scrollWidth to determine whether the text is overflowing
      // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
      const range = document.createRange()
      range.setStart(cellChild, 0)
      range.setEnd(cellChild, cellChild.childNodes.length)
      const rangeWidth = range.getBoundingClientRect().width
      const padding = (parseInt(getStyle(cellChild, 'paddingLeft'), 10) || 0) +
                (parseInt(getStyle(cellChild, 'paddingRight'), 10) || 0)
      if ((rangeWidth + padding > cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth) && this.$refs.tooltip) {
        const tooltip = this.$refs.tooltip
        // TODO 会引起整个 Table 的重新渲染，需要优化
        this.tooltipContent = cell.innerText || cell.textContent
        tooltip.referenceElm = cell
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none')
        tooltip.doDestroy()
        tooltip.setExpectedState(true)
        this.activateTooltip(tooltip)
      }
    },

    handleCellMouseLeave(event) {
      const tooltip = this.$refs.tooltip
      if (tooltip) {
        tooltip.setExpectedState(false)
        tooltip.handleClosePopper()
      }
      const cell = getCell(event)
      if (!cell) return

      const oldHoverState = this.table.hoverState || {}
      this.table.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event)
      this.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event)
    },
    rowRender(row, $index, treeRowData) {
      const { treeIndent, columns, firstDefaultColumnIndex } = this
      const rowClasses = this.getRowClass(row, $index)
      let display = true
      if (treeRowData) {
        rowClasses.push('el-table__row--level-' + treeRowData.level)
        display = treeRowData.display
      }
      // 指令 v-show 会覆盖 row-style 中 display
      // 使用 :style 代替 v-show https://github.com/ElemeFE/element/issues/16995
      const displayStyle = display ? null : {
        display: 'none'
      }
      return (
        <TableRow
          style={[displayStyle, this.getRowStyle(row, $index)]}
          class={rowClasses}
          key={this.getKeyOfRow(row, $index)}
          nativeOn-dblclick={($event) => this.handleDoubleClick($event, row)}
          nativeOn-click={($event) => this.handleClick($event, row)}
          nativeOn-contextmenu={($event) => this.handleContextMenu($event, row)}
          nativeOn-mouseenter={_ => this.handleMouseEnter($index)}
          nativeOn-mouseleave={this.handleMouseLeave}
          columns={columns}
          row={row}
          index={$index}
          store={this.store}
          context={this.context || this.table.$vnode.context}
          firstDefaultColumnIndex={firstDefaultColumnIndex}
          treeRowData={treeRowData}
          treeIndent={treeIndent}
          columnsHidden={this.columnsHidden}
          getSpan={this.getSpan}
          getColspanRealWidth={this.getColspanRealWidth}
          getCellStyle={this.getCellStyle}
          getCellClass={this.getCellClass}
          handleCellMouseEnter={this.handleCellMouseEnter}
          handleCellMouseLeave={this.handleCellMouseLeave}
          handleCellMouseDown={this.handleCellMouseDown}
          handleCellMouseUp={this.handleCellMouseUp}
          handleCellMouseMove={this.handleCellMouseMove}
          isSelected={this.store.isSelected(row)}
          isExpanded={this.store.states.expandRows.indexOf(row) > -1}
          fixed={this.fixed}
        >
        </TableRow>
      )
    }
  }
}

