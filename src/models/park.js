import {getParks, getRegions, getDevices} from '../services/park'
import {parse} from 'qs'
import {message} from 'antd'

export default {
  namespace: 'park',
  state: {
    list: [],
    total: null,
    loading: false, //控制加载状态
    current: 1, //当前分页信息
    currentItem: {}, //当前操作的用户对象
    modalVisible: false, //弹出框的显示状态
    modalType: 'create', //弹出框的类型（添加用户，编辑用户）
    queryParams: '',
    pageSize: 10,
    regions: [],
    currentRegion: '5001',
    zoomLevel: 13,
    devices: []
  },
  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(location => {
        if (location.pathname === '/districtmap' || location.pathname === '/devicemap' || location.pathname === '/personmap') {
          dispatch({
            type: 'getRegion',
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
    *query({payload}, {call,put,select}) {
      yield put({type: 'showLoading'})
      // yield put({type: 'updateQuery', payload})
      // let reginId = yield select(state => state.currentRegion);
      // console.log(reginId);
      const data = yield call(getParks, {
        query: 'REGION_ID='+payload.currentRegion
      })
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.total
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
    },
    *getRegion({payload}, {call, put}){
      const hide = message.loading('正在获取城市信息...', 0);
      yield put({type: 'showLoading'})
      // yield put({type: 'updateQuery', payload})
      const data = yield call(getRegions)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            regions: data
          }
        })
      }else{
        yield put({
          type: 'querySuccess',
          payload: {
            regions: null
          }
        })
      }
      hide()
    },
    *getDevices({payload}, {call, put}){
      yield put({type: 'showLoading'})
      // yield put({type: 'updateQuery', payload})
      const data = yield call(getDevices)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            devices: data
          }
        })
      }else{
        yield put({
          type: 'querySuccess',
          payload: {
            devices: null
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
