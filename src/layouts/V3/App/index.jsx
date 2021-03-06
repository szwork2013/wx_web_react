import React, {PropTypes} from 'react'
import { connect } from 'dva'
import { Card, Row, Col } from 'antd'

import Header from '../Header'
import Sidebar from '../Sidebar'
// import NavPath from '../../NavPath'
import Footer from '../../Footer'
import styles from './index.less'
import FreeScrollBar from 'react-free-scrollbar'

const App = ({children, dispatch, auth}) => {
	const headerProps = {
		dispatch,
		onMenuClick (left, defaultLeft) {
			dispatch({type: 'auth/uptState',
				payload: {
					leftMenu: left,
					defaultLeftMenu: defaultLeft
				}})
		}
	}

	const sideBarProps = {
		leftMenu: auth.leftMenu,
		defaultLeftMenu: auth.defaultLeftMenu,
		onMenuClick (key) {
			dispatch({type: 'auth/uptState',
				payload: {
					defaultLeftMenu: [key]
				}})
		}
	}

	return (
		<div className={styles.mainbg}>
			<Header {...headerProps}/>
				<Card className={styles.container}>
					<Row>
						<Col span={3}>
							<div className={styles.sidebar}>
								<Sidebar {...sideBarProps}/>
							</div>
						</Col>
						<Col span={20} offset={1}>
							<div className={styles.right}>
								{children}
							</div>
						</Col>
					</Row>
				</Card>
		</div>
	)
}

App.propTypes = {
	auth: PropTypes.object.isRequired
}

function mapStateToProps ({auth}) {
	return {auth}
}
export default connect(mapStateToProps)(App)
