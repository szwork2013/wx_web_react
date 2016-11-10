import { hashHistory } from 'dva/router'
import {message, notification} from 'antd'

export default {
  namespace: 'auth',
  state: {
      isLogin: false,
      logining: false,
      username: '',
      password: '',
      remember: true
  },
  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(location => {
        if (location.pathname === '/login') {
          let remember = localStorage.getItem('remember')
          dispatch({
            type: 'loaduser',
            payload: {
              username: remember ? (localStorage.getItem('username') || '') : '',
              password: remember ? (localStorage.getItem('password') || '') : '',
              remember: remember || false
            }
          })
        }
      })
    }
  },
  effects: {
    *login({payload}, {call,put}){
      const hide = message.loading('登陆中...', 0);
      yield put({type: 'logining', payload})
      
      hide()
      notification['success']({
        message: '登录成功',
        description: '欢迎使用',
      })
      // message.success('登陆成功，欢迎使用微信管理', 3)
      yield put({type: 'loginSuccess'})
      localStorage.setItem('token', 'aaa')
      hashHistory.push({pathname: '/'})
    },
    logout(state, action) {
      localStorage.removeItem('token')
      hashHistory.push({pathname: '/login'})
    }
  },
  reducers: {
    loaduser(state, action){
      return {...state,...action.payload}
    },
    logining(state, action){
      let remember = action.payload.remember 
      if(remember){
        localStorage.setItem('username', action.payload.username)
        localStorage.setItem('password', action.payload.password)
      }else{
        localStorage.removeItem('username')
        localStorage.removeItem('password')
      }
      localStorage.setItem('remember', action.payload.remember)
      return {...state,...action.payload, logining:true}
    },
    loginSuccess(state, action) {
      return {...state,logining:false}
    },
  }
}
