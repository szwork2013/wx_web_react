import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {BackTop, Button} from 'antd'

import DeviceMap from './DeviceMap'
import DeviceSearch from './DeviceSearch'

import styles from './index.less'

const Device = ({dispatch, park}) => {
	const {devices, regions, currentRegion, zoomLevel, loading, deviceLayoutWidth, btnText} = park
	const change = () => {
		dispatch({type: 'park/updateQuery',
			payload: {
				deviceLayoutWidth: deviceLayoutWidth === 0 ? 350 : 0,
				btnText: (deviceLayoutWidth === 0 ? 350 : 0) === 0 ? '展开' : '隐藏'
			}})
	}
	const mapProps = {
		devices,
		zoomLevel
	}

	const searchProps = {
		regions,
		devices,
		currentRegion,
		onSelChange (value, options) {
			dispatch({type: 'park/updateQuery',
				payload: {
					currentRegion: value[value.length - 1],
					zoomLevel: value.length + 12
				}})
			dispatch({type: 'park/getDevices',
				payload: {
					currentRegion: value[value.length - 1]
				}})
		}
	}

	return (
		<div>
			<div style={{position: 'absolute', left: 0, bottom: 0, right: deviceLayoutWidth, top: 0}}>
				<DeviceMap {...mapProps}/>
				<Button type='primary' style={{zIndex: 999, position: 'absolute', right: 10, top: 10}} size='small' onClick={change}>{btnText}</Button>
			</div>
			<div style={{width: deviceLayoutWidth, position: 'absolute', bottom: 0, right: 0, top: 0}}>
					<DeviceSearch {...searchProps} />
			</div>
			<BackTop />
		</div>
	)
}

Device.propTypes = {
	park: PropTypes.object
}

function mapStateToProps ({park}) {
	return {park}
}

export default connect(mapStateToProps)(Device)
