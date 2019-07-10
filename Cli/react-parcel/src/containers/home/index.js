import React, { Component } from 'react';
import './index.less';

const CounterContext = React.createContext();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }

  render() {
    return (
      <CounterContext.Provider
        value={{
          count: this.state.count,
          onIncrease: (count) => this.setState({ count }),
        }}
      >
        <div className="home">
          <Counter />
        </div>
      </CounterContext.Provider>
    );
  }
}

class Counter extends Component {
  render() {
    return (
      <CounterContext.Consumer>
        {context => (
          <div>
            <h1>{context.count}</h1>
            <button
              onClick={() => context.onIncrease(context.count + 1)}
            >
              +
            </button>
          </div>
        )}
      </CounterContext.Consumer>
    );
  }
}

export default Home;
