import React, {PropTypes} from 'react'
import { Button, Popconfirm } from 'antd'
import CusTable from '../../common/cus_table'
import { formatDate } from '../../utils'
const ButtonGroup = Button.Group

const List = ({total, loading, current, pageSize, dataSource, onOpen, onPageChange, onDelete}) => {
	const columns = [
		{
			title: '礼品名称',
			dataIndex: 'giftName',
			key: 'giftName'
		},
		{
			title: '礼品类别',
			dataIndex: 'giftTypeName',
			key: 'giftType'
		},
		{
			title: '礼品价值',
			dataIndex: 'giftAmt',
			key: 'giftAmt'
		},
		{
			title: '送达方式',
			dataIndex: 'getWayName',
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
		},
		{
			title: '操作',
			key: 'oper',
			width: 120,
			fixed: 'right',
			render: (text, row) => (
				<ButtonGroup size='small'>
					<Button type='primary' size='small' onClick={() => { onOpen(row.giftCode, 'detail') }}>详情</Button>
					<Popconfirm title = '确认要删除么?' onConfirm = {() => onDelete(row.giftCode)}>
							<Button type='goest' size='small'>删除</Button>
					</Popconfirm>
				</ButtonGroup>
				)
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
