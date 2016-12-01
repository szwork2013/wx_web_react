import React, {PropTypes} from 'react'
import { Form, Input, Select, Checkbox, Modal, Button } from 'antd'
import { formatModalName, formatAccountStatus } from '../../utils'
const FormItem = Form.Item

const CusModal = ({dispatch, current = {}, modalType, modalVisible, cus, form, form: {
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
		})
	}
	const onCancel = () => {
		dispatch({type: 'account/hideModal'})
		resetFields()
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
	return (
		<Modal {...modalProps}>
			<Form horizontal>
				<FormItem label='账户名：' {...formItemLayout}>
					{
						modalType === 'detail' ? <label>{current.accountName}</label>
						: getFieldDecorator('accountName', {
							initialValue: current.accountName,
							rules: [
								{required: true, message: '账户名不能为空'}
							]
						})(<Input type='text' placeholder='账户名'/>)
					}
				</FormItem>
				<FormItem label='手机号：' {...formItemLayout}>
					{
						modalType === 'detail' ? <label>{current.mobile}</label>
						: getFieldDecorator('mobile', {
							initialValue: current.mobile,
							rules: [
								{required: true, message: '手机号不能为空'}
							]
						})(<Input type='text' placeholder='手机号'/>)
					}
				</FormItem>
				<FormItem label='所属商户：' {...formItemLayout}>
					{
						modalType === 'detail' ? <label>{current.cus}</label>
						: getFieldDecorator('cusId', {
							initialValue: current.cusId,
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
						})(<Checkbox type='text'/>)
					}
				</FormItem>
			</Form>
		</Modal>
	)
}

CusModal.propTypes = {
}

export default Form.create()(CusModal)
