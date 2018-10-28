// [1]
const $ = go.GraphObject.make

// [2]
const diagram = $(go.Diagram, 'diagram', {
   // 令绘制的元素相对画布居中
  'initialContentAlignment': go.Spot.Center,

  // 是否可撤销编辑
  'undoManager.isEnabled': true
})

diagram.nodeTemplateMap.add('node1',
  $(go.Node,
    // 规定该节点的宽高, 内容超出会被隐藏
    { width: 230, height: 240 },

    // 绑定节点的位置属性, 用来控制节点处于画布的哪个位置
    new go.Binding('position'),

    // 背景图片与图标
    $(/*[1]*/go.Panel, /*[2]*/go.Panel.Auto,
      { position: new go.Point(0, 70) },

      $(go.Picture,
        {
          width: 178, height: 168

        },
        new go.Binding('source', 'bgSrc')),

      $(go.Picture,
        {
          width: 64, height: 64,
        },
        new go.Binding('source', 'iconSrc'))
    ),

    // 文字背景与文本信息
    $(go.Panel, go.Panel.Position,
      { position: new go.Point(50, 0) },

      $(go.Picture,
        { width: 178, height: 100 },
        new go.Binding('source', 'textBgSrc')),

      $(go.TextBlock,
        {
          stroke: '#000',
          font: 'normal bold 24px Serif',
          position: new go.Point(80, 20)
        },
        new go.Binding('text'))
    )
  )
)

diagram.linkTemplateMap.add('link1',
  $(go.Link,  // [1]
    { routing: go.Link.Normal },
    new go.Binding('routing'),
    new go.Binding('fromSpot'),
    new go.Binding('toSpot'),

    // 线段模板
    $(go.Shape,  // [2]
      { strokeDashArray: [10, 20] },
      new go.Binding('stroke'),
      new go.Binding('strokeWidth')),

    // 箭头模板
    $(go.Shape,  // [2]
      { stroke: 'transparent', strokeWidth: 0 },
      new go.Binding('fromArrow'),
      new go.Binding('toArrow'),
      new go.Binding('scale', 'arrowScale'),
      new go.Binding('fill', 'arrowfill')),

    // 文字块
    $(go.Panel, go.Panel.Auto,  // [3]
      new go.Binding('alignmentFocus', 'textPos'),
      $(go.Shape, { fill: 'transparent' }, new go.Binding('stroke')),
      $(go.TextBlock,
        { margin: 10 },
        new go.Binding('stroke'),
        new go.Binding('text'))
    )
  )
)

const nodeDataArray = [
  {
    position: new go.Point(0, 0),
    category: 'node1',
    key: '1',
    bgSrc: './src/images/circle_1.png',
    iconSrc: './src/images/icon-apply.png',
    textBgSrc: './src/images/text-bg-1.png',

    text: '申请'
  },
  {
    position: new go.Point(100, 0),
    category: 'node1',
    key: '2',
    bgSrc: './src/images/circle_1.png',
    iconSrc: './src/images/icon-apply.png',
    textBgSrc: './src/images/text-bg-1.png',

    text: '完成'
  }
]

// [4]
const linkDataArray = [
  {
    category: 'link1',
    from: '1', to: '2',  // [4]

    routing: go.Link.Normal,
    toArrow: 'DynamicWidthArrow',
    arrowfill: 'orange',
    arrowScale: 2,
    // fromSpot: new go.Spot(1, 0.5),
    // toSpot: new go.Spot(0, 0.5),

    stroke: 'orange',
    strokeWidth: 10,

    text: '驳回',
    textPos: new go.Spot(0, 1, -100, 20)
  }
]

// [5]
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)


// go.Node  go.Link
// go.Panel
// go.Shape(形状) go.Picture(图片) go.Textblock(文子块)
