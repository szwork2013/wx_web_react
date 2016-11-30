import { getWxOrder } from '../services/wx_order_admin'

export default {
	namespace: 'orderadmin',
	state: {
		loading: false,
		data: {}
	},
	subscriptions: {
		setup ({dispatch, history}) {
		}
	},
	effects: {
		*read ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(getWxOrder, payload)
			if (data) {
				yield put({type: 'success', payload: {data: JSON.parse(data)}})
			} else {
				yield put({type: 'fail', payload: {data: {}}})
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
		},
		common (state, action) {
			return {...state, ...action.payload}
		}
	}
}