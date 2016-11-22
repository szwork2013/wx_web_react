import React, {PropTypes} from 'react'
import {Button, Form, Input, DatePicker} from 'antd'
const RangePicker = DatePicker.RangePicker

const FormItem = Form.Item

const WxChargeOrdSearch = ({form, onSearch, form: {
	getFieldDecorator,
  validateFields,
  getFieldsValue
}}) => {
	const handleSubmit = e => {
		e.preventDefault()

		const fieldsValue = getFieldsValue()
		const rangeTimeValue = fieldsValue['payTime']
		const data = {
			keyword: fieldsValue['keyword'] || '',
			begin: rangeTimeValue[0] ? rangeTimeValue[0].format() : '',
			end: rangeTimeValue[1] ? rangeTimeValue[1].format() : ''
		}
		onSearch(data)
	}

	return (
		<Form inline onSubmit={handleSubmit} style={{marginBottom: 20}}>
			<FormItem label='姓名/手机号' labelCol={{span: 10}} wrapperCol={{span: 14}}>
				{getFieldDecorator('keyword', {initialValue: ''})(<Input type='text'/>)}
			</FormItem>
			<FormItem label='支付时间：'>
				{getFieldDecorator('payTime', {initialValue: []})(<RangePicker showTime format='YYYY/MM/DD HH:mm:ss' />)}
			</FormItem>
			<FormItem>
				<Button type='primary' htmlType='submit'>搜索</Button>
			</FormItem>
		</Form>
	)
}

WxChargeOrdSearch.propTypes = {
}

export default Form.create()(WxChargeOrdSearch)
