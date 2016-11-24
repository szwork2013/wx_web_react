import React, {PropTypes} from 'react'
import { Modal, Form, Input, DatePicker, Select, Checkbox, InputNumber, Col, Row, Upload, Icon, Button } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
import styles from './index.less'
import moment from 'moment'
import _ from 'lodash'

const CusModal = ({visible, item = {}, onOk, onCancel, type, isSaving, isSuccess, onUpload, uploadFiles, giftTypes, getWays, form, form: {
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
			const upFile = _.first(uploadFiles)
			const fieldsValue = getFieldsValue()
			const rangeDateValue = fieldsValue['rangeDate']
			const data = {
				...getFieldsValue(),
				vldDays: fieldsValue['vldDays'] ? fieldsValue['vldDays'].format() : '',
				begDate: rangeDateValue[0] ? rangeDateValue[0].format() : '',
				endDate: rangeDateValue[1] ? rangeDateValue[1].format() : '',
				status: fieldsValue['status'] ? 'aa' : 'nn',
				giftPic: upFile.response.url
			}
			onOk(data)
			resetFields()
		})
	}

	const modalProps = {
		title: type === 'create' ? '新增' : '编辑',
		visible,
		// onOk: handleOk,
		onCancel,
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

	let url
	if (process.env.NODE_ENV === 'production') {
		url = '/com/file'
	}	else {
		url = 'http://localhost:8080/com/file'
	}
	const uploadProps = {
		action: url,
		accept: '.jpg,.png,.gif,.bmp,.jpeg',
		listType: 'picture',
		onChange: onUpload
	}
	const handleEvent = e => {
		if (!e || !e.fileList) {
			return e
		}

		const { fileList } = e
		return fileList
	}

	const GiftTypeOptions = giftTypes.map(item => {
		return (
			<Option key={item.itemcode} value={item.itemcode}>{item.itemname}</Option>
		)
	})
	const GetWayOptions = getWays.map(item => {
		return (
			<Option key={item.itemcode} value={item.itemcode}>{item.itemname}</Option>
		)
	})
	// const checkPic = (rule, value, callback) => {
	// 	if (!uploadFiles || uploadFiles.length === 0) {
	// 		callback('请上传图片')
	// 	} else {
	// 		callback()
	// 	}
	// }

	return (
		<Modal {...modalProps}>
			<Form horizontal>
				<Row>
					<Col span={12}>
						<FormItem label='礼品名称：' {...formItemLayout}>
							{
								type === 'detail' ? <label>{item.giftName}</label> : getFieldDecorator('giftName', {
									initialValue: item.giftName,
									rules: [
										{required: true, message: '礼品名称不能为空'}
									]
								})(<Input type='text' style={{width: '100%'}}/>)
							}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem label='礼品类别：' {...formItemLayout}>
							{
								type === 'detail' ? <label>{item.giftType}</label> : getFieldDecorator('giftType', {
									initialValue: item.giftType || '001',
									rules: [
										{required: true, message: '礼品类别不能为空'}
									]
								})(
									<Select style={{width: '100%'}}>
										{GiftTypeOptions}
									</Select>
								)
							}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem label='送达方式：' {...formItemLayout}>
							{
								type === 'detail' ? <label>{item.getWay}</label> : getFieldDecorator('getWay', {
									initialValue: item.getWay || '001',
									rules: [
										{required: true, message: '送达方式不能为空'}
									]
								})(
									<Select style={{width: '100%'}}>
										{GetWayOptions}
									</Select>
								)
						}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem label='电子卷效期：' {...formItemLayout}>
							{
								type === 'detail' ? <label>{moment(item.vldDays).format('YYYY-MM-DD')}</label> : getFieldDecorator('vldDays', {
									initialValue: item.vldDays ? moment(item.vldDays) : null
								})(<DatePicker style={{width: '100%'}} format='YYYY-MM-DD'/>)
							}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem label='礼品价值：' {...formItemLayout}>
							{
								type === 'detail' ? <label>{item.giftAmt}</label> : getFieldDecorator('giftAmt', {
									initialValue: item.giftAmt || 0,
									rules: [
										{type: 'number', required: true, message: '礼品价值不能为空'}
									]
								})(<InputNumber min={1} max={99999} style={{width: '100%'}}/>)
							}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem label='消耗积分：' {...formItemLayout}>
							{
								type === 'detail' ? <label>{item.scoreNeed}</label> : getFieldDecorator('scoreNeed', {
									initialValue: item.scoreNeed || 0,
									rules: [
										{type: 'number', required: true, message: '消耗积分不能为空'}
									]
								})(<InputNumber min={1} max={99999} style={{width: '100%'}}/>)
							}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem label='可兑数量：' {...formItemLayout}>
							{
								type === 'detail' ? <label>{item.stkQty}</label> : getFieldDecorator('stkQty', {
									initialValue: item.stkQty || 0,
									rules: [
										{type: 'number', required: true, message: '可兑数量不能为空'}
									]
								})(<InputNumber min={1} max={99999} style={{width: '100%'}}/>)
							}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={16}>
						<FormItem label='发放时间段：' labelCol={{span: 6}} wrapperCol={{span: 18}}>
							{
								type === 'detail' ? <label>{moment(item.begDate).format('YYYY-MM-DD HH:mm:ss')}至{moment(item.endDate).format('YYYY-MM-DD HH:mm:ss')}</label> : getFieldDecorator('rangeDate', {
									initialValue: (item.begDate && item.endDate) ? [moment(item.begDate), moment(item.endDate)] : null,
									rules: [
										{type: 'array', required: true, message: '发放时间段不能为空'}
									]
								})(<RangePicker showTime style={{width: '100%'}} format='YYYY-MM-DD HH:mm:ss'/>)
							}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem label='图片上传' {...formItemLayout}>
							{
								type === 'detail' ? <img src={'http://localhost:8080' + item.giftPic} style={{maxWidth: '100%'}}/> : getFieldDecorator('giftPic', {
									valuePropName: 'fileList',
									initialValue: uploadFiles,
									getValueFromEvent: handleEvent,
									rules: [
										{type: 'array', required: true, message: '请上传图片'}
									]
								})(
									<Upload {...uploadProps}>
											<Button type='ghost'>
												<Icon type='upload' /> 上传
											</Button>
									</Upload>
								)
							}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem label='状态：' {...formItemLayout}>
							{
								type === 'detail' ? <label>{item.status === 'aa' ? '启用' : '停用'}</label> : getFieldDecorator('status', {
									valuePropName: 'checked',
									initialValue: !item.status || item.status === 'aa'
								})(<Checkbox/>)
							}
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
