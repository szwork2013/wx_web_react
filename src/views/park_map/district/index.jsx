import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {BackTop} from 'antd'

import DistrictMap from './DistrictMap'
import DistrictSearch from './DistrictSearch'

import styles from './index.less'

const District = ({dispatch, park}) => {
	const {list, regions, currentRegion} = park

	const searchProps = {
		regions,
		parks: list,
		currentRegion,
		onSelChange (value, options) {
			dispatch({type: 'park/updateQuery',
				payload: {
					currentRegion: value[value.length - 1],
					zoomLevel: value.length + 12
				}})
			dispatch({type: 'park/query',
				payload: {
					currentRegion: value[value.length - 1]
				}})
		}
	}

	return (
			<div>
					<div style={{position: 'absolute', left: 0, bottom: 0, right: 300, top: 0}}>
						<DistrictMap/>
					</div>
					<div style={{width: '300px', position: 'absolute', bottom: 0, right: 0, top: 0}}>
							<DistrictSearch {...searchProps} />
					</div>
					<BackTop />
			</div>
	)
}

District.propTypes = {    
	park: PropTypes.object
}

function mapStateToProps ({park}) {
	return {park}
}

export default connect(mapStateToProps)(District)
