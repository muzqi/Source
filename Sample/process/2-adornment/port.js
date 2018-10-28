const portDiagram = $(go.Diagram, 'port', {
  'initialContentAlignment': go.Spot.Center,
  'undoManager.isEnabled': true
})

// 指定被创建的连接线的模板
portDiagram.linkTemplate = $(go.Link,
  $(go.Shape, { stroke: 'black', strokeWidth: 3 })
)

// 指定被创建的节点的模板
const makePort = (portId, spot) => (
  $(go.Shape, {
    cursor: 'pointer',
    fill: 'red',
    width: 10,
    height: 10,
    alignment: spot,
    portId,
    fromLinkable: true,
    toLinkable: true
  })
)

portDiagram.nodeTemplate =
  $(go.Node, go.Panel.Spot,
    new go.Binding('position'),

    $(go.Shape, { fill: 'blue' }),

    makePort('T', go.Spot.Top),
    makePort('B', go.Spot.Bottom),
    makePort('L', go.Spot.Left),
    makePort('R', go.Spot.Right),
  )

portDiagram.model = new go.GraphLinksModel(
  [
    {
      key: '1',
      position: new go.Point(500, 0)
    },
    {
      key: '2',
      position: new go.Point(0, 0)
    }
  ]
)
