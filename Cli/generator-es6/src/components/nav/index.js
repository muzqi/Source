/**
 * @Author:      zhanghq
 * @DateTime:    2018-01-05 15:21:01
 * @Description: 地图顶部导航
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2018-01-05 15:21:01
 */

import $ from 'jquery'
import hbs from './templates/index.hbs'
import './index.css'

export default class Nav {
  
  /**
   *  构造函数
   *  @param {string} selector 容器元素选择器
   */
  constructor(selector) {
    $(selector).append(hbs)
  }
}
