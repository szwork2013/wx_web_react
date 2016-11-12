import React, { PropTypes } from 'react';
import {Affix, BackTop, Row, Col } from 'antd'
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './index.less';
import HeaderBar from '../Header'
import FreeScrollBar from 'react-free-scrollbar'
import NavPath from '../../NavPath'
import Footer from '../../Footer'

function App({ children }) {
  return (
    <FreeScrollBar>
      <div className='ant-layout-aside'>
        <div id="main-content-div" className='ant-layout-main'>
          <HeaderBar />
          <NavPath />
          <Row className={styles.container}>
              <Col xs={{ span: 24, offset: 0 }} lg={{ span: 20, offset: 2 }}>
                {children}
              </Col>
          </Row>
        </div>
      </div>
      <BackTop/>
    </FreeScrollBar>
  );
}

App.propTypes = {
};

export default connect()(App);
