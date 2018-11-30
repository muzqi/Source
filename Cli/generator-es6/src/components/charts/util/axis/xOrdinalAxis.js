/*
 * @Author: 李祁 
 * @Date: 2017-12-01 10:23:03 
 * @Last Modified by: 李祁
 * @Last Modified time: 2017-12-08 10:11:23
 */

/**
 * 绘制坐标线
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       相关参数
 * @return {viod}   void
 */
function drawLine(selection, opt) {
  selection
    .append('path')
    .classed('x-axis-line', true)
    .attr('d', `M 0 0, ${opt.size} 0`)
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
 * @param  {Object} opt       相关参数
 * @return {viod}   void
 */
function setTicksAttr(selection, opt) {
  selection
    .attr('stroke', opt.styles.tickStroke)
    .attr('stroke-width', opt.styles.tickStrokeWidth)
    .transition()
    .duration(opt.duration)
    .attr('opacity', 1)        
    .attr('d', d => {
      if (opt.tickOrient === 'bottom') {
        return `
          M ${d[1]} 0,
          ${d[1]} ${opt.styles.tickSize}
        `
      } else if (opt.tickOrient === 'top') {
        return `
          M ${d[1]} 0,
          ${d[1]} -${opt.styles.tickSize}
        `
      }
      
    })
}

/**
 * 绘制刻度
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       相关参数
 * @return {viod}   void
 */
function drawTicks(selection, opt) {
  // 在坐标轴末尾添加一个刻度
  // ====================
  selection.append('path')
    .classed('x-axis-end-tick', true)
    .attr('d', () => {
      if (opt.tickOrient === 'bottom') {
        return `M ${opt.size} 0, ${opt.size} ${opt.styles.tickSize}`
      } else if (opt.tickOrient === 'top') {
        return `M ${opt.size} 0, ${opt.size} -${opt.styles.tickSize}`
      }
    })
    .attr('stroke', opt.styles.tickStroke)
    .attr('stroke-width', opt.styles.tickStrokeWidth)

  opt.ticks.append('path')
    .attr('opacity', 0)      
    .attr('d', () => {
      if (opt.tickOrient === 'bottom') {
        return `M 0 0, 0 ${opt.styles.tickSize}`
      } else if (opt.tickOrient === 'top') {
        return `M 0 0, 0 -${opt.styles.tickSize}`
      }
    })
    .call(setTicksAttr, opt)
}

/**
 * 设置文字的属性
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       相关参数
 * @return {viod}   void
 */
function setTextsAttr(selection, opt) {
  selection
    .text(d => d[0])  
    .attr('text-anchor', 'middle')
    .attr('font-size', opt.styles.fontSize)
    .attr('fill', opt.styles.fontFill)
    .attr('dy', '1.5em')
    .transition()
    .duration(opt.duration)
    .attr('opacity', 1)        
    .attr('x', d => Number(opt.scale(d[0]) + Number(opt.rangeBand / 2)))
}

/**
 * 绘制文字
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       相关参数
 * @return {viod}   void
 */
function drawTexts(selection, opt) {
  selection.append('text')
    .attr('x', 0)
    .attr('opacity', 0)            
    .call(setTextsAttr, opt)

  opt.update.select('text')
    .call(setTextsAttr, opt)
}

/**
 * 绘制 x 轴坐标
 * @param  {Object} selection 选择集对象
 * @param  {Object} opt       相关参数
 * @return {viod}   void
 */
export default function xOrdinalAxis(selection, opt) {
  const styles = opt.styles
  const scale = opt.scale
  const tickOrient = opt.tickOrient || 'bottom'
  const domain = scale.domain()
  const range = scale.range()
  const rangeBand = scale.rangeBand()
  const size = domain.length * rangeBand

  const duration = opt.duration || 1500

  // 初始化 tick 的包裹元素 g
  // ======================
  let dataset = []
  for (let i = 0; i < domain.length; i++) {
    dataset.push([domain[i], range[i]])
  }

  let update = selection.selectAll('g').data(dataset)
  let enter = update.enter()

  let ticks = enter
    .append('g')
    .classed('x-axis-tick', true)

  // 绘制线段
  selection.call(drawLine, { 
    size, styles, duration
  })
  
  // 绘制刻度
  selection.call(drawTicks, {
    ticks, size, duration, styles, tickOrient
  })

  // 绘制文字
  ticks.call(drawTexts, {
    update, scale, rangeBand, styles, duration
  })
}
