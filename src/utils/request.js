'use strict'

import fetch from 'dva/fetch'
import { hashHistory } from 'dva/router'
import {message} from 'antd'
import {Token} from './constants'
import qs from 'qs'

const parseJSON = response => {
	return response.json()
}

const checkStatus = response => {
	if (response.status >= 200 && response.status < 300) {
		return response
	}

	const error = new Error(response.statusText)
	error.response = response
	throw error
}

const parseErrorMessage = data => {
	const { errcode, errmsg } = data
	if (errcode !== 1000) {
		throw new Error(errmsg)
	}
	return data
}

/**
 * get
 * 获取
 * @export
 * @param {any} url
 * @param {any} options
 * @returns
 */
export function get (url, params, options) {
	return request(`${url}?${qs.stringify(params)}`, options)
}
/**
 * post
 * 新增
 * @export
 * @param {any} url
 * @param {any} options
 * @returns
 */
export function post (url, params, options) {
	options = options || {}
	options.method = 'post'
	options.headers = options.headers || {}
	options.headers['Accept'] = 'application/json'
	options.headers['Content-Type'] = 'application/json'
	options.body = JSON.stringify(params)
	return request(url, options)
}

/**
 * put
 * 更新
 * @export
 * @param {any} url
 * @param {any} options
 * @returns
 */
export function put (url, params, options) {
	options = options || {}
	options.method = 'put'
	options.headers = options.headers || {}
	options.headers['Accept'] = 'application/json'
	options.headers['Content-Type'] = 'application/json'
	options.body = JSON.stringify(params)
	return request(url, options)
}

/**
 * remove
 * 删除
 * @export
 * @param {any} url
 * @param {any} options
 * @returns
 */
export function remove (url, params, options) {
	options.method = 'delete'
	return request(`${url}?${qs.stringify(params)}`, options)
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options) {
	if (process.env.NODE_ENV === 'production') {
		url = '/web/v1/' + url
	}	else {
		url = 'http://localhost:8080/web/v1/' + url
	}
	options = options || {}
	options.headers = options.headers || {}
	options.headers['token'] = localStorage.getItem(Token)

	return fetch(url, options)
		.then(checkStatus)
		.then(parseJSON)
		.then(parseErrorMessage)
		.then((data) => {
			console.log(data.data)
			return data.data
		})
		.catch((err) => {
			switch (err.message) {
			case '登录失效':
				hashHistory.push({pathname: '/login'})
				break
			default:
				console.log(err.message)
				message.error('服务器繁忙', 3)
				break
			}
			return undefined
		})
}
