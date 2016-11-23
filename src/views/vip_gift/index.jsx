import React, {PropTypes} from 'react'
import {connect} from 'dva'
import VipGiftList from './List'
import VipGiftSearch from './Search'
import VipGiftModal from './Modal'

const VipGift = ({dispatch, gift}) => {
	const {total, loading, current, currentItem, modalVisible, modalType, datas, pageSize, uploadFiles, isSaving, isSuccess} = gift

	const listProps = {
		total,
		loading,
		current,
		pageSize,
		dataSource: datas,
		onPageChange (page) {
			dispatch({type: 'gift/read',	payload: {page,	pageSize,	current: page}})
		}
	}

	const searchProps = {
		onSearch (data) {
			dispatch({type: 'gift/read',
				payload: {
					page: 1,
					pageSize,
					current: 1,
					giftName: data.giftName,
					giftType: data.giftType,
					begin: data.begin,
					end: data.end
				}})
		},
		onAdd () {
			dispatch({type: 'gift/showModal',
				payload: {
					isSaving: false,
					currentItem: {}
				}})
		}
	}

	const modalProps = {
		item: modalType === 'create' ? {} : currentItem,
		type: modalType,
		uploadFiles,
		isSaving,
		isSuccess,
		visible: modalVisible,
		onOk (data) {
			dispatch({type: 'gift/create',
				payload: {
					page: 1,
					pageSize,
					current: 1,
					...data
				}})
		},
		onCancel () {
			dispatch({type: 'gift/hideModal'})
		}
	}

	return (
		<div>
			<VipGiftSearch {...searchProps}/>
			<VipGiftList {...listProps}/>
			<VipGiftModal {...modalProps}/>
		</div>
	)
}

VipGift.propTypes = {
	gift: PropTypes.object.isRequired
}

const mapStateToProps = ({gift}) => {
	return {gift}
}

export default connect(mapStateToProps)(VipGift)
