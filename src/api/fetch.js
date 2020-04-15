import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import {responseHandle} from './responseHandle'
// axios.defaults.baseURL = window.sessionStorage.getItem('ApiUrl')
axios.defaults.timeout = 30 * 1000
// axios.defaults.baseURL = 'http://127.0.0.1:4000'
console.log(axios.defaults.baseURL)
// 对象转换为formData
const transfromData = object => {
  let ret = new FormData()
  Object.entries(object).forEach(item => {
    ret.append(item[0], item[1])
  })
  return ret
}
export function fetch (options) {
  let data = ''
  if (options.params) data = qs.stringify(Object.assign(options.params))
  if (options.data) data = qs.stringify(Object.assign(options.data))
  return new Promise((resolve, reject) => {
    const instance = axios.create({ // instance创建一个axios实例，可以自定义配置
      headers: {
        'Content-Type': options.typeFormData ? 'application/x-www-form-urlencoded' : 'application/json;charset=UTF-8'
      },
      responseType: options.responseType || 'json',
      data: options.typeFormData ? transfromData[data] : data
    })
    instance.interceptors.request.use(function (config) {
      config.method = options.method || 'post'
      if (config.data instanceof Object) {
        config.data.memberId = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).id
      }
      return config
    }, function (error) {
      Message.error(error)
      return Promise.reject(error)
    })
    instance(options)
      .then(response => { // then请求数据成功后进行操作
        // console.log(response)
        responseHandle(response, resolve, reject)
        // resolve(response) // 把请求的数据发到引用的地方
      })
      .catch(error => {
        reject(error)
        // console.log(error)
        // Message.error('请求超时，稍后重试')
      })
  })
}
