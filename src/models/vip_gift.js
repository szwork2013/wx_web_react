import {readGifts, createGift, readGiftOne, delGift} from '../services/vip_gift'
import {message} from 'antd'
import _ from 'lodash'

export default {
	namespace: 'gift',
	state: {
		loading: false,
		modalVisible: false,
		modalType: 'create',
		currentItem: {},
		current: 1,
		total: 0,
		datas: [],
		uploadFiles: [],
		isSaving: false,
		isSuccess: false
	},
	// 界面加载完成时调用
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/vipgift') {
					dispatch({type: 'read', payload: location.query})
					dispatch({type: 'common/getGiftTypeItems'})
				}
			})
		}
	},
	// 异步方法
	effects: {
		*readOne ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(readGiftOne, payload)
			if (data) {
				yield put({type: 'success', payload: {currentItem: data}})
			} else {
				yield put({type: 'fail', payload: {currentItem: {}}})
			}
		},
		*read ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(readGifts, payload)
			if (data) {
				yield put({type: 'success', payload: {datas: data.data, total: data.total}})
			} else {
				yield put({type: 'fail', payload: {datas: [], total: 0}})
			}
		},
		*create ({payload}, {call, put}) {
			yield put({'type': 'common', payload: {isSaving: true, isSuccess: false}})
			const data = yield call(createGift, payload)
			if (data) {
				yield put({type: 'hideModal', payload: {isSuccess: true}})
				message.success('保存成功', 3)
				yield put({type: 'read',
					payload: {
						page: 1,
						pageSize: payload.pageSize,
						current: 1
					}})
			} else {
				yield put({type: 'fail', payload: {datas: [], total: 0, isSuccess: false}})
			}
		},
		*update ({payload}, {call, put}) {
			yield put({type: 'showLoading'})
			const data = yield call(readGifts, payload)
			if (data) {
				message.success('保存成功', 3)
				yield put({type: 'read',
					payload: {
						page: 1,
						pageSize: payload.pageSize,
						current: 1
					}})
			} else {
				yield put({type: 'fail', payload: {datas: [], total: 0}})
			}
		},
		*remove ({payload}, {call, put}) {
			const data = yield call(delGift, payload)
			if (data) {
				message.success('删除成功', 3)
				yield put({type: 'read',
					payload: {
						page: 1,
						pageSize: payload.pageSize,
						current: 1
					}})
			} else {
				yield put({type: 'fail', payload: {datas: [], total: 0}})
			}
		}
	},
	reducers: {
		showLoading (state, action) {
			return {...state, ...action.payload, loading: true}
		},
		showModal (state, action) {
			return {...state, ...action.payload, modalVisible: true}
		},
		hideModal (state, action) {
			return {...state, ...action.payload, modalVisible: false}
		},
		success (state, action) {
			return {...state, ...action.payload, loading: false}
		},
		fail (state, action) {
			return {...state, ...action.payload, loading: false}
		},
		common (state, action) {
			return {...state, ...action.payload}
		},
		handleUpload (state, action) {
			return {...state, uploadFiles: action.payload.info.fileList}
		}
	}
}
