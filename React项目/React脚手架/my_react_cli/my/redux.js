export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  let currentState
  let currentListener = []
  function getState() {
    return currentState
  }
  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListener.forEach(item => item())
  }
  function subscribe(cb) {
    currentListener.push(cb)
  }
  dispatch({ type: 'ai281213nds' })
  return {
    getState,
    dispatch,
    subscribe,
  }
}
export function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args)
    const midApi = { getState: store.getState, dispatch: store.dispatch }
    const chain = middlewares.map(mid => mid(midApi))
    const dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
function compose(...fn) {
  const len = fn.length
  if (len === 0) {
    return value => value
  }
  if (len === 1) {
    return fn[0]
  }
  return fn.reduce((f1, f2) => (...args) => f2(f1(...args)))
}
