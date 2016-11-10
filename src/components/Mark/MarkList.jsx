import React, {PropTypes} from 'react';
import {Table, message, Popconfirm} from 'antd'
import moment from 'moment'

const MarkList = ({total, current, loading, dataSource,onPageChange,onDeleteItem,onEditItem}) => {
  const columns = [
    {
      title: '编码',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      width: 50
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      width: 80
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: '类别',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '发生时间',
      dataIndex: 'mark_at',
      key: 'mark_at',
      render: (text, record) => (
        moment(record.mark_at).format('YYYY-MM-DD HH:mm:ss')
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if(text === 'aa')
          return '启用'
        else
          return '停用'
      }
    },
    {
      title:'操作',
      key:'operation',
      fixed: 'right',
      width: 100,
      render:(text, record)=>(
        <p>
          <a onClick={()=> onEditItem(record.id)}>编辑</a >
          &nbsp;
          <Popconfirm title = '确认要删除么?' onConfirm = {() => onDeleteItem(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </p>)
    }
  ]

  const pagination = {
    total,
    defaultCurrent: 1,
    pageSize: 10,
    onChange: onPageChange
  }

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} loading={loading} rowKey={record => record.id} pagination={pagination} scroll={{ x: 1000 }} bordered={true}/>
    </div>
  )
}

export default MarkList
