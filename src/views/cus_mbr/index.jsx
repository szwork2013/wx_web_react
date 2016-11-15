import React, {PropTypes} from 'react'
import {connect} from 'dva'

import CusMbrList from './CusMbrList'
import CusMbrSearch from './CusMbrSearch'
import MbrTaskModal from './MbrTaskModal'

const CusMbr = ({dispatch, cusmbr}) => {
  const {
    list,
    total,
    loading,
    current,
    pageSize,
    queryParams,
    modalVisible
  } = cusmbr

  const searchProps = {
    onSearch(fieldsValue){
      dispatch({type: 'cusmbr/updateQuery', payload: {
        queryParams: fieldsValue,
        current: 1
      }})
      dispatch({type: 'cusmbr/query', payload:{
        query: fieldsValue,
        page: 1,
        current: 1,
        size: pageSize
      }})
    }
  }

  const listProps = {
    dataSource: list,
    total,
    loading,
    current,
    onPageChange(page){
      dispatch({type: 'cusmbr/updateQuery', payload: {
        current: page
      }})
      dispatch({type: 'cusmbr/query', payload:{
        query: queryParams,
        page: page,
        current: page,
        size: pageSize
      }})
    },
    onOpenModal(record){
      dispatch({type: 'cusmbr/showModal'})
    }
  }

  const modalProps = {
    visible: modalVisible,
    onOk(){
      dispatch({
        type: 'cusmbr/hideModal'
      })
    },
    onCancel(){
      dispatch({
        type: 'cusmbr/hideModal'
      })
    }
  }

  return (
    <div>
      <CusMbrSearch {...searchProps}/>
      <CusMbrList {...listProps}/>
      <MbrTaskModal {...modalProps}/>
    </div>
  )
}

CusMbr.PropTypes = {
  cusmbr: PropTypes.object.isRequired
}

function mapStateToProps({cusmbr}){
  return {cusmbr}
}

export default connect(mapStateToProps)(CusMbr)
