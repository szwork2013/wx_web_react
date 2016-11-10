import React, {Component, PropTypes} from 'react';
import {connect} from 'dva'
import {routerRedux} from 'dva/router'

import UserList from '../components/Users/UserList'
import UserSearch from '../components/Users/UserSearch'
import UserModal from '../components/Users/UserModal'

function Users({location, dispatch, users}) {
  const {
    loading,
    list,
    total,
    current,
    currentItem,
    modalVisible,
    modalType
  } = users
  const {field, keyword} = location.query

  const userSearchProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      dispatch({type: 'users/query', payload: fieldsValue})
    },
    onAdd() {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }
  const userListProps = {
    dataSource: list,
    total,
    loading,
    current,
    onPageChange(page) {
      dispatch(routerRedux.push({pathname: 'users', query: {
          page
        }}))
    }
  }
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data){
      console.log(data);
    },
    onCancel(){
      dispatch({
        type: 'users/hideModal'
      })
    }
  }

  return (
    <div>
      <UserSearch {...userSearchProps}/>
      <UserList {...userListProps}/>
      <UserModal {...userModalProps}/>
    </div>
  );
}

Users.propTypes = {
  users: PropTypes.object
};

function mapStateToProps({users}) {
  return {users}
}

export default connect(mapStateToProps)(Users);
