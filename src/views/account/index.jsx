import React, {PropTypes} from 'react'
import { connect } from 'dva'
import CusList from './CusList'
import CusSearch from './CusSearch'
import CusModal from './CusModal'

const Account = ({dispatch, account, common}) => {
	const { total, page, pageSize, datas, loading, modalVisible, modalType } = account
	const { cus } = common

	const searchProps = {
		dispatch
	}
	const listProps = {
		dispatch,
		total,
		page,
		pageSize,
		datas,
		loading
	}
	const modalProps = {
		dispatch,
		modalVisible,
		modalType,
		cus
	}

	return (
		<div>
			<CusSearch {...searchProps}/>
			<CusList {...listProps}/>
			<CusModal {...modalProps}/>
		</div>
	)
}

Account.propTypes = {
	account: PropTypes.object.isRequired
}

const mapStateToProps = ({account, common}) => {
	return {account, common}
}

export default connect(mapStateToProps)(Account)
