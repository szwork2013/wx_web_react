import React, {PropTypes} from 'react'
import { Tree, Input } from 'antd'
import _ from 'lodash'
const { TreeNode } = Tree
const { Search } = Input

const CusTree = ({dispatch, datas, selectedKeys}) => {
	let treeNodes = []

	let rootNodes = _.filter(datas, item => item.pid === 0)
	rootNodes.map(item => {
		let childs = _.filter(datas, child => child.pid === item.id)
		treeNodes.push({
			...item,
			childs
		})
	})

	let Nodes = treeNodes.map(item => {
		let ChildNodes
		if (item.childs) {
			ChildNodes = item.childs.map(child => {
				return (
					<TreeNode title={child.name} key={child.id}/>
				)
			})
		}

		return (
			<TreeNode title={item.name} key={item.id}>
				{ChildNodes}
			</TreeNode>
		)
	})

	const treeProps = {
		defaultExpandAll: true,
		selectedKeys,
		onSelect (selectedKeys, info) {
			if (_.size(selectedKeys) === 0) {
				dispatch({type: 'module/common', payload: {selectedKeys, visible: false}})
				return
			}
			let curSelMenu = _.find(datas, item => {
				return item.id === _.toNumber(_.first(selectedKeys))
			})
			let parentMenu = _.find(datas, item => {
				return item.id === curSelMenu.pid
			})
			parentMenu = parentMenu || {name: '一级菜单', id: 0}
			dispatch({type: 'module/common',
				payload: {
					selectedKeys,
					visible: true,
					curSelMenu,
					parentMenu,
					isDetail: true
				}
			})
		}
	}

	return (
		<div>
			<Tree {...treeProps}>
				{Nodes}
			</Tree>
		</div>
	)
}

CusTree.propTypes = {
}
export default CusTree
