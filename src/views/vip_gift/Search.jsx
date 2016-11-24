import React, {PropTypes} from 'react'
import {Button, Form, Input, DatePicker, Select} from 'antd'
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
const Option = Select.Option
import styles from './index.less'

const Search = ({form, onSearch, onAdd, giftTypes, form: {
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

	const GiftTypeOptions = giftTypes.map(item => {
		return (
			<Option key={item.itemcode} value={item.itemcode}>{item.itemname}</Option>
		)
	})

	return (
		<div className={styles.search}>
			<Form inline onSubmit={handleSubmit} className={styles.searchLeft}>
				<FormItem label='礼品名称：'>
					{getFieldDecorator('giftName')(<Input type='text'/>)}
				</FormItem>
				<FormItem label='礼品类别：'>
					{getFieldDecorator('giftType')(
						<Select style={{width: 100}}>
							{GiftTypeOptions}
						</Select>)}
				</FormItem>
				<FormItem label='发放时间：'>
					{getFieldDecorator('validDate', {initialValue: []})(<RangePicker showTime format='YYYY/MM/DD HH:mm:ss' />)}
				</FormItem>
				<FormItem>
					<Button type='primary' htmlType='submit'>搜索</Button>
				</FormItem>
			</Form>
			<div className={styles.searchRight}>
				<Button type='ghost' onClick={onAdd}>添加</Button>
			</div>
		</div>
	)
}

Search.propTypes = {
}

export default Form.create()(Search)
