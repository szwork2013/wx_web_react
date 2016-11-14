import React, {PropTypes} from 'react';
import {connect} from 'dva'
import {Menu, Icon} from 'antd';
import {Link} from 'dva/router';
import styles from './index.less';
import classNames from 'classnames'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item

const Header = ({dispatch, layout}) => {
  const {menus} = layout

  function menuClick(item){
    if(item.key === 'logout'){
      dispatch({type: 'auth/logout', payload: {}})
    }else{
      dispatch({type: 'layout/updateNavPath', payload: {
        keyPath: item.keyPath,
        key: item.key
      }})
    }
  }

  const head = styles.headerCls
  const topFixed = styles.topFixed
  const headClass = classNames({head: true, clearfix: true, topFixed: true})
  let openKey = []
  const menu = menus.map((item)=>{
    openKey.push(item.key)
    if(item.childs){
      return (
        <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.name}</span>} >
          {
            item.childs.map((child)=>{
               let url = child.url
               return (
                 <MenuItem key={child.key}>
                   <Link to={url}>{child.name}</Link>
                 </MenuItem>
               )
            })
          }
        </SubMenu>
      )
    }else{
      let url = item.url
      return (
        <MenuItem key={item.key}>
          <Link to={url}>{item.name}</Link>
        </MenuItem>
      )
    }
  })
  return (
    <header className={headClass}>
      <div>
        <div>
          <a className={styles.logo} href="/">
            <img alt="logo" src="https://cdn3.iconfinder.com/data/icons/social-media-logos-glyph/2048/5315_-_Apple-128.png"/>
            <span>微信管理</span>
          </a>
        </div>
        <div className='ant-layout-header'>
          <Menu mode="horizontal" className='header-menu' onClick={menuClick}>
            {menu}
            <SubMenu title={< span > <Icon type="user"/>ldd < /span>} >
              <Menu.Item key="404">
                <Link to='/404'>404</Link>
              </Menu.Item>
              <Menu.Item key="setting:1">个人信息</Menu.Item>
              <Menu.Item key="setting:2">密码修改</Menu.Item>
              <Menu.Divider/>
              <Menu.Item key="logout">注销</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  layout: PropTypes.object
};

function mapStateToProps({layout}) {
  return {layout}
}

export default connect(mapStateToProps)(Header)
