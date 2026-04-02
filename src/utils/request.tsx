import axios from 'axios'
import { clearToken, getToken } from './token'
import router from '@/router'


const http = axios.create({
  baseURL: 'https://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
  // if have logined, add token header
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么

  // 401 錯誤碼處理
  if (error.response.status === 401) {
    // 清除 token
    clearToken()
    // 跳转到登录页
    router.navigate('/login')
    // window.location.href = '/login'
  }
  return Promise.reject(error)
})

export { http }