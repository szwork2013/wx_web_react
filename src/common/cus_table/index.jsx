import React, {PropTypes} from 'react';
import {Table} from 'antd'

const CusTable = ({columns, total, current, loading,pageSize, dataSource,onPageChange, rowKey}) => {
  const pagination = {
    total,
    pageSize: pageSize | 10,
    defaultCurrent: 1,
    onChange: onPageChange,
    current,
    showTotal(total){
      return `每页 ${pagination.pageSize} 条， 总共 ${total} 条数据`
    }
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={rowKey}
        pagination={pagination}
        scroll={{ x: 768 }}
        bordered={true}/>
    </div>
  )
}

export default CusTable
