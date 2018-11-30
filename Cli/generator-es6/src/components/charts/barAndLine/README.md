> 支持多柱形以及多折线的图表，包含图例，浮动提示框

## 数据结构
``` javascript
barData = [
  // 每一组柱形图
  // ==========
  {
    name: '一月',
    value: [
      // 每一组柱形图中的单独矩形队列
      // =======================
      { name: '重庆', value: 0 },
      // ...
    ]
  },
  // ...
]

// 折线图的值必须是 0 - 100 的百分比值
lineData = [
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
import { BarAndLine } from '@/charts'

let barAndLine = new BarAndLine(selector, opt)

barAndLine.render(barData, lineData)
```

**selector**
图表实例化的目标节点，接收一个 css 选择器字符串参数，如 '#bargraph'。

**opt**
自定义配置选项；
``` javascript
// 以下属性的输出值均为默认值
// ======================
opt = {
  // 必填，柱形图例的文字
  barLegendTexts: [],

  // 必填，折线图图例的文字
  lineLegendTexts: [],

  // 字符串，是否以网格方式显示坐标系；
  isGird: 'true',   

  // y 轴坐标值的单位
  format: '{value}',

  duration: 1500,
  interpolate: 'linear',
  

  // 图例偏移比率
  legendOffsetRate: 0.1,

  // 图例的坐标信息
  barLegend: {
    left: this.padding.left,
    top: this.padding.top / 2
  },
  lineLegend: {
    left: this.padding.left,
    top: this.padding.top / 2
  }

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
    radius: 10,
    fontSize: 30,
    fontFill: '#E0E0E3',
    blurFill: '#606063'
  },

  hoverRectFill: 'rgba(89, 92, 97, .24)',

  svgFill: '#2D2D2E',

  colors: [
    ['rgba(43, 144, 143, 1)', 'rgba(43, 144, 143, 0)'],
    ['rgba(144, 238, 126, 1)', 'rgba(144, 238, 126, 0)'], 
    ['rgba(244, 91, 91, 1)', 'rgba(244, 91, 91, 0)'], 
    ['rgba(119, 152, 191, 1)', 'rgba(119, 152, 191, 0)']
  ]
}
```
