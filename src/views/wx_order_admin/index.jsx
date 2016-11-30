import React, {PropTypes} from 'react'
import { connect } from 'dva'
import { Input, Row, Col, Form } from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const Search = Input.Search

const WxOrderAdmin = ({dispatch, orderadmin}) => {
	const { data = {} } = orderadmin
	const { internalOrderInfo = {}, wxOrderInfo = {} } = data
	const returnMsg = wxOrderInfo || {}
	const onSearch = (value) => {
		dispatch({type: 'orderadmin/read', payload: {orderid: value}})
	}

	const formItemLayout = {
		labelCol: {
			span: 9
		},
		wrapperCol: {
			span: 15
		}
	}
	return (
		<div>
			订单号：<Search placeholder='订单号' onSearch={onSearch} style={{width: 300, marginBottom: 8}} />
			<h3 className={styles.formitem}>商户订单信息</h3>
			<Form horizontal>
				<Row>
					<Col span={8}>
						<FormItem label='订单号：' {...formItemLayout}>
							<label>{internalOrderInfo.odrID}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='充值平台：' {...formItemLayout}>
							<label>{internalOrderInfo.payPtf}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='Subuid：' {...formItemLayout}>
							{internalOrderInfo.Subuid}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='企业ID：' {...formItemLayout}>
							<label>{internalOrderInfo.comId}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='用户标识：' {...formItemLayout}>
							{internalOrderInfo.wxOpenId}
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='会员ID：' {...formItemLayout}>
							<label>{internalOrderInfo.mbrId}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='充值金额：' {...formItemLayout}>
							<label>{internalOrderInfo.amt}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='支付订单号：' {...formItemLayout}>
							<label>{internalOrderInfo.payPtfOdrID}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='错误原因：' {...formItemLayout}>
							<label>{internalOrderInfo.errMsg}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='创建时间：' {...formItemLayout}>
							<label>{internalOrderInfo.createDate}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='支付时间：' {...formItemLayout}>
							<label>{internalOrderInfo.payTime}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='状态：' {...formItemLayout}>
							<label>{internalOrderInfo.status}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='修改时间：' {...formItemLayout}>
							<label>{internalOrderInfo.changeDate}</label>
						</FormItem>
					</Col>
				</Row>
			</Form>
			<h3 className={styles.formitem}>微信订单信息</h3>
			<Form horizontal>
				<Row>
					<Col span={8}>
						<FormItem label='状态码：' {...formItemLayout}>
							<label>{wxOrderInfo.return_code}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='公众账号ID：' {...formItemLayout}>
							<label>{returnMsg.appid}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='商户号：' {...formItemLayout}>
							<label>{returnMsg.mch_id}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='随机字符串：' {...formItemLayout}>
							<label>{returnMsg.nonce_str}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='签名：' {...formItemLayout}>
							<label>{returnMsg.sign}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='业务结果：' {...formItemLayout}>
							<label>{returnMsg.result_code}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='错误代码：' {...formItemLayout}>
							<label>{returnMsg.err_code}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='错误代码描述：' {...formItemLayout}>
							<label>{returnMsg.err_code_des}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='设备号：' {...formItemLayout}>
							<label>{returnMsg.device_info}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='用户标识：' {...formItemLayout}>
							<label>{returnMsg.openid}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='是否关注公众账号：' {...formItemLayout}>
							<label>{returnMsg.is_subscribe}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='交易类型：' {...formItemLayout}>
							<label>{returnMsg.trade_type}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='交易状态：' {...formItemLayout}>
							<label>{returnMsg.trade_state}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='付款银行：' {...formItemLayout}>
							<label>{returnMsg.bank_type}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='订单金额：' {...formItemLayout}>
							<label>{returnMsg.total_fee}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='应结订单金额：' {...formItemLayout}>
							<label>{returnMsg.settlement_total_fee}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='货币种类：' {...formItemLayout}>
							<label>{returnMsg.fee_type}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='现金支付金额：' {...formItemLayout}>
							<label>{returnMsg.cash_fee}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='现金支付货币类型：' {...formItemLayout}>
							<label>{returnMsg.cash_fee_type}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='代金券金额：' {...formItemLayout}>
							<label>{returnMsg.coupon_fee}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='代金券使用数量：' {...formItemLayout}>
							<label>{returnMsg.coupon_count}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='微信支付订单号：' {...formItemLayout}>
							<label>{returnMsg.transaction_id}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='商户订单号：' {...formItemLayout}>
							<label>{returnMsg.out_trade_no}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='附加数据：' {...formItemLayout}>
							<label>{returnMsg.attach}</label>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem label='支付完成时间：' {...formItemLayout}>
							<label>{returnMsg.time_end}</label>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='交易状态描述：' {...formItemLayout}>
							<label>{returnMsg.trade_state_desc}</label>
						</FormItem>
					</Col>
				</Row>
			</Form>
		</div>
	)
}

WxOrderAdmin.propTypes = {
	orderadmin: PropTypes.object.isRequired
}

const mapStateToProps = ({orderadmin}) => {
	return {orderadmin}
}

export default connect(mapStateToProps)(WxOrderAdmin)
