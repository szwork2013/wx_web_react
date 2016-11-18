import React, {PropTypes} from 'react'
import {Card, Table, Badge} from 'antd'
import styles from './index.less'

const DistrictDevice = ({parkName, devices}) => {
	const columns = [
		{
			title: '设备类型',
			dataIndex: 'deviceType'
		}, {
			title: '设备型号',
			dataIndex: 'deviceModel'
		}, {
			title: '在线',
			dataIndex: 'onlines',
			className: 'column'
		}, {
			title: '离线',
			dataIndex: 'offlines',
			className: 'column',
			render (text, row, index) {
				if (text === 0) {
					return <span>{text}</span>
				} else {
					return <span style={{color: 'red'}}><Badge status='error'/>{text}</span>
				}
			}
		}, {
			title: '故障',
			dataIndex: 'errors',
			className: 'column',
			render (text, row, index) {
				if (text === 0) {
					return <span>{text}</span>
				} else {
					return <span style={{color: 'red'}}><Badge status='processing'/>{text}</span>
				}
			}
		}, {
			title: '总数',
			dataIndex: 'deviceCount',
			className: 'column'
		}
	]
	return (
		<Card title={parkName} style={{width: '95%', margin: '10px'}} bodyStyle={{ padding: 12 }}>
			<Table columns={columns} dataSource={devices} bordered={true} size='small' pagination={false}/>
		</Card>
	)
}

DistrictDevice.propTypes = {
}

export default DistrictDevice
