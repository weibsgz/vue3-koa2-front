import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'
import router from '../router'
import storage from './storage'

const NETWORKERROR = '网络错误'
const TOKEN_INVALID = 'TOKEN认证失败，请重新登录'
const ERROR_OK = 200

const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})

service.interceptors.request.use((req) => {
  //TOKEN判断
  // const headers = req.headers
  // const userInfo = storage.getItem('userInfo')
  // let token = ''
  // if (userInfo) {
  //   token = userInfo.token
  // }
  // if (!headers.Authorization) headers.Authorization = 'Bearer ' + token

  const headers = req.headers
  const { token } = storage.getItem('userInfo') || {}

  if (!headers.Authorization)
    headers.Authorization = 'Bearer ' + token ? token : ''

  return req
})

service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data
  if (code === ERROR_OK) {
    return data
  } else if (code === 500001) {
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else {
    ElMessage.error(msg || NETWORKERROR)
    return Promise.reject(msg || NETWORKERROR)
  }
})

export default function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  //取全局的MOCK 就是config/index.js配置的mock:false
  let isMock = config.mock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }

  //以防万一 线上地址一定用线上接口
  if (config.env === 'production') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  return service(options)
}

;['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      method: item,
      data,
      ...options
    })
  }
})
