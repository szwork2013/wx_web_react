import * as account from '../services/account'
import { comState, comReducer } from './base_model'
import { successBox, loadingBox } from '../utils'

export default {
	namespace: 'account',
	state: {
		...comState,
		accountVldStatus: '',
		mobileVldStatus: ''
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
		*readOne ({payload}, {call, put}) {
			const data = yield call(account.readAccountOne, payload.data)
			if (data) {
				yield put({type: 'success', payload: {current: data}})
			} else {
				yield put({type: 'fail', payload: {current: {}}})
			}
		},
		*create ({payload}, {call, put}) {
			const data = yield call(account.createAccount, payload.data)
			if (data) {
				yield put({type: 'hideModal'})
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
		},
		*reset ({payload}, {call, put}) {
			const hide = loadingBox('密码重置中...')
			const data = yield call(account.uptAccount, payload.data)
			hide()
			if (data) {
				successBox('重置成功')
			}
		},
		*checkAccoutName ({payload}, {call, put}) {
			yield put({type: 'common', payload: {accountVldStatus: 'validating'}})
			const data = yield call(account.checkAccount, payload)
			if (data === 'success') {
				payload.callback()
				yield	put({type: 'success', payload: {accountVldStatus: 'success'}})
			} else {
				payload.callback('账户名不能重复')
				yield put({type: 'fail', payload: {accountVldStatus: 'error'}})
			}
		},
		*checkMobile ({payload}, {call, put}) {
			yield put({type: 'common', payload: {mobileVldStatus: 'validating'}})
			const data = yield call(account.checkAccount, payload)
			if (data === 'success') {
				payload.callback()
				yield	put({type: 'success', payload: {mobileVldStatus: 'success'}})
			} else {
				payload.callback('手机号不能重复')
				yield put({type: 'fail', payload: {mobileVldStatus: 'error'}})
			}
		}
	},
	reducers: {
		...comReducer
	}
}
