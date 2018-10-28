const $ = go.GraphObject.make

/******************** Node Selection Template ********************/
const nodeSelectionAdornmentTemplate =
    $(go.Adornment, go.Panel.Auto,
        $(go.Shape, {
            fill: null,
            stroke: 'yellow',
            strokeWidth: 1,
            strokeDashArray: [6, 6, 2, 2]
        }),
        $(go.Placeholder))
/******************** node selection template ********************/

/******************** Node Resize Template ********************/
const makeNodeResizeShapeOption = (cursor, alignment) => ({
    cursor,
    alignment,
    desiredSize: new go.Size(12, 12),
    fill: 'lightyellow',
    stroke: 'yellow'
})

const nodeResizeAdornmentTemplate =
    $(go.Adornment, go.Panel.Spot,
        $(go.Placeholder),
        $(go.Shape, makeNodeResizeShapeOption('nw-resize', go.Spot.TopLeft)),
        $(go.Shape, makeNodeResizeShapeOption('ne-resize', go.Spot.TopRight)),

        $(go.Shape, makeNodeResizeShapeOption('se-resize', go.Spot.BottomLeft)),
        $(go.Shape, makeNodeResizeShapeOption('sw-resize', go.Spot.BottomRight))
    )
/******************** node resize template ********************/

/******************** Node Rotate Template ********************/
const makeTopRotatingTool = () => (
    class TopRotatingTool extends go.RotatingTool {
        updateAdornments(part) {
            go.RotatingTool.prototype.updateAdornments.call(this, part)
            var adornment = part.findAdornment('Rotating')
            if (adornment !== null) {
                adornment.location = part.rotateObject.getDocumentPoint(new go.Spot(0.5, 0, 0, -30))  // above middle top
            }
        }

        rotate(newangle) {
            go.RotatingTool.prototype.rotate.call(this, newangle + 90)
        }
    }
)

const nodeRotateAdornmentTemplate =
    $(go.Adornment,
        $(go.Shape, 'Circle',
            {
                cursor: 'pointer',
                desiredSize: new go.Size(7, 7),
                fill: 'lightyellow',
                stroke: 'yellow'
            }),

        $(go.Shape,
            {
                geometryString: 'M3.5 7 L3.5 30',
                isGeometryPositioned: true,
                stroke: 'yellow',
                strokeWidth: 1.5,
                strokeDashArray: [4, 2]
            })
    )
/******************** node rotate template ********************/

const diagram = $(go.Diagram, 'diagram', {
    'initialContentAlignment': go.Spot.Center,
    'undoManager.isEnabled': true,
    'rotatingTool': $(makeTopRotatingTool())
})

