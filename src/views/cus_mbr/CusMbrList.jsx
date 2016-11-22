import React from 'react'
import { Button } from 'antd'
import CusTable from '../../common/cus_table'
import moment from 'moment'
const ButtonGroup = Button.Group

const CusMbrList = ({dataSource, total, loading, current, onPageChange, onOpenModal}) => {
	const columns = [
		{
			title: '会员号',
			dataIndex: 'mbrId',
			key: 'mbrId'
		}, {
			title: '姓名',
			dataIndex: 'mbrName',
			key: 'mbrName'
		}, {
			title: '类别',
			dataIndex: 'mbrType',
			key: 'mbrType'
		}, {
			title: '手机号',
			dataIndex: 'mobile',
			key: 'mobile'
		}, {
			title: '生日',
			dataIndex: 'birthDate',
			key: 'birthDate'
		}, {
			title: '性别',
			dataIndex: 'sex',
			key: 'sex',
			render (text, row) {
				if (text === '1') {
					return '男'
				} else if (text === '2') {
					return '女'
				} else {
					return '未知'
				}
			}
		}, {
			title: '是否绑定微信',
			dataIndex: 'wxBindDate',
			key: 'wxBindDate',
			render: (text, record) => {
				if (!text || (text && text.indexOf('0001-01-01') !== -1)) {
					return '否'
				} else {
					return '是'
				}
			}
		}, {
			title: '操作',
			key: 'operation',
			fixed: 'right',
			width: 145,
			render: (text, record) => (
				<ButtonGroup size='small'>
					<Button type='primary' onClick={() => onOpenModal(record)}>消息历史</Button>
					<Button type='ghost'>微信详情</Button>
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
		rowKey: record => record.uid
	}
	return (<CusTable {...listProps}/>)
}

export default CusMbrList
