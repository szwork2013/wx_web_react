import React from 'react'
import moment from 'moment'
import CusTable from '../../common/cus_table'
import { formatDate, formatTaskStatus } from '../../utils'

const WxTaskList = ({total, current, loading, dataSource, onPageChange, onOpenModal}) => {
	const columns = [
		{
			title: '接收微信昵称',
			dataIndex: 'nickName',
			key: 'nickName'
		},
		{
			title: '会员姓名',
			dataIndex: 'mbrName',
			key: 'mbrName'
		},
		{
			title: '消息类别',
			dataIndex: 'type',
			key: 'type'
		},
		{
			title: '生成时间',
			dataIndex: 'createDtm',
			key: 'createDtm',
			render: (text) => (formatDate(text))
		},
		{
			title: '发送时间',
			dataIndex: 'sendDtm',
			key: 'sendDtm',
			render: (text) => (formatDate(text, 'YYYY-MM-DD HH:mm:ss', 'YYYYMMDDHHmmss'))
		},
		{
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: (text) => (formatTaskStatus(text))
		}
		// {
		//   title:'操作',
		//   key:'operation',
		//   fixed: 'right',
		//   width: 50,
		//   render:(text, record)=>(
		//     <p>
		//       <a onClick={()=> onOpenModal(record)}>详情</a >
		//     </p>)
		// }
	]

	const listProps = {
		total,
		current,
		loading,
		dataSource,
		onPageChange,
		columns,
		rowKey: record => record.id
	}
	return (
		<CusTable {...listProps} />
	)
}

export default WxTaskList
