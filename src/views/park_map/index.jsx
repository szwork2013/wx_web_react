import React, {PropTypes} from 'react'
import {Tabs} from 'antd'
import {connect} from 'dva'

const TabPane = Tabs.TabPane;

import DeviceMap from './DeviceMap'
import DistrictMap from './DistrictMap'
import PersonMap from './PersonMap'
import MapSearch from './MapSearch'

const ParkMap = ({dispatch, park}) => {
  const {list, regions} = park
  const districtProps = {
    parks: list
  }

  const searchProps = {
    regions,
    onSearch(){
      alert('11')
    }
  }

  const RefreshTab = () => (
    <Tabs tabPosition={'left'}>
      <TabPane tab='停车场分布' key='1'>
        <DistrictMap parks={list}/>
      </TabPane>
      <TabPane tab='通行轨迹' key='2'>
        <PersonMap/>
      </TabPane>
      <TabPane tab='设备监控' key='3'>
        <DeviceMap/>
      </TabPane>
    </Tabs>
  )

  return (
    <div>
      <MapSearch {...searchProps}/>
      <RefreshTab/>
    </div>
  )
}

ParkMap.PropTypes = {
  park: PropTypes.object.isRequired
}

function mapStateToProps({park}){
  return {park}
}
export default connect(mapStateToProps)(ParkMap)
