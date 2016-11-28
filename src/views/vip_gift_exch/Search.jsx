import React, {PropTypes} from 'react'
import {Button, Form, Input, DatePicker, Select} from 'antd'
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
const Option = Select.Option
import styles from './index.less'
import _ from 'lodash'

const Search = ({dispatch, form, pageSize, form: {
	getFieldDecorator,
  validateFields,
  getFieldsValue
}}) => {
	const handleSubmit = e => {
		e.preventDefault()
		const fieldsValue = getFieldsValue()
		const rangeTimeValue = fieldsValue['rangeDate']
		const data = {
			mbr: fieldsValue['mbr'],
			giftName: fieldsValue['giftName'],
			begin: rangeTimeValue[0] ? rangeTimeValue[0].format() : undefined,
			end: rangeTimeValue[1] ? rangeTimeValue[1].format() : undefined
		}
		dispatch({type: 'giftexch/read',
			payload: {
				page: 1,
				pageSize,
				current: 1,
				mbr: data.mbr,
				giftName: data.giftName,
				begin: data.begin,
				end: data.end
			}})
	}

	// let temp = _.cloneDeep(giftTypes)
	// temp.splice(0, 0, {
	// 	itemname: '全部',
	// 	itemcode: ''
	// })
	// const GiftTypeOptions = temp.map(item => {
	// 	return (
	// 		<Option key={item.itemcode} value={item.itemcode}>{item.itemname}</Option>
	// 	)
	// })

	return (
		<div className={styles.search}>
			<Form inline onSubmit={handleSubmit} className={styles.searchLeft}>
				<FormItem label='兑换会员：'>
					{getFieldDecorator('mbr')(<Input type='text'/>)}
				</FormItem>
				<FormItem label='礼品名称：'>
					{getFieldDecorator('giftName')(<Input type='text'/>)}
				</FormItem>
				<FormItem label='兑换时间：'>
					{getFieldDecorator('rangeDate', {initialValue: []})(<RangePicker showTime format='YYYY/MM/DD HH:mm:ss' />)}
				</FormItem>
				<FormItem>
					<Button type='primary' htmlType='submit'>搜索</Button>
				</FormItem>
			</Form>
		</div>
	)
}

Search.propTypes = {
}

export default Form.create()(Search)
