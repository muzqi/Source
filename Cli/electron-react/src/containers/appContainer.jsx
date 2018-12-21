/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-04-29 16:55:47
 * @Description: 应用文件主文件
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-12-21 10:42:32
 */

import stores from '@/stores'

import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './home'
import Hooks from './hooks'

export default class AppContainer extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/hooks' component={Hooks} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
