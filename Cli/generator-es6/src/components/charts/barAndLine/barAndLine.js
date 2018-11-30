/*
 * @Author: 李祁 
 * @Date: 2017-12-08 00:02:51 
 * @Last Modified by: funlee
 * @Last Modified time: 2017-12-29 02:07:01
 */
import d3 from 'd3'
import theme from './theme'
import { deepClone, randomString } from '../util/util'
import { linearGradient } from '../util/filter/gradient'
import { xOrdinalAxis, yLinearAxis } from '../util/axis/index'

export default class BarAndLine {
  /**
   * 组装配置
   * @param  {Object} opt 自定义配置选项
   * @return {void}   void
   */
  defaultConfig(opt) {
    this.svg = Object.assign({
      width: 1000, height: 800
    }, opt.svg)

    this.padding = Object.assign({
      left: this.svg.width * 0.1,
      right: this.svg.width * 0.1,
      top: this.svg.height * 0.2,
      bottom: this.svg.height * 0.15
    }, opt.padding)

    this.barLegend = Object.assign({
      left: this.padding.left,
      top: this.padding.top / 2
    }, opt.barLegend)
    this.lineLegend = Object.assign({
      left: this.padding.left,
      top: this.padding.top / 2
    }, opt.lineLegend)

    this.barLegendTexts = opt.barLegendTexts || []
    this.lineLegendTexts = opt.lineLegendTexts || []
    this.legendOffsetRate = opt.legendOffsetRate || 0.1

    this.styles = Object.assign(theme, opt.styles)

    this.interpolate = opt.interpolate || 'linear'
    this.isGird = opt.isGird || 'true'
    this.duration = opt.duration || 1500
    this.format = opt.format || '{value}'
    this.AXIS = {
      width: this.svg.width - (this.padding.left + this.padding.right),
      height: this.svg.height - (this.padding.top + this.padding.bottom)
    }
  }
  /**
   * 初始化 Dom 节点
   * @param  {String} selector 选择器
   * @return {void}   void
   */
  initDom(selector) {
    let { height: axisHeight } = this.AXIS
    let { left, top } = this.padding

    // 初始化 svg 容器
    // ==============
    let svgG = d3.select(selector)
      .append('svg')
      .attr('width', this.svg.width)
      .attr('height', this.svg.height)
    this.svgG = svgG

    // svg 的填充背景色，用一个矩形代替
    // ===========================
    svgG.append('rect')
      .attr('width', this.svg.width)
      .attr('height', this.svg.height)
      .attr('fill', linearGradient(svgG, this.styles.svgFill))

    // 初始化坐标轴容器
    // ==============
    this.xAxisG = svgG.append('g')
      .attr('transform', `translate(
        ${left} ${top + axisHeight}
      )`)
    this.yAxisG = svgG.append('g')
      .attr('transform', `translate(
        ${left} ${top}
      )`)

    // 悬浮背景矩形
    // ==========
    this.hoverRect = this.svgG.append('rect')

    // 初始化柱形图容器
    // ==============
    this.rectsid = `rects${randomString(10)}`
    this.rectsG = svgG.append('g')
      .attr('id', this.rectsid)
      .attr('transform', `translate(${left} ${top})`)

    // 初始化折线容器
    // ============
    this.linesid = `lines${randomString(10)}`
    this.linesG = svgG.append('g')
      .attr('id', this.linesid)
      .attr('transform', `translate(${left} ${top})`)

    // 图例的容器
    // =========
    this.barLegendG = svgG.append('g')
      .attr('transform', `translate(
        ${this.barLegend.left}
        ${this.barLegend.top / 2}
      )`)
    this.lineLegendG = svgG.append('g')
      .attr('transform', `translate(
        ${this.lineLegend.left}
        ${this.lineLegend.top / 2}
      )`)

    // 覆盖坐标轴顶层的矩形容器
    // 用于捕获鼠标悬浮事件
    // =================
    this.coverid = `cover${randomString(10)}`
    this.coverG = svgG.append('rect')
      .attr('id', this.coverid)
      .attr('width', this.AXIS.width)
      .attr('height', this.AXIS.height)
      .attr('transform', `translate(${left} ${top})`)
      .attr('fill', 'transparent')
  }

