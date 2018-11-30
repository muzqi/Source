/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-04-29 16:55:47
 * @Description: 应用文件主文件
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-08-27 18:19:59
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './home'
import Hooks from './hooks'

export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store()}>
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
