import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {BackTop} from 'antd'

import DeviceMap from './DeviceMap'
import DeviceSearch from './DeviceSearch'

import styles from './index.less'

const Device = ({dispatch, park}) => {
	const {devices, regions, currentRegion, zoomLevel, loading} = park

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
		<div className={styles.left}>
				<div className={styles.right}>
						<DeviceMap {...mapProps}/>
				</div>
				<div style={{width: '500px'}}>
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
