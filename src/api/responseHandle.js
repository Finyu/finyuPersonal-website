import { Message } from 'element-ui'
import router from '../router'
import { reject } from 'q'

export const responseHandle = function (res, resolve, reject) {
  resolve(res.data)
  // 下载文件
  if(res.config.responseType == "blob") {
    resolve(res)
  }
  if (res.data.code === '200') {
    resolve(res)
  } else if (res.data.code === '-1') {
    window.adddDataState_Z = false // 列表页面新增和编辑的请求节流
    Message.error(res.data.message)
  } else if (res.data.code === 406) {
    router.push('/login')
    Message.error(res.data.msg)
  } else if (res.data.code === '500') {
    Message.error(res.data.message)
    reject(res)
  } else if (res.data.code === '40101') {
    Message.error('用户未登录')
    router.push('/login')
  }
}