  /**
   * 初始化实例
   * @param {String} selector 选择器
   * @param {Object} opt      自定义配置选项
   */
  constructor(selector, opt = {}) {
    this.defaultConfig(opt)
    this.initDom(selector)

    this.barStatus = []
    this.lineStatus = []
    for (let i = 0; i < this.barLegendTexts.length; i++) {
      this.barStatus.push(true)
    }
    for (let i = 0; i < this.lineLegendTexts.length; i++) {
      this.lineStatus.push(true)
    }
  }

  /**
   * 创建比例尺
   * @param  {String} type    创建什么类型的比例尺
   * @param  {Array}  dataset 数据
   * @return {void}   void
   */
  createScale(type, dataset) {
    this.xScale = d3.scale.ordinal()
      .domain(this.domain)
      .rangeBands([0, this.AXIS.width])

    // 创建柱形图的比例尺
    // ================
    if (type === 'bargraph') {
      let maxval
      let maxbox = []
      for (let chunk of dataset) {
        for (let d of chunk.value) {
          maxbox.push(d.value)
        }
      }
      maxval = d3.max(maxbox)

      this.yScale = d3.scale.linear()
        .domain([0, maxval * 1.1])
        .range([this.AXIS.height, 0])
    }

    // 创建折线图的比例尺，百分比比例尺
    // ===========================
    if (type === 'lineChart') {
      this.yScale2 = d3.scale.linear()
        .domain([0, 100])
        .range([this.AXIS.height, 0])
    }
  }

  /**
   * 绘制坐标轴
   * @param  {String} type 绘制哪个图表的坐标
   * @return {void}   void
   */
  drawAxis(type) {
    if (this.isGird === 'true') {
      this.styles.yAxis.tickSize = this.AXIS.width
      this.styles.xAxis.tickSize = this.AXIS.height
    } else if (this.isGird === 'false') {
      this.styles.yAxis.tickSize = this.AXIS.width
    }

    this.xAxisG.call(xOrdinalAxis, {
      tickOrient: this.isGird === 'true' ? 'top' : 'bottom',
      scale: this.xScale,
      styles: this.styles.xAxis
    })

    // 绘制柱形图的 y 坐标轴
    // ================
    if (type === 'bargraph') {
      this.yAxisG.call(yLinearAxis, {
        isLineShow: 'false',
        scale: this.yScale,
        styles: this.styles.yAxis,
        format: this.format,
        ticksOffset: - this.padding.left / 3
      })
    }
  }

  /**
   * 绘制柱形图总方法
   * @param  {Array} dataset 数据
   * @return {void}  void
   */
  drawBargraph(dataset) {
    // 创建比例尺
    // 绘制坐标轴
    // ==========
    this.createScale('bargraph', dataset)
    this.drawAxis('bargraph')

    // 绘制每一组矩形
    // ============
    this.drawRects(dataset)
  }

  /**
   * 绘制矩形
   * @param  {Array} dataset 数据
   * @return {void}  void
   */
  drawRects(dataset) {
    // 这是每一组矩形的包裹容器,
    // 也相当于一个父级 update，
    // 如果数据更新，会从这个 update 传入每个小矩形的 update
    // ================================================
    let rectsBox = this.rectsG.selectAll('g').data(dataset)

    rectsBox
      .enter()
      .append('g')
      .attr('transform', d => {
        return `translate(
          ${this.xScale(d.name)} 0
        )`
      })

    let update = rectsBox.selectAll('rect').data(d => d.value)
    let enter = update.enter()

    // 获取数据时，通过数据的个数，计算每个矩形的宽度
    // =======================================
    let rectLen = dataset[0].value.length

    // 每一个刻度的宽度
    let rangeBand = this.xScale.rangeBand()

    // 每一刻度可用的范围，60%
    let usableArea = rangeBand * 0.6

    // 每一颗度不可用的空间
    let disableArea = rangeBand - usableArea

    // 总的边距和单个矩形的边距
    let paddingTotal = usableArea * 0.4

    // 单个矩形的宽度
    let rectWidth = (usableArea - paddingTotal) / rectLen

    enter
      .append('rect')
      .attr('height', 0)
      .attr('y', this.AXIS.height)
      .call(:: this.setRectsAttr, {
        rectWidth, disableArea, rangeBand
      })
    update
      .call(:: this.setRectsAttr, {
        rectWidth, disableArea, rangeBand
      })
  }

