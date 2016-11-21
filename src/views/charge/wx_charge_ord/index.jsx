import React, {PropTypes} from 'react'
import {connect} from 'dva'
import WxChargeOrdList from './WxChargeOrdList'

const WxChargeOrd = ({dispatch, charge}) => {
	const {total, loading, current, datas, pageSize} = charge

	const listProps = {
		total,
		loading,
		current,
		pageSize,
		dataSource: datas,
		onPageChange (page) {
			dispatch({type: 'charge/readWxOrd',
				payload: {
					page,
					pageSize,
					current: page
				}
			})
		}
	}

	return (
		<div>
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
