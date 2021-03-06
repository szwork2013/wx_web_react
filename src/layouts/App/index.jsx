import React from 'react'
import { connect } from 'dva'
import './index.less'

import FreeScrollBar from 'react-free-scrollbar'
import Header from '../Header'
import Sidebar from '../Sidebar'
import NavPath from '../NavPath'
import Footer from '../Footer'
// import Container from '../Container'

const App = ({children, location}) => {
	return (
		<FreeScrollBar>
			<div className='ant-layout-aside'>
				<Sidebar/>
				<div id='main-content-div' className='ant-layout-main'>
					<Header/>
					<NavPath locationInfo={location}/>
					<div className='ant-layout-container'>
						<div className='ant-layout-content'>
							{children}
						</div>
					</div>
					<Footer/>
				</div>
			</div>
		</FreeScrollBar>
	)
}

export default connect()(App)