  /**
   * 设置矩形的属性
   * @param  {Object} selection 选择集对象
   * @param  {Object} opt       矩形的配置选项
   * @return {void}   void
   */
  setRectsAttr(selection, opt) {
    selection
      .attr('fill', (d, i) => {
        return linearGradient(this.svgG, this.styles.bargraph.colors[i])
      })
      .transition()
      .duration(this.duration)
      .attr('x', (d, i) => {
        return i * opt.rectWidth + opt.disableArea
      })
      .attr('y', d => this.yScale(d.value))
      .attr('width', opt.rectWidth)
      .attr('height', d => {
        return this.AXIS.height - this.yScale(d.value)
      })
  }

  /**
   * 绘制柱形图总方法
   * @param  {Array} dataset 数据
   * @return {void}  void
   */
  drawLineChart(dataset) {
    // 创建比例尺
    // 绘制坐标轴
    // ==========
    this.createScale('lineChart', dataset)
    this.drawAxis('lineChart')

    this.drawLines(dataset)
  }

  /**
   * 绘制折线
   * @param  {Array} dataset 数据
   * @return {void}  void
   */
  drawLines(dataset) {
    let linePath = d3.svg.line()
      .x(d => this.xScale(d.name) + this.xScale.rangeBand() / 2)
      .y(d => this.yScale(d.value))
      .interpolate(this.interpolate)

    let update = this.linesG.selectAll('path').data(dataset)
    let enter = update.enter()
    let exit = update.exit()

    enter
      .append('path')
      .call(:: this.setLinesAttr, linePath)
    update
      .call(:: this.setLinesAttr, linePath)
    exit.remove()
  }

  /**
   * 设置折线的属性
   * @param  {Object} selection 选择集
   * @param  {Func}   linePath  路径生成器
   * @return {void}   void
   */
  setLinesAttr(selection, linePath) {
    let linesHTMLDOM = document.getElementById(this.linesid)
    let path = linesHTMLDOM.getElementsByClassName('lineChart-line')

    selection
      .classed('lineChart-line', true)
      .attr('d', linePath)
      .attr('fill', 'none')
      .attr('stroke', (d, i) => {
        return linearGradient(this.svgG, this.styles.lineChart.colors[i], 'left')
      })
      .attr('stroke-width', this.styles.lineChart.strokeWidth)
      .attr('stroke-dasharray', (d, i) => {
        let length = path[i].getTotalLength()
        return length
      })
      .attr('stroke-dashoffset', (d, i) => {
        let length = path[i].getTotalLength()
        return length
      })
      .transition()
      .duration(this.duration)
      .attr('stroke-dashoffset', 0)
  }

  /**
   * 绘制柱形图图例
   * @param  {Array} dataset       数据
   * @param  {Array} updateDataset 更新的数据
   * @return {void}  void
   */
  drawBarLegend(dataset, updateDataset) {
    let that = this

    // 建立每个图例的包裹元素，并监听点击事件
    // ================================
    let update = this.barLegendG.selectAll('g').data(dataset[0].value)
    let enter = update.enter()

    // 当fetchInterval重新渲染页面时
    // 让 status 和图例的属性恢复出厂设置
    // ==============================
    this.barStatus = []
    for (let i = 0; i < this.barLegendTexts.length; i++) {
      this.barStatus.push(true)
    }
    update.select('text')
      .attr('fill', this.styles.legend.fontFill)

    let group = enter
      .append('g')
      .attr('transform', (d, i) => {
        return `translate(
          ${i * this.svg.width * this.legendOffsetRate} 0
        )`
      })
      .style('cursor', 'pointer')
      .on('click', function (d, i) {
        // 如果点击的图例开关为 true，则改变图例的颜色为 blurFill
        // 并将开关设置为 false
        // 反之，设置为正常的颜色
        if (that.barStatus[i]) {
          d3.select(this).select('text')
            .attr('fill', that.styles.legend.blurFill)

          that.barStatus[i] = !that.barStatus[i]
        } else {          
          d3.select(this).select('text')
            .attr('fill', that.styles.legend.fontFill)

          that.barStatus[i] = !that.barStatus[i]
        }

        that.legendBarEvent(dataset, updateDataset)
      })

    // 绘制图例图标
    // ==========
    let { radius } = this.styles.legend
    group.append('circle')
      .classed('bar-circle-outer', true)
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('stroke-width', 1)
      .attr('stroke', (d, i) => {
        return linearGradient(this.svgG, this.styles.bargraph.colors[i], 'left')
      })
    group.append('circle')
      .attr('r', radius - 10)
      .attr('fill', (d, i) => {
        return linearGradient(this.svgG, this.styles.bargraph.colors[i], 'left')
      })

    // 绘制图例文字
    // ==========
    group.append('text')
      .text((d, i) => this.barLegendTexts[i])
      .attr('x', radius + 16)
      .attr('dy', '.4em')
      .attr('font-size', this.styles.legend.fontSize)
      .attr('fill', this.styles.legend.fontFill)

  }

