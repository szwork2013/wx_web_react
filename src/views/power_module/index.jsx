import React, {PropTypes} from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import CusForm from './CusForm'
import CusTree from './CusTree'
import CusOper from './CusOper'

const Module = ({dispatch, module}) => {
	const {datas, visible, selectedKeys, curSelMenu, isDetail, parentMenu} = module
	const treeProps = {
		dispatch,
		datas,
		selectedKeys
	}

	const formProps = {
		dispatch,
		isDetail,
		curSelMenu,
		parentMenu,
		visible
	}
	const operProps = {
		dispatch,
		selectedKeys,
		curSelMenu,
		parentMenu
	}

	return (
		<div>
			<Row><CusOper {...operProps}/></Row>
			<Row>
				<Col span={4}><CusTree {...treeProps}/></Col>
				<Col span={18}><CusForm {...formProps}/></Col>
			</Row>
		</div>
	)
}

Module.propTypes = {
	module: PropTypes.object.isRequired
}

const mapStateToProps = ({module}) => {
	return {module}
}

export default connect(mapStateToProps)(Module)
