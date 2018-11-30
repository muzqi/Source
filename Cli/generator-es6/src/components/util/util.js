import * as d3 from 'd3'
import { originToDeformation } from '@/util/zoom/zoom'

/**
 * 随机生成svg defs中元素的ID
 * 
 * @return 随机生成的ID
 */
export const genSVGDocID = ( () => {
  let id = 1
  return () => {
    let prefix = new Date().valueOf()
    return `hyfe-${prefix}-${id++}`
  }
})()

/**
 *  颜色插值
 *  @example: ['#2c75e1', '#e953ff']
 *  @param    {array}  color 颜色值
 *  @return   {function}  颜色填充值
 */
export const interpolate = (color) => {
  return d3.interpolate(color[0], color[1])
}

/**
 * 没有数据时，显示暂无数据
 * @param {document} container 容器
 * @param {object} object 容器宽度和高度 
 * @return {null} null
 */
export const isNoData = (container, { width, height } ) => {
  container.html('')
  container.append('text')
    .html('暂无数据') 
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .attr('font-size', 22)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
}

/**
 * 获取鼠标真实位置，缩放后鼠标位置可能会存在偏差，需要进行适当的转换
 *  @return   {array}  x,y坐标位置
 */
export const getMousePosition = () => {
  let pos = originToDeformation([d3.event.offsetX , d3.event.offsetY - 60])
  return{
    x: pos[0],
    y: pos[1]
  }
}
