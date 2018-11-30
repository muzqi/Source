/*
 * @Author: 李祁 
 * @Date: 2017-12-08 00:02:51 
 * @Last Modified by: funlee
 * @Last Modified time: 2017-12-29 02:39:14
 */
import d3 from 'd3'
import theme from './theme'
import { deepClone, randomString } from '../util/util'
import { linearGradient } from '../util/filter/gradient'
import { xOrdinalAxis, yLinearAxis } from '../util/axis/index'

export default class AreaChart {
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

    this.legendShow = opt.legendShow || 'true'
    this.legend = Object.assign({
      left: this.padding.left,
      top: this.padding.top / 2
    }, opt.legend)
    this.legendTexts = opt.legendTexts || []
    this.legendOffsetRate = opt.legendOffsetRate || 0.1

    this.styles = Object.assign(theme, opt.styles)

    this.isGird = opt.isGird || 'true'
    this.type = opt.type || 'area'
    this.duration = opt.duration || 1500
    this.interpolate = opt.interpolate || 'linear'
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

    // 初始化区域折线容器
    // ===============
    this.areaid = `area${randomString(10)}`
    this.areaG = svgG.append('g')
      .attr('id', this.areaid)
      .attr('transform', `translate(${left} ${top})`)

    // 初始化折线容器
    // ============
    this.linesid = `lines${randomString(10)}`
    this.linesG = svgG.append('g')
      .attr('id', this.linesid)
      .attr('transform', `translate(${left} ${top})`)

