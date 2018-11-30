/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-16 11:31:02
 * @Description: 主题文章 saga
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-16 14:20:00
 */

import {
  FIND_TOPICS_REQUEST,
  findTopicsError,
  findTopicsSuccess,
} from 'actions/topicsAction'

import ajax from '@/utils/ajax'

import { take, call, put } from 'redux-saga/effects'
import { message } from 'antd'

export default function* fetchTopics() {
  while (true) {
    try {
      const action = yield take(FIND_TOPICS_REQUEST)

      const res = yield call(
        payload => ajax.get('/topics', payload),
        action.payload
      )

      if (res.code) {
        message.success(res.msg)
        yield put(findTopicsSuccess(res))
      } else {
        message.error(res.msg)
        yield put(findTopicsError())
      }

    } catch (err) {
      message.error(err.toString())
      yield put(findTopicsError())
    }
  }
}
