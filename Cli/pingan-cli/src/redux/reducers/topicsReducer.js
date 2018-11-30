/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-15 22:10:52
 * @Description: 主题文章列表 reducer
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-16 14:24:58
 */

import {
  FIND_TOPICS_REQUEST,
  FIND_TOPICS_SUCCESS,
  FIND_TOPICS_ERROR,
} from 'actions/topicsAction'

import { handleActions } from 'redux-actions'

// 默认值
const defaultTopics = {
  loading: false,
  dataSource: []
}

export const topicsReducer = handleActions({
  [FIND_TOPICS_REQUEST]: (state, action) => (Object.assign({}, state, { loading: true })),
  [FIND_TOPICS_SUCCESS]: (state, action) => (Object.assign({}, state, { loading: false, dataSource: action.payload.result })),
  [FIND_TOPICS_ERROR]: (state, action) => (Object.assign({}, state, { loading: false }))
}, defaultTopics)
