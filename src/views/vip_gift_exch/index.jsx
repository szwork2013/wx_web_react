import React, {PropTypes} from 'react'
import { connect } from 'dva'
import List from './List'
import Search from './Search'

const VipGiftExch = ({dispatch, giftexch}) => {
	const { total, loading, page, datas, pageSize } = giftexch
	const listProps = {
		dispatch,
		total,
		loading,
		page,
		dataSource: datas
	}

	const searchProps = {
		dispatch,
		pageSize
	}

	return (
		<div>
			<Search {...searchProps}/>
			<List {...listProps}/>
		</div>
	)
}

VipGiftExch.propTypes = {
	giftexch: PropTypes.object.isRequired
}

const mapStateToProps = ({giftexch}) => {
	return {giftexch}
}

export default connect(mapStateToProps)(VipGiftExch)
