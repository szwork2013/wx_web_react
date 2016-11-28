import moment from 'moment'


/**
 * format
 * 时间转化
 * @export
 * @param {any} origin
 * @param {string} [format='YYYY-MM-DD HH:mm:ss']
 * @param {any} originFormat 原始时间格式
 * @returns
 */
export function formatDate (origin, format = 'YYYY-MM-DD HH:mm:ss', originFormat) {
	if (!origin || origin.indexOf('0001-01-01') !== -1) return ''
	let temp
	if (originFormat) temp = moment(origin, originFormat)
	else temp = moment(origin)
	if (temp.isValid()) return temp.format(format)
	else return ''
}


/**
 * format
 * 性别编码转换
 * @export
 * @param {any} origin
 * @returns
 */
export function formatSex (origin) {
	if (origin === '1') return '男'
	else if (origin === '2') return '女'
	else return '未知'
}


/**
 * format
 * 订阅状态转换
 * @export
 * @param {any} origin
 * @returns
 */
export function formatSubscribeStatus (origin) {
	if (origin === 'aa') return '已绑定'
	else if (origin === 'na') 	return '未绑定'
	else return '无效'
}


/**
 * format
 * 消息状态编码转换
 * @export
 * @param {any} origin
 * @returns
 */
export function formatTaskStatus (origin) {
	if (origin === '01') return '待发送'
	else if (origin === '02')	return '发送成功'
	else if (origin === '03')	return '发送失败可重试'
	else if (origin === '04')	return '发送失败不能重试'
	else if (origin === '04')	return '发送中'
	else return origin
}


/**
 * format
 * 兑换单状态码转换
 * @export
 * @param {any} origin
 * @returns
 */
export function formatGiftExchStatus (origin) {
	if (origin === 'na') return '起草'
	else if (origin === 'aa')	return '生效'
	else if (origin === 'nn')	return '停用'
	else return origin
}

/**
 * file
 * 获取文件名称
 * @export
 * @param {any} origin
 * @returns
 */
export function getFileName (origin) {
	if (!origin) return ''
	let name = origin.replace(/(.*\/)*([^.]+).*/ig, '$2')
	let type = origin.replace(/.+\./, '')
	return `${name}.${type}`
}
