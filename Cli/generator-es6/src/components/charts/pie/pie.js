/*
 * @Author: 李祁 
 * @Date: 2017-11-29 17:20:46 
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2017-12-29 00:48:09
 */
import d3 from 'd3'
import theme from './theme'
export default class Pie {
  /**
   * 定义默认参数
   * @param  {Object}  opt 配置参数
   * @return {Object}  返回一个对象
   */
  defaultSetting(opt) {
    this.svg = Object.assign({
      width: 500,
      height: 500
    }, opt.svg)

    this.innerRadius = opt.innerRadius || 0
    this.outerRadius = opt.outerRadius || (this.svg.height - this.svg.height * 0.1 * 2) / 2
    this.duration = opt.duration || 1500

    this.styles = Object.assign(theme, opt.styles)

    this.isValueShow = opt.isValueShow || 'true'
    this.isTagShow = opt.isTagShow || 'true'

    this.centerValue = Object.assign({
      isShow: 'false',
      index: 0
    }, opt.centerValue)
  }

  /**
   * 初始化 Dom 节点
   * @param  {String} selector 选择器
   * @return {void}   void
   */
  initDom(selector) {
    let svgG = d3.select(selector)
      .append('svg')
      .attr('width', this.svg.width)
      .attr('height', this.svg.height)
    this.svgG = svgG

    this.arcsG = svgG.append('g')
      .attr('transform', `translate(
        ${this.svg.width / 2}
        ${this.svg.height / 2}
      )`)

    this.centerValueG = svgG.append('g')
      .attr('transform', `translate(
        ${this.svg.width / 2}
        ${this.svg.height / 2}
      )`)
  }

  /**
   * 初始化实例
   * @param  {String} selector  父对象的名称
   * @param  {Object} opt       自定义选项
   * @return {void}   void
   */
  constructor(selector, opt = {}) {
    this.defaultSetting(opt)
    this.initDom(selector)
    
    // 饼图实例是否已经初始化
    this.isInit = false
  }

  /**
   * 初始化饼图布局生成器
   * 该方法只有在第一次调用 render 方法时执行
   * @param  {Array}  dataset 数据
   * @return {void}   void
   */
  initPiedata(dataset) {
    this.pie = d3.layout.pie()
      .value(d => d[1])
      .sort(null)
    this.piedata = this.pie(dataset)
  }

  /**
   * 初始化弧形的方法
   * @param  {Object} arcs     选择集
   * @param  {Func}   arcpath  路径生成器
   * @param  {Func}   colors   颜色生成器
   * @return {void}   void
   */
  initArcs({ arcs, arcpath, colors }) {
    let that = this
    arcs.append('path')
      .attr('class', 'arc')
      .attr('d', d => {
        return arcpath({
          startAngle: d.startAngle,
          endAngle: d.startAngle
        })
      })
      .attr('fill', (d, i) => colors[i])
      .style('cursor', 'pointer')
      .transition()
      .duration(this.duration)
      // 动画结束后绑定鼠标悬浮监听事件
      // =========================
      .each('end', function() {
        d3.select(this)
          .call(that.setArcsTrans, arcpath, that)
      })
      .attrTween('d', d => {
        return t => {
          let from = {
            startAngle: d.startAngle,
            endAngle: d.startAngle
          }
          let to = {
            startAngle: d.startAngle,
            endAngle: d.endAngle
          }
          let inter = d3.interpolate(from, to)
          return arcpath(inter(t))
        }
      })
  }

  /**
   * 更新弧形的方法
   * @param  {Object} update   选择集
   * @param  {Object} arcpath  路径生成器
   * @return {void} void
   */
  updateArcs({ update, arcpath }) {
    let that = this
    update
      .select('path.arc')
      .transition()
      .duration(this.duration)
      // 动画开始时移除监听器
      // 并让已经移动的弧形归位
      // ===================
      .each('start', function() {
        d3.select(this)
          .attr('transform', 'translate(0 0)')
          .on('mouseover', null)
          .on('mouseout', null)
      })
      // 动画结束后绑定监听器
      // =================
      .each('end', function() {
        d3.select(this)
          .call(that.setArcsTrans, arcpath, that)
      })
      .attrTween('d', (d, i) => {
        return t => {
          let from = {
            startAngle: this.piedata[i].laststartAngle,
            endAngle: this.piedata[i].lastendAngle
          }
          let to = {
            startAngle: this.piedata[i].startAngle,
            endAngle: this.piedata[i].endAngle
          }
          let inter = d3.interpolate(from, to)
          return arcpath(inter(t))
        }
      })
  }

