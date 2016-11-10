import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'dva/router';
import classNames from 'classnames'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import './index.less'

const Header = () => {
  return (
    <div className='ant-layout-header'>
      <Menu className="header-menu" mode="horizontal">
        <SubMenu title={< span > <Icon type="user"/>ldd < /span>}>
          <Menu.Item key="setting:1">选项1</Menu.Item>
          <Menu.Item key="setting:2">选项2</Menu.Item>
          <Menu.Divider/>
          <Menu.Item key="setting:3">注销</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default Header
