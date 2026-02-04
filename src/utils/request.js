import axios from 'axios'

const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      'Brarer ' + localStorage.getItem('mobile-token')
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
