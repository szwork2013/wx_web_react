import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {BackTop, Button} from 'antd'

import PersonMap from './PersonMap'
import PersonSearch from './PersonSearch'

import styles from './index.less'

const Person = ({dispatch, park}) => {
	const {traffics, zoomLevel, trafficQuery, modalVisible, historyTraffic, layoutWidth, btnText} = park
	const change = () => {
		dispatch({type: 'park/updateQuery',
			payload: {
				layoutWidth: layoutWidth === 0 ? 300 : 0,
				btnText: (layoutWidth === 0 ? 300 : 0) === 0 ? '展开' : '隐藏'
			}})
	}
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
			// dispatch({type: 'park/updateQuery', payload: {zoomLevel: 15}})
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
					<div style={{position: 'absolute', left: 0, bottom: 0, right: layoutWidth, top: 0}}>
						<PersonMap {...mapProps}/>
						<Button type='primary' style={{zIndex: 999, position: 'absolute', right: 10, top: 10}} size='small' onClick={change}>{btnText}</Button>
					</div>
					<div style={{width: layoutWidth, position: 'absolute', bottom: 0, right: 0, top: 0}}>
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
