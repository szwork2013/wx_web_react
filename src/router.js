import React, { PropTypes } from 'react'
import { Router } from 'dva/router'
import {Token} from './utils/constants'
// import Subscribe from './views/wx_subscribe/WxSubscribe'
// import Home from './views/home/Home'
// import Login from './common/login/Login'
// import App from './layouts/V2/App'
// import NotFound from './common/not_found'
// import WxTask from './views/wx_task'

export default ({ history, app }) => {
	function requireAuth (nextState, replace) {
		if (!window.localStorage.getItem(Token) && nextState.location.pathname !== '/login') {
			replace({
				pathname: '/login'
			})
		}
	}
	const routes = [
		{
			path: '/login',
			getComponent (nextState, cb) {
				require.ensure([], (require) => {
					app.model(require('./models/auth'))
					cb(null, require('./common/login/Login'))
				})
			}
		},
		{
			path: '/districtmap',
			getComponent (nextState, cb) {
				require.ensure([], (require) => {
					app.model(require('./models/park'))
					cb(null, require('./views/park_map/district'))
				})
			}
		},
		{
			path: '/devicemap',
			getComponent (nextState, cb) {
				require.ensure([], (require) => {
					app.model(require('./models/park'))
					cb(null, require('./views/park_map/device'))
				})
			}
		},
		{
			path: '/personmap',
			getComponent (nextState, cb) {
				require.ensure([], (require) => {
					app.model(require('./models/park'))
					cb(null, require('./views/park_map/person'))
				})
			}
		},
		{
			path: '/',
			getComponent (nextState, cb) {
				require.ensure([], (require) => {
					app.model(require('./models/auth'))
					cb(null, require('./layouts/V2/App'))
				})
			},
			indexRoute: {
				onEnter: requireAuth,
				getComponent (nextState, cb) {
					require.ensure([], (require) => {
						cb(null, require('./views/home/Home'))
					})
				}
			},
			childRoutes: [
				{
					onEnter: requireAuth,
					path: '/subscribe',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							app.model(require('./models/wx_subscribe'))
							cb(null, require('./views/wx_subscribe/WxSubscribe'))
						})
					}
				},
				{
					onEnter: requireAuth,
					path: '/wxtask',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							app.model(require('./models/wx_task'))
							cb(null, require('./views/wx_task'))
						})
					}
				},
				{
					onEnter: requireAuth,
					path: '/cusmbr',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							app.model(require('./models/cus_mbr'))
							cb(null, require('./views/cus_mbr'))
						})
					}
				},
				{
					path: '/map',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/map'))
						})
					}
				},
				{
					path: '/demo',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./views/demo'))
						})
					}
				},
				{
					path: '/wxchargeord',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							app.model(require('./models/charge'))
							cb(null, require('./views/charge/wx_charge_ord'))
						})
					}
				},
				{
					path: '*',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./common/not_found'))
						})
					}
				}
			]
		}
	]
	return <Router history={history} routes={routes} />
	// return (
	//   <Router history={history}>
	//     <Route path="/">
	//       <IndexRedirect to="/home" />
	//       <Route component={App}>
	//         <Route path='/home' component={getHome} onEnter={requireAuth}/>
	//         <Route path="/subscribe" component={getSubscribe} onEnter={requireAuth}/>
	//         <Route path="/wxtask" component={getWxTask} onEnter={requireAuth}/>
	//         <Route path="/cusmbr" component={getCusMbr} onEnter={requireAuth} />
	//       </Route>
	//       <Route path='/login' component={getLogin}/>
	//     </Route>
	//     <Route path="*" component={getNotFound}/>
	//   </Router>
	// );
}
