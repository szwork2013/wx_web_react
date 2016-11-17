import React, {Component,PropTypes} from 'react';
import {connect} from 'dva'

import _ from 'lodash'
import styles from './index.less'

class PersonMap extends Component {

	constructor(props) {
		super(props);
		this.id = props.id || 'map';
		this._allOverlays = [];
		this.getNewMap = this.getNewMap.bind(this);
		this.removeLabels = this.removeLabels.bind(this)
		this._center = null;
		this._zoomLevel = 0;
    this.parks = props.parks;
		this.zoomLevel = props.zoomLevel
	}

	componentDidMount() {
		this._map = new BMap.Map(this.id, {minZoom:8,maxZoom:19,enableMapClick:false});    

		this._map.centerAndZoom(this.calcCenter(), this.zoomLevel);
		this._map.addControl(new BMap.NavigationControl());
    // this._map.enableScrollWheelZoom(true);
    // this._map.setCurrentCity("成都");

		const that = this;

		//moveend，初次加载时，会响应多次，原因待查？
		this._map.addEventListener("moveend", that.getNewMap);
		this._map.addEventListener("zoomend", that.getNewMap);

	}

	calcCenter(){
		let minLng = _.min(this.parks, function(item){
      return item.LONGITUDE
    })
    let maxLng = _.max(this.parks, function(item){
      return item.LONGITUDE
    })
    let minLat = _.min(this.parks, function(item){
      return item.LATITUDE
    })
    let maxLat = _.max(this.parks, function(item){
      return item.LATITUDE
    })

    let lng = 104.724252
    let lat = 31.465233

    if(minLng && minLat){
      lng = (minLng.LONGITUDE + maxLng.LONGITUDE) / 2
      lat = (minLat.LATITUDE + maxLat.LATITUDE) / 2
    }
		return new BMap.Point(lng, lat)
	}

	componentDidUpdate() {
		this.parks = this.props.parks;
		this._map.centerAndZoom(this.calcCenter(), this.props.zoomLevel);
		this.getNewMap();
	}

	render() {
		return (
			<div className={styles.container} id={this.id}>
			</div>
		);
	}


	getNewMap() {
		const level = this._map.getZoom();
		const center = this._map.getCenter();

		const bs = this._map.getBounds(); //获取可视区域
		const sw = bs.getSouthWest(); //可视区域左下角
		const ne = bs.getNorthEast(); //可视区域右上角

		this.makeDistrictLabel();
	}

		//清除标注
	removeLabels() {
		const that = this;
		this._allOverlays.map(function(item) {
			that._map.removeOverlay(item);
		})

	}

	//划区
	makeDistrictLabel() {
		const myGeo = new BMap.Geocoder();
		const that = this;
		that.removeLabels()
    let icon = new BMap.Icon("http://203.195.178.77:9000/static/park.png", new BMap.Size(48,48))
		let icon1 = new BMap.Icon("http://203.195.178.77:9000/static/charge.png", new BMap.Size(48,48))
    let opts = {
      width : 250,     // 信息窗口宽度
      height: 80,     // 信息窗口高度
      // title : "好朋友小区" , // 信息窗口标题
      enableMessage:true//设置允许信息窗发送短息
    };

    //自定义遮盖物
    that.parks.map(item => {
      let point = new BMap.Point(item.LONGITUDE, item.LATITUDE)
      let marker = new BMap.Marker(point, {icon: (item.RcdType === "停车场" ? icon : icon1)})
      let label = new BMap.Label(item.PARK_NAME,{offset:new BMap.Size(20,-10)});
	    marker.setLabel(label);
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      marker.addEventListener("click",function(e){
        let p = e.target;
        let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
				let content = ''
				if(item.RcdType === '停车场'){
					content = `<div style="background-color:'blue'">
					<h2 style='margin:0 0 5px 0;padding:0.2em 0'>${item.PARK_NAME}</h2>
					<p style='margin:0;line-height:1.5;font-size:13px;'>${item.ADDRESS}</p>
					<p style='margin:0;line-height:1.5;font-size:13px;'>总车位数：${item.BERTH_MAX}</p>
					<p style='margin:0;line-height:1.5;font-size:13px;'>剩余车位数：${item.BERTH_RES}</p>
					</div>`
				}else{
					content = `<div style="background-color:'blue'">
					<h2 style='margin:0 0 5px 0;padding:0.2em 0'>${item.PARK_NAME}</h2>
					<p style='margin:0;line-height:1.5;font-size:13px;'>${item.ADDRESS}</p>
					<p style='margin:0;line-height:1.5;font-size:13px;'>使用中：${item.BERTH_MAX}</p>
					<p style='margin:0;line-height:1.5;font-size:13px;'>预约数：${item.ORDER_NUM}</p>
					<p style='margin:0;line-height:1.5;font-size:13px;'>空闲数：${item.BERTH_RES}</p>
					</div>`
				}
        let infoWindow = new BMap.InfoWindow(content,{
					width : 300
				});  // 创建信息窗口对象
        that._map.openInfoWindow(infoWindow,point); //开启信息窗口
  		});
      that._map.addOverlay(marker);
			that._allOverlays.push(marker);
    })

    // //轨迹
    // let points = []
    // that.parks.map(item => {
    //   points.push(new BMap.Point(item.LONGITUDE, item.LATITUDE))
    // })
    // //直线轨迹
    // let polyline = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});   //创建折线
  	// that._map.addOverlay(polyline);   //增加折线
		// that._allOverlays.push(polyline);
	}

}

PersonMap.PropTypes = {
  parks: PropTypes.array.isRequired
}

export default PersonMap