    // 图例的容器
    // =========
    this.legendG = svgG.append('g')
      .attr('transform', `translate(
        ${this.legend.left}
        ${this.legend.top}
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

    this.status = []
    for (let i = 0; i < this.legendTexts.length; i++) {
      this.status.push(true)
    }
  }

  /**
   * 创建比例尺
   * @param  {Array} dataset 数据
   * @return {void}  void
   */
  createScale(dataset) {
    let domain = []
    for (let d of dataset[0]) {
      domain.push(d.name)
    }
    this.xScale = d3.scale.ordinal()
      .domain(domain)
      .rangeBands([0, this.AXIS.width])

    let maxval
    let maxbox = []
    for (let d of dataset) {
      maxbox.push(d3.max(d, data => data.value))
    }
    maxval = d3.max(maxbox)
    this.yScale = d3.scale.linear()
      .domain([0, maxval * 1.1])
      .range([this.AXIS.height, 0])
  }

  /**
   * 绘制坐标轴
   * @return {void} void
   */
  drawAxis() {
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

    this.yAxisG.call(yLinearAxis, {
      isLineShow: 'false',
      scale: this.yScale,
      styles: this.styles.yAxis,
      format: this.format,
      ticksOffset: - this.padding.left / 2
    })
  }

  /**
   * 绘制区域折线图的总方法
   * @param  {Array} dataset 数据
   * @return {void}  void
   */
  drawAreaChart(dataset) {
    // 创建比例尺
    // 绘制坐标轴
    // =========
    this.createScale(dataset)
    this.drawAxis()

    this.drawLines(dataset)

    if (this.type === 'area') {
      this.drawAreas(dataset)
    }
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
        return linearGradient(this.svgG, this.styles.colors[i], 'left')
      })
      .attr('stroke-width', this.styles.strokeWidth)
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
   * 绘制区域折线
   * @param  {Array} dataset 数据
   * @return {void}  void
   */
  drawAreas(dataset) {
    let areaPath = d3.svg.area()
      .x(d => this.xScale(d.name) + this.xScale.rangeBand() / 2)
      .y0(this.AXIS.height)
      .y1(d => this.yScale(d.value))
      .interpolate(this.interpolate)

    let update = this.areaG.selectAll('path').data(dataset)
    let enter = update.enter()
    let exit = update.exit()
    // 将数据的值都设置为0
    // 再调用 areaPath 就可以得到一个从基点开始的区域线段
    let initdata = []
    for (let d of dataset[0]) {
      initdata.push({
        name: d.name,
        value: 0
      })
    }
    let initPoints = areaPath(initdata)
    enter
      .append('path')
      .attr('d', initPoints)
      .call(:: this.setAreasAttr, areaPath)

    update
      .call(:: this.setAreasAttr, areaPath)
    exit.remove()
  }

  /**
   * 设置区域线段的属性
   * @param  {Object} selection 选择集对象
   * @param  {Func}   areaPath  路径生成器
   * @return {void}   void
   */
  setAreasAttr(selection, areaPath) {
    selection
      .classed('lineChart-area', true)
      .attr('stroke', 'none')
      .attr('fill', (d, i) => {
        return linearGradient(this.svgG, this.styles.areaFills[i])
      })
      .on('mousemove', () => {
        console.log(1)
      })
      .transition()
      .duration(this.duration / 2)
      .attr('d', areaPath)
  }
  /**
   * 绘制图例
   * @return {void} void
   */
  drawLegend() {
    let that = this
    // 建立每个图例的包裹元素，并监听点击事件
    // ================================
    let update = this.legendG.selectAll('g').data(this.dataset)
    let enter = update.enter()

    // 当fetchInterval重新渲染页面时
    // 让 status 和图例的属性回复出厂设置
    // ==============================
    this.status = []
    for (let i = 0; i < this.legendTexts.length; i++) {
      this.status.push(true)
    }
    update.select('path')
      .attr('stroke', (d, i) => {
        return linearGradient(this.svgG, this.styles.colors[i], 'left')
      })
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
        if (that.status[i]) {
          d3.select(this).select('path')
            .attr('stroke', that.styles.legend.blurFill)
          d3.select(this).select('text')
            .attr('fill', that.styles.legend.blurFill)
          that.status[i] = !that.status[i]
        } else {
          d3.select(this).select('path')
            .attr('stroke', linearGradient(that.svgG, that.styles.colors[i], 'left'))
          d3.select(this).select('text')
            .attr('fill', that.styles.legend.fontFill)
          that.status[i] = !that.status[i]
        }
        that.legendEvent()
      })
    // 绘制图例图标
    // ==========
    let { width, height } = this.styles.legend
    group.append('path')
      .attr('d', `
            M0 0, 
            ${width * 0.3333}, -${height},
            ${width * 0.6666}, 0,
            ${width}, -${height}
          `)
      .attr('fill', 'none')
      .attr('stroke-width', 4)
      .attr('stroke', (d, i) => {
        return linearGradient(this.svgG, this.styles.colors[i], 'left')
      })
    // 绘制图例文字
    // ==========
    group.append('text')
      .text((d, i) => this.legendTexts[i])
      .attr('x', width + 10)
      .attr('dy', '0')
      .attr('font-size', this.styles.legend.fontSize)
      .attr('fill', this.styles.legend.fontFill)
  }
  /**
   * 图例图标的点击事件
   * 该方法会根据 dataset 重塑 updateDataset
   * 将重新组装的数据传递给 drawAreaChart 方法，以完成图表更新
   * @return {void} void
   */
  legendEvent() {
    for (let [i, chunk] of this.dataset.entries()) {
      if (!this.status[i]) {
        for (let j1 of chunk.keys()) {
          this.updateDataset[i][j1].value = 0
        }
      } else if (this.status[i]) {
        for (let [j2, d] of chunk.entries()) {
          this.updateDataset[i][j2].value = d.value
        }
      }
    }
    this.drawAreaChart(this.updateDataset)
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
    // 因为需要用到原生 js 的 getBoundingClientRect 方法
    // ==============================================
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
        let xGroup = dataset[0].map(d => this.xScale(d.name))
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
        // 使用下标绘制提示框
        // ===============
        console.log(dataset)        
        console.log(index)
      })
      .on('mouseout', () => {
        this.hoverRect
          .attr('fill', 'transparent')
      })
  }

  /**
   * 渲染图表
   * @param  {Array} dataset 数据
   * @return {void}  void
   */
  render(dataset) {
    this.dataset = dataset
    this.updateDataset = deepClone(this.dataset)
    // 绘制图例
    // =======
    if (this.legendShow === 'true') {
      this.drawLegend()
    }
    // 绘制图表
    // =======
    this.drawAreaChart(this.updateDataset)
    // 监听用户鼠标悬浮事件
    // =================
    this.hoverEvent(this.updateDataset)
  }
}
