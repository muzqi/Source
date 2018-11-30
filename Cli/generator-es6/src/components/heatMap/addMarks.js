/**
 * @Author:      zhanghq
 * @DateTime:    2017-12-12 14:48:06
 * @Description: 添加地区名字
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2017-12-12 14:48:06
 */

import d3 from 'd3'
import _ from 'lodash'
import icon1 from './images/icon1.png' 
import icon2 from './images/icon2.png' 
import icon3 from './images/icon3.png' 
import icon4 from './images/icon4.png' 
import icon5 from './images/icon5.png' 
import icon6 from './images/icon6.png' 
import icon7 from './images/icon7.png' 
const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7]
 
export default class addMarks {

  /**
   * 地图默认配置项
   * @return {object} 默认配置项
   */
  defaultSetting () {
    return{
      itemStyle: {
        image: {
          width: 66,
          height: 101
        }
      },
      fontStyle: {
        size: 16,
        color: '#fff'
      }

    }  
  }

  /**
   * Creates an instance of AddAreaName
   * @param {string} selector 容器元素选择器
   * @param {object} opt 图表组件配置项
   */
  constructor(selector, opt) {
    const defaultSetting = this.defaultSetting()
    this.config = _.merge({}, defaultSetting, opt)
    this.selector = selector
    const { width, height, mapClass } = this.config  
    this.svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height) 
      .attr('class', `${mapClass}-names-svg`)
  }

  /**
   *  渲染地区名字
   *  @param    {object}  data 区域数据
   *  @return   {void}  
   */
  render(data) {
    const self = this
    // 获取update部分
    let update = self.svg.selectAll('g')
      .data(data)
    // 获取enter部分  
    let enter = update.enter().append('g')
    // 处理enter部分
    enter.append('image')
    // 处理update部分 
    update.call(::self.setGroupAttribute) 
    update.select('image')
      .call(::self.setImageAttribute)
     
  }

  /**
   *  g元素属性设置
   *  @param    {g}  g g元素
   *  @return   {void}  
   */
  setGroupAttribute(g) {
    const self = this 
    const { width: rWidth, height: rHeight } = self.config.itemStyle.image
    g.attr('class', (d) => `name-${d.id} name-group`)
      .attr('fill', 'rgba(17, 27, 142, 0.9)')
      .attr('transform', (d) => `translate(${d.x - rWidth / 2}, ${d.y - rHeight / 2})`)
  }

  /**
   *  rect元素属性设置
   *  @param    {rect}  rect rect元素
   *  @return   {void}  
   */
  setImageAttribute(image) {
    const self = this
    const { itemStyle } = self.config
    const { width: rWidth, height: rHeight } = itemStyle.image
    let index = -1
    image.attr('class', 'image')
      .attr('width', rWidth)
      .attr('height', rHeight)
      .attr('xlink:href', () => {
        index ++ 
        if(index === icons.length){
          index = 0
        }
        return icons[index]
      }) 
  }
}
