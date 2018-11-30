/*
 * @Author: ouyangdecai 
 * @Date: 2018-05-30 14:24:23 
 * @Description: 从生成action到返回数据
 * @Last Modified by: ouyangdecai
 * @Last Modified time: 2018-06-01 17:41:12
 */
import { store } from '@/store/createStore'
import createAction from '@/util/createAction'
import { take, call, put, fork, cancel } from 'redux-saga/effects'
import { injectAsyncReducer } from '@/reducers';
import createReducer from './createReducer'
import { fetch, fetchSocket } from '@/util/request'

/**
 * http请求
 * @param {string} apiName 获取数据的api名称
 * @param {object} params 请求参数
 */
const apifetch = (apiName, params) => fetch(apiName, params)

/**
 * 生成http请求的saga
 * @param {string} apiName 获取数据的api名称
 * @param {object} params 请求参数
 * @param {string} requestAction 监听请求的action的type值
 * @param {function} successActionFun 数据成功返回后触发的action的生成器
 */
function* httpSaga(apiName, params, requestAction, successActionFun) {
  try {
    const action = yield take(requestAction)
    const response = yield call(apifetch, apiName, params)
    yield put(successActionFun(response.data.result))
  } catch (error) {
    yield put(createAction('REQUEST_FAILED', 'error')(error.message))
  }
}

/**
 * websocket连接
 * @param {string} apiName 获取数据的api名称
 * @param {object} params 请求参数
 * @param {function} successActionFun 数据成功返回后触发的action的生成器
 */
const apifetchSocket = (apiName, params, successActionFun) => fetchSocket(apiName, params)(successActionFun)

/**
 * 生成websocket请求的saga
 * @param {string} apiName 获取数据的api名称
 * @param {object} params 请求参数
 * @param {string} requestAction 监听请求的action的type值
 * @param {function} successActionFun 数据成功返回后触发的action的生成器
 */
function* wsSaga(apiName, params, requestAction, successActionFun){
  try {
    yield take(requestAction)
    yield call(apifetchSocket, apiName, params, successActionFun)
  } catch (error) {
    yield put(createAction('REQUEST_FAILED', 'error')(error.message))
  }
}

/**
 * 供组件调用的请求入口
 * @param {object} dispatch dispatch对象
 * @param {string} keyStr 生成action的type值需要的关键字
 */
export default ( dispatch, keyStr ) => {
  /**
   * 高阶函数第二层
   * @param {string} apiName 获取数据的api名称
   * @param {object} params 请求参数
   * @param {string} reducerName 返回的数据集的名称
   * @param {boolean} isSocket 是否是websocket连接
   */
  return (apiName, params, reducerName, isSocket) => {
    const now = new Date()
    const time = now.getTime()

    // action的type字符串，为防止重复，在末尾添加当前时间的毫秒数
    const requestAction = `${keyStr.toString().toUpperCase()}_REQUEST_${time}`
    const successAction = `${keyStr.toString().toUpperCase()}_SUCCESS_${time}`

    // 生成完整的action
    const requestActionFun = createAction(requestAction)
    const successActionFun = createAction(successAction, 'response')

    // 添加saga处理流程
    if(apiName && reducerName){
      let saga = isSocket ? wsSaga : httpSaga
      saga = saga.bind(null, apiName, params, requestAction, successActionFun)
      store.runSaga(saga)
    }

    // 如果没有传入结果对象的名称，则认为开发者自定义了reducer，不再需要动态注入
    if(reducerName){
      injectAsyncReducer(store, reducerName, createReducer(successAction))
    }
    // 发送action
    dispatch(requestActionFun())
  }
}
