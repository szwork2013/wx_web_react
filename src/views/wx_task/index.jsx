import React, {PropTypes} from 'react'
import {connect} from 'dva'

import WxTaskList from './WxTaskList'
import WxTaskSearch from './WxTaskSearch'

const WxTask = ({location, dispatch, wxtask}) => {
  const {
    loading,
    list,
    total,
    modalType,
    modalVisible,
    currentItem,
    queryParams,
    current,
    pageSize
  } = wxtask

  const searchProps = {
    onSearch(fieldsValue) {
      dispatch({type: 'wxtask/updateQuery', payload: {
        queryParams: fieldsValue,
        current: 1
      }})
      dispatch({type: 'wxtask/query', payload:{
        query: fieldsValue,
        page: 1,
        current: 1,
        size: pageSize
      }})
    },
    onAdd() {
      dispatch({
        type: 'wxtask/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  const listProps = {
    dataSource: list,
    total,
    loading,
    current,
    onPageChange(page) {
      dispatch({type: 'wxtask/updateQuery', payload: {
        current: page
      }})
      dispatch({type: 'wxtask/query', payload:{
        query: queryParams,
        page: page,
        current: page,
        size: pageSize
      }})
      // dispatch(routerRedux.push({pathname: 'subscribe', query: {
      //     page
      //   }}))
    },
    onOpenModal(data){
      dispatch({
        type: 'wxtask/showModal',
        payload:{
          modalType: 'dtl',
          currentItem: data
        }
      })
    }
  }

  return (
    <div>
      <WxTaskSearch {...searchProps} />
      <WxTaskList {...listProps} />
    </div>
  )
}

WxTask.propTypes = {
  wxtask: PropTypes.object
};

function mapStateToProps({wxtask}) {
  return {wxtask}
}

export default connect(mapStateToProps)(WxTask);
