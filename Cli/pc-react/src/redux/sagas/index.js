/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-08-27 15:22:19
 * @Description: saga 出口
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-08-27 15:38:47
 */

import { fork } from 'redux-saga/effects'
import fetchTopics from './getTopics'

export default function* rootSaga() {
  yield [
    fork(fetchTopics)
  ]
}
