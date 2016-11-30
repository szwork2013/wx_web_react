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


/**
 * module
 * 获取该用户有效菜单
 * @export
 * @param {any} params
 * @returns
 */
export async function readValidModules (params) {
	return get('module/valid', params)
}

/**
 * module
 * 新增菜单
 * @export
 * @param {any} params
 * @returns
 */
export async function createModule (params) {
	return post(url, params)
}


/**
 * module
 * 编辑菜单
 * @export
 * @param {any} params
 * @returns
 */
export async function uptModule (params) {
	return put(url, params)
}

/**
 * module
 * 删除菜单
 * @export
 * @param {any} params
 * @returns
 */
export async function delModule (params) {
	return remove(url + '/' + params.id)
}