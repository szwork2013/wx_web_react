import React, {Component, PropTypes} from 'react';
import {connect} from 'dva'
import {routerRedux} from 'dva/router'

import SubscribeSearch from './SubscribeSearch'
import SubscribeList from './SubscribeList'
import SubscribeModal from './SubscribeModal'

function WxSubscribe({location, dispatch, subscribe}) {
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
  } = subscribe

  const subscribeSearchProps = {
    onSearch(fieldsValue) {
      dispatch({type: 'subscribe/updateQuery', payload: {
        queryParams: fieldsValue,
        current: 1
      }})
      dispatch({type: 'subscribe/query', payload:{
        query: fieldsValue,
        page: 1,
        current: 1,
        size: pageSize
      }})
    },
    onAdd() {
      dispatch({
        type: 'subscribe/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  const subscribeListProps = {
    dataSource: list,
    total,
    loading,
    current,
    onPageChange(page) {
      dispatch({type: 'subscribe/updateQuery', payload: {
        current: page
      }})
      dispatch({type: 'subscribe/query', payload:{
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
        type: 'subscribe/showModal',
        payload:{
          modalType: 'dtl',
          currentItem: data
        }
      })
    }
  }

  const subscribeModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(){
      dispatch({
        type: 'subscribe/hideModal'
      })
    },
    onCancel(){
      dispatch({
        type: 'subscribe/hideModal'
      })
    }
  }

  return (
    <div>
      <SubscribeSearch {...subscribeSearchProps}/>
      <br/>
      <SubscribeList {...subscribeListProps} />
      <SubscribeModal {...subscribeModalProps}/>
    </div>
  );
}

WxSubscribe.propTypes = {
  subscribe: PropTypes.object
};

function mapStateToProps({subscribe}) {
  return {subscribe}
}

export default connect(mapStateToProps)(WxSubscribe);
