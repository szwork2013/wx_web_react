import { get } from '../utils/request'

const url = 'server/wxorder'


/**
 * server
 * 微信订单查询
 * @export
 * @param {any} params
 * @returns
 */
export async function getWxOrder (params) {
	return get(url, params)
}
