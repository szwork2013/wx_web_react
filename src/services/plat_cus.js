'use strict'
import {get, post, remove, put} from '../utils/request'

const url = 'cus'

/**
 * cus
 * 获取商户信息
 * @export
 * @param {any} params
 * @returns
 */
export async function readCus (params) {
	return get(url, params)
}

/**
 * cus
 * 获取登录商户信息
 * @export
 * @param {any} params
 * @returns
 */
export async function readMyCus (params) {
	return get(`${url}/my`, params)
}

