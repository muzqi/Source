/*
 * @Author: liqi@hiynn.com 
 * @Date: 2017-12-28 23:08:04 
 * @Description: 出口
 * @Last Modified by: funlee
 * @Last Modified time: 2017-12-29 02:06:00
 */

import './index.css'
import theme from './theme'
import * as charts from '@/components/charts/index'
import { fetch } from '@/util/request'

const barAndLine = new charts.BarAndLine('#caseTrend', {
  isGird: 'false',
  svg: {
    width: 1125,
    height: 650
  },
  barLegendTexts: ['同比', '环比'],
  lineLegendTexts: ['趋势'],
  legendOffsetRate: 0.13,
  lineLegend: {
    left: 412
  },
  styles: theme
})

export default function render() {
  fetch('fetchCaseTrend', d => {
    barAndLine.render(d.compare, [d.trend])
  })
}
