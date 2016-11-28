import React, {PropTypes} from 'react'
import {Form, Modal, Col, Row} from 'antd'
import { formatSex, formatDate } from '../../utils'

const FormItem = Form.Item

const formItemLayout = {
	labelCol: {
		span: 10
	},
	wrapperCol: {
		span: 14
	}
}

const SubscribeModal = ({
	visible,
	item = {},
	onOk,
	onCancel,
	type,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue
	}
}) => {
	function handleOk () {
		onOk()
		// validateFields((errors) => {
		//   if (errors) {
		//     return
		//   }
		//   const fieldsValue = getFieldsValue()
		//   const data = {
		//     ...getFieldsValue(),
		//     mark_at: fieldsValue['mark_at'].format(),
		//     is_public: fieldsValue["is_public"] ? 'y':'n',
		//     status: fieldsValue["status"] ? 'aa':'nn',
		//     key: item.key
		//   }
		//   onOk(data)
		// })
	}

	const modalOpts = {
		title: '新增',
		visible,
		onOk: handleOk,
		onCancel,
		width: 450
	}

	const isDetail = true

	return (
		<Modal {...modalOpts} >
			<Form horizontal>
				<FormItem wrapperCol={{span: 12, offset: 9}}>
					<img src={item.wxHeadImgUrl} style={{width: 96, height: 96, borderRadius: 48}}/>
				</FormItem>
				<Row>
					<Col span={12}>
						<FormItem label='用户昵称：' {...formItemLayout}>
							<label>{item.wxNickName}</label>
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem label='关注时间：' {...formItemLayout}>
							<label>{formatDate(item.wxSubscribeTime)}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem label='性别：' {...formItemLayout}>
							<label>{formatSex(item.wxSex)}</label>
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem label='省份/城市：' {...formItemLayout}>
							<label>{item.wxProvince}{item.wxCity ? '/' + item.wxCity : ''}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem label='会员姓名：' {...formItemLayout}>
							<label>{item.mbrName}</label>
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem label='会员手机号：' {...formItemLayout}>
							<label>{item.mobile}</label>
						</FormItem>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

SubscribeModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func
}

export default Form.create()(SubscribeModal)
