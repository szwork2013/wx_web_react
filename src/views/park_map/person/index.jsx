import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {BackTop} from 'antd'

import PersonMap from './PersonMap'
import PersonSearch from './PersonSearch'

import styles from './index.less'

const Person = ({dispatch, park}) => {
	const {traffics, zoomLevel, trafficQuery, modalVisible, historyTraffic} = park

	const mapProps = {
		traffics,
		zoomLevel
	}

	const searchProps = {
		traffics,
		trafficQuery,
		modalVisible,
		historyTraffic,
		onSearch (params) {
			dispatch({type: 'park/updateQuery', payload: {zoomLevel: 15}})
			dispatch({type: 'park/getTraffics',	payload: params})
		},
		getMoreData (data) {
			dispatch({type: 'park/showModal', payload: {historyTraffic: data}})
		},
		closeModal () {
			dispatch({type: 'park/hideModal'})
		}
	}

	return (
			<div>
					<div style={{position: 'absolute', left: 0, bottom: 0, right: 300, top: 0}}>
						<PersonMap {...mapProps}/>
					</div>
					<div style={{width: '300px', position: 'absolute', bottom: 0, right: 0, top: 0}}>
							<PersonSearch {...searchProps} />
					</div>
					<BackTop />
			</div>
	)
}

Person.propTypes = {
	park: PropTypes.object
}

function mapStateToProps ({park}) {
	return {park}
}

export default connect(mapStateToProps)(Person)
