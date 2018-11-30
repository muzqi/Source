/**
 * @Author:      zhanghq
 * @DateTime:    2018-01-05 15:19:18
 * @Description: 案件总数统计
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2018-01-05 15:19:18
 */

import $ from 'jquery'
import hbs from './templates/index.hbs'
import './index.css'

export default class CaseCount {
  /**
   *  构造函数
   *  @param {string} selector 容器元素选择器
   */
  constructor(selector) {
    this.selector = selector
  }

  /**
   *  渲染
   *  @param    {object}  data 数据
   *  @return   {void}   
   */
  render(data) {
    $(this.selector).append(hbs(data))
  }
}
