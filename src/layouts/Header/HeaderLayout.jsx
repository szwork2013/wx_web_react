import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'dva/router';
import styles from './HeaderLayout.less'
import classNames from 'classnames'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Header extends React.Component {
  render() {
    const head = styles.headerCls
    const topFixed = styles.topFixed
    const headClass = classNames({head: true, clearfix: true, topFixed: true})
    return (
      <header className={headClass}>
        <div>
          <div>
            <a className={styles.logo} href="/">
              <img alt="logo" src="https://cdn3.iconfinder.com/data/icons/social-media-logos-glyph/2048/5315_-_Apple-128.png"/>
              <span>私人定制</span>
            </a>
          </div>
          <div className='ant-layout-header'>
            <Menu mode="horizontal" className='header-menu'>
              <Menu.Item key="home">
                <Link to="/home">
                  <Icon type="home"/>
                  首页
                </Link>
              </Menu.Item>
              <Menu.Item key="subscribe">
                <Link to="/subscribe">
                  <Icon type="android"/>
                  微信订阅
                </Link>
              </Menu.Item>
              <Menu.Item key="marks">
                <Link to="/marks">
                  <Icon type="calendar"/>
                  Mark记录
                </Link>
              </Menu.Item>
              <SubMenu title={<span><Icon type="user" />ldd</span>}>
                <Menu.Item key="setting:1">个人信息</Menu.Item>
                <Menu.Item key="setting:2">密码修改</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="setting:3">注销</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </div>
      </header>
    );
  }
}
