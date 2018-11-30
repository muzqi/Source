/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-08-27 17:38:23
 * @Description: 生命钩子
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-08-28 10:48:37
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { tester } from '@/redux/actions/commonAction'

import './index.less'
import hookSrc from './hook.jpeg'

const mapToState = ({ tester }) => ({ tester })
@connect(mapToState)
class Hooks extends Component {
  state = {
    run: null
  }

  /******************** Mounting ********************/
  constructor(props) {
    super(props)
    console.log('constructor')
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log(`componentDidMount
    `)
  }
  /******************** mounting ********************/

  /******************** Update ********************/
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    return true
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate')
  }

  componentDidUpdate(nextProps, nextState) {
    console.log(`componentDidUpdate
    `)
  }
  /******************** update ********************/

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    console.log('render')

    return (
      <div className='hooks-container'>
        <div>
          <Button onClick={() => this.setState({ run: true })}>update state</Button>
          <Button onClick={() => this.props.dispatch(tester('test'))}>update props</Button>
        </div>

        <img src={hookSrc} alt='' />

        <div className='text-container'>
          <h1>Mounting</h1>
          <p>如下这些方法在组件实例被创建和被插入到dom中时被调用。</p>
          <p>
            <b>constructor(): </b><br />
            constructor 是初始化state的好地方。如果我们不需要初始化state，也不需要bind任何方法，那么在我们的组件中不需要实现constructor函数。
          </p>
          <p>
            <b>componentWillMount(): </b><br />
            此方法在mounting之前被立即调用，它在render()之前调用，因此在此方法中setState不会触发重新渲染。<br />
            此方法是服务器渲染中调用的唯一的生命周期钩子，通常我们建议使用constructor()。
          </p>
          <p>
            <b>render(): </b><br />
            该方法是react组件必须的，它检查 this.props 和 this.state 并且返回一个React元素，我们也可以返回null或false，代表我们不想有任何的渲染。<br />
            render()方法应该是一个纯方法，即它不会修改组件的state，在每一次调用时返回同样的结果。它不直接和浏览器交互，如果我们想要交互，应该在componentDidMount()或者其他的生命周期函数里面。
          </p>
          <p>
            <b>componentDidMount(): </b><br />
            此方法在组件被 mounted 之后立即被调用，<br />
            此方法可用作: 初始化/获取 DOM 节点, 使用第三方库 Jquery/echarts 等, 发送网络请求;<br />
            <span className='underline'>此方法中 setState 会触发组件重新渲染。</span>
          </p>

          <hr />

          <h1>Updating</h1>
          <p>props 和 state 的改变产生更新。在重新渲染组件时，如下的方法被调用</p>
          <p>
            <span className='underline'>千万不要在 Updating(除 componentWillReceiveProps) 中使用 this.setState, 这样会引起程序死循环</span>,
            因为 Updating 本就是当 state 或 props 发生改变后立刻调用的, 如果再在钩子中改变 state 或 props, 则会不停的调用, 造成死循环
          </p>
          <p>
            <b>componentWillReceiveProps(nextProps): </b><br />
            一个已经 mounted 的组件接收一个新的props之前被调用。<br />
            <span className='underline'>该方法通常用来更新 state 以响应 props 的更改</span><br />
            调用this.setState 通常不会触发 componentWillReceiveProps;<br />
            同样, 在 componentWillReceiveProps 中调用 this.setState 也不会引起组件重渲.
          </p>
          <p>
            <b>shouldComponentUpdate(nextProps, nextState): </b><br />
            使用此方法让 React 知道组件的输出是否受到当前 state 或 props 的影响, 默认返回 true, 即每次 state 或 props 更改时重新渲染组件;<br />
            <b>该方法通常是用来优化 React 组件性能的</b>, 我们可以通过比较 nextState 和 this.state 是否相同, 来决定组件是否需要重新渲染;<br />
            初始化组件和调用 forceUpdate() 时, 不会调用此方法; <br />
            如果该钩子返回 false, 则 componentWillUpdate() render() componentDidUpdate() 将不会被调用;
          </p>
          <p>
            <b>componentWillUpdate(nextProps, nextState): </b><br />
            使用此函数作为在更新发生之前执行准备的机会。初始渲染不会调用此方法。<br />
            注意: 这里不能调用 this.setState, 会引起死循环
          </p>
          <p><b>render()</b></p>
          <p>
            <b>componentDidUpdate(): </b><br />
            当组件已经更新时，使用此操作作为DOM操作的机会。这也是一个好的地方做网络请求; <br />
            只要你比较当前的props 和以前的props (例如：如果props没有改变，可能不需要网络请求)。
          </p>

          <hr />

          <h1>Unmounting</h1>
          <p>当组件从 dom 中移除时, 调用该方法</p>

          <p>
            <b>componentWillUnmount(): </b><br />
            在此方法中执行一些必要的清理。例如清除计时器，取消网络请求或者清理在componentDidMount 中创建的任何DOM元素
          </p>
        </div>
      </div>
    )
  }
}

export default Hooks
