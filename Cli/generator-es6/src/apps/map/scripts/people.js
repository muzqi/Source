/**
 * @Author:      zhanghq
 * @DateTime:    2018-01-05 15:26:35
 * @Description: 人
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2018-01-05 15:26:35
 */

import { fetch } from '@/util/request'
import PeopleCount from '@/components/peopleCount'
import { AreaHeatMap } from '@/components/heatMap/'

export default class People {
  /**
   *  构造函数
   */
  constructor() {
    this.peopleCount = new PeopleCount('.templates1 .pages-top')
    this.areaHeatMap = new AreaHeatMap('.templates1 .area-heat-map')
  }

  /**
   *  渲染
   *  @return   {void}   
   */
  render() {
    const self = this

    // 顶部总数
    fetch('fetchPeopleCount', data => {
      self.peopleCount.render(data.count)
    })

    // 热力图
    fetch('fetchHeatmap', data => {
      this.areaHeatMap.render(data)
    })
  }

  /**
   *  渲染
   *  @return   {void}   
   */
  init() {
    this.render()
  }
}
