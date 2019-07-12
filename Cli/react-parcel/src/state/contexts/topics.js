import React from 'react';
import topicsReducer from '../reducers/topics';

export const TopicsContext = React.createContext();

export const TopicsProvider = (props) => {
  const [state, dispatch] = topicsReducer();
  return (
    <TopicsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TopicsContext.Provider>
  )
};
