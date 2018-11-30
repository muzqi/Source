/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-05-07 10:37:47
 * @Description: 公共 action
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-08-27 16:37:29
 */

// 测试用 action
export const TESTER = 'TESTER'
export const tester = param => ({ type: TESTER, param })

// 增加/删除
export const INCREAMENT = 'INCREAMENT'
export const DECREAMENT = 'DECREAMENT'
export const increament = () => ({ type: INCREAMENT })
export const decreament = () => ({ type: DECREAMENT })

// 动态切换显示
export const TOGGLE_COUNTER = 'TOGGLE_COUNTER'
export const toggleCounter = visible => ({ type: TOGGLE_COUNTER, visible })

// 发起请求
export const TOPICS_REQUEST = 'TOPICS_REQUEST'
export const TOPICS_SUCCESS = 'TOPICS_SUCCESS'
export const topicsRequest = ({ page = 1, tab = 'share', limit = 5 }) => ({ type: TOPICS_REQUEST, page, tab, limit })
export const topicsSuccess = response => ({ type: TOPICS_SUCCESS, response })
