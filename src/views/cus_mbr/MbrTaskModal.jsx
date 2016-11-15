import React from 'react'
import {Modal, Timeline, Icon} from 'antd'
import { hashHistory } from 'dva/router'

const MbrTaskModal = ({visible, onOk, onCancel})=>{
  const modalOpts = {
    title: '发送历史',
    visible,
    onOk,
    onCancel,
    cancelText: '返回'
  }

  const getMore = ()=>{
    onOk()
    hashHistory.push({pathname: '/wxtask'})
  }

  return (
    <Modal {...modalOpts}>
      <Timeline style={{marginLeft: '40px'}} pending={<a onClick={getMore}>更多</a>}>
        <Timeline.Item>消费消息 2016-04-01</Timeline.Item>
        <Timeline.Item>充值消息 2015-05-05</Timeline.Item>
        <Timeline.Item>积分消息 2015-03-01</Timeline.Item>
        <Timeline.Item>祝福消息 2015-01-01</Timeline.Item>
        <Timeline.Item>消费消息 2016-04-01</Timeline.Item>
        <Timeline.Item>充值消息 2015-05-05</Timeline.Item>
        <Timeline.Item>积分消息 2015-03-01</Timeline.Item>
        <Timeline.Item>祝福消息 2015-01-01</Timeline.Item>
        <Timeline.Item>消费消息 2016-04-01</Timeline.Item>
        <Timeline.Item>充值消息 2015-05-05</Timeline.Item>
      </Timeline>
    </Modal>
  )
}

export default MbrTaskModal
