import React from 'react'
import {Menu, Icon} from 'antd'
import {Link} from 'dva/router'
import './index.less'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

const Sidebar = () => {
  return (
    <aside className="ant-layout-sider">
      <div className="ant-layout-logo">
        <div className="logo-text">
          微信开发
        </div>
      </div>
      <Menu mode="inline" theme="dark">
        <MenuItem key="home">
          <Link to="/home">
            <Icon type="home"/>
            首页
          </Link>
        </MenuItem>
        <SubMenu key="sub1" title={<span> <Icon type="mail"/>微信管理</span >}>
          <MenuItem key="subscribe">
            <Link to="/subscribe">
              <Icon type="android"/>
              微信订阅
            </Link>
          </MenuItem>
        </SubMenu>
        <SubMenu key="sub2" title={< span > <Icon type="appstore"/>Demo</span >}>
          <MenuItem key="marks">
            <Link to="/marks">
              <Icon type="android"/>
              CRUD
            </Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    </aside>
  )
}

export default Sidebar
