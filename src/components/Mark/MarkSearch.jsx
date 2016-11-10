import React, {PropTypes} from 'react'
import {Button} from 'antd'
import styles from './MarkSearch.less'

const MarkSearch = ({onAdd}) => {

  return (
    <div className={styles.normal}>
      <Button type="ghost" onClick={onAdd}>添加</Button>
    </div>
  )
}

MarkSearch.propTypes = {
  onAdd: PropTypes.func
}

export default MarkSearch
