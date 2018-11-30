/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-05-07 10:42:48
 * @Description: store
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-08-27 15:19:38
 */

import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'

import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default () => {
  const store = createStore(
    reducers,
    compose(
      // saga 中间件
      applyMiddleware(sagaMiddleware),

      // redux-dev-tools 中间件
      composeWithDevTools()
    )
  )

  sagaMiddleware.run(sagas)

  return store
}
