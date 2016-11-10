import {query} from '../services/wx_task'
import {parse} from 'qs'
import {message} from 'antd'

export default {
  namespace: 'wxtask',
  state: {
    list: [],
    total: null,
    loading: false, //控制加载状态
    current: 1, //当前分页信息
    currentItem: {}, //当前操作的用户对象
    modalVisible: false, //弹出框的显示状态
    modalType: 'create', //弹出框的类型（添加用户，编辑用户）
    queryParams: '',
    pageSize: 10
  },
  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(location => {
        if (location.pathname === '/wxtask') {
          dispatch({
            type: 'query',
            payload: {
              query: location.query,
              size: 10
            }
          })
        }
      })
    }
  },
  effects: {
    *query({payload}, {call,put}) {
      yield put({type: 'showLoading'})
      // yield put({type: 'updateQuery', payload})
      const {data} = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.data,
            total: data.data.total
          }
        })
      }else{
        yield put({
          type: 'querySuccess',
          payload: {
            list: null,
            total: 0,
          }
        })
      }
    }
  },
  reducers: {
    showLoading(state, action) {
      return {...state,loading:true}
    }, //控制加载状态的reducer
    hideLoading(state, action) {
      return {...state,loading:false}
    },
    showModal(state, action) {
      return {...state, ...action.payload, modalVisible: true}
    }, //控制Modal显示状态的reducer
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    querySuccess(state, action) {
      return {...state,...action.payload,loading: false}
    },
    queryOneSuccess(state, action) {
      return {...state,...action.payload,loading: false,modalVisible: true}
    },
    updateQuery(state, action) {
        return {...state,...action.payload}
    },
    createSuccess() {
    },
    deleteSuccess() {},
    updateSuccess() {}
  }
}
