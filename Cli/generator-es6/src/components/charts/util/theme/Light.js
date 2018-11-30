/*
 * @Author: 李祁 
 * @Date: 2017-12-04 09:36:38 
 * @Last Modified by: 李祁
 * @Last Modified time: 2017-12-06 15:02:54
 */
import d3 from 'd3'
let colors = d3.scale.category20()

export default {
  xAxis: {
    lineStroke: '#D0D9EA',
    lineStrokeWidth: 1,

    tickSize: 20,
    tickStroke: '#D0D9EA',
    tickStrokeWidth: 3,

    fontFill: '#6C6C6C',
    fontSize: 30
  },

  yAxis: {
    lineStroke: '#D0D9EA',
    lineStrokeWidth: 1,

    tickSize: 20,
    tickStroke: '#EAEAEA',
    tickStrokeWidth: 1,

    fontFill: '#6C6C6C',
    fontSize: 30
  },

  legend: {
    radius: 20,
    fontSize: 30,
    fontFill: '#434348',
    blurFill: '#ccc'
  },

  lineChart: {
    rCircle: 10,
    strokeWidth: 4,
    areaFill(i) {
      const color = [
        ['rgba(244, 91, 91, 1)', 'rgba(244, 91, 91, 0)'],
        ['rgba(43, 144, 143, 1)', 'rgba(43, 144, 143, 0)'],
        ['rgba(144, 238, 126, 1)', 'rgba(144, 238, 126, 0)']
      ]
      return color[i]
    } 
  },

  tooltip1: {
    width: 100,

    tltFontSize: 20,
    nameFontSize: 20,
    valFontSize: 20,

    tltColor: '#fff',
    nameColor: colors,
    valColor: '#fff',

    border: '1px solid #2B908F'
  },

  hoverRectFill: '#f3f5f9',

  svgFill: '#fff',

  colors
}
