import React, {Component, PropTypes} from 'react';
import {connect} from 'dva'
import {routerRedux} from 'dva/router'

import MarkSearch from '../components/Mark/MarkSearch'
import MarkList from '../components/Mark/MarkList'
import MarkModal from '../components/Mark/MarkModal'

function Marks({location, dispatch, marks}) {
  const {
    loading,
    list,
    total,
    modalType,
    modalVisible,
    currentItem
  } = marks

  const markSearchProps = {
    onAdd(){
      dispatch({
        type: 'marks/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  const markListProps = {
    dataSource: list,
    total,
    loading,
    onPageChange(page) {
      dispatch(routerRedux.push({pathname: 'marks', query: {
          page
        }}))
    },
    onDeleteItem(id){
      dispatch({
        type: `marks/delete`,
        payload: id,
      });
    },
    onEditItem(id){
      dispatch({
        type: `marks/query_one`,
        payload: id,
      });
    }
  }

  const markModalProps = {
    item: modalType === 'create' ? {
      status: 'aa'
    } : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data){
      dispatch({
        type: `marks/${modalType}`,
        payload: data,
      });
    },
    onCancel(){
      dispatch({
        type: 'marks/hideModal'
      })
    }
  }

  const MarkModalGen = () =>
    <MarkModal {...markModalProps} />;

  return (
    <div>
      <MarkSearch {...markSearchProps}/>
      <MarkList {...markListProps}/>
      <MarkModalGen/>
    </div>
  );
}

Marks.propTypes = {
  marks: PropTypes.object
};

function mapStateToProps({marks}) {
  return {marks}
}

export default connect(mapStateToProps)(Marks);
