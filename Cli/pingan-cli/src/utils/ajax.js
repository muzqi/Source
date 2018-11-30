/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-15 16:03:33
 * @Description: 请求方法封装
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-16 14:01:06
 */

import config from '@/base.config'
const { host } = config

class Ajax {
  /**
   * GET
   * @param {String} path  接口路径
   * @param {Object} query 查询条件
   */
  get(path, query) {
    let url = host + path

    // 组装查询字符串
    if (query) {
      let queryArray = []
      Object.keys(query).forEach(key => queryArray.push(`${key}=${query[key]}`))
      if (url.search(/\?/) === -1) {
        url += `?${queryArray.join('&')}`
      } else {
        url += `&${queryArray.join('&')}`
      }
    }

    return fetch(url).then(res => res.json())
  }

  /**
   * POST
   * @param {String} path 接口路径
   * @param {Object} body 请求参数
   */
  post(path, body) {

  }
}

export default new Ajax()
