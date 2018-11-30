/**
 * @Author:      zhanghq
 * @DateTime:    2018-01-05 15:24:07
 * @Description: 物
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2018-01-05 15:24:07
 */

import { fetch } from '@/util/request'
import DirtCount from '@/components/dirtCount'
import ChinaMap from '@/components/chinaMap'
 
export default class Matter {
  /**
   *  构造函数
   */
  constructor() {
    this.dirtCount = new DirtCount('.templates2 .pages-top')
    this.chinaMap = new ChinaMap('china-map')
  }

  /**
   *  渲染
   *  @return   {void}   
   */
  render() {
    const self = this
    // 获取脏物总数数据
    fetch('fetchPeopleCount', data => {
      self.dirtCount.render(data.count)
    })
    // 获取地图数据
    fetch('fetchChinaMap', data => {
      console.log(data)
      self.chinaMap.render(data.chinaMap)
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
