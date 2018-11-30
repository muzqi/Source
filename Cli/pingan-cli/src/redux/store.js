/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-15 16:32:44
 * @Description: store
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-16 11:29:15
 */

import reducers from './reducers'
import sagas from './sagas'

import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import Devtools from '@/containers/devTools'

const sagaMiddleware = createSagaMiddleware()

export default () => {
  const store = createStore(
    reducers,
    compose(
      // saga 中间件
      applyMiddleware(sagaMiddleware),

      Devtools.instrument(),
    )
  )

  sagaMiddleware.run(sagas)

  return store
}
