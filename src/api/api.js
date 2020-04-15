import { fetch } from './fetch'

export const API = {
  getList: param => fetch({
    url: '/res/barrage',
    method: 'get',
    param
  }),
  save: params => fetch({
    url: '/res/add',
    method: 'get',
    params
  }),
  getNum: params => fetch({
    url: '/res/getNum',
    method: 'get',
    params
  }),
  addNum: params => fetch({
    url: '/res/addNum',
    method: 'get',
    params
  }),
}