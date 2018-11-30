import { take, call, put } from 'redux-saga/effects'
import { TOPICS_REQUEST, topicsSuccess } from '@/redux/actions/commonAction'

const apifetchTopics = (page, tab, limit) => {
  const url = 'https://www.vue-js.com/api/v1/topics'
  return fetch(`${url}?page=${page}&tab=${tab}&limit=${limit}`)
    .then(res => res.json())
}


export default function* fetchTopics() {
  while (true) {
    try {
      // 1. 监听名为 'TOPICS_REQUEST' 的操作, 只要该操作被 dipatch, 就会执行到这里
      const action = yield take(TOPICS_REQUEST)

      // 2. 调用请求, 并将 action 中的参数传入
      const response = yield call(apifetchTopics, action.page, action.tab, action.limit)

      // 3. 调用请求成功的 action, 并将请求到的数据注入到 store 中
      yield put(topicsSuccess(response))
    } catch (err) {
      console.log(err)
    }
  }
}
