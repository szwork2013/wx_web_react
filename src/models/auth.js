import { hashHistory } from 'dva/router'
import {message, notification} from 'antd'
import {loginSer} from '../services/users'

export default {
  namespace: 'auth',
  state: {
    isLogin: false,
    logining: false,
    username: '',
    password: '',
    remember: true,
    menus: [
      {
        key: 1001,
        name: '首页',
        icon: 'home',
        url: '/',
      },
      {
        key: 1101,
        name: '商户管理',
        icon: 'home',
        childs: [
          {
            key: 1102,
            name: '商户会员',
            url: '/cusmbr'
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
    ]
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
      // const hide = message.loading('登陆中...', 0);
      yield put({type: 'logining', payload})

      const data = yield call(loginSer, payload)
      // hide()
      if (data) {
        notification['success']({
          message: '登录成功',
          description: '欢迎使用',
        })
        // message.success('登陆成功，欢迎使用微信管理', 3)
        yield put({type: 'loginSuccess'})
        localStorage.setItem('token', data)
        hashHistory.push({pathname: '/'})
      }else{
        yield put({type: 'loginSuccess'})
        message.success('登陆失败，请检查用户名或密码', 3);
      }
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
