import React, {
	Component,
	PropTypes
} from 'react';

import _ from 'lodash'

export default class DistrictMap extends Component {

	constructor(props) {
		super(props);
		this.id = props.id || 'map';
		this._allOverlays = [];
		this.getNewMap = this.getNewMap.bind(this);
		this.onRefreshZones = props.onRefreshZones;
		this.onClickZone = props.onClickZone;
		this._district = props.data;
		this._center = null;
		this._zoomLevel = 0;
    this.parks = props.parks;
	}

	componentDidMount() {
		this._map = new BMap.Map(this.id, {minZoom:8,maxZoom:19,enableMapClick:false});

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

    let lng = 104.072078
    let lat = 30.663484

    if(minLng && minLat){
      lng = (minLng.LONGITUDE + maxLng.LONGITUDE) / 2
      lat = (minLat.LATITUDE + maxLat.LATITUDE) / 2
    }

		this._map.centerAndZoom(new BMap.Point(lng, lat), 13);
		this._map.addControl(new BMap.NavigationControl());
    this._map.enableScrollWheelZoom(true);
    // this._map.setCurrentCity("成都");

		const that = this;

		//moveend，初次加载时，会响应多次，原因待查？
    that.getNewMap();
		this._map.addEventListener("moveend", that.getNewMap);
		this._map.addEventListener("zoomend", that.getNewMap);

	}

	componentDidUpdate() {
		if(this.props.data && this._district != this.props.data){
			this._district = this.props.data;
			this._map.centerAndZoom(this._district, 17);
		}
	}

	render() {
		return (
			<div style={{width:'100%', height:'600px'}} id={this.id}>
			</div>
		);
	}


	getNewMap() {
		const level = this._map.getZoom();
		const center = this._map.getCenter();

		/*
		* 根据地图中心点和缩放级别判断是否需要重新请求数据，解决百度api moveend 事件多次执行问题
		*/
		if(level === this._level && center === this._center){
			return;
		}else {
			this._level = level;
			this._center = center;
		}

		const bs = this._map.getBounds(); //获取可视区域
		const sw = bs.getSouthWest(); //可视区域左下角
		const ne = bs.getNorthEast(); //可视区域右上角

		if (level < 16) {
			this.removeLabels();
			this.makeDistrictLabel();
			// this.onRefreshZones([]);   //清空左边栏数据
		} else if (level > 15) {
			this.removeLabels();
			this.getVisibleZones(ne, sw);
		}
	}

	//获取当前可见范围的所有小区
	getVisibleZones(ne, sw) {
		const that = this;
		$.ajax({
			//url: 'mockdata/getVisibleZones',
			url: 'getVisibleZones',
			type: "GET",
			data: { swx : sw.lng, swy : sw.lat, nex : ne.lng, ney : ne.lat},
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				that.makeLabel(data.zones);

				// 按年增长率倒序
				data.zones.sort(function(a, b) {
					return b.xqdata.ratio_year - a.xqdata.ratio_year;
				});
				that.onRefreshZones(data.zones);
			}
		})
	}


	makeLabel(zones) {
		const size = zones.length;
		for (let i = 0; i < size; i++) {
			const point = new BMap.Point(zones[i].x, zones[i].y);
			const ratioYear = zones[i].xqdata.ratio_year;
			const mouseoverText = zones[i].name + " " + ratioYear + "%";
			let fontColor = "";
			if (ratioYear >= 20) {
				fontColor = "red";
			} else if (ratioYear < 20 && ratioYear >= 10) {
				fontColor = "blue";
			} else if (ratioYear < 10 && ratioYear >= 0) {
				fontColor = "green";
			} else {
				fontColor = "black";
			}
			const myCompOverlay = new ComplexZoneOverlay(point, zones[i].name, mouseoverText, fontColor, zones[i], this.onClickZone);
			this._map.addOverlay(myCompOverlay);
			this._allOverlays.push(myCompOverlay);
		}

	}

	//清除标注
	removeLabels() {
		const that = this;
		this._allOverlays.forEach(function(label) {
			that._map.removeOverlay(label);
		})

	}

	//划区
	makeDistrictLabel(list) {
		const myGeo = new BMap.Geocoder();
		const that = this;
    let temp = [
      {
        lng: 104.068341,
        lat: 30.644533,
        district: '好朋友',
        content: '设备10个'
      },
      {
        lng: 104.049513,
        lat: 30.684419,
        district: '点点帮',
        content: '设备30个'
      },
      {
        lng: 104.10183,
        lat: 30.688891,
        district: '绵阳太阳城',
        content: '设备20个'
      }
    ]
    let icon = new BMap.Icon("http://203.195.178.77:9000/static/park.png", new BMap.Size(48,48))
    let opts = {
      width : 250,     // 信息窗口宽度
      height: 80,     // 信息窗口高度
      // title : "好朋友小区" , // 信息窗口标题
      enableMessage:true//设置允许信息窗发送短息
    };

    //自定义遮盖物
    that.parks.map(item => {
      let point = new BMap.Point(item.LONGITUDE, item.LATITUDE)
      let marker = new BMap.Marker(point, {icon: icon})
      let label = new BMap.Label(item.PARK_NAME,{offset:new BMap.Size(20,-10)});
	    marker.setLabel(label);
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      marker.addEventListener("click",function(e){
        let p = e.target;
        let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        let infoWindow = new BMap.InfoWindow(item.PARK_NAME,{
          width : 250,     // 信息窗口宽度
          height: 80,     // 信息窗口高度
          title : item.PARK_NAME , // 信息窗口标题
          enableMessage:true//设置允许信息窗发送短息
        });  // 创建信息窗口对象
        that._map.openInfoWindow(infoWindow,point); //开启信息窗口
  		});
      that._map.addOverlay(marker);
    })

    //轨迹
    let points = []
    that.parks.map(item => {
      points.push(new BMap.Point(item.LONGITUDE, item.LATITUDE))
    })
    //直线轨迹
    let polyline = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});   //创建折线
  	that._map.addOverlay(polyline);   //增加折线

	}

}

DistrictMap.PropTypes = {
	// onRefreshZones : React.PropTypes.func.isRequired,
	// onClickZone : React.PropTypes.func.isRequired,
	// district : React.PropTypes.string,
  parks: PropTypes.array.isRequired
}
