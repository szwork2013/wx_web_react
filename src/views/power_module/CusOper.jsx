import React, {PropTypes} from 'react'
import { Button, message } from 'antd'
import styles from './index.less'
import _ from 'lodash'

const CusOper = ({dispatch, selectedKeys, curSelMenu, parentMenu}) => {
	const btnClick = type => {
		if (type !== 'add') {
			if (_.size(selectedKeys) === 0) {
				message.warn('请选择需要操作的菜单', 3)
			}
		}
		switch (type) {
		case 'add':
			if (curSelMenu.pid !== 0) {
				message.warn('二级菜单不能继续添加', 3)
				return
			}
			dispatch({type: 'module/common', payload: {visible: true, isDetail: false, curSelMenu: {}, parentMenu: curSelMenu}})
			break
		case 'edit':
			if (_.size(selectedKeys) === 0) {
				message.warn('请选择需要操作的菜单', 3)
				return
			}
			dispatch({type: 'module/common', payload: {visible: true, isDetail: false}})
			break
		case 'del':
			if (_.size(selectedKeys) === 0) {
				message.warn('请选择需要操作的菜单', 3)
			}
			break
		}
	}

	return (
		<div>
			<Button type='primary' className={styles.btn} onClick={() => { btnClick('add') }}>添加</Button>
			<Button type='default' className={styles.btn} onClick={() => { btnClick('edit') }}>编辑</Button>
			<Button type='ghost' className={styles.btn} onClick={() => { btnClick('del') }}>删除</Button>
		</div>
	)
}

CusOper.propTypes = {
}

export default CusOper
