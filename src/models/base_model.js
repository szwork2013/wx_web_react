// 公用state
const comState = {
	loading: false,
	datas: [],
	page: 1,
	total: 0,
	pageSize: 10,
	modalType: 'detail',
	modalVisible: false,
	current: null
}
// 公用reducer
const comReducer = {
	showLoading (state, action) {
		return {...state, ...action.payload, loading: true}
	},
	success (state, action) {
		return {...state, ...action.payload, loading: false}
	},
	fail (state, action) {
		return {...state, ...action.payload, loading: false}
	},
	showModal (state, action) {
		return {...state, ...action.payload, modalVisible: true}
	},
	hideModal (state, action) {
		return {...state, ...action.payload, modalVisible: false}
	},
	common (state, action) {
		return {...state, ...action.payload}
	}
}
export {comState, comReducer}

