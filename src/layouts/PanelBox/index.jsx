import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';

function PanelBox({children}) {
  return (
    <div className="panel-box ant-collapse">
      <div className="ant-collapse-item">
        <div className="ant-collapse-header">
          <span></span>
        </div>
        <div className="ant-collapse-content ant-collapse-content-active">
          <div className="ant-collapse-content-box">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

PanelBox.propTypes = {}

export default connect()(PanelBox)
