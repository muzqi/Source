> 支持多柱形的基础柱形图表，包括图例，悬浮提示框等

## 数据结构
``` javascript
dataset = [
  // 每一块饼图的名称和值
  [ 'name', 'value' ],
  [ 'name', 'value' ]
]
```

## 调用
``` javascript
import { Pie } from '@/charts'

let pie = new Pie(selector, opt)

pie.render(dataset)
```

**selector**
图表实例化的目标节点，接收一个 css 选择器字符串参数，如 '#pie'。

**opt**
自定义配置选项；
``` javascript
// 以下属性的输出值均为默认值
// ======================
opt = {
  duration: 1500,

  isValueShow: 'true',
  isTagShow: 'true',
  centerValue: {
    isShow: 'false',
    index: 0         // 中心点的值应用第几组数据的值
  },

  // svg 元素的尺寸
  svg: {
    width: 1000,
    height: 800
  },

  // 圆的半径
  innerRadius: 0,
  outerRadius: (this.svg.height - this.svg.height * 0.1 * 2) / 2,

  // 图表的样式，可在外部定义后引入
  styles: {}
}
```

**styles**
``` javascript
const styles = {
  value: {
    fontSize: 40,
    fill: '#FFF'
  },
  tag: {
    fontSize: 30,
    fill: '#FFF',
    offset: 50,
    strokeWidth: 4
  },
  centerValue: {
    fontSize: 40,
    fill: '#FFF'
  },
  colors: [
    'rgba(43, 144, 143, 1)', 
    'rgba(144, 238, 126, 1)',
    'rgba(244, 91, 91, 1)',
    'rgba(119, 152, 191, 1)'
  ]
}
```
