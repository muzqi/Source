/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-15 16:28:27
 * @Description: reducer 出口文件
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-15 22:16:55
 */

import { combineReducers } from 'redux'

import { topicsReducer } from './topicsReducer'

export default combineReducers({
  topics: topicsReducer
})
