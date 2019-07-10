import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class Home extends Component {
   // 声明 Context 对象属性
  static childContextTypes = {
    count: PropTypes.number,
    onIncrease: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }

  // 返回Context对象，方法名是约定好的
  getChildContext () {
    return {
      count: this.state.count,
      onIncrease: (count) => this.setState({ count }),
    }
  }

  render() {
    return (
      <div className="home">
        <Counter />
      </div>
    );
  }
}

class Counter extends Component {
  // 声明需要使用的 Context 属性
  static contextTypes = {
    count: PropTypes.string,
    onIncrease: PropTypes.func,
  }

  render() {
    const {
      count,
      onIncrease
    } = this.context;

    return (
      <div>
        <h1>{count}</h1>
        <button
          onClick={() => onIncrease(count + 1)}
        >
          +
        </button>
      </div>
    );
  }
}

export default Home;
