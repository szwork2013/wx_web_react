import {readWxOrd} from '../services/charge'
import {message} from 'antd'

export default {
	namespace: 'charge',
	state: {
		loading: false,
		modalVisible: false,
		modalType: 'create',
		current: 1,
		total: 0,
		pageSize: 10,
		datas: []
	},
	// 界面加载完成时调用
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/wxchargeord') {
					dispatch({type: 'readWxOrd', payload: location.query})
				}
			})
		}
	},
	// 异步方法
	effects: {
		*readWxOrd ({payload}, {call, put}) {
			yield put({type: 'showLoading'})
			const data = yield call(readWxOrd, payload)
			if (data) {
				yield put({type: 'success', payload: {datas: data.data, total: data.total}})
			} else {
				yield put({type: 'fail', payload: {datas: [], total: 0}})
			}
		}
	},
	reducers: {
		showLoading (state, action) {
			return {...state, ...action.payload, loading: true}
		},
		success (state, action) {
			return {...state, ...action.payload, loading: false}
		},
		fail (state, action) {
			return {...state, ...action.payload, loading: false}
		}
	}
}
