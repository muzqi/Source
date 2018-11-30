/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-16 11:40:37
 * @Description: 应用文件主文件
 * @Last Modified by:   liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-16 11:40:37
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import DevTools from './devTools'
import Home from './home'

export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store()}>
        <div>
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
            </Switch>
          </Router>

          {/* Redux 调试工具 */}
          <DevTools />
        </div>
      </Provider>
    )
  }
}
