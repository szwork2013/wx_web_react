'use strict'

import {get, post} from '../utils/request'

const url = 'vip/gift'


/**
 * gift
 * 获取礼品数据
 * @export
 * @param {any} params
 * @returns
 */
export async function readGifts (params) {
	return get(url, params)
}


/**
 * gift
 * 新增礼品
 * @export
 * @param {any} params
 * @returns
 */
export async function createGift (params) {
	return post(url, params)
}
