/**
 * @Author:      zhanghq
 * @DateTime:    2018-01-05 15:30:02
 * @Description: 案
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2018-01-05 15:30:02
 */

import { fetch } from '@/util/request'
import CaseCount from '@/components/caseCount'
import { AreaHeatMap } from '@/components/heatMap/'

export default class Case {
  /**
   *  构造函数
   */
  constructor() {
    this.caseCount = new CaseCount('.templates3 .pages-top')
    const config = {
      mark: false
    }
    this.areaHeatMap = new AreaHeatMap('.templates3 .area-heat-map', config)
  }

  /**
   *  渲染
   *  @return   {[type]}  [description]
   */
  render() {
    const self = this
    // 顶部总数
    fetch('fetchPeopleCount', data => {
      self.caseCount.render(data.count)
    })

    // 热力图数据
    fetch('fetchHeatmap', data => {
      this.areaHeatMap.render(data)
    })
  }

  /**
   *  渲染
   *  @param    {object}  data 数据
   *  @return   {void}   
   */
  init() {
    this.render()
  }
}
