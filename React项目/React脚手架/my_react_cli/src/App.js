import React from 'react'
import Home from './views/Home'
import { hot } from 'react-hot-loader/root'
import './app.css'
import './app.stylus'
import sai from '../public/sai.png'
function App() {
  return (
    <div className="App">
      <div className='text'>stylus</div>
      <img src={sai} />
      <Home />
    </div>
  )
}
export default hot(App)