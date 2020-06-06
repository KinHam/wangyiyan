import React, { Component } from 'react';
import store from '../store'
class Home extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate()
    })
  }
  render() {
    return (
      <div>
        <h1>Home页面</h1>
        <p>counter:{store.getState()}</p>
        <button onClick={() => store.dispatch({ type: 'add' })}>+</button>
        <button onClick={() => store.dispatch((dispatch) => {
          setTimeout(() => { dispatch({ type: 'add' }) }, 1000)
        })
        }>async+</button>
      </div>
    );
  }
}

export default Home;