  /**
   * 弧形的监听事件
   * @param  {Object} selection  选择集
   * @param  {Func}   arcpath    路径生成器
   * @param  {Object} that       颜色生成器
   * @return {void}   void
   */
  setArcsTrans(selection, arcpath, that) {
    selection
      .on('mouseover', d => {
        let centroidX = arcpath.centroid(d)[0]
        let centroidY = arcpath.centroid(d)[1]
        
        selection
          .attr('transform', 'translate(0 0)')
          .transition()
          .duration(that.duration / 2)
          .attr('transform', `translate(
            ${centroidX / 4} ${centroidY / 4}
          )`)
      })
      .on('mouseout', () => {
        selection
          .transition()
          .duration(that.duration / 2)
          .attr('transform', 'translate(0 0)')
      })
  }

  /**
   * 初始化弧形对应的值
   * @param  {Object} arcs    选择集
   * @param  {Func}   arcpath 路径生成器
   * @return {void}   void
   */
  initArcsValue({ arcs, arcpath }) {
    arcs.append('text')
      .attr('class', 'arc-value')
      .attr('text-anchor', 'middle')
      .attr('font-size', this.styles.value.fontSize)
      .attr('fill', this.styles.value.fill)
      .attr('opacity', 0)
      .transition()
      .duration(this.duration)
      .attr('opacity', 1)
      .tween('value', function () {
        return t => {
          d3.select(this)
            .attr('x', d => Number(arcpath.centroid(d)[0]) * t)
            .attr('y', d => Number(arcpath.centroid(d)[1]) * t)
            .text(d => Math.round(t * Number(d.value)))
        }
      })
  }

  /**
   * 更新弧形对应的值
   * @param  {Object} update   选择集
   * @param  {Object} arcpath  路径生成器
   * @return {void} void
   */
  updateArcsValue({ update, arcpath }) {
    let that = this
    update
      .select('text.arc-value')
      .call(this.setTextUpdateTrans, false, arcpath, that)
  }

  /**
   * 初始化标签的值
   * @param  {Object} arcs     选择集
   * @param  {Func}   arcpath  路径生成器
   * @param  {Func}   colors   颜色生成器
   * @param  {Number} total    总数
   * @return {void}   void
   */
  initArcsTag({ arcs, arcpath, colors, total }) {
    let that = this
    arcs.append('text')
      .attr('class', 'arc-tag')
      .attr('font-size', this.styles.tag.fontSize)
      .attr('opacity', 0)
      .attr('text-anchor', 'middle')
      .attr('dy', '-.5em')
      .attr('fill', this.styles.tag.fill)
      .transition()
      .duration(this.duration)
      .attr('opacity', 1)
      .tween('tag', function () {
        return t => {
          d3.select(this)
            .attr('x', d => {
              let centroid = Number(arcpath.centroid(d)[0] * 1.4)
              if (centroid < 0) {
                return (centroid - that.styles.tag.offset) * t
              }

              if (centroid >= 0) {
                return (centroid + that.styles.tag.offset) * t
              }
            })
            .attr('y', d => Number(arcpath.centroid(d)[1] * 1.3 * t))
            .text(d => {
              let rate = Math.floor(d.data[1] / total * 100 * t) 
              return `${d.data[0]} ${rate}%`
            })
        }
      })

    arcs.append('polyline')
      .attr('points', d => {
        let centroidX = arcpath.centroid(d)[0]
        let centroidY = arcpath.centroid(d)[1]
        
        return `
          ${centroidX} ${centroidY},
          ${centroidX} ${centroidY},
          ${centroidX} ${centroidY}
        `
      })
      .call(this.setTagPolylineAttr, arcpath, colors, this)
  }

