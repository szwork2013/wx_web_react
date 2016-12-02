import React, {PropTypes} from 'react'
import {Button, Form, Input, DatePicker, Select} from 'antd'
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
const Option = Select.Option
import styles from './index.less'
import _ from 'lodash'

const CusSearch = ({dispatch, form, form: {
	getFieldDecorator,
  getFieldsValue
}}) => {
	const handleSubmit = e => {
		e.preventDefault()
		const fieldsValue = getFieldsValue()
		const data = {
			accountName: fieldsValue['accountName'] || '',
			mobile: fieldsValue['mobile'] || '',
			status: fieldsValue['status'] || ''
		}
		dispatch({type: 'account/read', payload: {...data}})
	}
	const onAdd = () => {
		dispatch({type: 'common/getCusItems'})
		dispatch({type: 'account/showModal', payload: {modalType: 'create'}})
	}

	return (
		<div className={styles.search}>
			<Form inline onSubmit={handleSubmit} className={styles.searchLeft}>
				<FormItem label='账户名：'>
					{getFieldDecorator('accountName')(<Input type='text'/>)}
				</FormItem>
				<FormItem label='手机号：'>
					{getFieldDecorator('mobile')(<Input type='text'/>)}
				</FormItem>
				<FormItem label='状态：'>
					{getFieldDecorator('status', {initialValue: ''})(
						<Select style={{width: 100}}>
							<Option value=''>全部</Option>
							<Option value='aa'>启用</Option>
							<Option value='nn'>停用</Option>
						</Select>)}
				</FormItem>
				<FormItem>
					<Button type='primary' htmlType='submit'>搜索</Button>
				</FormItem>
			</Form>
			<div className={styles.searchRight}>
				<Button type='ghost' onClick={onAdd}>添加账户</Button>
			</div>
		</div>
	)
}

CusSearch.propTypes = {
}

export default Form.create()(CusSearch)

