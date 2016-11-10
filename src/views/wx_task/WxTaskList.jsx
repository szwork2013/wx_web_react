import React from 'react'
import moment from 'moment'
import CusTable from '../../common/cus_table'

const WxTaskList = ({total, current, loading, dataSource, onPageChange, onOpenModal}) => {
  const columns = [
    {
      title: '发送企业',
      dataIndex: 'cusName',
      key: 'cusName',
      fixed: 'left',
      width: 120
    },
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
      title: '模板名称',
      dataIndex: 'tplName',
      key: 'tplName'
    },
    {
      title: '消息类别',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '发送时间',
      dataIndex: 'sendDtm',
      key: 'sendDtm',
      render: (text, record) => {
        var temp = moment(text, 'YYYYMMDDHHmmss')
        if(temp.isValid())
          return temp.format('YYYY-MM-DD HH:mm:ss')
        else
          return ''
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if(text === '01')
          return '待发送'
        else if(text === '02')
          return '发送成功'
        else if(text === '03')
          return '发送失败可重试'
        else if(text === '04')
            return '发送失败不能重试'
        else if(text === '04')
            return '发送中'
        else
          return text
      }
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
