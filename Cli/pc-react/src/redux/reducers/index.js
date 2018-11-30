/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-05-07 10:48:17
 * @Description: reducer 出口文件
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-08-27 18:11:32
 */

import { combineReducers } from 'redux'

import { testerReducer, counterReducer, toggleCounterReducer, topicsSuccessReducer } from './commonReducer'

export default combineReducers({
  tester: testerReducer,
  counter: counterReducer,
  counterVisible: toggleCounterReducer,
  topics: topicsSuccessReducer
})
