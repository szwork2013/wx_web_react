import React, {PropTypes} from 'react'
import CusTable from '../../../common/cus_table'
import moment from 'moment'

const WxChargeOrdList = ({total, loading, current, pageSize, dataSource, onPageChange}) => {
	const columns = [
		{
			title: '订单号',
			dataIndex: 'odrID',
			key: 'odrID'
		},
		{
			title: '充值平台',
			dataIndex: 'payPtf',
			key: 'payPtf',
			render (text, record) {
				if (text === 'WechatPay') {
					return '微信'
				} else if (text === 'Alipay') {
					return '支付宝'
				} else {
					return '未知平台'
				}
			}
		},
		{
			title: '会员姓名',
			dataIndex: 'mbrName',
			key: 'mbrName'
		},
		{
			title: '手机号',
			dataIndex: 'mobile',
			key: 'mobile'
		},
		{
			title: '充值金额',
			dataIndex: 'amt',
			key: 'amt'
		},
		{
			title: '支付时间',
			dataIndex: 'payTime',
			key: 'payTime',
			render (text, row) {
				if (text && text.indexOf('0001-01-01') !== -1) {
					return ''
				}
				var temp = moment(text)
				if (temp.isValid()) {
					return temp.format('YYYY-MM-DD HH:mm:ss')
				} else {
					return ''
				}
			}
		},
		{
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render (text, record) {
				if (text === 'na') {
					return '待支付'
				} else if (text === 'aa') {
					return '支付中'
				} else if (text === 'yy') {
					return '支付成功'
				} else if (text === 'nn') {
					return '取消'
				} else {
					return text
				}
			}
		}
	]

	const listProps = {
		total,
		current,
		loading,
		dataSource,
		onPageChange,
		columns,
		pageSize,
		rowKey: record => record.odrID
	}

	return (
		<CusTable {...listProps}/>
	)
}

WxChargeOrdList.propTypes = {
}

export default WxChargeOrdList
