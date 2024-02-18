<template>
  <div class="selection-area" :style="_selectionAreaStyle" />
</template>

<script>
/**
 * row,
 * column,
 * cell,
 * event
 * */
class Position {
  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
}
class Point {
  constructor() {
    this.row = null
    this.column = null
    this.cell = null
    this.event = null
    this.position = new Position()
  }
}

export default {
  props: {
    visible: Boolean,
    points: {
      type: Object,
      default() {
        return {
          startPoint: new Point(),
          endPoint: new Point()
        }
      }
    }
  },
  computed: {
    _startPoint() {
      const startPoint = this.points.startPoint
      if (!startPoint) {
        return new Point()
      }
      const { cell } = startPoint
      return {
        ...startPoint,
        position: new Position(cell.offsetLeft, cell.offsetTop, cell.clientWidth, cell.clientHeight)
      }
    },
    _endPoint() {
      const endPoint = this.points.endPoint
      if (!this.points.endPoint) {
        return new Point()
      }
      const { cell } = endPoint
      return {
        ...endPoint,
        position: new Position(cell.offsetLeft, cell.offsetTop, cell.clientWidth, cell.clientHeight)
      }
    },
    _selectionArea() {
      const minX = Math.min(this._startPoint.position.x, this._endPoint.position.x)
      const minY = Math.min(this._startPoint.position.y, this._endPoint.position.y)
      const maxX = Math.max(this._startPoint.position.x + this._startPoint.position.w, this._endPoint.position.x + this._endPoint.position.w)
      const maxY = Math.max(this._startPoint.position.y + this._startPoint.position.h, this._endPoint.position.y + this._endPoint.position.h)
      return {
        minX, minY, maxX, maxY
      }
    },
    _selectionAreaStyle() {
      const { minX, minY, maxX, maxY } = this._selectionArea
      return {
        left: `${minX}px`,
        top: `${minY}px`,
        width: `${maxX - minX}px`,
        height: `${maxY - minY}px`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.selection-area {
  position: absolute;
  border: 1px solid blue;
  background: rgba(0, 0, 255, 0.3);
  pointer-events: none;
}
</style>
