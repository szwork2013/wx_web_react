import React, {PropTypes} from 'react'
import { connect } from 'dva'
import {Card, Row, Col, DatePicker, Progress, Badge} from 'antd'
import moment from 'moment'

const Home = ({common}) => {
	const { myCus } = common
	let tmpMyCus = myCus || {}
	const calcNum = percent => {
		return (percent / 100 * 200) + '人'
	}

	return (
		<div>
			<Row>
				<Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }}>
					<Card title='公司信息'>
						<h2>{tmpMyCus.cusName}</h2>
						<br/>
						<Row>
							<Col xs={12} sm={3}>公众号名称：</Col>
							<Col>{tmpMyCus.cusName}</Col>
						</Row>
						<br/>
					</Card>
				</Col>
				<Col span={3}></Col>
			</Row>
			<br/>
		</div>
	)
}

Home.propTypes = {
	common: PropTypes.object.isRequired
}

const mapStateToProps = ({common}) => {
	return {common}
}

export default connect(mapStateToProps)(Home)

// <Row>
// 	<Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }}>
// 		<Card title='关注信息'>
// 			<div>
// 				<Row>
// 					<Col xs={8} sm={3}>总关注人数：</Col>
// 					<Col xs={4} sm={3}>1000</Col>
// 					<Col xs={8} sm={3}>关注人数：</Col>
// 					<Col xs={4} sm={3}>200</Col>
// 				</Row>
// 				<br/>
// 				<Row>
// 					<Col xs={8} sm={3}>
// 						<span>新增关注：</span>
// 					</Col>
// 					<Col xs={16} sm={12}>
// 						<Progress percent={50} status={'success'} format={calcNum}/>
// 					</Col>
// 				</Row>
// 				<br/>
// 				<Row>
// 					<Col xs={8} sm={3}>
// 						<span>新增绑定：</span>
// 					</Col>
// 					<Col xs={16} sm={12}>
// 						<Progress percent={25} format={calcNum} />
// 					</Col>
// 				</Row>
// 				<br/>
// 				<Row>
// 					<Col xs={8} sm={3}>
// 						<span>取消关注：</span>
// 					</Col>
// 					<Col xs={16} sm={12}>
// 						<Progress percent={25} status={'exception'} format={calcNum} />
// 					</Col>
// 				</Row>
// 			</div>
// 		</Card>
// 	</Col>
// </Row>