  /**
   * 更新标签的值
   * @param  {Object} update   选择集对象
   * @param  {Func}   arcpath  路径生成器
   * @param  {Number} total    总数
   * @param  {Func}   colors   颜色生成器
   * @return {void}   void
   */
  updateArcsTag({ update, arcpath, total, colors }) {
    update.select('text.arc-tag')
      .call(this.setTextUpdateTrans, true, arcpath, this, total)

    update.select('polyline.arc-polyline')
      .call(this.setTagPolylineAttr, arcpath, colors, this)
  }

  /**
   * 设置标签线段属性
   * @param  {Object} selection 选择集对象
   * @param  {Func}   arcpath   路径生成器
   * @param  {Func}   colors    颜色生成器
   * @param  {Object} that      指向 this 对象
   * @return {void}   void
   */
  setTagPolylineAttr(selection, arcpath, colors, that) {
    selection
      .attr('class', 'arc-polyline')
      .attr('fill', 'none')
      .attr('stroke', (d, i) => colors[i])
      .attr('stroke-width', that.styles.tag.strokeWidth)
      .transition()
      .duration(that.duration)
      .attr('points', d => {
        let centroidX = arcpath.centroid(d)[0]
        let centroidY = arcpath.centroid(d)[1]
        
        let endPointX
        if (centroidX < 0) {
          endPointX = centroidX * 1.2 - that.styles.tag.offset
        } else {
          endPointX = centroidX * 1.2 + that.styles.tag.offset
        }
        
        return `
          ${centroidX * 1} ${centroidY * 1},
          ${centroidX * 1.3} ${centroidY * 1.3},
          ${endPointX * 1.2} ${centroidY * 1.3}
        `
      })
  }

  /**
   * 设置文字与标签更新动画
   * @param {Object}  selection 选择集对象
   * @param {Boolean} isTag     是否是为标签文字设置 
   * @param {Func}    arcpath   路径生成器
   * @param {Object}  that      指向 this 对象
   * @param {Number}  total     总数
   * @return {void}   void
   */
  setTextUpdateTrans(selection, isTag, arcpath, that, total) {
    selection
      .transition()
      .duration(that.duration)
      .tween('update', function (d, i) {
        let laststartAngle = that.piedata[i].laststartAngle
        let lastendAngle = that.piedata[i].lastendAngle
        let startAngle = that.piedata[i].startAngle
        let endAngle = that.piedata[i].endAngle
        let initAngle = {
          startAngle: laststartAngle,
          endAngle: lastendAngle
        }
        let nowAngle = {
          startAngle, endAngle
        }

        let centroidInit = arcpath.centroid(initAngle)
        let centroidNow = arcpath.centroid(nowAngle)

        let initX, nowX, initY, nowY

        if (isTag) {
          if (centroidInit[0] < 0) {
            initX = Number(centroidInit[0] * 1.3 - that.styles.tag.offset)
          } else {
            initX = Number(centroidInit[0] * 1.3 + that.styles.tag.offset)
          }

          if (centroidNow[0] < 0) {
            nowX = Number(centroidNow[0] * 1.3 - that.styles.tag.offset)
          } else {
            nowX = Number(centroidNow[0] * 1.3 + that.styles.tag.offset)
          }

          initY = Number(centroidInit[1] * 1.3)
          nowY = Number(centroidNow[1] * 1.3)
        } else {
          initX = Number(centroidInit[0])
          nowX = Number(centroidNow[0])

          initY = Number(centroidInit[1])
          nowY = Number(centroidNow[1])
        }
        
        return t => {
          d3.select(this)
            .attr('x', () => {
              let diff = initX - nowX
              return initX - Math.round(t * diff)
            })
            .attr('y', () => {
              let diff = initY - nowY
              return initY - Math.round(t * diff)
            })
            .text(() => {
              let initvalue = that.piedata[i].lastvalue * 1
              let nowvalue = that.piedata[i].value * 1
              
              if (isTag) {
                let nowrate = Math.floor(nowvalue / total * 100 * t)
                return `${d.data[0]} ${nowrate}%`
              } 

              return initvalue + Math.round(t * (nowvalue - initvalue))
            })
        }
      })
  }

