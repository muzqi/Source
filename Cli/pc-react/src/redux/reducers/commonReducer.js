import {
  TESTER,

  INCREAMENT,
  DECREAMENT,

  TOGGLE_COUNTER,

  TOPICS_SUCCESS
} from '@/redux/actions/commonAction'

export function testerReducer(state = null, action) {
  switch(action.type) {
    case TESTER:
      return action.param
    default:
      return state
  }
}

export function counterReducer(state = 0, action) {
  switch(action.type) {
    case INCREAMENT:
      return state + 1
    case DECREAMENT:
      return state -1
    default:
      return state
  }
}

export function toggleCounterReducer(state = true, action) {
  switch(action.type) {
    case TOGGLE_COUNTER:
      return action.visible
    default:
      return state
  }
}

export function topicsSuccessReducer(state = {}, action) {
  switch(action.type) {
    case TOPICS_SUCCESS:
      return Object.assign({}, state, {
        ...action.response
      })
    default:
      return state
  }
}
