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
			<div className={styles.left}>
					<div className={styles.right}>
							<PersonMap {...mapProps}/>
					</div>
					<div style={{width: '300px'}}>
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
