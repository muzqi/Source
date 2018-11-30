/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-15 15:47:59
 * @Description: 用户自定义变量
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-15 23:06:21
 */

const path = require('path');

/**
 * 配置别名
 * @param {String} dir 地址
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // antd 主题色
  themeColor: 'blue',

  // 别名
  alias: {
    '@': resolve('src'),
    'actions': resolve('src/redux/actions'),
  }
}
