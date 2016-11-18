import React, {PropTypes} from 'react'
import {Card, Timeline, Icon, Row, Col} from 'antd'
import _ from 'lodash'
import moment from 'moment'

const PersonTraffic = ({traffics, getMoreData}) => {
	let parkNames = _.uniq(_.map(traffics, 'parkName'))
	let trafficInfos = []
	parkNames.map(function (item) {
		let parkTraffics = _.filter(traffics, function (chr) {
			return chr.parkName === item
		})
		trafficInfos.push({
			parkName: item,
			datas: parkTraffics
		})
	})

	const getMore = (data) => {
		getMoreData(data)
	}

	const UI = trafficInfos.map(item => {
		let needMore = item.datas.length > 10
		const Items = _.take(item.datas, 10).map(item => {
			if (item.passType === '进') {
				return (
					<Timeline.Item key={item.id} dot={<Icon type='right-circle-o' style={{ fontSize: '16px' }}/>} color='green'>
						<Card bodyStyle={{ padding: 6 }}>
							<Row>
								<Col span={18}>{item.carNum}</Col>
								<Col span={6}>{item.passType === '进' ? '入场' : '出场'}</Col>
							</Row>
							<Row>
								<Col>{moment(item.throughTime).format('YYYY-MM-DD HH:mm:ss')}</Col>
							</Row>
						</Card>
					</Timeline.Item>
				)
			} else {
				return (
					<Timeline.Item key={item.id} dot={<Icon type='left-circle-o' style={{ fontSize: '16px' }}/>} color='blue'>
						<Card bodyStyle={{ padding: 6 }}>
							<Row>
								<Col span={18}>{item.carNum}</Col>
								<Col span={6}>{item.passType === '进' ? '入场' : '出场'}</Col>
							</Row>
							<Row>
								<Col>{moment(item.throughTime).format('YYYY-MM-DD HH:mm:ss')}</Col>
							</Row>
						</Card>
					</Timeline.Item>
				)
			}
		})

		return (
			<Card key={item.parkName} title={item.parkName} style={{width: '95%', margin: '10px'}} bodyStyle={{ padding: 6 }}>
				<Timeline pending={needMore ? <a onClick={() => { getMore(item.datas) }}>更多</a> : false}>
					{Items}
				</Timeline>
			</Card>
		)
	})

	return (
		<div>
			{UI}
		</div>
	)
}

PersonTraffic.propTypes = {
}

export default PersonTraffic
