'use strict'

import {get} from '../utils/request'

const url = 'sys/dictItem'


/**
 * gift
 * 获取字典数据
 * @export
 * @param {any} params
 * @returns
 */
export async function readDictItems (params) {
	return get(url, params)
}
