import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const ajax = axios.create({
  baseURL: '/api',
  timeout: 2000
})

ajax.interceptors.request.use(config => {
  //发送请求的时候开启进度条
  //console.log('config', config)
  Nprogress.start()
  return config
})
ajax.interceptors.response.use(response => {
  //响应回来就隐藏进度条
  Nprogress.done()
  //把响应成功的数据返回出去
  return response.data
}, error => {
  Nprogress.done()
  //统一处理错误
  alert('请求出错:' + error.message || '未知错误')
  return Promise.reject(error)
})
export default ajax