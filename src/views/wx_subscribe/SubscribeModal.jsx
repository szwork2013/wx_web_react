import React, {PropTypes} from 'react';
import {Form, Input, Modal, DatePicker, Checkbox, Radio, Switch} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const SubscribeModal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  type,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  function handleOk() {
    onOk()
    // validateFields((errors) => {
    //   if (errors) {
    //     return
    //   }
    //   const fieldsValue = getFieldsValue()
    //   const data = {
    //     ...getFieldsValue(),
    //     mark_at: fieldsValue['mark_at'].format(),
    //     is_public: fieldsValue["is_public"] ? 'y':'n',
    //     status: fieldsValue["status"] ? 'aa':'nn',
    //     key: item.key
    //   }
    //   onOk(data)
    // })
  }

  const modalOpts = {
    title: '新增',
    visible,
    onOk: handleOk,
    onCancel,
  }

  const canEdit = type === 'create' ? false : false

  return (
    <Modal {...modalOpts} >
      <Form horizontal>
        <FormItem label='微信OpenID：' {...formItemLayout}>
          {getFieldDecorator('wxOpenId', {
            initialValue: item.wxOpenId,
          })(<Input type='text' disabled/>)}
        </FormItem>
        <FormItem label="用户昵称：" {...formItemLayout}>
          {getFieldDecorator('wxNickName', {
            initialValue: item.wxNickName,
          })(<Input type='text' disabled/>)}
        </FormItem>
        <FormItem label="关注时间：" {...formItemLayout}>
          {getFieldDecorator('wxSubscribeTime', {
            initialValue: moment(item.wxSubscribeTime),
          })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="关注时间" disabled/>)}
        </FormItem>
        <FormItem label="性别：" {...formItemLayout}>
          {getFieldDecorator('wxSex', {
            initialValue: item.wxSex
          })(<RadioGroup disabled>
              <RadioButton value="1">男</RadioButton>
              <RadioButton value="2">女</RadioButton>
            </RadioGroup>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

SubscribeModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(SubscribeModal)
