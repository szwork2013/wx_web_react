import React, {PropTypes} from 'react'
import CusTable from '../../common/cus_table'
import { formatAccountStatus } from '../../utils'

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
		}
	]

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
