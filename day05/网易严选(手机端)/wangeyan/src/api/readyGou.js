import axios from 'axios'

const readyGou = axios.create({
  baseURL: '/good',
  timeout: 2000
})
readyGou.interceptors.request.use((config) => {
  return config
})
readyGou.interceptors.response.use(response => {
  //把响应成功的数据返回出去
  return response.data
}, error => {
  alert('请求出错:' + error.message || '未知错误')
  return Promise.reject(error)
})

export default readyGou