import React, {PropTypes} from 'react'
import {Cascader} from 'antd'
import _ from 'lodash'
import styles from './index.less'

const DeviceSearch = ({parks, regions, onSelChange, currentRegion}) => {
    const cascaderProps = {
        options: regions || [],
        placeholder: '请选择',
        onChange: onSelChange,
        changeOnSelect: true,
        // defaultValue: [currentRegion],
        allowClear: false
    }

    return (
        <div className={styles.container}>
            <div>
                <Cascader {...cascaderProps} style={{marginLeft: '10px',marginTop:'10px', width:'90%'}} />                
            </div>
        </div>
    )
}

DeviceSearch.propTypes = {
    
}

export default DeviceSearch