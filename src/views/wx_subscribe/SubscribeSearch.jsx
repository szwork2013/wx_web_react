import React, {PropTypes} from 'react'
import {Button, Form, Select, Input, DatePicker} from 'antd'
const RangePicker = DatePicker.RangePicker;

const SubscribeSearch = ({
  form,
  onSearch,
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  function handleSubmit(e) {
    e.preventDefault()
    validateFields((errors) => {
      if (!!errors) {
        return
      }
      const fieldsValue = getFieldsValue()
      // const data = {
      //   query: 'WxNickName' +':'+ fieldsValue['wxNickName'] || '',
      // }
      const rangeTimeValue = fieldsValue['WxSubscribeTime'];

      const query1 = 'WxNickName' +'='+ fieldsValue['wxNickName'] || ''
      let query2 = ''
      let query3 = ''
      if(rangeTimeValue && rangeTimeValue.length === 2){
        query2 = ',begin'+'='+rangeTimeValue[0].format()
        query3 = ',end'+'='+rangeTimeValue[1].format()
      }

      onSearch(query1 + query2 + query3)
    })
  }

  return (
    <div>
      <Form inline onSubmit={handleSubmit}>
        <Form.Item label='用户昵称：'>
          {getFieldDecorator('wxNickName', {
            initialValue: '',
          })(<Input type='tetx'/>)
          }
        </Form.Item>
        <Form.Item label='关注时间：'>
          {getFieldDecorator('WxSubscribeTime', {
          })(<RangePicker showTime format="YYYY/MM/DD HH:mm:ss" />)
          }
        </Form.Item>
        <Button style={{
          marginRight: '10px'
        }} type='primary' htmlType='submit'>搜索</Button>
      </Form>
    </div>
  )
}

SubscribeSearch.propTypes = {
  onAdd: PropTypes.func
}

export default Form.create()(SubscribeSearch)
