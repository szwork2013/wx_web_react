import {getParks, getRegions, getDevices, getTraffics} from '../services/park'
import {parse} from 'qs'
import {message} from 'antd'
import moment from 'moment'

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
		devices: [],
		traffics: [],
		trafficQuery: {},
		historyTraffic: []
	},
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/districtmap' || location.pathname === '/devicemap') {
					dispatch({type: 'getRegion', payload: {query: location.query,	size: 10}})
				} else if (location.pathname === '/personmap') {
					let begin = !location.query.startTime ? moment().format() : moment(location.query.startTime).format()
					let end = !location.query.endTime ? moment().format() : moment(location.query.endTime).format()
					let query = {
						carNum: location.query.carNum || '',
						begin,
						end
					}
					dispatch({
						type: 'updateQuery',
						payload: {trafficQuery: query, zoomLevel: 15}
					})
					dispatch({type: 'getTraffics', payload: query})
				}
			})
		}
	},
	effects: {
		*query ({payload}, {call, put, select}) {
			const hide = message.loading('正在停车场信息...', 0)
			yield put({type: 'showLoading'})
      // yield put({type: 'updateQuery', payload})
      // let reginId = yield select(state => state.currentRegion);
      // console.log(reginId);
			const data = yield call(getParks, {query: 'REGION_ID=' + payload.currentRegion})
			if (data) {
				yield put({type: 'querySuccess', payload: {list: data.data,	total: data.total}})
			} else {
				yield put({type: 'querySuccess', payload: {list: null,	total: 0}})
			}
			hide()
		},
		*getRegion ({payload}, {call, put}) {
			const hide = message.loading('正在获取城市信息...', 0)
			yield put({type: 'showLoading'})
      // yield put({type: 'updateQuery', payload})
			const data = yield call(getRegions)
			if (data) {
				yield put({type: 'querySuccess', payload: {regions: data}})
			} else {
				yield put({type: 'querySuccess', payload: {regions: null}})
			}
			hide()
		},
		*getDevices ({payload}, {call, put}) {
			const hide = message.loading('正在获取设备信息...', 0)
			yield put({type: 'showLoading'})
			// yield put({type: 'updateQuery', payload})
			const data = yield call(getDevices, {regionID: payload.currentRegion})
			if (data) {
				yield put({type: 'querySuccess', payload: {devices: data}})
			} else {
				yield put({type: 'querySuccess', payload: {devices: null}})
			}
			hide()
		},
		*getTraffics ({payload}, {call, put}) {
			const hide = message.loading('正在获取轨迹信息...', 0)
			yield put({type: 'showLoading'})
			// yield put({type: 'updateQuery', payload})
			const data = yield call(getTraffics, payload)
			if (data) {
				yield put({type: 'querySuccess', payload: {traffics: data}})
			} else {
				yield put({type: 'querySuccess', payload: {traffics: null}})
			}
			hide()
		}
	},
	reducers: {
		showLoading (state, action) {
			return {...state, loading: true}
		}, //控制加载状态的reducer
		hideLoading (state, action) {
			return {...state, loading: false}
		},
		showModal (state, action) {
			return {...state, ...action.payload, modalVisible: true}
		}, //控制Modal显示状态的reducer
		hideModal (state) {
			return { ...state, modalVisible: false }
		},
		querySuccess (state, action) {
			return {...state, ...action.payload,loading: false}
		},
		queryOneSuccess (state, action) {
			return {...state, ...action.payload, loading: false, modalVisible: true}
		},
		updateQuery (state, action) {
			return {...state, ...action.payload}
		},
		createSuccess () {
		},
		deleteSuccess () {},
		updateSuccess () {}
	}
}
