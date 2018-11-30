/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-16 11:40:50
 * @Description: 首页
 * @Last Modified by:   liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-16 11:40:50
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findTopicsRequest } from 'actions/topicsAction'
import { Button } from 'antd'

@connect(({ topics }) => ({ topics }))
export default class Home extends Component {
  onFetchTopics = () => {
    const { dispatch } = this.props
    dispatch(findTopicsRequest({ page: 1, tab: 'share', limit: 5 }))
  }

  render() {
    const { topics } = this.props

    return (
      <div>
        <h1>异步请求, redux + redux-saga 的使用</h1>
        <Button
          loading={topics.loading}
          onClick={this.onFetchTopics}>发起请求</Button>

        <ul>
          {topics.dataSource.map(d => (
            <li key={d.id}>{d.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}
