import React, { PropTypes } from 'react';
import {Affix, BackTop, Row, Col } from 'antd'
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './index.less';
import HeaderBar from '../Header'
// import FreeScrollBar from 'react-free-scrollbar'
import NavPath from '../../NavPath'
import Footer from '../Footer'

function App({ children,location }) {
  return (
    <div className='ant-layout-aside'>
      <div id="main-content-div" className='ant-layout-main'>
        <Affix style={{zIndex: 999}}>
          <HeaderBar />
        </Affix>
        <Row>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 1 }}>
              <NavPath locationInfo={location} />
          </Col>
        </Row>
        <Row className={styles.container}>
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 1 }}>
              {children}
            </Col>
        </Row>
        <br/>
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
};

export default connect()(App);
