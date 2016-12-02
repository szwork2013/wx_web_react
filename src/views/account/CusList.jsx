import React, {PropTypes} from 'react'
import { Button, Popconfirm } from 'antd'
import CusTable from '../../common/cus_table'
import { formatAccountStatus } from '../../utils'
const ButtonGroup = Button.Group

const CusList = ({dispatch, total, loading, datas, page, pageSize}) => {
	const columns = [
		{
			title: '账户编码',
			dataIndex: 'unicode',
			key: 'unicode'
		},
		{
			title: '账户名',
			dataIndex: 'accountName',
			key: 'accountName'
		},
		{
			title: '手机号',
			dataIndex: 'mobile',
			key: 'mobile'
		},
		{
			title: '所属商户',
			dataIndex: 'cusName',
			key: 'cusName'
		},
		{
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: text => formatAccountStatus(text)
		},
		{
			title: '操作',
			dataIndex: 'oper',
			key: 'oper',
			width: 130,
			fixed: 'right',
			render: (text, row) => (
				<ButtonGroup size='small'>
					<Popconfirm title = '确认将密码重置为初始密码么?' onConfirm = {() => onReset(row.unicode)}>
						<Button type='primary' size='small'>密码重置</Button>
					</Popconfirm>
					<Button size='small' onClick={() => { onOpen(row.unicode, 'edit') }}>编辑</Button>
				</ButtonGroup>
			)
		}
	]

	const onReset = (unicode) => {
		dispatch({type: 'account/reset', payload: {data: {unicode, password: '000000'}}})
	}

	const onOpen = (unicode, modalType) => {
		dispatch({type: 'common/getCusItems'})
		dispatch({type: 'account/readOne', payload: {data: {unicode}}})
		dispatch({type: 'account/showModal', payload: {modalType: 'edit'}})
	}

	const listProps = {
		total,
		loading,
		dataSource: datas,
		columns,
		pageSize,
		current: page,
		onPageChange: page => {
			dispatch({type: 'account/read',	payload: {page,	pageSize}})
		},
		rowKey: record => record.unicode
	}
	return <CusTable {...listProps}/>
}

CusList.propTypes = {
}

export default CusList
