/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-04-29 16:29:46
 * @Description: 路径配置别名
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-04-29 16:31:49
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = resolve
