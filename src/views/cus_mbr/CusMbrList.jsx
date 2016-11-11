import React from 'react'
import CusTable from '../../common/cus_table'
import moment from 'moment'

const CusMbrList = ({dataSource, total, loading, current, onPageChange})=>{
  const columns = [
    {
      title: '会员ID',
      dataIndex: 'mbrId',
      key: 'mbrId',
      fixed: 'left',
      width: 120
    },
    {
      title: '会员姓名',
      dataIndex: 'mbrName',
      key: 'mbrName'
    },
    {
      title: '会员类别',
      dataIndex: 'mbrType',
      key: 'mbrType'
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: '生日',
      dataIndex: 'birthDate',
      key: 'birthDate'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex'
    },
    {
      title: '微信绑定时间',
      dataIndex: 'wxBindDate',
      key: 'wxBindDate',
      render: (text, record) => {
        if(text && text.indexOf('0001-01-01') !== -1)
          return ''
        var temp = moment(text)
        if(temp.isValid())
          return temp.format('YYYY-MM-DD HH:mm:ss')
        else
          return ''
      }
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
  return (
    <CusTable {...listProps} />
  )
}

export default CusMbrList
