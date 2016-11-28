import React, {PropTypes} from 'react'
import {connect} from 'dva'
import VipGiftList from './List'
import VipGiftSearch from './Search'
import VipGiftModal from './Modal'


const VipGift = ({dispatch, gift, common}) => {
	const {total, loading, current, currentItem, modalVisible, modalType, datas, pageSize, uploadFiles, isSaving, isSuccess} = gift
	const {giftTypes, getWays} = common
	const listProps = {
		total,
		loading,
		current,
		pageSize,
		dataSource: datas,
		onPageChange (page) {
			dispatch({type: 'gift/read',	payload: {page,	pageSize,	current: page}})
		},
		onOpen (giftCode, type) {
			dispatch({type: 'common/getGiftTypeItems'})
			dispatch({type: 'common/getGetWayItems'})
			dispatch({type: 'gift/readOne',
				payload: {
					giftCode
				}})
			dispatch({type: 'gift/showModal',
				payload: {
					isSaving: false,
					modalType: type
				}})
		},
		onDelete (giftCode) {
			dispatch({type: 'gift/remove',
				payload: {
					giftCode
				}})
		}
	}

	const searchProps = {
		giftTypes,
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
			dispatch({type: 'common/getGiftTypeItems'})
			dispatch({type: 'common/getGetWayItems'})
			dispatch({type: 'gift/showModal',
				payload: {
					isSaving: false,
					modalType: 'create',
					currentItem: {},
					uploadFiles: []
				}})
		}
	}

	const modalProps = {
		item: modalType === 'create' ? {} : currentItem,
		type: modalType,
		uploadFiles,
		isSaving,
		isSuccess,
		giftTypes,
		getWays,
		visible: modalVisible,
		onOk (data) {
			if (modalType === 'edit') {
					dispatch({type: 'gift/update',
						payload: {
							pageSize,
							...data
						}})
			} else {
				dispatch({type: 'gift/create',
					payload: {
						pageSize,
						...data
					}})
			}
		},
		onCancel () {
			dispatch({type: 'gift/hideModal'})
		},
		onUpload (info) {
			dispatch({type: 'gift/handleUpload', payload: {info}})
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
	gift: PropTypes.object.isRequired,
	common: PropTypes.object.isRequired
}

const mapStateToProps = ({gift, common}) => {
	return {gift, common}
}

export default connect(mapStateToProps)(VipGift)
