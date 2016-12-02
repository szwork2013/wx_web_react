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
 * 获取单个账户
 * @export
 * @param {any} params
 * @returns
 */
export async function readAccountOne (params) {
	return get(`${url}/${params.unicode}`)
}

/**
 * account
 * 检查账户合法性
 * @export
 * @param {any} params
 * @returns
 */
export async function checkAccount (params) {
	return get('account/check', params)
}

/**
 * account
 * 新增账户
 * @export
 * @param {any} params
 * @returns
 */
export async function createAccount (params) {
	console.log(params);
	return post(url, params)
}

/**
 * account
 * 登录
 * @export
 * @param {any} params
 * @returns
 */
export async function standardLogin (params) {
	return post(`${url}/login`, params)
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
