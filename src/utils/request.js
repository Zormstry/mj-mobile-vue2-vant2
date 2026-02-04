import axios from 'axios'

const request = axios.create({
  baseURL: 'https://interview-api-t.itheima.net', // 只保留这一行
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      'Bearer ' + localStorage.getItem('mobile-token') // 修正拼写
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
