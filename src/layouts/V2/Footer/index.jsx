import React from 'react'
import {BackTop} from 'antd'

const Footer = ()=>{
  const dark = 'hsl(200, 20%, 20%)'
  const light = '#fff'
  const styles = {}
  styles.footer = {
    height: '48px',
    lineHeight:'48px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#999',
    background: '#fff',
    borderTop: '1px solid #e9e9e9',
    width: '100%',
    position: 'relative'
  }
  styles.footer.p = {
  	textAlign:'center'
  }
  return (
    <div>
      <div style={styles.footer}>
        好朋友版权所有©2016
      </div>
      <BackTop visibilityHeight={200}/>
    </div>
  )
}

export default Footer