/******************** Node Template ********************/
diagram.nodeTemplateMap.add('node1',
    $(go.Node, go.Panel.Position,
        { width: 230, height: 240 },

        // 选择节点装饰器
        { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
        // 调整大小装饰器
        { resizable: true, resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
        // 旋转节点装饰器
        { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
        { locationSpot: go.Spot.Center },

        new go.Binding('position'),

        // 背景图片与图标
        $(go.Panel, go.Panel.Auto,
            { position: new go.Point(0, 72) },
            $(go.Picture,
                {
                    width: 178, height: 168,
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
                    stroke: '#FFF',
                    font: 'normal bold 24px Serif',
                    position: new go.Point(80, 20)
                },
                new go.Binding('text'))
        )
    )
)

diagram.nodeTemplateMap.add('node2',
    $(go.Node, go.Panel.Vertical,
        { width: 120, height: 170 },
        new go.Binding('position'),

        // 背景图片与图标
        $(go.Panel, go.Panel.Auto,
            $(go.Picture,
                { width: 120, height: 120 },
                new go.Binding('source', 'bgSrc')),
            $(go.Picture,
                { width: 30, height: 30 },
                new go.Binding('source', 'iconSrc'))
        ),

        // 文字块
        $(go.Panel, go.Panel.Auto,
            { margin: new go.Margin(8, 0, 0, 0) },

            $(go.Picture,
                { width: 80, height: 30 },
                new go.Binding('source', 'textBgSrc')),
            $(go.TextBlock,
                { stroke: '#FFF' },
                new go.Binding('text'))
        )
    )
)
/******************** node template ********************/

/******************** Link Template ********************/
diagram.linkTemplateMap.add('link1',
    $(go.Link,
        { routing: go.Link.Normal },
        new go.Binding('routing'),
        new go.Binding('fromSpot'),
        new go.Binding('toSpot'),

        // 线段模板
        $(go.Shape,
            { strokeDashArray: [10, 20] },
            new go.Binding('stroke'),
            new go.Binding('strokeWidth')),

        // 箭头模板
        $(go.Shape,
            { stroke: 'transparent', strokeWidth: 0 },
            new go.Binding('fromArrow'),
            new go.Binding('toArrow'),
            new go.Binding('scale', 'arrowScale'),
            new go.Binding('fill', 'arrowfill')),

        // 文字块
        $(go.Panel, go.Panel.Auto,
            new go.Binding('alignmentFocus', 'textPos'),
            $(go.Shape, { fill: 'transparent' }, new go.Binding('stroke')),
            $(go.TextBlock, { margin: 10 }, new go.Binding('stroke'), new go.Binding('text'))
        )
    )
)

diagram.linkTemplateMap.add('link2',
    $(go.Link,
        { routing: go.Link.Normal },
        new go.Binding('fromSpot'),
        new go.Binding('toSpot'),

        // 线段模板
        $(go.Shape, { stroke: 'transparent' }),

        // 线段图片
        $(go.Picture,
            {
                width: 300,
                height: 20,

                // 使图片与连接线方向对齐
                segmentOrientation: go.Link.OrientUpright
            },
            new go.Binding('source', 'arrowSrc')),

        // 文字块
        $(go.TextBlock,
            {
                stroke: 'lightblue',
                alignmentFocus: new go.Spot(0.5, 2)
            },
            new go.Binding('text')
        )
    )
)
/******************** link template ********************/

const nodeDataArray = [
    {
        position: new go.Point(0, 0),
        category: 'node1',
        key: 'apply',
        bgSrc: '../src/images/circle_1.png',
        iconSrc: '../src/images/icon-apply.png',
        textBgSrc: '../src/images/text-bg-1.png',

        text: '申请'
    },

    {
        position: new go.Point(500, 0),
        category: 'node1',
        key: 'complete',
        bgSrc: '../src/images/circle_2.png',
        iconSrc: '../src/images/icon-complete.png',
        textBgSrc: '../src/images/text-bg-1.png',

        text: '完成'
    },

    {
        position: new go.Point(300, 300),
        category: 'node2',
        key: 'coor',
        bgSrc: '../src/images/circle_3.png',
        iconSrc: '../src/images/icon-feedback.png',
        textBgSrc: '../src/images/text-bg-2.png',

        text: '协调'
    }
]

const linkDataArray = [
    {
        category: 'link1',
        from: 'coor', to: 'apply',
        fromSpot: new go.Spot(0, 0.42),
        toSpot: new go.Spot(0.42, 1),

        routing: go.Link.Orthogonal,
        toArrow: 'Standard',
        arrowfill: 'orange',
        arrowScale: 2,

        stroke: 'orange',
        strokeWidth: 2,

        text: '驳回',
        textPos: new go.Spot(0, 1, -100, 20)
    },
    {
        category: 'link1',
        from: 'coor', to: 'complete',
        fromSpot: new go.Spot(1, 0.42),
        toSpot: new go.Spot(0.42, 1),

        routing: go.Link.Orthogonal,
        toArrow: 'Standard',
        arrowfill: 'lightblue',
        arrowScale: 2,

        stroke: 'lightblue',
        strokeWidth: 2,

        text: '通过',
        textPos: new go.Spot(0, 1, 130, 20)
    },
    {
        category: 'link2',
        from: 'apply', to: 'complete',
        fromSpot: new go.Spot(0.8, 0.65),
        toSpot: new go.Spot(0, 0.65),
        arrowSrc: '../src/images/arrow.png',

        text: '申请中'
    }
]

diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
