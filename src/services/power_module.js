'use strict'
import {get, post, remove, put} from '../utils/request'

const url = 'module'


/**
 * module
 * 获取模块信息
 * @export
 * @param {any} params
 * @returns
 */
export async function readModules (params) {
	return get(url, params)
}
