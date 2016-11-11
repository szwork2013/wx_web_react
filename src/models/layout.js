import {parse} from 'qs'
import {message} from 'antd'
import _ from 'lodash'

export default {
  namespace: 'layout',
  state: {
    menus: [
      {
        key: 1001,
        name: '首页',
        icon: 'home',
        url: '/home',
      },
      {
        key: 1101,
        name: '商户管理',
        icon: 'home',
        childs: [
          {
            key: 1102,
            name: '商户会员',
            url: 'cusmbr'
          }
        ]
      },
      {
        key: 1201,
        name: '微信管理',
        icon: 'android',
        childs: [
          {
            key: 1202,
            name: '微信订阅',
            url: '/subscribe'
          },
          {
            key: 1203,
            name: '微信消息',
            url: '/wxtask'
          }
        ]
      }
    ],
    navpath: [],
    activeKey: null,
    key: null,
    keyPath: null
  },
  reducers: {
    updateNavPath(state, action) {
      let navpath = [], childs
      if(action.payload.keyPath){
        action.payload.keyPath.reverse().map((item)=>{
          let tmpOb = _.find(state.menus, function(o) {
            return o.key == item;
          })
          if(tmpOb && tmpOb.name !== '首页'){
            childs = tmpOb.childs
            navpath.push({
              key: tmpOb.key,
              name: tmpOb.name
            })
          }

          if(childs){
            tmpOb = _.find(childs, function(o) {
              return o.key == item;
            });
            if(!tmpOb)return
            navpath.push({
              key: tmpOb.key,
              name: tmpOb.name
            })
          }
        })
      }
      return {...state, navpath: navpath}
    },
  }
}
