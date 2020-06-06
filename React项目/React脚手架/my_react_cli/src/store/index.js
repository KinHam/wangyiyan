import { createStore, applyMiddleware } from '$my/redux'
import thunk from '$my/mids/thunk'
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    default:
      return state
  }
}
const store = createStore(counterReducer, applyMiddleware(thunk))

export default store