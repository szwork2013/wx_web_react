import * as _ from '../utils/request'

const url = 'demo'

/**
 * demo
 * 获取demo数据
 * @export
 * @param {any} params
 * @returns
 */
export async function read (params) {
	return _.get('url', params)
}

/**
 * demo
 * 新增demo数据
 * @export
 * @param {any} params
 * @returns
 */
export async function create (params) {
	return _.post(url, params)
}

/**
 * demo
 * 更新demo数据
 * @export
 * @param {any} params
 * @returns
 */
export async function update (params) {
	return _.put(url, params)
}

/**
 * demo
 * 删除demo数据
 * @export
 * @param {any} params
 * @returns
 */
export async function remove (params) {
	return _.remove(url, params)
}
