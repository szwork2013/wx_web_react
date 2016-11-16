import React from 'react'
import {Cascader} from 'antd'

const MapSearch = () => {
  const options = [{
    value: '四川',
    label: '四川',
    children: [{
      value: '全部',
      label: '全部'
    },
    {
      value: '成都',
      label: '成都',
      children: [
        {
          value: '全部',
          label: '全部',
        },
        {
        value: '成华区',
        label: '成华区',
      },
      {
        value: '金牛区',
        label: '金牛区',
      }],
    }],
  }, {
    value: '上海',
    label: '上海',
    children: [
      {
        value: '全部',
        label: '全部',
      },
        {
      value: '浦东',
      label: '浦东',
      children: [
        {
          value: '全部',
          label: '全部',
        },
        {
        value: '南汇',
        label: '南汇',
      }],
    }],
  }];

  const cascaderProps = {
    options: options,
    placeholder: '请选择'
  }

  return (
    <div style={{margin: '20px'}}>
      <Cascader {...cascaderProps} style={{width:'300px'}} />
    </div>
  )
}

export default MapSearch
