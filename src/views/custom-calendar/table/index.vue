<template>
  <div
      class="el-table table-calendar"
      :class="[{
      'el-table--fit': fit,
      'el-table--striped': stripe,
      'el-table--border': border || isGroup,
      'el-table--hidden': isHidden,
      'el-table--group': isGroup,
      'el-table--fluid-height': maxHeight,
      'el-table--scrollable-x': layout.scrollX,
      'el-table--scrollable-y': layout.scrollY,
      'el-table--enable-row-hover': !store.states.isComplex,
      'el-table--enable-row-transition': (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
    }, tableSize ? `el-table--${ tableSize }` : '']"
      @mouseleave="handleMouseLeave($event)"
      @click="handlerTableClick"
  >
    <div ref="hiddenColumns" class="hidden-columns">
      <slot/>
    </div>
    <div
        v-if="showHeader"
        ref="headerWrapper"
        v-mousewheel="handleHeaderFooterMousewheel"
        class="el-table__header-wrapper"
    >
      <table-header
          ref="tableHeader"
          :store="store"
          :border="border"
          :default-sort="defaultSort"
          :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }"
      />
    </div>
    <div
        ref="bodyWrapper"
        class="el-table__body-wrapper"
        :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
        :style="[bodyHeight]"
    >
      <div class="el-table__body-box" style="position: absolute;">
        <table-body
            :context="context"
            :store="store"
            :stripe="stripe"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :highlight="highlightCurrentRow"
            :style="{width: bodyWidth}"
            @cell-mouse-down="handlerCellMouseDown"
            @cell-mouse-enter="handlerCellMouseEnter"
            @cell-mouse-up="handlerCellMouseUp"
        />
      </div>
      <div
          v-if="!data || data.length === 0"
          ref="emptyBlock"
          class="el-table__empty-block"
          :style="emptyBlockStyle"
      >
        <span class="el-table__empty-text">
          <slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
        </span>
      </div>
      <div
          v-if="$slots.append"
          ref="appendWrapper"
          class="el-table__append-wrapper"
      >
        <slot name="append"/>
      </div>
    </div>
    <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        ref="footerWrapper"
        v-mousewheel="handleHeaderFooterMousewheel"
        class="el-table__footer-wrapper"
    >
      <table-footer
          :store="store"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :default-sort="defaultSort"
          :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }"
      />
    </div>
    <div
        v-if="fixedColumns.length > 0"
        ref="fixedWrapper"
        v-mousewheel="handleFixedMousewheel"
        class="el-table__fixed"
        :style="[{
                 width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
               },
               fixedHeight]"
    >
      <div
          v-if="showHeader"
          ref="fixedHeaderWrapper"
          class="el-table__fixed-header-wrapper"
      >
        <table-header
            ref="fixedTableHeader"
            fixed="left"
            :border="border"
            :store="store"
            :style="{
            width: bodyWidth
          }"
        />
      </div>
      <div
          ref="fixedBodyWrapper"
          class="el-table__fixed-body-wrapper"
          :style="[{
                   top: layout.headerHeight + 'px'
                 },
                 fixedBodyHeight]"
      >
        <table-body
            fixed="left"
            :store="store"
            :stripe="stripe"
            :highlight="highlightCurrentRow"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :style="{
            width: bodyWidth
          }"
        />
        <div
            v-if="$slots.append"
            class="el-table__append-gutter"
            :style="{ height: layout.appendHeight + 'px'}"
        />
      </div>
      <div
          v-if="showSummary"
          v-show="data && data.length > 0"
          ref="fixedFooterWrapper"
          class="el-table__fixed-footer-wrapper"
      >
        <table-footer
            fixed="left"
            :border="border"
            :sum-text="sumText || t('el.table.sumText')"
            :summary-method="summaryMethod"
            :store="store"
            :style="{
            width: bodyWidth
          }"
        />
      </div>
    </div>
    <div
        v-if="rightFixedColumns.length > 0"
        ref="rightFixedWrapper"
        v-mousewheel="handleFixedMousewheel"
        class="el-table__fixed-right"
        :style="[{
                 width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
                 right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : ''
               },
               fixedHeight]"
    >
      <div
          v-if="showHeader"
          ref="rightFixedHeaderWrapper"
          class="el-table__fixed-header-wrapper"
      >
        <table-header
            ref="rightFixedTableHeader"
            fixed="right"
            :border="border"
            :store="store"
            :style="{
            width: bodyWidth
          }"
        />
      </div>
      <div
          ref="rightFixedBodyWrapper"
          class="el-table__fixed-body-wrapper"
          :style="[{
                   top: layout.headerHeight + 'px'
                 },
                 fixedBodyHeight]"
      >
        <table-body
            fixed="right"
            :store="store"
            :stripe="stripe"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :highlight="highlightCurrentRow"
            :style="{
            width: bodyWidth
          }"
        />
        <div
            v-if="$slots.append"
            class="el-table__append-gutter"
            :style="{ height: layout.appendHeight + 'px' }"
        />
      </div>
      <div
          v-if="showSummary"
          v-show="data && data.length > 0"
          ref="rightFixedFooterWrapper"
          class="el-table__fixed-footer-wrapper"
      >
        <table-footer
            fixed="right"
            :border="border"
            :sum-text="sumText || t('el.table.sumText')"
            :summary-method="summaryMethod"
            :store="store"
            :style="{
            width: bodyWidth
          }"
        />
      </div>
    </div>
    <div
        v-if="rightFixedColumns.length > 0"
        ref="rightFixedPatch"
        class="el-table__fixed-right-patch"
        :style="{
        width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
        height: layout.headerHeight + 'px'
      }"
    />
    <div v-show="resizeProxyVisible" ref="resizeProxy" class="el-table__column-resize-proxy"/>
  </div>
