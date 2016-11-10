import React from 'react'
import {Icon, Button, Link} from 'antd'
import { hashHistory } from 'dva/router'
import styles from './index.less'

const NotFound = () => {
  function BackHome(){
    hashHistory.push({pathname: '/home'})
  }

  return (
    <div className={styles.notfound}>
      <div style={{ fontSize:32 }}><Icon type="frown"/></div>
      <h1>404 Not Found</h1>
      <Button type="primary" onClick={BackHome}>
          回到首页
      </Button>
    </div>
  )
}

export default NotFound
