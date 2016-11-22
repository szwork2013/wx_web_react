import React, {PropTypes} from 'react'
import {connect} from 'dva'
import WxChargeOrdList from './WxChargeOrdList'
import WxChargeOrdSearch from './WxChargeOrdSearch'

const WxChargeOrd = ({dispatch, charge}) => {
	const {total, loading, current, datas, pageSize} = charge

	const listProps = {
		total,
		loading,
		current,
		pageSize,
		dataSource: datas,
		onPageChange (page) {
			dispatch({type: 'charge/readWxOrd',	payload: {page,	pageSize,	current: page}})
		}
	}

	const searchProps = {
		onSearch (data) {
			dispatch({type: 'charge/readWxOrd', 
				payload: {
					page: 1,
					pageSize,
					current: 1,
					keyword: data.keyword,
					begin: data.begin,
					end: data.end
				}})
		}
	}

	return (
		<div>
			<WxChargeOrdSearch {...searchProps}/>
			<WxChargeOrdList {...listProps}/>
		</div>
	)
}

WxChargeOrd.propTypes = {
	charge: PropTypes.object.isRequired
}

const mapStateToProps = ({charge}) => {
	return {charge}
}

export default connect(mapStateToProps)(WxChargeOrd)
