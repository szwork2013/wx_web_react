import React from 'react'
import {Cascader} from 'antd'

const MapSearch = ({regions, onSearch}) => {
  const cascaderProps = {
    options: regions,
    placeholder: '请选择',
    onChange: onSearch,
    changeOnSelect: true
  }

  return (
    <div style={{margin: '20px'}}>
      <Cascader {...cascaderProps} style={{width:'300px'}} />
    </div>
  )
}

export default MapSearch