  /**
   * 柱形图图例图标的点击事件
   * 该方法会根据 dataset 重塑 updateDataset
   * 将重新组装的数据传递给 drawLineChart 方法，以完成图表更新
   * @param  {Array} dataset       数据
   * @param  {Array} updateDataset 更新的数据 
   * @return {void}  void
   */
  legendBarEvent(dataset, updateDataset) {
    for (let [i, chunk] of dataset.entries()) {
      for (let [j, d] of chunk.value.entries()) {
        if (!this.barStatus[j]) {
          updateDataset[i].value[j].value = 0
        } else if (this.barStatus[j]) {
          updateDataset[i].value[j].value = d.value
        }
      }
    }

    this.drawBargraph(updateDataset)
  }

  /**
   * 绘制折线图图例
   * @param  {Array} dataset       数据
   * @param  {Array} updateDataset 更新的数据
   * @return {void} void
   */
  drawLineLegend(dataset, updateDataset) {
    let that = this

    // 建立每个图例的包裹元素，并监听点击事件
    // ================================
    let update = this.lineLegendG.selectAll('g').data(dataset)
    let enter = update.enter()

    // 当fetchInterval重新渲染页面时
    // 让 status 和图例的属性回复出厂设置
    // ==============================
    this.lineStatus = []
    for (let i = 0; i < this.lineLegendTexts.length; i++) {
      this.lineStatus.push(true)
    }
    update.select('text')
      .attr('fill', this.styles.legend.fontFill)

    let group = enter
      .append('g')
      .attr('transform', (d, i) => {
        return `translate(
          ${i * this.svg.width * this.legendOffsetRate} 0
        )`
      })
      .style('cursor', 'pointer')
      .on('click', function (d, i) {
        // 如果点击的图例开关为 true，则改变图例的颜色为 blurFill
        // 并将开关设置为 false
        // 反之，设置为正常的颜色
        if (that.lineStatus[i]) {
          d3.select(this).select('text')
            .attr('fill', that.styles.legend.blurFill)

          that.lineStatus[i] = !that.lineStatus[i]
        } else {          
          d3.select(this).select('text')
            .attr('fill', that.styles.legend.fontFill)

          that.lineStatus[i] = !that.lineStatus[i]
        }

        that.legendLineEvent(dataset, updateDataset)
      })

    // 绘制图例图标
    // ==========
    let { radius } = this.styles.legend
    group.append('circle')
      .classed('bar-circle-outer', true)
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('stroke-width', 1)
      .attr('stroke', (d, i) => {
        return linearGradient(this.svgG, this.styles.lineChart.colors[i], 'left')
      })
    group.append('circle')
      .attr('r', radius - 10)
      .attr('fill', (d, i) => {
        return linearGradient(this.svgG, this.styles.lineChart.colors[i], 'left')
      })

    // 绘制图例文字
    // ==========
    group.append('text')
      .text((d, i) => this.lineLegendTexts[i])
      .attr('x', radius + 16)
      .attr('dy', '.4em')
      .attr('font-size', this.styles.legend.fontSize)
      .attr('fill', this.styles.legend.fontFill)

  }

