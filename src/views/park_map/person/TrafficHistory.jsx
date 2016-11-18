import React, {PropTypes} from 'react'
import {Table} from 'antd'
import moment from 'moment'

const TrafficHistory = ({traffics}) => {
	const columns = [
		{
			title: '停车场',
			dataIndex: 'parkName'
		}, {
			title: '车牌号',
			dataIndex: 'carNum'
		}, {
			title: '进/出',
			dataIndex: 'passType',
			render: (text, record) => {
				if (text === '进') {
					return '入场'
				} else {
					return '出场'
				}
			}
		}, {
			title: '通行时间',
			dataIndex: 'throughTime',
			render (text, row, index) {
				if (text && text.indexOf('0001-01-01') !== -1) {
					return ''
				}
				var temp = moment(text)
				if (temp.isValid()){
					return temp.format('YYYY-MM-DD HH:mm:ss')
				} else {
					return ''
				}
			}
		}
	]

	return (
		<div>
			<Table columns={columns} dataSource={traffics} bordered={true} size='small' pagination={false}/>
		</div>
	)
}

TrafficHistory.propTypes = {
}

export default TrafficHistory
