import React, {PropTypes} from 'react'
import { Form, Input, Select, Checkbox, Modal, Button } from 'antd'
import { formatModalName, formatAccountStatus, checkPhone } from '../../utils'
import _ from 'lodash'
const FormItem = Form.Item
const Option = Select.Option

const CusModal = ({dispatch, current, modalType, modalVisible, cus, accountVldStatus, mobileVldStatus, form, form: {
	resetFields,
	getFieldDecorator,
	validateFields,
	getFieldsValue
}}) => {
	const handleOk = () => {
		validateFields(errors => {
			if (errors) return

			const fieldsValue = getFieldsValue()
			const data = {
				...getFieldsValue(),
				status: fieldsValue['status'] ? 'aa' : 'nn'
			}
			dispatch({type: 'account/create', payload: {data}})
			resetFields()
			dispatch({type: 'account/common', payload: {accountVldStatus: '', mobileVldStatus: ''}})
		})
	}
	const onCancel = () => {
		dispatch({type: 'account/hideModal'})
		resetFields()
		dispatch({type: 'account/common', payload: {accountVldStatus: '', mobileVldStatus: ''}})
	}
	const getFooter = () => {
		if (modalType !== 'detail') {
			return [
				<Button key='back' type='ghost' size='large' onClick={onCancel}>取消</Button>,
				<Button key='submit' type='primary' size='large' onClick={handleOk}>确认</Button>
			]
		} else {
			return [<Button key='back' type='ghost' size='large' onClick={onCancel}>关闭</Button>]
		}
	}
	const modalProps = {
		title: formatModalName(modalType),
		visible: modalVisible,
		onCancel,
		maskClosable: false,
		footer: getFooter()
	}
	const formItemLayout = {
		labelCol: {span: 6},
		wrapperCol: {span: 18}
	}
	const CusOptions = cus.map(item => {
		return (
			<Option key={item.cusID} value={item.cusID}>{item.cusName}</Option>
		)
	})
	const checkAccountName = (rule, value, callback) => {
		if (value) {
			const fieldsValue = getFieldsValue()
			dispatch({type: 'account/checkAccoutName', payload: {accountName: fieldsValue['accountName'], callback, unicode: current.unicode}})
		} else {
			callback('账户名不能为空')
			dispatch({type: 'account/common', payload: {accountVldStatus: 'error'}})
		}
	}
	const checkMobile = (rule, value, callback) => {
		if (checkPhone(value)) {
			const fieldsValue = getFieldsValue()
			dispatch({type: 'account/checkMobile', payload: {mobile: fieldsValue['mobile'], callback, unicode: current.unicode}})
		} else {
			callback('手机号格式错误')
			dispatch({type: 'account/common', payload: {mobileVldStatus: 'error'}})
		}
	}
	return (
		<Modal {...modalProps}>
			<Form horizontal>
				<FormItem label='账户名：' {...formItemLayout} hasFeedback validateStatus={accountVldStatus}>
					{
						modalType === 'detail' ? <label>{current.accountName}</label>
						: getFieldDecorator('accountName', {
							initialValue: current.accountName,
							validateTrigger: 'onBlur',
							rules: [
								{validator: checkAccountName}
							]
						})(<Input type='text' placeholder='账户名' autoComplete='off'/>)
					}
				</FormItem>
				<FormItem label='手机号：' {...formItemLayout} hasFeedback validateStatus={mobileVldStatus}>
					{
						modalType === 'detail' ? <label>{current.mobile}</label>
						: getFieldDecorator('mobile', {
							initialValue: current.mobile,
							validateTrigger: 'onBlur',
							rules: [
								{validator: checkMobile}
							]
						})(<Input type='text' placeholder='手机号' autoComplete='off'/>)
					}
				</FormItem>
				<FormItem label='所属商户：' {...formItemLayout}>
					{
						modalType === 'detail' ? <label>{current.cus}</label>
						: getFieldDecorator('cusId', {
							initialValue: current.cusId || _.first(_.map(cus, 'cusID')),
							rules: [
								{required: true, message: '所属商户不能为空'}
							]
						})(<Select placeholder='请选择商户'>
								{CusOptions}
							</Select>)
					}
				</FormItem>
				<FormItem label='状态：' {...formItemLayout}>
					{
						modalType === 'detail' ? <label>{formatAccountStatus(current.status)}</label>
						: getFieldDecorator('status', {
							valuePropName: 'checked',
							initialValue: current.status !== 'nn'
						})(<Checkbox/>)
					}
				</FormItem>
				<FormItem label='注：' {...formItemLayout}>
					<h4>账户名、手机号可用来进行登录；初始密码：000000</h4>
				</FormItem>
			</Form>
		</Modal>
	)
}

CusModal.propTypes = {
}

export default Form.create()(CusModal)
