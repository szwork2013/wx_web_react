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

const MarkModal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const fieldsValue = getFieldsValue()
      const data = {
        ...getFieldsValue(),
        mark_at: fieldsValue['mark_at'].format(),
        is_public: fieldsValue["is_public"] ? 'y':'n',
        status: fieldsValue["status"] ? 'aa':'nn',
        key: item.key
      }
      onOk(data)
    })
  }

  function onCheckChange(e) {
    console.log(`checked = ${e.target.checked}`)
    item.status = e.target.checked === true
      ? 'aa'
      : 'nn'
  }

  const modalOpts = {
    title: '新增',
    visible,
    onOk: handleOk,
    onCancel
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='标题：' {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: item.title,
            rules: [
              {
                required: true,
                message: '标题不能为空'
              }
            ]
          })(<Input type='text'/>)}
        </FormItem>
        <FormItem label="内容：" {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: item.content,
            rules: [
              {
                required: true,
                message: '内容不能为空'
              }
            ]
          })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }}/>)}
        </FormItem>
        <FormItem label="类别：" {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type,
            rules: [
              {
                required: true,
                message: '类别不能为空'
              }
            ]
          })(<Input type="text"/>)}
        </FormItem>
        <FormItem label="发生时间：" {...formItemLayout}>
          {getFieldDecorator('mark_at', {
            initialValue: moment(item.mark_at),
            rules: [
              {
                required: true,
                type: 'object',
                message: '发生时间不能为空'
              }
            ]
          })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="发生时间" />)}
        </FormItem>
        <FormItem label="心情：" {...formItemLayout}>
          {getFieldDecorator('mood', {
            initialValue: item.mood,
            rules: [
              {
                required: true,
                message: '心情不能为空'
              }
            ]
          })(<RadioGroup>
              <RadioButton value="好">好</RadioButton>
              <RadioButton value="一般">一般</RadioButton>
              <RadioButton value="差">差</RadioButton>
            </RadioGroup>)}
        </FormItem>
        <FormItem wrapperCol={{ span: 24, offset: 6 }}>
         {getFieldDecorator('is_public',{
           valuePropName: 'checked',
           initialValue: item.is_public === 'y',
         })(<Checkbox >公开</Checkbox>)}
        </FormItem>
        <FormItem wrapperCol={{ span: 24, offset: 6 }}>
         {getFieldDecorator('status',{
            valuePropName: 'checked',
            initialValue: item.status === 'aa',
          })(<Checkbox>启用</Checkbox>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

MarkModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(MarkModal)
