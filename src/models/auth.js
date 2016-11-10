import { hashHistory } from 'dva/router'
import {message} from 'antd'

export default {
  namespace: 'auth',
  state: {
      isLogin: false,
      logining: false
  },
  effects: {
    *login({payload}, {call,put}){
      const hide = message.loading('登陆中...', 0);
      yield put({type: 'logining'})
      setTimeout(function() {
        hide()
        put({type: 'loginSuccess'})
        localStorage.setItem('token', 'aaa')
        hashHistory.push({pathname: '/'})
        message.success('登陆成功，欢迎使用微信管理', 3)
      }, 3000)
    },
    logout(state, action) {
      localStorage.clear()
      hashHistory.push({pathname: '/login'})
    }
  },
  reducers: {
    logining(state, action){
      return {...state,logining:true}
    },
    loginSuccess(state, action) {
      return {...state,logining:false}
    },
  }
}
