import React, {PropTypes} from 'react'
import {Cascader} from 'antd'
import _ from 'lodash'
import styles from './index.less'
import DistrictDevice from './DistrictDevice'

const DeviceSearch = ({devices, regions, onSelChange, currentRegion}) => {
	const cascaderProps = {
		options: regions || [],
		placeholder: '请选择',
		onChange: onSelChange,
		changeOnSelect: true,
		// defaultValue: [currentRegion],
		allowClear: false
	}

	let parkNames = _.uniq(_.map(devices, 'parkName'))
	let parkInfos = []
	parkNames.map(function (item) {
		let deviceInfos = []
		let parkDevices = _.filter(devices, function (chr) {
			return chr.parkName === item
		})
		let deviceModels = _.uniq(_.map(parkDevices, 'devTypeDes'))
		deviceModels.map(function (name) {
			let deviceArr = _.filter(parkDevices, function (chr) {
				return chr.devTypeDes === name
			})
			let type = _.first(deviceArr)
			let onlines = 0
			let offlines = 0
			let errors = 0
			deviceArr.map(item => {
				if (item.status === '在线') {
					onlines += 1
				}
			})
			deviceArr.map(item => {
				if (item.status === '离线') {
					offlines += 1
				}
			})
			deviceArr.map(item => {
				if (item.status === '故障') {
					errors += 1
				}
			})
			deviceInfos.push({
				deviceType: type.devTypeDes,
				deviceModel: name,
				deviceCount: deviceArr ? deviceArr.length : 0,
				onlines,
				offlines,
				errors
			})
		})

		let device = _.first(parkDevices)

		parkInfos.push({
			parkName: item,
			devices: deviceInfos
		})
	})

	const DeviceUI = parkInfos.map(item => {
		return (
			<DistrictDevice key={item.parkName} {...item}/>
		)
	})

	return (
			<div className={styles.container}>
					<div>
							<Cascader {...cascaderProps} style={{marginLeft: '10px', marginTop: '10px', width: '90%'}} />
					</div>
					<div style={{flex: 1}}>
						{DeviceUI}
					</div>
			</div>
	)
}

DeviceSearch.propTypes = {
}

export default DeviceSearch
