import * as account from '../services/account'
import { comState, comReducer } from './base_model'
import { successBox } from '../utils'

export default {
	namespace: 'account',
	state: {
		...comState
	},
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/account') {
					dispatch({type: 'read', payload: location.query})
				}
			})
		}
	},
	effects: {
		*read ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(account.readAccount, payload)
			if (data) {
				yield put({type: 'success', payload: {datas: data.data, total: data.total}})
			} else {
				yield put({type: 'fail', payload: {datas: [], total: 0}})
			}
		},
		*create ({payload}, {call, put}) {
			const data = yield call(account.createAccount, payload)
			if (data) {
				yield put({type: 'hideModal', payload: {isSuccess: true}})
				successBox('保存成功')
				yield put({type: 'read',
					payload: {
						page: 1,
						pageSize: payload.pageSize,
						current: 1
					}})
			} else {
				yield put({type: 'fail', payload: {datas: [], total: 0, isSuccess: false}})
			}
		}
	},
	reducers: {
		...comReducer
	}
}
