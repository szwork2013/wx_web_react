import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'

import _ from 'lodash'
import styles from './index.less'
import parkImg from '../../../assets/img/park.png'
import carImg from '../../../assets/img/car.png'

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
		this.isInit = false
		this.lushu = null
	}

	componentDidMount () {
		this._map = new BMap.Map(this.id, {minZoom: 8, maxZoom: 19, enableMapClick: false})

		this._map.centerAndZoom(this.calcCenter(), this.zoomLevel)
		this._map.addControl(new BMap.NavigationControl())
		this._map.enableScrollWheelZoom(true)
    // this._map.setCurrentCity("成都");

		const that = this

		//moveend，初次加载时，会响应多次，原因待查？
		// this._map.addEventListener('moveend', that.getNewMap)
		// this._map.addEventListener('zoomend', that.getNewMap)
	}

	calcCenter () {
		let minLng = 0
		let maxLng = 0
		let minLat = 0
		let maxLat = 0
		if (this.traffics && this.traffics.length > 0) {
			this.traffics.map(item => {
				if (minLng === 0) {
					minLng = item.lng + ''
				}
				if (maxLng === 0) {
					maxLng = item.lng + ''
				}
				if (minLat === 0) {
					minLat = item.lat + ''
				}
				if (maxLat === 0) {
					maxLat = item.lat + ''
				}
				if (item.lng < minLng) {
					minLng = item.lng + ''
				}
				if (item.lng > maxLng) {
					maxLng = item.lng + ''
				}
				if (item.lat > minLat) {
					minLat = item.lat + ''
				}
				if (item.lat > maxLat) {
					maxLat = item.lat + ''
				}
			})
		}

		let lng = 104.724252
		let lat = 31.465233
		if (minLng !== 0 && minLat !== 0) {
			lng = (parseFloat(minLng) + parseFloat(maxLng)) / 2
			lat = (parseFloat(minLat) + parseFloat(maxLat)) / 2
		}

		return new BMap.Point(lng, lat)
	}

	componentDidUpdate () {
		this._map = new BMap.Map(this.id, {minZoom: 8, maxZoom: 19, enableMapClick: false})

		this._map.centerAndZoom(this.calcCenter(), this.zoomLevel)
		this._map.addControl(new BMap.NavigationControl())
		this._map.enableScrollWheelZoom(true)
    // this._map.setCurrentCity("成都");

		const that = this

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
		let icon = new BMap.Icon(parkImg, new BMap.Size(32, 32))

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
			// let label = new BMap.Label(item.parkName, {offset: new BMap.Size(20, -10)})
			// marker.setLabel(label)
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
		// that.isInit = false
		if (traffickInfos.length > 1) {
			that.lushu = new BMapLib.LuShu(that._map, points, {
				defaultContent: '', //"从天安门到百度大厦"
				autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
				icon: new BMap.Icon(carImg, new BMap.Size(48, 48), {anchor: new BMap.Size(25, 13)}),
				speed: 1500,
				enableRotation: true, //是否设置marker随着道路的走向进行旋转
				landmarkPois: []
			})
			that.lushu.start()

			// // 实例化一个驾车导航用来生成路线
			// let drv = new BMap.DrivingRoute(that.calcCenter(), {
			// 	onSearchComplete: function (res) {
			// 		if (drv.getStatus() === 0 && !that.isInit) {
			// 			that.isInit = true
			// 			var plan = res.getPlan(0)
			// 			var arrPois = []
			// 			// for (var j = 0; j < plan.getNumRoutes(); j++) {
			// 			// 	let route = plan.getRoute(j)
			// 			// 	arrPois = arrPois.concat(route.getPath())
			// 			// }
			// 			let points = []
			// 			traffickInfos.map(item => {
			// 				points.push(new BMap.Point(item.lng, item.lat))
			// 			})
			// 			that._map.setViewport(points)

			// 			that.lushu = new BMapLib.LuShu(that._map, points, {
			// 				defaultContent: '', //"从天安门到百度大厦"
			// 				autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
			// 				icon: new BMap.Icon('http://203.195.178.77:9000/static/car.png', new BMap.Size(48, 48), {anchor: new BMap.Size(25, 13)}),
			// 				speed: 1000,
			// 				enableRotation: true //是否设置marker随着道路的走向进行旋转
			// 			})
			// 			that.lushu.start()
			// 		}
			// 	}
			// })
			// drv.search(new BMap.Point(_.first(traffickInfos).lng, _.first(traffickInfos).lat), new BMap.Point(_.last(traffickInfos).lng, _.last(traffickInfos).lat))
		}
	}
}

PersonMap.PropTypes = {
	traffics: PropTypes.array.isRequired
}

export default PersonMap
