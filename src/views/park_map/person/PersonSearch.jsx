import React, {PropTypes} from 'react'
import {Card, Input, Button, Form, Modal, DatePicker} from 'antd'
import _ from 'lodash'
import moment from 'moment'
import styles from './index.less'
import PersonTraffic from './PersonTraffic'
import TrafficHistory from './TrafficHistory'

const FormItem = Form.Item

const PersonSearch = ({getMoreData, historyTraffic, traffics, trafficQuery, onSearch, modalVisible, closeModal, form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }}) => {
	const formItemLayout = {
		labelCol: {
			span: 6
		},
		wrapperCol: {
			span: 18
		}
	}
	const onUserSearch = () => {
		validateFields((errors) => {
			if (errors) {
				return
			}
			const fieldsValue = getFieldsValue()
			const data = {
				userName: fieldsValue['userName'],
				carNum: fieldsValue['carNum'],
				phone: fieldsValue['phone'],
				begin: fieldsValue['begin'] ? fieldsValue['begin'].format() : '',
				end: fieldsValue['end'] ? fieldsValue['end'].format() : ''
			}
			onSearch(data)
		})
	}

	const historyProps = {
		traffics: historyTraffic
	}

	const trafficProps = {
		traffics,
		getMoreData
	}
	const modalOpts = {
		title: '轨迹历史',
		visible: modalVisible,
		onOk: closeModal,
		onCancel: closeModal
	}

	return (
		<div className={styles.container}>
				<div>
					<Card style={{width: '95%', margin: '10px'}} bodyStyle={{ padding: 6 }}>
						<Form horizontal>
							<FormItem label='车牌号：' {...formItemLayout} style={{marginBottom: '12px'}}>
								{getFieldDecorator('carNum', {initialValue: trafficQuery.carNum})(<Input type='text'/>)}
							</FormItem>
							<FormItem label='姓名：' {...formItemLayout} style={{marginBottom: '12px'}}>
								{getFieldDecorator('userName', {initialValue: ''})(<Input type='text'/>)}
							</FormItem>
							<FormItem label='手机号：' {...formItemLayout} style={{marginBottom: '12px'}}>
								{getFieldDecorator('phone', {initialValue: ''})(<Input type='text'/>)}
							</FormItem>
							<FormItem label='开始时间：' {...formItemLayout} style={{marginBottom: '12px'}}>
								{getFieldDecorator('begin', {initialValue: moment(trafficQuery.begin)})(<DatePicker showTime allowClear={false} format='YYYY-MM-DD HH:mm' />)}
							</FormItem>
							<FormItem label='结束时间：' {...formItemLayout} style={{marginBottom: '12px'}}>
								{getFieldDecorator('end', {initialValue: moment(trafficQuery.end)})(<DatePicker showTime allowClear={false} format='YYYY-MM-DD HH:mm' />)}
							</FormItem>
							<FormItem wrapperCol={{ span: 18, offset: 6 }} style={{marginBottom: '6px'}}>
								<Button type='primary' style={{width: '100%'}} onClick={onUserSearch}>查询</Button>
							</FormItem>
						</Form>
					</Card>
				</div>
				<div style={{flex: 1}}>
					<PersonTraffic {...trafficProps}/>
				</div>
				<Modal {...modalOpts}>
					<TrafficHistory {...historyProps}/>
				</Modal>
		</div>
	)
}

PersonSearch.propTypes = {
}

export default Form.create()(PersonSearch)
