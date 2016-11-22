import React, {PropTypes} from 'react'
import {Table, message, Popconfirm, Pagination} from 'antd'
import CusTable from '../../common/cus_table'
import {formatDate, formatSex, formatSubscribeStatus} from '../../utils'

const SubscribeList = ({total, current, loading, dataSource, onPageChange, onOpenModal}) => {
	const columns = [
		{
			title: '头像',
			dataIndex: 'wxHeadImgUrl',
			key: 'wxHeadImgUrl',
			fixed: 'left',
			width: 32,
			render: (text, record) => (
				<img src={text} style={{width: 32, height: 32, borderRadius: '50%'}}/>
			)
		},
		{
			title: '微信昵称',
			dataIndex: 'wxNickName',
			key: 'wxNickName'
		},
		{
			title: '性别',
			dataIndex: 'wxSex',
			key: 'wxSex',
			render: (text, record) => (formatSex(text))
		},
		{
			title: '关注时间',
			dataIndex: 'wxSubscribeTime',
			key: 'wxSubscribeTime',
			render: (text, record) => (formatDate(text))
		},
		{
			title: '取关时间',
			dataIndex: 'wxUnsubscribeTime',
			key: 'wxUnsubscribeTime',
			render: (text, record) => (formatDate(text))
		},
		{
			title: '省份',
			dataIndex: 'wxProvince',
			key: 'wxProvince'
		},
		{
			title: '城市',
			dataIndex: 'wxCity',
			key: 'wxCity'
		},
		{
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: (text, record) => (formatSubscribeStatus(text))
		},
		{
			title: '操作',
			key: 'operation',
			fixed: 'right',
			width: 50,
			render: (text, record) => (
				<p>
					<a onClick={() => onOpenModal(record)}>详情</a >
				</p>)
		}
	]

	const listProps = {
		total,
		current,
		loading,
		dataSource,
		onPageChange,
		columns,
		pageSize: 10,
		rowKey: record => record.uid
	}

	return (
		<CusTable {...listProps}/>
	)
}

export default SubscribeList
