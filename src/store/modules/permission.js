import { Message } from 'element-ui'
import {API} from '@/api/api.js'

const state = {
  messageList: [],
  lookNum: 0
}

const mutations = {
  CHANGE_DATA: (state,data) => {
    state[data[0]] = data[1]
  }
}

const getters = {
  messageList: state => state.messageList,
  lookNum: state => state.lookNum
}

const actions = {
  getData({state, commit}) {
    // commit('CHANGE_DATA', ['messageList', ['123', '546', '2132']])
    API.getList()
    .then(res => {
      commit('CHANGE_DATA', ['messageList', res])
    })
    
  },
  addNum({state, commit}) {
    API.addNum()
    .then(res => {
    })
  },
  getNum({state, commit}, fn) {
    API.getNum()
    .then(res => {
      commit('CHANGE_DATA', ['lookNum', res])
      fn()
    })
  },
  saveMessage({commit, dispatch}, [text, fn]) {
    if(!text) {
      Message.info('没有内容啊！')
      return false
    }
    API.save({val: text})
    .then(res => {
      fn()
      state.messageList.push(text)
      Message.success('添加成功啦')
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

