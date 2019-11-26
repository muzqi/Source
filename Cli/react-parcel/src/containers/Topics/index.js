import React, { useState, useEffect, useContext } from 'react';
import { TopicsContext, TopicsProvider } from '../../state/contexts/topics';
import { topicsReq, topicsSuccess, topicsError } from '../../state/actions/topics';

const fetchTopicsList = ({ page = 0, success = () => { }, fail = () => { } }) => {
  const url = `https://www.vue-js.com/api/v1/topics?page=${page}`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => success(res.data))
    .catch((err) => fail(err));
}

const TopicsList = () => {
  const [page, setPage] = useState(1);
  const { state, dispatch } = useContext(TopicsContext);

  useEffect(() => {
    dispatch(topicsReq());
    fetchTopicsList({
      page,
      success: (data) => dispatch(topicsSuccess(data)),
      fail: (err) => dispatch(topicsError(err)),
    });
  }, [didMount]);

  return (
    <div>
      <p>{state.isLoading ? 'loading...' : 'done'}</p>

      <div>
        <p>第{page}页</p>
        {
          page !== 1 && (
            <button onClick={() => setPage(page - 1)}>
              上一页
            </button>
          )
        }
        <button onClick={() => setPage(page + 1)}>
          下一页
        </button>
      </div>

      <ul>
        {
          state.topicsList.length
            ? state.topicsList.map((d) => (
              <li key={d.id}>{d.title}</li>
            ))
            : null
        }
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
