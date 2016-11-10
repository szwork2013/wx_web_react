import React, {PropTypes} from 'react'
import {Breadcrumb} from 'antd'
import {connect} from 'dva'
import './index.less'

const NavPath = ({layout}) => {
  const {navpath} = layout
  const bread = navpath.map((item)=>{
      return (
        <Breadcrumb.Item key={item.key}>{item.name}</Breadcrumb.Item>
      )
    })
  return (
    <div className='ant-layout-breadcrumb'>
      <Breadcrumb>
        <Breadcrumb.Item key='bc-0'>首页</Breadcrumb.Item>
        {bread}
      </Breadcrumb>
    </div>
  )
}

NavPath.propTypes = {
  layout: PropTypes.object
};

function mapStateToProps({layout}) {
  return {layout}
}

export default connect(mapStateToProps)(NavPath)
