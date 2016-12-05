import {readDictItems} from '../services/common'
import { readCus, readMyCus } from '../services/plat_cus'
import _ from 'lodash'

export default {
	namespace: 'common',
	state: {
		pageSize: 10,
		giftTypes: [],
		getWays: [],
		cus: [],
		myCus: null
	},
	// 界面加载完成时调用
	subscriptions: {
		setup ({dispatch, state, history}) {
			history.listen(location => {
				if (location.pathname === '/') {
					dispatch({type: 'getMyCus'})
				}
			})
		}
	},
	// 异步方法
	effects: {
		*getGiftTypeItems ({payload}, {call, put}) {
			const data = yield call(readDictItems, {dictcode: '001'})
			if (data) {
				yield put({type: 'uptState', payload: {giftTypes: data}})
			} else {
				yield put({type: 'uptState', payload: {giftTypes: []}})
			}
		},
		*getGetWayItems ({payload}, {call, put}) {
			const data = yield call(readDictItems, {dictcode: '002'})
			if (data) {
				yield put({type: 'uptState', payload: {getWays: data}})
			} else {
				yield put({type: 'uptState', payload: {getWays: []}})
			}
		},
		*getCusItems ({payload}, {call, put}) {
			const data = yield call(readCus)
			if (data) {
				yield put({type: 'uptState', payload: {cus: data}})
			} else {
				yield put({type: 'uptState', payload: {cus: []}})
			}
		},
		*getMyCus ({payload}, {call, put}) {
			const data = yield call(readMyCus)
			if (data) {
				let first = _.first(data)
				yield put({type: 'uptState', payload: {myCus: first}})
			} else {
				yield put({type: 'uptState', payload: {myCus: null}})
			}
		}
	},
	reducers: {
		uptState (state, action) {
			return {...state, ...action.payload}
		}
	}
}
