/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-15 16:14:52
 * @Description: 主题 action
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-16 09:27:19
 */

import { createAction } from 'redux-actions'

// 查: 获取主题文章
export const FIND_TOPICS_REQUEST = 'FIND_TOPICS_REQUEST'
export const FIND_TOPICS_SUCCESS = 'FIND_TOPICS_SUCCESS'
export const FIND_TOPICS_ERROR = 'FIND_TOPICS_ERROR'
export const findTopicsRequest = createAction(FIND_TOPICS_REQUEST)
export const findTopicsSuccess = createAction(FIND_TOPICS_SUCCESS)
export const findTopicsError = createAction(FIND_TOPICS_ERROR)
