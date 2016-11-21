import React, {PropTypes} from 'react'
import CusTable from '../../../common/cus_table'
import moment from 'moment'

const WxChargeOrdList = ({total, loading, current, pageSize, dataSource, onPageCharge}) => {
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
			title: '充值金额',
			dataIndex: 'amt',
			key: 'amt'
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
		onPageCharge,
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
