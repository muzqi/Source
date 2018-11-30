/*
 * @Author: 李祁 
 * @Date: 2017-12-01 15:54:02 
 * @Last Modified by: 李祁
 * @Last Modified time: 2017-12-10 22:50:26
 */

import d3 from 'd3'

/**
 * 绘制坐标线
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       相关属性
 * @return {void}
 */
function drawLine(selection, opt) {
  selection.append('path')
    .classed('y-axis-line', true)
    .attr('d', `M0 0, 0 ${opt.size}`)
    .attr('fill', 'none')
    .attr('stroke', opt.styles.lineStroke)
    .attr('stroke-width', opt.styles.lineStrokeWidth)
    .attr('opacity', 0)
    .transition()
    .duration(opt.duration)
    .attr('opacity', 1)
}

/**
 * 设置刻度的属性
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       相关属性
 * @return {void}
 */
function setTicksAttr(selection, opt) {
  selection
    .attr('fill', 'none')
    .attr('stroke', (d, i) => {
      if (i === opt.ticks - 1) {
        return 'transparent'
      }
      return opt.styles.tickStroke
    })
    .attr('stroke-width', opt.styles.tickStrokeWidth)
    .transition()
    .duration(opt.duration)
    .attr('opacity', 1)
    .attr('d', d => {
      return `
        M0 ${d},
        ${opt.styles.tickSize} ${d}
      `
    })
}

/**
 * 绘制刻度
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       相关属性
 * @return {void}
 */
function drawTicks(selection, opt) {
  opt.ticksG.append('path')
    .attr('d', `M0 ${opt.size}, ${opt.styles.tickSize} ${opt.size}`)
    .attr('opacity', 0)
    .call(setTicksAttr, opt)
}

/**
 * 设置文字值的属性
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       相关属性
 * @return {void}
 */
function setValueTextsAttr(selection, opt) {
  selection
    .transition()
    .duration(opt.duration)
    .attr('opacity', 1)
    .attr('y', d => d)
    .tween('text', function (d) {
      let init = d3.select(this).text() * 1
      let now = opt.scale.invert(d) * 1
      return t => {
        d3.select(this)
          .text(() => {
            return init + Math.round(t * (now - init))
          })
      }
    })
}

/**
 * 设置文字的单位属性
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       相关属性
 * @return {void}
 */
function setUnitTextsAttr(selection, opt) {
  let unit = opt.format.replace('{value}', '')
  
  selection
    .text(unit)
    .attr('y', opt.size)
    .attr('opacity', 0)
    .transition()
    .duration(opt.duration)
    .attr('y', d => d)    
    .attr('opacity', 1)
}

/**
 * 绘制文字
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       相关属性
 * @return {void}
 */
function drawTexts(selection, opt) {
  let text = selection.append('text')
    .attr('x', opt.ticksOffset)
    .attr('text-anchor', 'middle')
    .attr('font-size', opt.styles.fontSize)
    .attr('fill', opt.styles.fontFill)
    .attr('dy', '.3em')

  // 添加值
  // =====
  text.append('tspan')
    .attr('id', 'y-axis-value')
    .text(0)
    .attr('y', opt.size)
    .attr('opacity', 0)
    .call(setValueTextsAttr, opt)  

  opt.update.select('text tspan#y-axis-value')
    .call(setValueTextsAttr, opt)

  // 添加单位
  // =======
  // 判断 {value} 字符是否在 format 句首
  let isStart = opt.format.startsWith('{value}')
  if (opt.format) {
    if (isStart) {
      text.append('tspan')
        .attr('dx', '.3em')   
        .attr('dy', '.2em')      
        .call(setUnitTextsAttr, opt)
    } else {
      text.insert('tspan', '#y-axis-value')
        .call(setUnitTextsAttr, opt)
      text.select('text tspan#y-axis-value')
        .attr('dx', '.6em')
        .attr('dy', '.25em')
    }
  }
}

/**
 * 绘制 x 轴坐标
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       自定义参数
 * @return {void}
 */
export default function yOrdinalAxis(selection, opt) {
  const styles = opt.styles
  const isLineShow = opt.isLineShow || 'true'
  const scale = opt.scale
  const size = d3.max(scale.range())
  const ticks = opt.ticks || 6
  const duration = opt.duration || 1500
  const format = opt.format || '{value}'
  const ticksOffset = opt.ticksOffset

  // 处理数据
  // =======
  let range = Array(ticks)
  for (let i = 0; i < ticks; i++) {
    range[i] = i * (size / (ticks - 1))
  }

  // 初始化 tick 的包裹元素 g
  // ======================
  let update = selection.selectAll('g').data(range)
  let enter = update.enter()

  let ticksG = enter
    .append('g')
    .classed('y-axis-tick', true)

  // 绘制线段
  if (isLineShow === 'true') {
    selection.call(drawLine, {
      size, styles, duration
    })
  }

  // 绘制刻度
  selection.call(drawTicks, {
    ticksG, styles, duration, ticks, size
  })

  // 绘制文字
  ticksG.call(drawTexts, {
    styles, scale, duration, size, update, format, ticksOffset
  })
}
