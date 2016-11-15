import React, {PropTypes} from 'react'
import {Breadcrumb, Icon} from 'antd'
import {connect} from 'dva'
import {Link} from 'dva/router'
import './index.less'
import _ from 'lodash'

const NavPath = ({auth, locationInfo}) => {
  const {menus} = auth
  let childs = []
  let paths = []
  let curPath = locationInfo.pathname.replace('/', '')

  const getNav = (path)=>{
    let tmpOb = _.find(menus, function(o) {
      return !!o.url && o.url.replace('/', '') == path;
    })
    if(tmpOb && tmpOb.name !== '首页'){
      paths.push({
        key: tmpOb.key,
        url: tmpOb.url,
        name: tmpOb.name,
        icon: tmpOb.icon
      })
    }

    menus.map(item => {
      let childs = item.childs
      if(childs){
        tmpOb = _.find(childs, function(o) {
          return !!o.url && o.url.replace('/', '') == path;
        });
        if(!tmpOb)return
        paths.push({
          key: item.key,
          url: item.url,
          name: item.name,
          icon: item.icon
        })
        paths.push({
          key: tmpOb.key,
          url: tmpOb.url,
          name: tmpOb.name,
          icon: tmpOb.icon
        })
      }
    })

  }

  getNav(curPath)
  const bread = paths.map((item, key)=>{
    if(paths.length - 1 === key || !item.url){
      return (
        <Breadcrumb.Item key={item.key}>
         <span>{item.name}</span>
        </Breadcrumb.Item>
      )
    }else{
      return (
        <Breadcrumb.Item key={item.key}>
         <Link to={item.url}>
           {item.name}
         </Link>
        </Breadcrumb.Item>
      )
    }
  })

  return (
    <div className='ant-layout-breadcrumb'>
      <Breadcrumb>
        <Breadcrumb.Item key='bc-0'><Link to="/">首页</Link></Breadcrumb.Item>
        {bread}
      </Breadcrumb>
    </div>
  )
}

NavPath.propTypes = {
  auth: PropTypes.object
};

function mapStateToProps({auth}) {
  return {auth}
}

export default connect(mapStateToProps)(NavPath)
