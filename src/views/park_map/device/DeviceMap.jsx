import React, {Component, PropTypes} from 'react'

import _ from 'lodash'
import styles from './index.less'
import parkImg from '../../../assets/img/park.png'

class DeviceMap extends Component {

	constructor (props) {
		super(props)
		this.id = props.id || 'map'
		this._allOverlays = []
		this.getNewMap = this.getNewMap.bind(this)
		this.removeLabels = this.removeLabels.bind(this)
		this._center = null
		this._zoomLevel = 0
		this.devices = props.devices
		this.zoomLevel = props.zoomLevel
	}

	componentDidMount () {
		this._map = new BMap.Map(this.id, {minZoom: 8, maxZoom: 19, enableMapClick: false})   

		this._map.centerAndZoom(this.calcCenter(), this.zoomLevel)
		this._map.addControl(new BMap.NavigationControl())
		this._map.enableScrollWheelZoom(true);
    // this._map.setCurrentCity("成都");

		const that = this

		//moveend，初次加载时，会响应多次，原因待查？
		this._map.addEventListener('moveend', that.getNewMap)
		this._map.addEventListener('zoomend', that.getNewMap)
	}

	calcCenter () {
		let minLng = _.min(this.devices, function (item) {
			return item.lng
		})
		let maxLng = _.max(this.devices, function (item) {
			return item.lng
		})
		let minLat = _.min(this.devices, function (item) {
			return item.lat
		})
		let maxLat = _.max(this.devices, function (item) {
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
		this.devices = this.props.devices
		this._map.centerAndZoom(this.calcCenter(), this.props.zoomLevel)
		this.getNewMap()
	}

	render () {
		return (
			<div className={styles.container} id={this.id}>
			</div>
		);
	}


	getNewMap () {
		const level = this._map.getZoom();
		const center = this._map.getCenter();

		const bs = this._map.getBounds(); //获取可视区域
		const sw = bs.getSouthWest(); //可视区域左下角
		const ne = bs.getNorthEast(); //可视区域右上角

		this.makeDistrictLabel();
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

		let parkNames = _.uniq(_.map(that.devices, 'parkName'))
		let parkInfos = []
		parkNames.map(function (item) {
			let deviceInfos = []
			let devices = _.filter(that.devices, function (chr) {
				return chr.parkName === item
			})
			let deviceNames = _.uniq(_.map(devices, 'devTypeDes'))
			deviceNames.map(function (name) {
				let deviceCount = _.filter(devices, function (chr) {
					return chr.devTypeDes === name
				})
				deviceInfos.push({
					deviceName: name,
					deviceCount: deviceCount ? deviceCount.length : 0
				})
			})

			let device = _.first(devices)

			parkInfos.push({
				parkName: item,
				devices: deviceInfos,
				lng: device.lng,
				lat: device.lat
			})
		})
    //自定义遮盖物
		parkInfos.map(item => {
			let point = new BMap.Point(item.lng, item.lat)
			// let label = new BMap.Label(item.parkName, {offset: new BMap.Size(20, -10)})
			// marker.setLabel(label)
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

			var convertor = new BMap.Convertor()
			var pointArr = []
			pointArr.push(point)
			convertor.translate(pointArr, 3, 5, (data) => {
				if (data.status === 0) {
					let marker = new BMap.Marker(data.points[0], {icon: icon})
					marker.addEventListener('click', function (e) {
						let p = e.target
						let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
						let infoWindow = new BMap.InfoWindow(item.parkName, {
							width: 300
						}) // 创建信息窗口对象
						that._map.openInfoWindow(infoWindow, data.points[0]) //开启信息窗口
					})
					that._map.addOverlay(marker)
					that._allOverlays.push(marker)
				}
			})
		})
	}
}

DeviceMap.PropTypes = {
	devices: PropTypes.array.isRequired
}

export default DeviceMap
