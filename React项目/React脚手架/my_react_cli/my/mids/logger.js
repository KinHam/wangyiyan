export default function logger({ getState, dispatch }) {
  return (dispatch) => (action) => {
    console.log('执行了', action.type)
    dispatch(action)
  }
}