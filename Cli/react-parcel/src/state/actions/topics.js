export const TOPICS_REQ = 'TOPICS_REQ';
export const TOPICS_SUCCESS = 'TOPICS_SUCCESS';
export const TOPICS_ERROR = 'TOPICS_ERROR';

export const topicsReq = () => ({
  type: TOPICS_REQ,
  payload: {
    isLoading: true,
  },
});

export const topicsSuccess = (data) => ({
  type: TOPICS_SUCCESS,
  payload: {
    isLoading: false,
    topicsList: data,
  },
});

export const topicsError = (err) => ({
  type: TOPICS_ERROR,
  payload: {
    isLoading: false,
    error: err,
  },
});
