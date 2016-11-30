import { readModules, createModule, uptModule, delModule } from '../services/power_module'
import { message } from 'antd'

export default {
	namespace: 'module',
	state: {
		loading: false,
		datas: [],
		visible: false,
		selectedKeys: [],
		curSelMenu: null,
		parentMenu: null,
		type: 'detail'
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
				yield put({type: 'fail', payload: {datas: []}})
			}
		},
		*create ({payload}, {call, put}) {
			yield put({type: 'common', payload})
			const data = yield call(createModule, payload)
			if (data) {
				message.success('保存成功', 3)
				yield put({type: 'read'})
			} else {
				yield put({type: 'fail'})
			}
		},
		*update ({payload}, {call, put}) {
			yield put({'type': 'common', payload})
			const data = yield call(uptModule, payload)
			if (data) {
				message.success('保存成功', 3)
				yield put({type: 'read'})
			} else {
				yield put({type: 'fail'})
			}
		},
		*remove ({payload}, {call, put}) {
			const data = yield call(delModule, payload)
			if (data) {
				message.success('删除成功', 3)
				yield put({type: 'read', payload: {visible: false, selectedKeys: [], curSelMenu: {name: '一级菜单', id: 0}, parentMenu: {name: '一级菜单', id: 0}}})
			} else {
				yield put({type: 'fail'})
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
