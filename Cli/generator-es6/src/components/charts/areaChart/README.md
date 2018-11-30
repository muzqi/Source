> 基础的区域折线图

## 数据结构
``` javascript
dataset = [
  [
    {
      name: 1, value: 0
    },
    // ...
  ],
  
  [
    {
      name: 1, value: 0
    },
    // ...
  ],
  // ...
]
```

## 调用
``` javascript
import { AreaChart } from '@/charts'

let areaChart = new AreaChart(selector, opt)

areaChart.render(dataset)
```

**selector**
图表实例化的目标节点，接收一个 css 选择器字符串参数，如 '#lineChart'。

**opt**
自定义配置选项；
``` javascript
// 以下属性的输出值均为默认值
// ======================
opt = {
  // 字符串，是否以网格方式显示坐标系；
  isGird: 'true',   

  // 折线的类型，area 表示显示区域折线
  type: 'area',

  // y 轴坐标值的单位
  format: '{value}',

  interpolate: 'line',
  duration: 1500,
  
  // 图例偏移比率
  legendOffsetRate: 0.1,
  
  // 图例的文字
  legendText: [],

  // 图例的坐标信息
  legend: {
    left: this.padding.left,
    top: this.padding.top / 2
  },

  // svg 元素的尺寸
  svg: {
    width: 1000,
    height: 800
  },

  // 边距信息，默认根据 svg 尺寸计算
  padding: {
    left: svg.width * 0.1,
    right: svg.width * 0.1,
    top: svg.height * 0.2,
    bottom: svg.height * 0.15
  },

  // 图表的样式，可在外部定义后引入
  styles: {}
}
```

**styles**
``` javascript
const styles = {
  xAxis: {
    lineStroke: '#6C6C6F',
    lineStrokeWidth: 1,

    tickSize: 20,
    tickStroke: '#6C6C6F',
    tickStrokeWidth: 1,

    fontFill: '#DEDEE1',
    fontSize: 30
  },

  yAxis: {
    lineStroke: '#606062',
    lineStrokeWidth: 1,

    tickSize: 20,
    tickStroke: '#606062',
    tickStrokeWidth: 1,

    fontFill: '#DEDEE1',
    fontSize: 30
  },

  legend: {
    width: 30,
    height: 15,
    fontSize: 30,
    fontFill: '#E0E0E3',
    blurFill: '#606063'
  },

  rCircle: 10,
  strokeWidth: 4,

  hoverRectFill: 'rgba(89, 92, 97, .24)',
  svgFill: '#2D2D2E',

  areaFills: [
    ['rgba(43, 144, 143, .72)', 'rgba(43, 144, 143, 0)'],
    ['rgba(144, 238, 126, .72)', 'rgba(144, 238, 126, 0)']
  ],
  colors: ['rgba(43, 144, 143, 1)', 'rgba(144, 238, 126, 1)']
}
```
