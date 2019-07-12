import { useReducer } from 'react';

import {
  TOPICS_REQ,
  TOPICS_SUCCESS,
  TOPICS_ERROR,
} from '../actions/topics';

const initState = {
  topicsList: [],
  isLoading: false,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case TOPICS_REQ:
      return Object.assign({}, state, action.payload);
    case TOPICS_SUCCESS:
      return Object.assign({}, state, action.payload);
    case TOPICS_ERROR:
      return Object.assign({}, state, action.payload);
    default:
      throw Error('no action type');
  }
}

export default () => useReducer(reducer, initState);
