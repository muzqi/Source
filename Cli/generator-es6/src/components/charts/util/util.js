/*
 * @Author: liqi@hiynn.com 
 * @Date: 2017-12-28 23:05:00 
 * @Description: 工具
 * @Last Modified by:   liqi@hiynn.com 
 * @Last Modified time: 2017-12-28 23:05:00 
 */

/**
 * 创建一段随机数
 * @param  {Number} len 随机数的长度
 * @return {String} 返回随机数
 */
export function randomString(len) {
  let s = ''
  let randomchar = function () {
    let n = Math.floor(Math.random() * 62)
    if (n < 10) {
      // 1-10
      return n 
    }
    if (n < 36) {
      // A-Z
      return String.fromCharCode(n + 55) 
    }
    // a-z
    return String.fromCharCode(n + 61) 
  }
  while (s.length < len) { 
    s += randomchar() 
  }
  return s
}

/**
 * 深拷贝某一对象
 * @param  {Object} obj 需要拷贝的对象
 * @return {Object} 返回拷贝对象
 */
export function deepClone(obj) {
  let str, newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return
  } else if (window.JSON) {
    str = JSON.stringify(obj)
    newobj = JSON.parse(str)
  } else {
    for (let i in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        newobj[i] = typeof obj[i] === 'object' 
          ? deepClone(obj[i]) 
          : obj[i]
      }
    }
  }
  return newobj
}

