import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'

import _ from 'lodash'
import styles from './index.less'

class PersonMap extends Component {
	constructor (props) {
		super(props)
		this.id = props.id || 'map'
		this._allOverlays = []
		this.getNewMap = this.getNewMap.bind(this)
		this.removeLabels = this.removeLabels.bind(this)
		this._center = null
		this._zoomLevel = 0
		this.traffics = props.traffics
		this.zoomLevel = props.zoomLevel
	}

	componentDidMount () {
		this._map = new BMap.Map(this.id, {minZoom: 8, maxZoom: 19, enableMapClick: false})

		this._map.centerAndZoom(this.calcCenter(), this.zoomLevel)
		this._map.addControl(new BMap.NavigationControl())
		this._map.enableScrollWheelZoom(true)
    // this._map.setCurrentCity("成都");

		const that = this

		//moveend，初次加载时，会响应多次，原因待查？
		this._map.addEventListener('moveend', that.getNewMap)
		this._map.addEventListener('zoomend', that.getNewMap)
	}

	calcCenter () {
		let minLng = _.min(this.traffics, function (item) {
			return item.lng
		})
		let maxLng = _.max(this.traffics, function (item) {
			return item.lng
		})
		let minLat = _.min(this.traffics, function (item) {
			return item.lat
		})
		let maxLat = _.max(this.traffics, function (item) {
			return item.lat
		})

		let lng = 104.724252
		let lat = 31.465233

		if (minLng && minLat) {
			lng = (minLng.lng + maxLng.lng) / 2
			lat = (minLat.lat + maxLat.lat) / 2
		}
		return new BMap.Point(lng, lat)
	}

	componentDidUpdate () {
		this.traffics = this.props.traffics
		this._map.centerAndZoom(this.calcCenter(), this.props.zoomLevel)
		this.getNewMap()
	}

	render () {
		return (
			<div className={styles.container} id={this.id}>
			</div>
		)
	}

	getNewMap () {
		const level = this._map.getZoom()
		const center = this._map.getCenter()

		const bs = this._map.getBounds() //获取可视区域
		const sw = bs.getSouthWest() //可视区域左下角
		const ne = bs.getNorthEast() //可视区域右上角

		this.makeDistrictLabel()
	}

		//清除标注
	removeLabels () {
		const that = this
		this._allOverlays.map(function (item) {
			that._map.removeOverlay(item)
		})
	}

	//划区
	makeDistrictLabel () {
		const myGeo = new BMap.Geocoder()
		const that = this
		that.removeLabels()
		let icon = new BMap.Icon('http://203.195.178.77:9000/static/person.png', new BMap.Size(48, 48))

		let parkNames = _.uniq(_.map(that.traffics, 'parkName'))
		let traffickInfos = []
		parkNames.map(function (item) {
			let traffics = _.filter(that.traffics, function (chr) {
				return chr.parkName === item
			})
			let traffic = _.first(traffics)
			traffickInfos.push({
				parkName: item,
				lng: traffic.lng,
				lat: traffic.lat
			})
		})
    //自定义遮盖物
		traffickInfos.map(item => {
			let point = new BMap.Point(item.lng, item.lat)
			let marker = new BMap.Marker(point, {icon: icon})
			let label = new BMap.Label(item.parkName, {offset: new BMap.Size(20, -10)})
			marker.setLabel(label)
			that._map.addOverlay(marker)
			that._allOverlays.push(marker)
		})

    //轨迹
		let points = []
		traffickInfos.map(item => {
			points.push(new BMap.Point(item.lng, item.lat))
		})
		//直线轨迹
		let polyline = new BMap.Polyline(points, {strokeColor: 'red', strokeWeight: 2, strokeOpacity: 0.8})   //创建折线
		that._map.addOverlay(polyline)   //增加折线
		that._allOverlays.push(polyline)
	}
}

PersonMap.PropTypes = {
	traffics: PropTypes.array.isRequired
}

export default PersonMap
