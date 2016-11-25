import React, {PropTypes} from 'react'
import { Tabs, Menu, Icon } from 'antd'
import { Link, hashHistory } from 'dva/router'
const TabPane = Tabs.TabPane
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
import _ from 'lodash'

			// <Tabs defaultActiveKey='1' tabPosition='left'>
			// 	<TabPane tab='测试1' key='1'/>
			// 	<TabPane tab='测试1' key='2'/>
			// 	<TabPane tab='测试1' key='3'/>
			// 	<TabPane tab='测试1' key='4'/>
			// 	<TabPane tab='测试1' key='5'/>
			// </Tabs>
const Sidebar = ({leftMenu, defaultLeftMenu, onMenuClick}) => {
	let childs = leftMenu.childs

	let LeftMenuControl
	if (childs && childs.length > 0) {
		LeftMenuControl = childs.map(item => {
			return (
				<MenuItem key={item.key}>
					<Link to={item.url}>
						{item.name}
					</Link>
				</MenuItem>
			)
		})
	}

	const menuProps = {
		selectedKeys: defaultLeftMenu,
		onClick (key) {
			onMenuClick(key.key)
		}
	}

	return (
		<div>
			<Menu mode='inline' {...menuProps}>
				<MenuItemGroup title={leftMenu.name}>
					{LeftMenuControl}
				</MenuItemGroup>
			</Menu>
		</div>
	)
}

Sidebar.propTypes = {
}

export default Sidebar
