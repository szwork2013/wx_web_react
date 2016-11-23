import React, {PropTypes} from 'react'
import { Modal, Form, Input, DatePicker, Select, Checkbox, InputNumber, Col, Row, Upload, Icon, Button } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
import styles from './index.less'
import moment from 'moment'

const CusModal = ({visible, item = {}, onOk, onCancel, type, isSaving, isSuccess, uploadFiles, form, form: {
	resetFields,
	getFieldDecorator,
	validateFields,
	getFieldsValue
}}) => {
	const handleOk = () => {
		validateFields((errors) => {
			if (errors) {
				return
			}
			const fieldsValue = getFieldsValue()
			const data = {
				...getFieldsValue()
			}
			
			onOk(data)
		})
	}

	if (isSuccess) {
		resetFields()
	}

	const modalProps = {
		title: type === 'create' ? '新增' : '编辑',
		visible,
		// onOk: handleOk,
		onCancel,
		width: 700,
		maskClosable: false,
		footer: [
			<Button key='back' type='ghost' size='large' onClick={onCancel}>取消</Button>,
			<Button key='submit' type='primary' size='large' loading={isSaving} onClick={handleOk}>
				确认
			</Button>
		]
	}
	const formItemLayout = {
		labelCol: {span: 8},
		wrapperCol: {span: 16}
	}
	const onUploadChange = info => {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList)
		}
		if (info.file.status === 'done') {
			console.log(`${info.file.name} file uploaded successfully`)
		} else if (info.file.status === 'error') {
			console.log(`${info.file.name} file upload failed.`)
		}
	}
	let url
	if (process.env.NODE_ENV === 'production') {
		url = '/web/v1/' + url
	}	else {
		url = 'http://localhost:8080/web/v1/' + url
	}
	const uploadProps = {
		action: url,
		accept: '.jpg,.png,.gif,.bmp,.jpeg',
		listType: 'picture'
	}
	const handleEvent = e => {
		if (!e || !e.fileList) {
			return e
		}

		const { fileList } = e
		return fileList
	}

	return (
		<Modal {...modalProps}>
			<Form horizontal>
				<Row>
					<Col span={12}>
						<FormItem label='礼品名称：' {...formItemLayout}>
							{getFieldDecorator('giftName', {
								initialValue: item.giftName,
								rules: [
									{required: true, message: '礼品名称不能为空'}
								]
							})(<Input type='text' style={{width: '100%'}}/>)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem label='礼品类别：' {...formItemLayout}>
							{getFieldDecorator('giftType', {
								initialValue: item.giftType || '实物礼品',
								rules: [
									{required: true, message: '礼品类别不能为空'}
								]
							})(
								<Select style={{width: '100%'}}>
									<Option value='实物礼品'>实物礼品</Option>
									<Option value='电子卷'>电子卷</Option>
								</Select>
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem label='送达方式：' {...formItemLayout}>
							{getFieldDecorator('getWay', {
								initialValue: item.getWay || '自动到帐',
								rules: [
									{required: true, message: '送达方式不能为空'}
								]
							})(
								<Select style={{width: '100%'}}>
									<Option value='自动到帐'>自动到帐</Option>
									<Option value='到店领取'>到店领取</Option>
									<Option value='邮寄'>邮寄</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem label='电子卷效期：' {...formItemLayout}>
							{getFieldDecorator('vldDays', {
								initialValue: moment(item.vldDays)
							})(<DatePicker style={{width: '100%'}}/>)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem label='礼品价值：' {...formItemLayout}>
							{getFieldDecorator('giftAmt', {
								initialValue: item.giftAmt || '',
								rules: [
									{type: 'number', required: true, message: '礼品价值不能为空'}
								]
							})(<InputNumber min={1} max={99999} style={{width: '100%'}}/>)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem label='消耗积分：' {...formItemLayout}>
							{getFieldDecorator('scoreNeed', {
								initialValue: item.scoreNeed || '',
								rules: [
									{type: 'number', required: true, message: '消耗积分不能为空'}
								]
							})(<InputNumber style={{width: '100%'}}/>)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem label='可兑数量：' {...formItemLayout}>
							{getFieldDecorator('stkQty', {
								initialValue: item.stkQty || '',
								rules: [
									{type: 'number', required: true, message: '可兑数量不能为空'}
								]
							})(<InputNumber style={{width: '100%'}}/>)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={16}>
						<FormItem label='发放时间段：' labelCol={{span: 6}} wrapperCol={{span: 18}}>
							{getFieldDecorator('rangeDate', {
								initialValue: [item.beginDate, item.endDate],
								rules: [
									{type: 'array', required: true, message: '发放时间段不能为空'}
								]
							})(<RangePicker showTime style={{width: '100%'}} format='YYYY-MM-DD HH:mm:ss'/>)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem label='图片上传：' labelCol={{span: 12}} wrapperCol={{span: 12}}>
							{getFieldDecorator('giftPic', {
								valuePropName: 'fileList',
								initialValue: uploadFiles,
								getValueFromEvent: handleEvent,
								onChange: onUploadChange
							})(
								<Upload {...uploadProps}>
									<Button type='ghost'>
										<Icon type='upload' /> 上传
									</Button>
								</Upload>)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem label='状态：' {...formItemLayout}>
							{getFieldDecorator('status')(<Checkbox/>)}
						</FormItem>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

CusModal.propTypes = {
}

export default Form.create()(CusModal)
