import React, {PropTypes} from 'react'
import { Tabs, Menu, Icon } from 'antd'
import { connect } from 'dva'
import { hashHistory } from 'dva/router'
import _ from 'lodash'
import styles from './index.less'
const TabPane = Tabs.TabPane
const MenuItem = Menu.Item


// <Tabs defaultActiveKey='1' className={styles.menu} style={{height: '100px'}}>
// 	<TabPane tab='首页' key='1'/>
// 	<TabPane tab='商户管理' key='2'/>
// 	<TabPane tab='订单管理' key='3'/>
// </Tabs>


const Header = ({dispatch, auth, onMenuClick}) => {
	const {menus, defaultMenu} = auth

	let TopMenu = menus.map(item => {
		return (
			<MenuItem key={item.key}>
          {item.name}
			</MenuItem>
		)
	})

	const menuProps = {
		selectedKeys: defaultMenu,
		onClick (key) {
			dispatch({type: 'auth/uptState', payload: {defaultMenu: key.key}})
			let left = _.filter(menus, chr => {
				return chr.key === key.key
			})
			if (left && left.length > 0) {
				if (left[0].childs && left[0].childs.length > 0) {
					let first = _.first(left[0].childs)
					onMenuClick(left[0], [first.key])
					hashHistory.push({pathname: _.first(left[0].childs).url})
				} else {
					hashHistory.push({pathname: left[0].url})
					onMenuClick(left[0], [])
				}
			}
		}
	}

	return (
		<div className={styles.header}>
			<a className={styles.logo}>
				<img src='https://cdn3.iconfinder.com/data/icons/social-media-logos-glyph/2048/5315_-_Apple-128.png'/>
				<span>微信管理</span>
			</a>
			<Menu mode='horizontal' className={styles.menuitem} {...menuProps}>
				{TopMenu}
			</Menu>
		</div>
	)
}

Header.propTypes = {
	auth: PropTypes.object.isRequired
}

function mapStateToProps ({auth}) {
	return {auth}
}
export default connect(mapStateToProps)(Header)
