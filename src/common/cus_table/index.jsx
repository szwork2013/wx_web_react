import React, {PropTypes} from 'react'
import {Table} from 'antd'

const CusTable = ({columns, total, current, loading, pageSize, dataSource, onPageChange, rowKey, expandedRowRender}) => {
	const pagination = {
		total,
		pageSize: pageSize | 10,
		defaultCurrent: 1,
		onChange: onPageChange,
		current,
		showTotal (total) {
			return `每页 ${pagination.pageSize} 条， 总共 ${total} 条数据`
		}
	}

	return (
		<div>
			<Table
				expandedRowRender={expandedRowRender}
				columns={columns}
				dataSource={dataSource}
				loading={loading}
				rowKey={rowKey}
				pagination={pagination}
				scroll={{ x: 768 }}
				size='middle'
				bordered={true}/>
		</div>
	)
}

export default CusTable