  /**
   * 绘制饼图中心文字
   * @param  {Array} dataset 源数据 
   * @return {void}  void
   */
  drawCenterValue({ dataset }) {
    let update = this.centerValueG.selectAll('text').data([dataset])
    let enter = update.enter()
    
    enter.append('text')
      .call(this.setCenterValueAttr, dataset, this)
    update
      .call(this.setCenterValueAttr, dataset, this)
  }

  /**
   * 设置中心文字属性
   * @param  {Object} selection 选择集对象
   * @param  {Array}  dataset   数据
   * @param  {Object} that      指向 this 对象
   * @return {void}   void
   */
  setCenterValueAttr(selection, dataset, that) {
    selection
      .attr('font-size', that.styles.centerValue.fontSize)
      .attr('text-anchor', 'middle')
      .attr('dy', '.28em')
      .attr('fill', that.styles.centerValue.fill)
      .attr('opacity', 0)
      .transition()
      .duration(that.duration)
      .attr('opacity', 1)
      .tween('center-value', function() {
        let init = d3.select(this).text() * 1
        let now = dataset[that.centerValue.index][1]
        return t => {
          d3.select(this)
            .text(() => {
              return init + Math.round(t * (now - init))
            })
        }
      })
  }

  /**
   * 渲染实例
   * @param {Object} dataset 由外部传来的数据
   * @return {void}   void
   * 格式：  [ [name, value], [name, value], ... ]
   */
  render(dataset) {
    if (!this.isInit) {
      this.initPiedata(dataset)      
    }

    // 计算值的总数
    // ==========
    let total = 0
    for (let d of dataset) {
      total += d[1]
    }

    // 引用颜色生成器
    // ============
    let colors = this.styles.colors

    // 定义路径生成器
    // ============
    let arcpath = d3.svg.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius)

    let update = this.arcsG.selectAll('g').data(this.piedata)
    let enter = update.enter()

    // 弧形和其对应的值，标签，线段
    // 都绘制在这个 g 元素中
    // ==================
    let arcs = enter.append('g')

    if (this.centerValue.isShow === 'true') {
      this.drawCenterValue({
        dataset
      })
    }

    // 初始化饼图
    // =========
    if (!this.isInit) {
      this.initArcs({
        arcs, arcpath, colors
      })

      if (this.isValueShow === 'true') {
        this.initArcsValue({
          arcs, arcpath
        })
      }

      if (this.isTagShow === 'true') {
        this.initArcsTag({
          arcs, arcpath, colors, total
        })
      }      
    }

    // 更新饼图
    // =======
    if (this.isInit) {
      // * 我们获取了新的 dataset，但还没对 piedata 作任何改变
      // * 我们使用布局函数 pie 调用了新的 dataset，获得了更新后的布局数据
      // * 因为此时的 piedata 保存的任然是上一次绘制的值，
      //   所以我们将它的 startAngle 和 endAngle 分别赋值给 laststartAngle 和 lastendAngle
      // * 最后将更新后的 pieupdate 的值传递给 piedata 的 startAngle 和 endAngle
      let pieupdate = this.pie(dataset)
      for (let [i, d] of this.piedata.entries()) {
        d.laststartAngle = d.startAngle
        d.lastendAngle = d.endAngle
        d.startAngle = pieupdate[i].startAngle
        d.endAngle = pieupdate[i].endAngle

        d.lastvalue = d.value
        d.value = pieupdate[i].value
      }

      // 更新弧形
      // =======
      this.updateArcs({
        update, arcpath
      })

      if (this.isValueShow === 'true') {
        this.updateArcsValue({
          update, arcpath
        })
      }

      if (this.isTagShow === 'true') {
        this.updateArcsTag({
          update, arcpath, total, colors
        })
      }
    }
    this.isInit = true
  }
}
