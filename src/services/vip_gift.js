'use strict'

import {get, post, remove} from '../utils/request'

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
 * 获取单个礼品
 * @export
 * @param {any} params
 * @returns
 */
export async function readGiftOne (params) {
	return get('vip/giftOne', params)
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


/**
 * gift
 * 删除礼品
 * @export
 * @param {any} params
 * @returns
 */
export async function delGift (params) {
	return remove(url + '/' + params.giftCode)
}
