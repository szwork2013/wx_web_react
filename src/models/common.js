import {readDictItems} from '../services/common'
import {message} from 'antd'

export default {
	namespace: 'common',
	state: {
		giftTypes: [],
		getWays: []
	},
	// 界面加载完成时调用
	subscriptions: {

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
		}
	},
	reducers: {
		uptState (state, action) {
			return {...state, ...action.payload}
		}
	}
}
