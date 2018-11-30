/**
 * @Author:      zhanghq
 * @DateTime:    2018-01-05 15:33:36
 * @Description: 地图主文件渲染
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2018-01-05 15:33:36
 */

import $ from 'jquery'
import People from './people.js' 
import Matter from './matter.js'
import Case from './case.js'
import Nav from '@/components/nav'

export default class Index {
  /**
   *  构造函数
   */
  constructor() {
    // 人、物、案导航
    this.nav = new Nav('.pages-header')
    this.people = new People()
    this.matter = new Matter()
    this.case = new Case()
  }
 
  /**
   *  事件绑定
   *  @return   {void}   
   */
  bindEvent() {
    // 点击人、物、案导航
    $('.page3-nav').on('click', 'li', (evt) => {
      const $this = $(evt.target)
      let index = $this.index()  
      $('.page3-nav').find('li').eq(index).addClass('active').siblings().removeClass('active')
      $('.templates').hide()
      $(`.templates${index + 1}`).show()
    })
  }

  /**
   *  初始化
   *  @return   {void}   
   */
  init() {
    this.matter.render()
    this.people.render()
    this.case.render()
    this.bindEvent()
  }
}
