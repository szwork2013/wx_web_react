import React, { PropTypes } from 'react'
import { Router } from 'dva/router'
import {Token} from './utils/constants'

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
					app.model(require('./models/common'))
					cb(null, require('./layouts/V3/App'))
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
					onEnter: requireAuth,
					path: '/wxchargeord',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							app.model(require('./models/charge'))
							cb(null, require('./views/charge/wx_charge_ord'))
						})
					}
				},
				{
					onEnter: requireAuth,
					path: '/vipgift',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							app.model(require('./models/vip_gift'))
							cb(null, require('./views/vip_gift'))
						})
					}
				},
				{
					onEnter: requireAuth,
					path: '/vipgiftexch',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							app.model(require('./models/vip_gift_exch'))
							cb(null, require('./views/vip_gift_exch'))
						})
					}
				},
				{
					onEnter: requireAuth,
					path: '/module',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							app.model(require('./models/power_module'))
							cb(null, require('./views/power_module'))
						})
					}
				},
				{
					onEnter: requireAuth,
					path: '/wxorderadmin',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							app.model(require('./models/wx_order_admin'))
							cb(null, require('./views/wx_order_admin'))
						})
					}
				},
				{
					onEnter: requireAuth,
					path: '/account',
					getComponent (nextState, cb) {
						require.ensure([], (require) => {
							app.model(require('./models/account'))
							cb(null, require('./views/account'))
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
