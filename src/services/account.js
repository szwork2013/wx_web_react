'use strict'
import {get, post, remove, put} from '../utils/request'

const url = 'account'

/**
 * account
 * 获取账户信息
 * @export
 * @param {any} params
 * @returns
 */
export async function readAccount (params) {
	return get(url, params)
}

/**
 * account
 * 新增账户
 * @export
 * @param {any} params
 * @returns
 */
export async function createAccount (params) {
	return post(url, params)
}


/**
 * account
 * 编辑账户
 * @export
 * @param {any} params
 * @returns
 */
export async function uptAccount (params) {
	return put(url, params)
}

/**
 * account
 * 删除账户
 * @export
 * @param {any} params
 * @returns
 */
export async function delAccount (params) {
	return remove(url + '/' + params.unicode)
}
