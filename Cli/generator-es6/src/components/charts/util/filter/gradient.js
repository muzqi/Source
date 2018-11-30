/*
 * @Author: 李祁 
 * @Date: 2017-12-05 16:28:46 
 * @Last Modified by: 李祁
 * @Last Modified time: 2017-12-13 12:40:16
 */
import _ from 'lodash'
import $ from 'jquery'
import linearGradientHbs from './gradient/linear.hbs'
import radialGradientHbs from './gradient/radial.hbs'

/**
 * 转换颜色字符串为线性渐变
 * 如果传递的是数组，则将数组中的色值转换为渐变色后返回渐变色 id，并添加 linearGradient 节点
 * 如果传递的是颜色字符串，则不做处理，返回本身
 * @param  {Object} selection 选择集对象，在该对象中创建 defs 并添加 linearGradient 节点
 * @param  {Mix}    target    转换的目标对象，可以是字符串和数组
 * @param  {String} direction 渐变方向
 *                            left: 从左到右  right:  从右到左
 *                            top:  从上到下  bottom: 从下到上
 * @return {String} 如果传递过来的是数组，则返回滤镜的 id 值
 *                  如果传递过来的是颜色字符串，则不做处理，返回字符串本身
 */
export function linearGradient(selection, target, direction = 'top') {
  if (_.isArray(target)) {
    // 将数组中的色值连接成字符串
    // 将字符串作为 linearGradient 的 id
    // ===============================
    let id = `linear${direction}`
    
    // 正则匹配 # , ( ) 和空格
    // 将这些符号删除，因为 id 名不允许出现它们
    let reg = /\s|,|\.|#|\(|\)/gi
    for (let d of target) {
      id += d.replace(reg, '')
    }
    
    // 如果该渐变已经被创建，则直接返回 id
    // ==============================
    let defs = $('defs')
    if (defs.find(`#${id}`).length > 0) {
      return `url(#${id})`
    }

    // 设置颜色断点位置
    // =============
    let stops = []
    for (let [i, d] of target.entries()) {
      stops.push({
        offset: `${i * (100 / (target.length - 1))}%`,
        stopColor: d
      })
    }

    // 设置渐变规则
    // ==========
    let gradient = {
      id, x1: '50%', y1: '0%', x2: '50%', y2: '100%',
      stops
    }

    switch(direction) {
    // direction = left
    case 'left':
      gradient.x1 = '0%'
      gradient.y1 = '50%'
      gradient.x2 = '100%'
      gradient.y2 = '50%'
      break
      // direction = right
    case 'right':
      gradient.x1 = '100%'
      gradient.y1 = '50%'
      gradient.x2 = '0%'
      gradient.y2 = '50%'
      break
      // direction = bottom
    case 'bottom':
      gradient.x1 = '50%'
      gradient.y1 = '100%'
      gradient.x2 = '50%'
      gradient.y2 = '0%'
      break
      // direction = top
    default:
      gradient.x1 = '50%'
      gradient.y1 = '0%'
      gradient.x2 = '50%'
      gradient.y2 = '100%'
    }

    // 将渐变节点添加到页面
    // =================
    selection.append('defs').html(linearGradientHbs(gradient))
    
    return `url(#${id})`
  }
  return target
}

/**
 * 转换颜色字符串为径向渐变
 * 该方法仅支持中心点径向渐变
 * @param  {Object} selection 选择集对象，在该对象中创建 defs 并添加 linearGradient 节点
 * @param  {Mix}    target    转换的目标对象，可以是字符串和数组
 * @return {String} 如果传递过来的是数组，则返回滤镜的 id 值
 *                  如果传递过来的是颜色字符串，则不做处理，返回字符串本身
 */
export function radialGradient(selection, target) {
  if (_.isArray(target)) {
    let id = 'radial'
    let reg = /\s|,|#|\(|\)/gi
    for (let d of target) {
      id += d.replace(reg, '')
    }

    // 如果该渐变已经被创建，则直接返回 id
    // ==============================
    let defs = $('defs')
    if (defs.find(`#${id}`).length > 0) {
      return `url(#${id})`
    }

    // 设置颜色断点位置
    // =============
    let stops = []
    for (let [i, d] of target.entries()) {
      stops.push({
        offset: `${i * (100 / (target.length - 1))}%`,
        stopColor: d
      })
    }

    // 设置渐变规则
    // ==========
    let gradient = {
      id, 
      cx: '50%', cy: '50%', 
      fx: '50%', fy: '50%',
      r: '100%',
      stops
    }

    // 将渐变节点添加到页面
    // =================
    selection.append('defs').html(radialGradientHbs(gradient))
    
    return `url(#${id})`
  }

  return target
}
