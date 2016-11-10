import React from 'react'
import {Button, Form, Select, Input, DatePicker} from 'antd'
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

const WxTaskSearch = ({form,onSearch,form:{getFieldDecorator,validateFields,getFieldsValue}}) => {
  function handleSubmit(e){
    e.preventDefault()
    validateFields((errors) => {
      if (!!errors) {
        return
      }
      const fieldsValue = getFieldsValue()
      // const data = {
      //   query: 'WxNickName' +':'+ fieldsValue['wxNickName'] || '',
      // }
      const rangeTimeValue = fieldsValue['sendDtm'];

      const query1 = 'nickName' +'='+ fieldsValue['nickName'] || ''
      let query2 = ''
      let query3 = ''
      if(rangeTimeValue && rangeTimeValue.length === 2){
        query2 = ',begin'+'='+rangeTimeValue[0].format()
        query3 = ',end'+'='+rangeTimeValue[1].format()
      }
      const query4 = ',status' +'='+ (fieldsValue['status'] || '')
      onSearch(query1 + query2 + query3 + query4)
    })
  }

  return (
    <div>
      <Form inline onSubmit={handleSubmit}>
        <Form.Item label='微信昵称/姓名：'>
          {getFieldDecorator('nickName', {
            initialValue: '',
          })(<Input type='tetx'/>)
          }
        </Form.Item>
        <Form.Item label='发送时间：'>
          {getFieldDecorator('sendDtm', {
          })(<RangePicker showTime format="YYYY/MM/DD HH:mm:ss" />)
          }
        </Form.Item>
        <Form.Item label='状态：'>
          {getFieldDecorator('status', {
            initialValue: '',
          })(<Select style={{ width: 150 }}>
              <Option value="">全部</Option>
              <Option value="01">待发送</Option>
              <Option value="02">发送成功</Option>
              <Option value="03">发送失败可重试</Option>
              <Option value="04">发送失败不能重试</Option>
              <Option value="05">发送中</Option>
            </Select>)
          }
        </Form.Item>
        <Button style={{
          marginRight: '10px'
        }} type='primary' htmlType='submit'>搜索</Button>
      </Form>
      <br/>
    </div>
  )
}

export default Form.create()(WxTaskSearch)
