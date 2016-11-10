import {query} from '../services/users'
import {parse} from 'qs'

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    loading: false, //控制加载状态
    current: null, //当前分页信息
    currentItem: {}, //当前操作的用户对象
    modalVisible: false, //弹出框的显示状态
    modalType: 'create', //弹出框的类型（添加用户，编辑用户）
  },
  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(location => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    }
  },
  effects: {
    *query({payload}, {call,put}) {
      yield put({type: 'showLoading'})
      const {data} = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.Data,
            total: data.Total,
            // current: data.data.page.current
          }
        })
      }else{
        yield put({
          type: 'querySuccess',
          payload: {
            list: null,
            total: 0,
            // current: data.data.page.current
          }
        })
      }
    },
    * create() {},
    // delete是关键字
    *'delete' () {},
    * update() {}
  },
  reducers: {
    showLoading(state, action) {
      return {...state,loading:true}
    }, //控制加载状态的reducer
    showModal(state, action) {
      return {...state, ...action.payload, modalVisible: true}
    }, //控制Modal显示状态的reducer
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    querySuccess(state, action) {
      return {...state,...action.payload,loading: false}
    },
    createSuccess() {},
    deleteSuccess() {},
    updateSuccess() {}
  }
}
