import React from 'react'
import {BackTop} from 'antd'

const Footer = ()=>{
  const dark = 'hsl(200, 20%, 20%)'
  const light = '#fff'
  const styles = {}
  styles.footer = {
    height: '64px',
    lineHeight:' 64px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#999',
    background: '#fff',
    borderTop: '1px solid #e9e9e9',
    width: '100%',
  }
  styles.footer.p = {
  	textAlign:'center'
  }
  return (
    <div style={styles.footer}>
      LDD版权所有©2016
      <BackTop/>
		</div>
  )
}

export default Footer
