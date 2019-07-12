import React, { useState, useEffect, useContext } from 'react';
import { TopicsContext, TopicsProvider } from '../../state/contexts/topics';
import { topicsReq, topicsSuccess, topicsError } from '../../state/actions/topics';

const TopicsList = () => {
  const [isReFetch] = useState(false);
  const { state, dispatch } = useContext(TopicsContext);

  useEffect(() => {
    dispatch(topicsReq());

    const url = 'https://www.vue-js.com/api/v1/topics';
    fetch(url)
      .then((res) => res.json())
      .then((res) => dispatch(topicsSuccess(res.data)))
      .catch((err) => dispatch(topicsError(err)));

  }, [isReFetch]);

  console.log(state);

  return (
    <div>
      <p>{state.isLoading ? 'loading...' : 'done'}</p>
      <ul>
        
      </ul>
    </div>
  )
}

const Topics = () => {
  return (
    <TopicsProvider>
      <TopicsList />
    </TopicsProvider>
  );
}

export default Topics;
