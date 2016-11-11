import React from 'react'
import {Button, Form, Input} from 'antd'

const CurMbrSearch = ({form, onSearch, form: {
  getFieldDecorator,
  validateFields,
  getFieldsValue
}})=>{
  const handleSubmit = e => {
    e.preventDefault()
    validateFields((errors) => {
      if (!!errors) {
        return
      }
      const fieldsValue = getFieldsValue()

      const query1 = 'keyword' +'='+ fieldsValue['keyword'] || ''
      onSearch(query1)
    })
  }

  return (
    <div>
      <Form inline onSubmit={handleSubmit}>
        <Form.Item label='姓名/手机号：' labelCol={{ span:10 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('keyword', {
            initialValue: '',
          })(<Input type='tetx'/>)
          }
        </Form.Item>
        <Form.Item>
          <Button style={{
            marginLeft: '10px'
          }} type='primary' htmlType='submit'>搜索</Button>
        </Form.Item>
      </Form>
      <br/>
    </div>
  )
}

export default Form.create()(CurMbrSearch)
