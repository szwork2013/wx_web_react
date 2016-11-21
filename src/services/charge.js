'use strict'

import {get} from '../utils/request'

const url = 'charge/getWxOrd'


/**
 * charge
 * 获取微信订单
 * @export
 * @param {any} params
 * @returns
 */
export async function readWxOrd (params) {
	return get(url, params)
}
