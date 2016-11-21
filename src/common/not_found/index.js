import React from 'react'
import {Icon, Button, Link} from 'antd'
import { hashHistory } from 'dva/router'
import styles from './index.less'

const NotFound = () => {
	const BackHome = () => {
		hashHistory.push({pathname: '/'})
	}

	return (
		<div className={styles.notfound}>
			<div style={{ fontSize: 32 }}><Icon type='frown'/></div>
			<h1>404 Not Found</h1>
			<br />
			<Button type='primary' onClick={BackHome}>
					回到首页
			</Button>
		</div>
	)
}

export default NotFound
