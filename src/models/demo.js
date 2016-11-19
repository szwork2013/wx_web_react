import {read, create, update, remove} from '../services/demo'
import {message} from 'antd'

export default {
	namespace: 'demo',
	state: {
		loading: false,
		modalVisible: false,
		modalType: 'create',
		total: 0,
		datas: []
	},
	// 界面加载完成时调用
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/demo') {
					dispatch({type: 'read', payload: location.query})
				}
			})
		}
	},
	// 异步方法
	effects: {
		*read ({payload}, {call, put}) {
			yield put({type: 'showLoading'})
			const {data} = yield call(read, payload)
			if (data) {
				yield put({type: 'success', payload: {datas: data.data, total: data.total}})
			} else {
				yield put({type: 'fail', payload: {datas: [], total: 0}})
			}
		},
		*create ({payload}, {call, put}) {
			yield put({type: 'showLoading'})
			const {data} = yield call(create, payload)
			if (data) {
				message.success('保存成功', 3)
				yield put({type: 'query'})
			} else {
				yield put({type: 'fail', payload: {datas: [], total: 0}})
			}
		},
		*update ({payload}, {call, put}) {
			yield put({type: 'showLoading'})
			const {data} = yield call(update, payload)
			if (data) {
				message.success('保存成功', 3)
				yield put({type: 'query'})
			} else {
				yield put({type: 'fail', payload: {datas: [], total: 0}})
			}
		},
		*remove ({payload}, {call, put}) {
			yield put({type: 'showLoading'})
			const {data} = yield call(remove, payload)
			if (data) {
				message.success('删除成功', 3)
				yield put({type: 'query'})
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
		}
	}
}
