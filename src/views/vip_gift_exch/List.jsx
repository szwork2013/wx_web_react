import React, {PropTypes} from 'react'
import CusTable from '../../common/cus_table'
import { formatGiftExchStatus, formatDate } from '../../utils'

const List = ({dispatch, dataSource, total, loading, page, pageSize}) => {
	const columns = [
		{
			title: '兑换会员',
			dataIndex: 'mbrName',
			key: 'mbrName'
		},
		{
			title: '礼品名称',
			dataIndex: 'giftName',
			key: 'giftName'
		},
		{
			title: '送达方式',
			dataIndex: 'getWayName',
			key: 'getWayName'
		},
		{
			title: '兑换数量',
			dataIndex: 'exchQty',
			key: 'exchQty'
		},
		{
			title: '消耗积分',
			dataIndex: 'useScore',
			key: 'useScore'
		},
		{
			title: '兑换时间',
			dataIndex: 'createDate',
			key: 'createDate',
			render: text => formatDate(text)
		},
		{
			title: '兑换单状态',
			dataIndex: 'status',
			key: 'status',
			render: text => formatGiftExchStatus(text)
		},
		{
			title: '寄送状态',
			dataIndex: 'mailStatusName',
			key: 'mailStatusName'
		}
	]

	const onPageChange = page => {
		dispatch({type: 'giftexch/read',	payload: {page,	pageSize}})
	}

	const listProps = {
		total,
		loading,
		dataSource,
		columns,
		pageSize,
		onPageChange,
		current: page,
		rowKey: record => record.exchID
	}

	return <CusTable {...listProps}/>
}

List.propTypes = {
}

export default List
