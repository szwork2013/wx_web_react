import React, {PropTypes} from 'react'
import {Cascader, Button, Card, Row, Col} from 'antd'
import _ from 'lodash'
import styles from './index.less'

const DistrictSearch = ({parks, regions, onSelChange, currentRegion}) => {
	let districtType = _.uniq(_.map(_.filter(parks, chr => {
		return chr.RcdType === '停车场'
	}), 'PARK_TYPE'))

	let districtInfo = []
	districtType.map(item => {
		let totalArr = _.filter(parks, chr => {
			return chr.PARK_TYPE === item
		})
		let totalLot = 0
		totalArr.map(item => {
			totalLot += parseInt(item.BERTH_MAX)
		})
		let freeLot = 0
		totalArr.map(item => {
			freeLot += parseInt(item.BERTH_RES)
		})    
		districtInfo.push({
			type: item === '1' ? '社区停车场' : '商业停车场',
			total: totalArr.length,
			totalLot,
			freeLot
		})
	})

	let totalArr = _.filter(parks, chr => {
		return chr.RcdType === '充电站'
	})
	let total = 0
	totalArr.map(item => {
		total += parseInt(item.BERTH_MAX)
	})
	let totalCharge = 0
	totalArr.map(item => {
		totalCharge += parseInt(item.BERTH_RES)
	})
	let orderNum = 0
	totalArr.map(item => {
		orderNum += parseInt(item.ORDER_NUM)
	})
	let chargeInfo = {
		type: '充电站',
		total,
		totalCharge,
		orderNum
	}

	const DistrictInfoUI = districtInfo.map((item) => {
		return (
			<div key={item.type}>
					<h3>{item.type}</h3>
					<Row style={{marginTop: '5px', marginBottom: '5px'}}>
							<Col span={8}>停车场数量：</Col>
							<Col span={4}>{item.total}</Col>
							<Col span={8}>总车位数：</Col>
							<Col span={4}>{item.totalLot}</Col>
					</Row>
					<Row style={{marginTop: '5px', marginBottom: '5px'}}>
							<Col span={8}>剩余车位数：</Col>
							<Col>{item.freeLot}</Col>
					</Row>
			</div>
		)
	})

	const ChargeInfoUI = () => {
		if (parks && parks.length > 0) {
			return (
					<div>
							<h3>{chargeInfo.type}</h3>
							<Row style={{marginTop: '5px', marginBottom: '5px'}}>
									<Col span={8}>充电站数量：</Col>
									<Col span={4}>{chargeInfo.total}</Col>
									<Col span={8}>空闲数量：</Col>
									<Col span={4}>{chargeInfo.totalCharge}</Col>
							</Row>
							<Row style={{marginTop: '5px', marginBottom: '5px'}}>
									<Col span={8}>预约数量：</Col>
									<Col>{chargeInfo.orderNum}</Col>
							</Row>
					</div>
			)
		} else {
			return (
					<div></div>
			)
		}			
	}

	const MainUI = () => {
		if (parks && parks.length) {
			return (
				<Card style={{width: '90%', margin: '10px'}} bodyStyle={{ padding: 12 }}>
						{DistrictInfoUI}
						<ChargeInfoUI />
				</Card>
			)
		} else {
			return (
				<div></div>
			)
		}
	}

	const DtlUI = parks.map((item) => {
		if (item.RcdType === '停车场') {
			return (
					<Card key={item.PARK_NAME} style={{width: '90%', margin: '10px'}} bodyStyle={{ padding: 12 }}>
							<h3>{item.PARK_NAME}</h3>
							<h4>{item.ADDRESS}</h4>
							<Row style={{marginTop: '5px', marginBottom: '5px'}}>
									<Col span={8}>总车位数：</Col>
									<Col span={4}>{item.BERTH_MAX}</Col>
									<Col span={8}>剩余车位数：</Col>
									<Col span={4}>{item.BERTH_RES}</Col>
							</Row>
					</Card>
			)
		} else {
			let free = parseInt(item.BERTH_MAX) - parseInt(item.BERTH_RES)
			return (
					<Card key={item.PARK_NAME} style={{width: '90%', margin: '10px'}} bodyStyle={{ padding: 12 }}>
							<h3>{item.PARK_NAME}</h3>
							<h4>{item.ADDRESS}</h4>
							<Row style={{marginTop: '5px',marginBottom: '5px'}}>
									<Col span={8}>使用中：</Col>
									<Col span={4}>{free}</Col>
									<Col span={8}>预约数：</Col>
									<Col span={4}>{item.ORDER_NUM}</Col>
							</Row>
							<Row style={{marginTop: '5px', marginBottom: '5px'}}>
									<Col span={8}>空闲数：</Col>
									<Col span={4}>{item.BERTH_RES}</Col>
							</Row>
					</Card>
			)
		}
	})

	const cascaderProps = {
		options: regions || [],
		placeholder: '请选择',
		onChange: onSelChange,
		changeOnSelect: true,
		// defaultValue: [currentRegion],
		allowClear: false
	}
	return (
		<div className={styles.container}>
			<div>
				<Cascader {...cascaderProps} style={{marginLeft: '10px', marginTop: '10px', width: '90%'}} />
				<MainUI/>
			</div>
			<Row>
				{DtlUI}
			</Row>
		</div>
	)
}

DistrictSearch.propTypes = {
}

export default DistrictSearch
