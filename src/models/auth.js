import { hashHistory } from 'dva/router'
import {message, notification} from 'antd'
// import {loginSer} from '../services/users'
import { readValidModules } from '../services/power_module'
import {Token} from '../utils/constants'
import { standardLogin } from '../services/account';
import _ from 'lodash'

export default {
	namespace: 'auth',
	state: {
		isLogin: false,
		logining: false,
		username: '',
		password: '',
		remember: true,
		menus: [],
		isChange: true,
		// menus: [
		// 	{key: '1001',	name: '首页',	icon: 'home',	url: '/'},
		// 	{
		// 		key: '1201',
		// 		name: '系统管理',
		// 		icon: 'home',
		// 		childs:
		// 		[
		// 			{key: '1202', name: '菜单管理', url: '/module'},
		// 			{key: '1203', name: '微信订单查询', url: '/wxorderadmin'}
		// 		]
		// 	},
		// 	{
		// 		key: '1101',
		// 		name: '商户管理',
		// 		icon: 'home',
		// 		childs:
		// 		[
		// 			{key: '1102', name: '商户会员', url: '/cusmbr'},
		// 			{key: '1103',	name: '微信订阅',	url: '/subscribe'},
		// 			{key: '1104',	name: '微信消息',	url: '/wxtask'},
		// 			{key: '1105',	name: '礼品管理',	url: '/vipgift'},
		// 			{key: '1106',	name: '积分兑换查询',	url: '/vipgiftexch'}
		// 		]
		// 	},
		// 	{key: '1501',	name: '订单管理',	icon: 'android', childs: [{key: '1502',	name: '微信充值订单',	url: '/wxchargeord'}]},
		// 	// {key: 1301,	name: '百度地图',	icon: 'environment-o', url: '/map'},
		// 	// {key: 1401,	name: '停车场地图', icon: 'environment-o',	url: '/parkmap'},
		// 	{key: '9901',	name: 'demo',	icon: 'android', url: '/demo'}
		// ],
		defaultMenu: [],
		leftMenu: {},
		defaultLeftMenu: []
	},
	subscriptions: {
		setup ({dispatch, state, history}) {
			history.listen(location => {
				if (location.pathname === '/login') {
					let remember = window.localStorage.getItem('remember')
					dispatch({
						type: 'loaduser',
						payload: {
							username: remember ? (window.localStorage.getItem('username') || '') : '',
							password: remember ? (window.localStorage.getItem('password') || '') : '',
							remember: remember || false
						}
					})
				}
				// if (location.pathname === '/') {
				// }
				let path = location.pathname
				dispatch({type: 'changeLeft', payload: {path}})
			})
		}
	},
	effects: {
		*login ({payload}, {call, put}) {
			// const hide = message.loading('登陆中...', 0);
			yield put({type: 'logining', payload})

			const data = yield call(standardLogin, payload)
			console.log(data);
			// hide()
			if (data) {
				notification['success']({
					message: '登录成功',
					description: '欢迎使用'
				})
				// message.success('登陆成功，欢迎使用微信管理', 3)
				yield put({type: 'loginSuccess'})
				window.localStorage.setItem(Token, data)
				hashHistory.push({pathname: '/'})
			} else {
				yield put({type: 'loginSuccess'})
				message.success('登陆失败，请检查用户名或密码', 3)
			}
		},
		*getModules ({payload}, {call, put}) {
			const data = yield call(readValidModules, payload)
			if (data) {
				let treeNodes = []
				let rootNodes = _.filter(data, item => item.pid === 0)
				rootNodes.map(item => {
					let childNodes = []
					let childs = _.filter(data, child => child.pid === item.id)
					childs.map(child => {
						childNodes.push({
							key: child.id + '',
							name: child.name,
							icon: child.icon,
							url: child.url
						})
					})
					treeNodes.push({
						key: item.id + '',
						name: item.name,
						icon: item.icon,
						childs: childNodes
					})
				})
				yield put({type: 'uptState', payload: {menus: treeNodes}})
				yield put({type: 'changeLeftMenu', payload})
			} else {
				yield put({type: 'uptState', payload: {menus: []}})
			}
		},
		logout (state, action) {
			window.localStorage.removeItem(Token)
			hashHistory.push({pathname: '/login'})
		},
		*changeLeft ({payload}, {call, put}) {
			yield put({type: 'getModules', payload})
		}
	},
	reducers: {
		loaduser (state, action) {
			return {...state, ...action.payload}
		},
		logining (state, action) {
			let remember = action.payload.remember
			if (remember) {
				window.localStorage.setItem('username', action.payload.username)
				window.localStorage.setItem('password', action.payload.password)
			} else {
				window.localStorage.removeItem('username')
				window.localStorage.removeItem('password')
			}
			window.localStorage.setItem('remember', action.payload.remember)
			return {...state, ...action.payload, logining: true}
		},
		loginSuccess (state, action) {
			return {...state, logining: false}
		},
		uptState (state, action) {
			return {...state, ...action.payload}
		},
		changeLeftMenu (state, action) {
			let path = action.payload.path
			let left = _.filter(state.menus, chr => {
				let temp = _.filter(chr.childs, child => {
					return child.url === path
				})
				if (temp.length > 0) {
					return true
				} else {
					return chr.url === path
				}
			})
			if (left && left.length > 0) {
				if (left[0].childs && left[0].childs.length > 0) {
					let first = _.first(left[0].childs)
					return {...state, ...action.payload, leftMenu: left[0], defaultLeftMenu: [first.key], defaultMenu: [left[0].key]}
				} else {
					return {...state, ...action.payload, leftMenu: left[0], defaultLeftMenu: [], defaultMenu: ['1001']}
				}
			}
			return {...state, ...action.payload, defaultMenu: ['1001']}
		}
	}
}
