/**
 * @Author:      zhanghq
 * @DateTime:    2018-01-05 15:30:27
 * @Description: 地图模板
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2018-01-05 15:30:27
 */

import './index.css'
import loader from '@/loader/loader'
import apis from './mock'
import Index from './scripts'
const index = new Index()

loader.load({
  apis: apis,
  init() {
    index.init()
  }
}, 2800, 2100)
