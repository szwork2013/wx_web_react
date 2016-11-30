import React, {PropTypes} from 'react'
import { Form, Input, Checkbox, Button, Radio, Icon } from 'antd'
const { Item } = Form
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const CusForm = ({dispatch, parentMenu = {}, curSelMenu = {}, visible, type, form: {
	resetFields,
	getFieldDecorator,
	validateFields,
	getFieldsValue
}}) => {
	const formItemLayout = {
		labelCol: {span: 4},
		wrapperCol: {span: 18}
	}
	const btnSave = () => {
		validateFields((errors) => {
			if (errors) {
				return
			}
			const fieldsValue = getFieldsValue()
			const rangeDateValue = fieldsValue['rangeDate']
			const data = {
				...getFieldsValue(),
				id: curSelMenu.id,
				pid: parentMenu.id || 0,
				status: fieldsValue['status'] ? 'aa' : 'nn'
			}
			if (type === 'edit') {
				dispatch({type: 'module/update', payload: {...data, type: 'detail', curSelMenu: {...data}}})
			} else {
				dispatch({type: 'module/create', payload: {...data, visible: false}})
			}
			dispatch({type: 'auth/getModules'})
		})
	}
	parentMenu = parentMenu || {}
	const isDetail = type === 'detail'
	const isRootMenu = parentMenu.id === 0
	return (
		<Form horizontal>
			{
				!visible ? <label></label> : <div>
					<Item label='父级菜单：' {...formItemLayout}>
					<label>{parentMenu.name}</label>
					</Item>
					<Item label='菜单名称：' {...formItemLayout}>
						{
							isDetail ? <label>{curSelMenu.name}</label> : getFieldDecorator('name', {
								initialValue: curSelMenu.name,
								rules: [
									{required: true, message: '菜单名称不能为空'}
								]
							})(<Input type='text'/>)}
					</Item>
					{
						isRootMenu ? ''
						:	<Item label='菜单地址：' {...formItemLayout}>
								{
									isDetail ? <label>{curSelMenu.url}</label> : getFieldDecorator('url', {
										initialValue: curSelMenu.url,
										rules: [
											{required: true, message: '菜单地址不能为空'}
										]
									})(<Input type='text'/>)}
							</Item>
					}
					<Item label='菜单图标：' {...formItemLayout}>
						{
							isDetail ? <Icon type={curSelMenu.icon}></Icon> : getFieldDecorator('icon', {
								initialValue: curSelMenu.icon || ''
							})(
								<RadioGroup>
									<RadioButton value=''>无</RadioButton>
									<RadioButton value='home'><Icon type='home'></Icon></RadioButton>
									<RadioButton value='setting'><Icon type='setting'></Icon></RadioButton>
									<RadioButton value='pay-circle-o'><Icon type='pay-circle-o'></Icon></RadioButton>
									<RadioButton value='user'><Icon type='user'></Icon></RadioButton>
									<RadioButton value='credit-card'><Icon type='credit-card'></Icon></RadioButton>
									<RadioButton value='info-circle-o'><Icon type='info-circle-o'></Icon></RadioButton>
								</RadioGroup>)}
					</Item>
					<Item label='状态：' {...formItemLayout}>
						{
							isDetail ? (curSelMenu.status === 'aa' ? '启用' : '停用') : getFieldDecorator('status', {
								valuePropName: 'checked',
								initialValue: !curSelMenu.status || curSelMenu.status === 'aa'
							})(<Checkbox/>)}
					</Item>
					<Item wrapperCol={{span: 12, offset: 6}}>
						{
							isDetail ? '' : <Button type='primary' onClick={btnSave}>保存</Button>
						}
					</Item>
				</div>
			}
		</Form>
	)
}

CusForm.propTypes = {
}

export default Form.create()(CusForm)
