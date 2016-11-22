import React, {PropTypes} from 'react'
import {Button, Form, Input, DatePicker, Select} from 'antd'
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
const Option = Select.Option

const Search = ({form, onSearch, form: {
	getFieldDecorator,
  validateFields,
  getFieldsValue
}}) => {
	const handleSubmit = e => {
		e.preventDefault()
		const fieldsValue = getFieldsValue()
		const rangeTimeValue = fieldsValue['validDate']
		const data = {
			giftName: fieldsValue['giftName'] || '',
			giftType: fieldsValue['giftType'] || '',
			begin: rangeTimeValue[0] ? rangeTimeValue[0].format() : '',
			end: rangeTimeValue[1] ? rangeTimeValue[1].format() : ''
		}
		onSearch(data)
	}

	return (
		<Form inline onSubmit={handleSubmit} style={{marginBottom: 20}}>
			<FormItem label='礼品名称：'>
				{getFieldDecorator('giftName')(<Input type='text'/>)}
			</FormItem>
			<FormItem label='礼品类别：'>
				{getFieldDecorator('giftType')(
					<Select style={{width: 100}}>
						<Option value='1'>1</Option>
						<Option value='2'>3</Option>
					</Select>)}
			</FormItem>
			<FormItem label='发放时间：'>
				{getFieldDecorator('validDate', {initialValue: []})(<RangePicker showTime format='YYYY/MM/DD HH:mm:ss' />)}
			</FormItem>
			<FormItem>
				<Button type='primary' htmlType='submit'>搜索</Button>
			</FormItem>
		</Form>
	)
}

Search.propTypes = {
}

export default Form.create()(Search)
