/*
 * @Author: liqi@hiynn.com 
 * @Date: 2017-12-28 23:49:34 
 * @Description: 出口
 * @Last Modified by: funlee
 * @Last Modified time: 2017-12-29 02:02:35
 */

import './index.css'
import { fetchInterval } from '@/util/request'
import * as charts from '@/components/charts/index'
let pie = new charts.Pie('#caseOccupy', {
  isValueShow: 'false',
  svg: {
    width: 1150,
    height: 600
  },
  outerRadius: 230,
  innerRadius: 190
})

export default function render() {
  fetchInterval('fetchCaseOccupy', d => {
    let piedata = []
    for (let data of d.zhanbi) {
      piedata.push([data.name, data.value])
    }
    pie.render(piedata)
  })
}
