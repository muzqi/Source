/**
 * @Author:      oydc
 * @DateTime:    2017-10-26 10:24:06
 * @Description: 中国地图
 * @Last Modified By:   oydc
 * @Last Modified Time:    2017-10-26 14:24:06
 */

import echarts from 'echarts'
import 'echarts/map/js/china.js'
import inIcon from './images/in-icon.png'
import outIcon from './images/out-icon.png'

export default class ChinaMap {
  constructor(selector) {
    this.chart = echarts.init(document.getElementById(selector))
  }

  render(data) {
    const enterData = data.inTianjin

    const enterDataBak = enterData.map(item => {
        return [
            item, { name: '重庆市' }
        ]
    })
    const outData = data.outTianjin
    const outDataBak = outData.map(item => {
        return [
            { name: '重庆市' },
            item
        ]
    })

    var geoCoordMap = {
      '新疆维吾尔自治区': [84.9023, 42.148],
      '西藏自治区': [87.8695, 31.6846],
      '内蒙古自治区': [115.5977, 43.3408],
      '青海省': [95.2402, 35.4199],
      '四川省': [101.9199, 30.1904],
      '黑龙江省': [126.1445, 46.7156],
      '甘肃省': [96.7129, 40.166],
      '云南省': [101.0652, 25.1807],
      '广西省': [107.7813, 23.6426],
      '湖南省': [111.5332, 27.3779],
      '陕西省': [108.5996, 32.7396],
      '广东省': [113.4668, 22.9976],
      '吉林省': [125.7746, 43.5938],
      '河北省': [115.4004, 39.4688],
      '湖北省': [112.2363, 31.1572],
      '贵州省': [106.6113, 26.9385],
      '山东省': [118.7402, 36.4307],
      '江西省': [116.0156, 27.29],
      '河南省': [113.0668, 33.8818],
      '辽宁省': [122.0438, 41.0889],
      '山西省': [112.5121, 37.6611],
      '安徽省': [117.2461, 32.0361],
      '福建省': [118.3008, 25.9277],
      '浙江省': [120.498, 29.0918],
      '江苏省': [119.8586, 32.915],
      '重庆市': [107.7539, 29.1904], // 位置有手动偏移
      '宁夏回族自治区': [105.9961, 36.3096],
      '海南省': [109.9512, 19.2041],
      '台湾省': [121.0254, 23.5986],
      '北京市': [116.4551, 40.2539],
      '天津市': [117.4219, 39.4189],
      '上海市': [121.4648, 31.2891],
      '香港特别行政区': [114.1178, 22.3242],
      '澳门特别行政区': [112.5547, 21.1484]
    }

    var convertData = function(data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
          var dataItem = data[i]
          var fromCoord = geoCoordMap[dataItem[0].name]
          var toCoord = geoCoordMap[dataItem[1].name]
          if (fromCoord && toCoord) {
              res.push({
                  fromName: dataItem[0].name,
                  toName: dataItem[1].name,
                  coords: [fromCoord, toCoord],
                  value: dataItem[0].value && dataItem[0].value || (dataItem[1].value && dataItem[1].value)
              });
          }
      }
      return res
    }

      var color = ['#ffe801', '#00feff'];
      var series = [];
      [
          ['来津人员', enterDataBak]
      ].forEach(function(item, i) {
          series.push({
              name: item[0],
              type: 'lines',
              zlevel: 1,
              symbol: i == 0 ? ['circle', 'none'] : ['none', 'circle'],
              symbolSize: 25,
              coordinateSystem: 'geo',
              polyline: false,
              effect: {
                  show: true,
                  period: 8,
                  trailLength: 0,
                  color: '#fff',
                  symbol: `image://${ i === 0 ? inIcon : outIcon }`,
                  symbolSize: 50
              },
              lineStyle: {
                  normal: {
                      color: color[i],
                      width: 2,
                      curveness: 0.2
                  }
              },
              label: {
                  normal: {
                      show: false,
                      color: '#fff',
                      fontSize: 16,
                      formatter: function(item) {
                          return item.data.value
                      },
                      position: i == 0 ? 'start' : 'end',
                      verticalAlign: 'top',
                      align: 'center',
                      padding: [15, 0, 0, 0]
                  }
              },
              data: convertData(item[1])
          }, {
              name: item[0],
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                  brushType: 'stroke'
              },
              label: {
                  normal: {
                      show: true,
                      position: 'top',
                      formatter: '{b}',
                      color: '#fff',
                      fontSize: 24
                  }
              },
              symbolSize: function(val) {
                  item[1].sort(function(a, b) {
                      return b[i].value - a[i].value
                  })
                  const max = item[1][0][i].value
                  const r = 12 + 10 * val[2] / max
                  return r;
              },
              itemStyle: {
                  normal: {
                      color: color[i]
                  }
              },
              data: item[1].map(function(dataItem) {
                  return {
                      name: dataItem[i].name,
                      value: geoCoordMap[dataItem[i].name].concat([dataItem[i].value])
                  };
              })
          });
      });

      var option = {
          backgroundColor: 'rgba(255,255,255,0)',
          title: {
              show: false,
              text: '模拟迁徙',
              subtext: '数据纯属虚构',
              left: 'center',
              textStyle: {
                  color: '#fff'
              }
          },
          tooltip: {
              trigger: 'item',
              show: false
          },
          legend: {
              orient: 'vertical',
              x: 100,
              y: 800,

              data: ['来津人员', '离津人员'],
              textStyle: {
                  color: '#fff'
              },
              selectedMode: 'single',
              show: false
          },
          geo: {
              map: 'china',
              aspectScale: 1,
              layoutCenter: ['50%', '50%'],
              layoutSize: 1650,
              label: {
                  normal: {
                      show: false,
                      color: '#fff',
                      fontSize: 16 
                  },
                  emphasis: {
                      show: true,
                      color: '#fff',
                      fontSize: 16
                  }
              },
              roam: false,
              itemStyle: {
                  normal: {
                      areaColor: 'none', // #0937a4
                      borderColor: 'none' // #0ccfff
                  },
                  emphasis: {
                      areaColor: '#0937a4'
                  }
              },

          },
          series: series
      };

      this.chart.setOption(option)
  }
}