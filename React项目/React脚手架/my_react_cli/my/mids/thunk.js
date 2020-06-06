export default function thunk({ getState, dispatch }) {
  return dispatch => action => {
    if (typeof action == 'function') {
      return action(dispatch)
    }
    return dispatch(action)
  }
}