</template>

<script>
import {Table} from 'element-ui'
import tableBody from './table-body'
import pick from 'lodash/pick'
import isObject from 'lodash/isObject'

export default {
  components: {TableBody: tableBody},
  extends: Table,
  data() {
    return {
      points: {
        startPoint: null,
        oldStartPoint: null,
        endPoint: null,
        oldEndPoint: null
      },
    }
  },
  methods: {
    handlerTableClick(e) {
      const {target} = e
      if (target === this.bodyWrapper || !this.bodyWrapper.contains(target)) {
        this.$emit('table-click-outside')
      }
    },
    handlerCellMouseDown(row, column, cell, event) {
      this.$emit('cell-mouse-down', row, column, cell, event)
      event.stopImmediatePropagation()
      this._canSelection = true
      const points = {row, column, cell, event}
      this.points.oldStartPoint = this.points.oldStartPoint ? this.points.startPoint : points
      this.points.oldEndPoint = this.points.endPoint
      this.points.startPoint = this.points.endPoint = points
    },
    handlerCellMouseEnter(row, column, cell, event) {
      if (!this._canSelection) {
        return
      }
      this.points.oldEndPoint = this.points.endPoint
      this.points.endPoint = {row, column, cell, event}
    },
    handlerCellMouseUp() {
      this._canSelection = false
      window.getSelection().removeAllRanges()
      this.$emit('cell-selection-end')
    },
    getRowIndex(row) {
      return this.data.findIndex(item => item === row)
    },
    getColumnIndex(column) {
      return this.columns.findIndex(item => item === column)
    },
    getRowItems(row) {
      return Object.values(row).filter(value => isObject(value))
    },
    getPadSelectedItem(row, startColumnIndex, endColumnIndex) {
      const selectedProps = this.columns.map(({property}) => property).slice(startColumnIndex, endColumnIndex)
      const selectedItems = pick(row, selectedProps)
      return this.getRowItems(selectedItems)
    },
    getPadLeftSelectedItems(startRowIndex, endRowIndex, startColumnIndex, endColumnIndex) {
      const row = this.data[startRowIndex]
      return this.getPadSelectedItem(row, startColumnIndex, startRowIndex === endRowIndex ? endColumnIndex + 1 : undefined)
    },
    getPadRightSelectedItems(startRowIndex, endRowIndex, endColumnIndex) {
      if (startRowIndex === endRowIndex) {
        return []
      }
      const row = this.data[endRowIndex]
      return this.getPadSelectedItem(row, 0, endColumnIndex + 1)
    },
    getSelectionItems({startPoint, endPoint}) {
      if (!startPoint || !endPoint) {
        return []
      }
      const {row: startRow, column: startColumn} = startPoint
      const {row: endRow, column: endColumn} = endPoint
      let startRowIndex = this.getRowIndex(startRow)
      let endRowIndex = this.getRowIndex(endRow)
      let startColumnIndex = this.getColumnIndex(startColumn)
      let endColumnIndex = this.getColumnIndex(endColumn)
      const isPreSelection = startRowIndex > endRowIndex || (startRowIndex === endRowIndex && startColumnIndex > endColumnIndex)
      isPreSelection && ([startRowIndex, endRowIndex, startColumnIndex, endColumnIndex] = [endRowIndex, startRowIndex, endColumnIndex, startColumnIndex])
      const padLeftItems = this.getPadLeftSelectedItems(startRowIndex, endRowIndex, startColumnIndex, endColumnIndex)
      const sliceRows = this.data.slice(Math.min(startRowIndex, endRowIndex) + 1, Math.max(startRowIndex, endRowIndex))
      const sliceRowsItems = sliceRows.map(this.getRowItems).flat(2)
      const padRightItems = this.getPadRightSelectedItems(startRowIndex, endRowIndex, endColumnIndex)
      return [...padLeftItems, ...sliceRowsItems, ...padRightItems]
    },
  },
  watch: {
    'points.endPoint': {
      handler() {
        const newList = this.getSelectionItems({
          startPoint: this.points.startPoint,
          endPoint: this.points.endPoint
        })
        const oldList = this.getSelectionItems({
          startPoint: this.points.oldStartPoint,
          endPoint: this.points.oldEndPoint
        })
        this.$emit('selection-change',newList,oldList)
      }
    }
  }
}
</script>

<style>
.table-calendar .el-table__cell *::selection {
  background: transparent;
  color: inherit;
}
</style>
