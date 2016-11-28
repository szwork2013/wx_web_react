import { readGiftExch } from '../services/vip_gift'

export default {
	namespace: 'giftexch',
	state: {
		loading: false,
		datas: [],
		page: 1,
		total: 0,
		pageSize: 10
	},
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/vipgiftexch') {
					dispatch({type: 'read', payload: location.query})
				}
			})
		}
	},
	effects: {
		*read ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(readGiftExch, payload)
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
