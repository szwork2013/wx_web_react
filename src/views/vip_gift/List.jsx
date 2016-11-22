import React, {PropTypes} from 'react'
import CusTable from '../../common/cus_table'
import { formatDate } from '../../utils'

const List = ({total, loading, current, pageSize, dataSource, onPageChange}) => {
	const columns = [
		{
			title: '礼品编码',
			dataIndex: 'giftCode',
			key: 'giftCode'
		},
		{
			title: '礼品名称',
			dataIndex: 'giftName',
			key: 'giftName'
		},
		{
			title: '礼品类别',
			dataIndex: 'giftType',
			key: 'giftType'
		},
		{
			title: '礼品价值',
			dataIndex: 'giftAmt',
			key: 'giftAmt'
		},
		{
			title: '送达方式',
			dataIndex: 'getWay',
			key: 'getWay'
		},
		{
			title: '消耗积分',
			dataIndex: 'scoreNeed',
			key: 'scoreNeed'
		},
		{
			title: '开始时间',
			dataIndex: 'begDate',
			key: 'begDate',
			render: (text) => (formatDate(text))
		},
		{
			title: '结束时间',
			dataIndex: 'endDate',
			key: 'endDate',
			render: (text) => (formatDate(text))
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
		rowKey: record => record.giftCode
	}

	return (
		<CusTable {...listProps}/>
	)
}

List.propTypes = {
}

export default List
