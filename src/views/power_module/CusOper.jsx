import React, {PropTypes} from 'react'
import { Button, message, Modal } from 'antd'
import styles from './index.less'
import _ from 'lodash'
const confirm = Modal.confirm

const CusOper = ({dispatch, selectedKeys, curSelMenu, parentMenu}) => {
	const btnClick = type => {
		switch (type) {
		case 'add':
			if (curSelMenu && curSelMenu.pid && curSelMenu.pid !== 0) {
				message.warn('二级菜单不能继续添加', 3)
				return
			}
			dispatch({type: 'module/common', payload: {visible: true, type, curSelMenu: {}, parentMenu: !curSelMenu || !curSelMenu.id ? {name: '一级菜单', id: 0} : curSelMenu}})
			break
		case 'edit':
			if (_.size(selectedKeys) === 0) {
				message.warn('请选择需要操作的菜单', 3)
				return
			}
			dispatch({type: 'module/common', payload: {visible: true, type}})
			break
		case 'del':
			if (_.size(selectedKeys) === 0) {
				message.warn('请选择需要操作的菜单', 3)
				return
			}
			confirm({
				title: '提示',
				content: `确认删除<${curSelMenu.name}>菜单?`,
				onOk () {
					dispatch({type: 'module/remove', payload: {id: curSelMenu.id}})
					dispatch({type: 'auth/getModules'})
				}
			})
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
