# xOrdinalAxis
绘制序数比例尺 x 坐标轴。

调用方法：
``` javascript
// 引用
import { xOrdinalAxis } from '../util/axis/index'

// 使用选择集对象调用
selection.call(xOrdinalAxis, {
  scale: scale
})
```

参数：
``` javascript
opt: {
  type: 'Light', // 可选，主题类型，默认 Light

  // 必选，由 d3.scale.ordinal 创建的比例尺函数
  scale,     
  
  // 可选，自定义主题
  styles: {
    lineStroke: '#ccc',
    lineStrokeWidth: 2,

    tickSize: 20,
    tickStroke: '#ccc',
    tickStrokeWidth: 2,

    fontSize: 30,
    fontFill: '#000'
  }
}
```

# yLinearAxis
该方法与 `xOrdinalAxis` 方法一致，增加的属性有：
1. 接收一个 `ticks` 属性，Number 类型，表示刻度的个数，默认为 6；
2. 主题中的 `tickSize` 属性，若设置为坐标轴的宽度，则为网格布局，默认为 20；
3. 接收一个 `isLineShow` 属性，String 类型，'true' || 'false'，表示是否显示参考线，默认 'true'；
4. 接收一个 `format` 属性， String 类型， `{value}mm`；*{value}* 指代的是刻度的值，*mm* 代表需要自定义添加的单位；
5. 接收一个 `ticksOffset` 属性，Number 类型，指代刻度值的偏移量；