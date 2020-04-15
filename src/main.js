import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/router-second.stylus' // 二级导航页面样式

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import importButton from '@/components/Common/importButton/tableImport.vue' // 导入数据按钮
Vue.component('importButton', importButton) // 接受两个参数 importAction(地址)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.prototype.clearSearchForm = (data, fn, arr) => { // 全局方法，用来清除页面搜索条件
  for (const i in arr || data) {
    const key = arr ? arr[i] : i
    if (data.hasOwnProperty(key)) {
      data[key] = null
    }
  }
  fn(true)
}

Vue.prototype.findCodeName = function(code, List) { // 全局方法，用来对照字典找名称
  let item = List.find(item => item.code == code)
  if (item) return item.name
  else return ''
},

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
