import React from 'react';
import { useState, useEffect, useContext } from 'react';

const CounterContext = React.createContext();

const Counter = () => {
  const { count, setCount } = useContext(CounterContext);

  return (
    <div>
      <Title />
      <button
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  );
}

const Title = () => (
  <CounterContext.Consumer>
    {(context) => (
      <p id="title">{context.count}</p>
    )}
  </CounterContext.Consumer>
)

const Hooks = () => {
  const [count, setCount] = useState(0);

  // 副作用，相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    const titleEl = document.getElementById('title');
    if (count % 2 === 0) {
      titleEl.setAttribute('style', 'color: red');
    } else {
      titleEl.setAttribute('style', 'color: green');
    }

    return () => {
      console.log(count);
    }
  }, [count]);

  return (
    <CounterContext.Provider
      value={{
        count,
        setCount: (v) => setCount(v),
      }}
    >
      <Counter />
    </CounterContext.Provider>
  )
}

export default Hooks;
