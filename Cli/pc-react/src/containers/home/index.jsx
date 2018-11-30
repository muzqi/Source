/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-04-29 17:16:34
 * @Description: 首页
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-08-27 17:25:16
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increament, decreament, toggleCounter } from '@/redux/actions/commonAction'
import { topicsRequest } from '@/redux/actions/commonAction'
import { Button } from 'antd'

const mapStateToProps = ({ counter, counterVisible }) => ({ counter, counterVisible })

@connect(mapStateToProps)
export default class Home extends Component {
  render() {
    const { dispatch, counter, counterVisible } = this.props

    return [
      <div key='redux'>
        <h1>普通 redux 的使用</h1>
        <p style={{ display: counterVisible ? '' : 'none' }}>{counter}</p>
        <Button onClick={() => dispatch(increament())}>+</Button>
        <Button onClick={() => dispatch(decreament())}>-</Button>
        <Button onClick={() => dispatch(toggleCounter(!counterVisible))}>toggle</Button>
      </div>,

      <div key='redux-saga'>
        <h1>异步请求, redux + redux-saga 的使用</h1>
        <Button
          onClick={() => dispatch(topicsRequest({ page: counter }))}>发起请求</Button>
      </div>
    ]
  }
}
