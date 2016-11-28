'use strict'

import {get, post, remove, put} from '../utils/request'

const urlGift = 'vip/gift'
const urlGiftExch = 'vip/giftexch'


/**
 * gift
 * 获取礼品数据
 * @export
 * @param {any} params
 * @returns
 */
export async function readGifts (params) {
	return get(urlGift, params)
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
	return post(urlGift, params)
}


/**
 * gift
 * 编辑礼品
 * @export
 * @param {any} params
 * @returns
 */
export async function uptGift (params) {
	return put(urlGift, params)
}

/**
 * gift
 * 删除礼品
 * @export
 * @param {any} params
 * @returns
 */
export async function delGift (params) {
	return remove(urlGift + '/' + params.giftCode)
}

/**
 * giftExch
 * 获取礼品兑换信息
 * @export
 * @param {any} params
 * @returns
 */
export async function readGiftExch (params) {
	return get(urlGiftExch, params)
}
