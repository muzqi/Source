/*
 * @Author: baizn 
 * @Email: baizhanning@hiynn.com 
 * @Description: 登录测试页面
 * @Date: 2018-03-07 14:43:06 
 * @Last Modified by: ouyangdecai
 * @Last Modified time: 2018-06-01 11:07:39
  */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { loginRequest } from '@/actions/loginAction'
import reduxSagaInjector from '@/util/reduxSagaInjector'

const mapStateToProps = (store) => {
  store.demo
  return {
  }
}

@connect(mapStateToProps)
class LoginContainer extends Component {
  /**
   * @description 点击登录按钮，触发action
   * @memberof LoginPage
   */
  login = () => {
    const { dispatch } = this.props
    dispatch(loginRequest())
  }

  render() {
    return (
      <div>
        <h1>Login Page 1</h1>
        <p>
        For this example application, we cannot visit <Link to='/app'>/app</Link> until we are logged in.
        Clicking the "Login" button will simulate a login by setting Redux state. This example compliments
        the CSS-Tricks article I wrote for <a target='_blank' href='https://css-tricks.com/react-router-4/'>React Router 4</a>.
        </p>
        <Button type='primary' onClick={ this.login }>Login</Button>
      </div>
    )
  }
}

export default LoginContainer
