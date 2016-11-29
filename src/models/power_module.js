import { readModules } from '../services/power_module'

export default {
	namespace: 'module',
	state: {
		loading: false,
		datas: [],
		page: 1,
		total: 0,
		visible: false,
		selectedKeys: [],
		curSelMenu: null,
		parentMenu: null,
		isDetail: true
	},
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/module') {
					dispatch({type: 'read', payload: location.query})
				}
			})
		}
	},
	effects: {
		*read ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(readModules, payload)
			if (data) {
				yield put({type: 'success', payload: {datas: data}})
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
		},
		common (state, action) {
			return {...state, ...action.payload}
		}
	}
}
