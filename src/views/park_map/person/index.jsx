import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {BackTop} from 'antd'

import PersonMap from './PersonMap'
import PersonSearch from './PersonSearch'

import styles from './index.less'

const Person = ({dispatch, park}) => {
    const {list, regions, currentRegion,zoomLevel}  = park

    const mapProps = {
        parks: list,
        zoomLevel
    }

    const searchProps = {
        regions,
        parks: list,
        currentRegion,
        onSelChange(value, options){
            dispatch({type:'park/updateQuery', payload:{
                currentRegion: value[value.length-1],
                zoomLevel: value.length + 12
            }})
            dispatch({type:'park/query', payload:{
                currentRegion: value[value.length-1]
            }})
        }
    }

    return (
        <div className={styles.left}>
            <div className={styles.right}>
                <PersonMap {...mapProps}/>
            </div>
            <div style={{width: '300px'}}>
                <PersonSearch {...searchProps} />
            </div>
            <BackTop />
        </div>
    )
}

Person.propTypes = {    
    park: PropTypes.object
}

function mapStateToProps({park}){
    return {park}
}

export default connect(mapStateToProps)(Person)