  /**
   * 图例图标的点击事件
   * 该方法会根据 dataset 重塑 updateDataset
   * 将重新组装的数据传递给 drawAreaChart 方法，以完成图表更新
   * @param  {Array} dataset       数据
   * @param  {Array} updateDataset 更新的数据 
   * @return {void}  void
   */
  legendLineEvent(dataset, updateDataset) {
    for (let [i, chunk] of dataset.entries()) {
      if (!this.lineStatus[i]) {
        for (let j1 of chunk.keys()) {
          updateDataset[i][j1].value = 0
        }
      } else if (this.lineStatus[i]) {
        for (let [j2, d] of chunk.entries()) {
          updateDataset[i][j2].value = d.value
        }
      }
    }

    this.drawLineChart(updateDataset)
  }

  /**
   * 捕获用户鼠标悬浮事件
   * @param  {Array} dataset 数据
   * @return {void}  void
   */
  hoverEvent(dataset) {
    let doc = document
    let { left, right } = this.padding
    let { width: svgWidth } = this.svg

    // 为每一个坐标轴创建一个背景矩形
    // ==========================
    this.hoverRect
      .attr('width', this.xScale.rangeBand())
      .attr('height', this.AXIS.height)
      .attr('x', this.padding.left)
      .attr('y', this.padding.top)
      .attr('fill', 'transparent')

    // 使用原生 js 选中 COVER 矩形
    // =========================
    let coverHTMLDOM = doc.getElementById(this.coverid)
    this.coverG
      .on('mousemove', () => {
        // 首先，搞那么复杂完全是为了兼容 FireFox
        // Chrome 可以使用 d3.mouse(this) 一行代码解决
        // 通过元素在页面中的实际宽度，与元素在 svg 中的相对宽度，可以求得一个比值 rate
        // 通过这个比值，可以获取减去相对页面 x 偏移量后的矩形在 svg 中的相对 x 轴偏移量
        // ==================================================================
        let coverClientWidth = coverHTMLDOM.getBoundingClientRect().width
        let coverWidth = svgWidth - (left + right)
        let rate = coverClientWidth / coverWidth

        let clientLeft = coverHTMLDOM.getBoundingClientRect().left
        let xMouse = (d3.event.x - clientLeft) / rate

        // 经过计算，当鼠标悬浮在坐标轴某一区域后
        // 返回该区域对应的下标
        // =================
        let xGroup = dataset.map(d => this.xScale(d.name))
        let index
        for (let [i, d] of xGroup.entries()) {
          if (xMouse >= d && xMouse <= d + this.xScale.rangeBand()) {
            index = i
          }
        }

        // 使用下标获取响应矩形
        // 并给该矩形填充颜色
        // ===============
        this.hoverRect
          .attr('transform', `translate(
            ${index * this.xScale.rangeBand()} 0
          )`)
          .attr('fill', this.styles.hoverRectFill)
      })
      .on('mouseout', () => {
        this.hoverRect
          .attr('fill', 'transparent')
      })
  }

  /**
   * 渲染图表
   * @param  {Array} barData  矩形图数据
   * @param  {Array} lineData 折线图的数据
   * @return {void}  void
   */
  render(barData, lineData) {
    // 定义 domain
    // ===========
    this.domain = []
    for (let d of barData) {
      this.domain.push(d.name)
    }

    /* ********** Bargraph Start ********** */
    this.barData = barData
    this.barUpdateData = deepClone(this.barData)

    // 绘制柱形图图例
    // ============
    this.drawBarLegend(this.barData, this.barUpdateData)

    // 绘制柱形图表
    // ==========
    this.drawBargraph(this.barUpdateData)
    /* ********** bargraph end ********** */

    /* ********** Line Chart Start ********** */
    this.lineData = lineData
    this.lineUpdateData = deepClone(this.lineData)

    // 绘制折线图图例
    // ============
    this.drawLineLegend(this.lineData, this.lineUpdateData)

    // 绘制折线图表
    // ==========
    this.drawLineChart(this.lineUpdateData)
    /* ********** line chart end ********** */

    // 监听用户鼠标悬浮事件
    // =================
    this.hoverEvent(this.barData)
  }
}
