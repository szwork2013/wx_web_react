import React, { Component, PropTypes } from 'react';
import {Affix} from 'antd'
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.less';
import HeaderBar from '../layouts/Header/HeaderLayout'
import FreeScrollBar from 'react-free-scrollbar'

function IndexPage({ children }) {
  return (
    <FreeScrollBar>
      <HeaderBar />
      <div className={styles.container}>
          {children}
      </div>
    </FreeScrollBar>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
