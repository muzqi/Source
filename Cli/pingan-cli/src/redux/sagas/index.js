/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-15 16:32:32
 * @Description: saga 出口
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-15 22:18:09
 */

import { fork } from 'redux-saga/effects'
import fetchTopics from './topicsSaga'

export default function* rootSaga() {
  yield [
    fork(fetchTopics)
  ]
}
