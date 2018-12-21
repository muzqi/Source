/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-04-29 17:16:34
 * @Description: 首页
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-12-21 10:54:38
 */

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('articles')
@observer
export default class Home extends Component {
  componentDidMount() {
    const { articles } = this.props
    articles.fetchArticleList()
  }

  render() {
    const { articles } = this.props

    return (
      <div style={{ height: "1000px" }}>
        <ul key="articles">
          {articles.data.length && articles.data.map((d, i) => (
            <li key={i}>{d.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}
