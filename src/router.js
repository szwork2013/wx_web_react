import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'dva/router';
import Subscribe from './views/wx_subscribe/WxSubscribe'
import Home from './views/home/Home'
import Login from './common/login/Login'
import App from './layouts/V2/App'
import NotFound from './common/not_found'
import WxTask from './views/wx_task'

export default function({ history }) {
  function requireAuth(nextState, replace) {
      if (!!!localStorage.token && nextState.location.pathname != '/login') {
        replace({
          pathname: '/login',
        })
      }
    }

  return (
    <Router history={history}>
      <Route path="/">
        <IndexRedirect to="/home" />
        <Route component={App}>
          <Route path='/home' component={Home} onEnter={requireAuth}/>
          <Route path="/subscribe" component={Subscribe} onEnter={requireAuth}/>
          <Route path="/wxtask" component={WxTask} onEnter={requireAuth}/>
        </Route>
        <Route path='/login' component={Login}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  );
};
