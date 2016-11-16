import React, {
	Component,
	PropTypes
} from 'react';

require("./index.less")
var hotdistrict = ["徐汇", "静安", "浦东新区", "杨浦", "闵行", "普陀区", "长宁", "黄浦", "卢湾", "虹口", "闸北", "宝山", "松江", "嘉定", "青浦"]
var num = [1499, 965, 2990, 1347, 1298, 894, 1347, 750, 641, 1333, 956, 824, 809, 816, 409]

export default class Map extends Component {

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
	}

	componentDidMount() {
		this._map = new BMap.Map(this.id, {minZoom:5,maxZoom:19,enableMapClick:false});
		this._map.centerAndZoom(new BMap.Point(104.0756715, 30.666712), 13);
		this._map.addControl(new BMap.NavigationControl());
    this._map.enableScrollWheelZoom(true);
    this._map.setCurrentCity("成都");

		const that = this;

    //定位
    // var geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(function(r){
    //   if(this.getStatus() == BMAP_STATUS_SUCCESS){
    //     that._map.centerAndZoom(r.point, 12);
    //     // var mk = new BMap.Marker(r.point);
    //     // map.addOverlay(mk);
    //     that._map.panTo(r.point);
    //     // alert('您的位置：'+r.point.lng+','+r.point.lat);
    //   }
    //   else {
    //     // alert('failed'+this.getStatus());
    //   }
    // },{enableHighAccuracy: true})

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
			<div className="map" id={this.id}>
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
			this.makeDistrictLabel(hotdistrict);
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
		const size = list.length;
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
    temp.map(item => {
      let point = new BMap.Point(item.lng, item.lat)
      let marker = new BMap.Marker(point, {icon: icon})
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      marker.addEventListener("mouseover",function(e){
        let p = e.target;
        let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        let infoWindow = new BMap.InfoWindow(item.content,{
          width : 250,     // 信息窗口宽度
          height: 80,     // 信息窗口高度
          title : item.district , // 信息窗口标题
          enableMessage:true//设置允许信息窗发送短息
        });  // 创建信息窗口对象
        that._map.openInfoWindow(infoWindow,point); //开启信息窗口
  		});
			let myCompOverlay = new ComplexDistrictOverlay(point, item.district, item.content);
			that._map.addOverlay(myCompOverlay);
      // that._map.addOverlay(marker);
    })

    //轨迹
    let points = []
    temp.map(item => {
      points.push(new BMap.Point(item.lng, item.lat))
    })
    //曲线轨迹
    // let curve = new BMapLib.CurveLine(points, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5})
    // that._map.addOverlay(curve); //添加到地图中
    // // curve.enableEditing()
    //直线轨迹
    let polyline = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});   //创建折线
  	that._map.addOverlay(polyline);   //增加折线

		// for (let i = 0; i < size; i++) {
		// 	myGeo.getPoint(list[i], function(point) {
		// 		var txt = list[i];
		// 		var count = num[i];
		// 		var mouseoverTxt = txt + " " + count + "套";
    //     var pointTest = new BMap.Point(104.068341,30.644533)
		// 		var myCompOverlay = new ComplexDistrictOverlay(pointTest, txt, mouseoverTxt);
		// 		that._map.addOverlay(myCompOverlay);
		// 		that._allOverlays.push(myCompOverlay);
    //
		// 	}, "成都市");
		// }
	}

}

Map.PropTypes = {
	onRefreshZones : React.PropTypes.func.isRequired,
	onClickZone : React.PropTypes.func.isRequired,
	district : React.PropTypes.string
}

class ComplexDistrictOverlay extends BMap.Overlay {
	constructor(point, text, mouseoverText) {
		super()
		this._point = point;
		this._text = text;
		this._overText = mouseoverText;
	}

	initialize(map) {
		this._map = map;
		var div = this._div = document.createElement("div");
		div.style = "width:120px; height:40px;";
		div.style.position = "absolute";
		div.style.backgroundColor = "#32A3E6";
		div.style.textAlign = "center"
		div.style.padding = "2px";
		div.style.lineHeight = "40px";
		div.style.whiteSpace = "nowrap";
		div.style.MozUserSelect = "none";
		div.style.fontSize = "14px"
    div.style.color = "white"
		var span = this._span = document.createElement("span");
		div.appendChild(span);
		span.appendChild(document.createTextNode(this._text));
		var that = this;

		div.onmouseover = function() {
			this.style.zIndex = 1;
			this.style.backgroundColor = "#6BADCA";
			this.getElementsByTagName("span")[0].innerHTML = that._overText;

		}

		div.onmouseout = function() {
			this.style.zIndex = 0;
			this.style.backgroundColor = "#32A3E6";
			this.getElementsByTagName("span")[0].innerHTML = that._text;
		}

		div.addEventListener("click", function() {
			that.hide();
			map.centerAndZoom(that._point, 17);

		})

		map.getPanes().labelPane.appendChild(div);

		return div;
	}

	draw() {
		var map = this._map;
		var pixel = map.pointToOverlayPixel(this._point);
		this._div.style.left = pixel.x - 45 + "px";
		this._div.style.top = pixel.y - 45 + "px";
	}


}

class ComplexZoneOverlay extends BMap.Overlay {
	constructor(point, text, mouseoverText, fontColor, zone, onClickZone) {
		super()
		this._point = point;
		this._text = text;
		this._overText = mouseoverText;
		this._fontColor = fontColor;
		this._zone = zone;
		this._onClickZone = onClickZone;
	}

	initialize(map) {
		this._map = map;
		var div = this._div = document.createElement("div");
		div.style = "border-radius:30px; width:150px; height:30px; border:3px solid #666;";
		div.style.position = "absolute";
		div.style.backgroundColor = "#FFFFFF";
		div.style.color = this._fontColor;
		div.style.textAlign = "center"
		div.style.height = "10px";
		div.style.padding = "2px";
		div.style.lineHeight = "10px";
		div.style.whiteSpace = "nowrap";
		div.style.MozUserSelect = "none";
		div.style.fontSize = "10px"
		var span = this._span = document.createElement("span");
		div.appendChild(span);
		span.appendChild(document.createTextNode(this._text));
		var that = this;

		div.onmouseover = function() {
			this.style.backgroundColor = "#FFFFFF";
			this.style.borderColor = "#0000ff";
			this.getElementsByTagName("span")[0].innerHTML = that._overText;
		}

		div.onmouseout = function() {
			this.style.backgroundColor = "#FFFFFFF";
			this.style.borderColor = "#666";
			this.getElementsByTagName("span")[0].innerHTML = that._text;
		}

		div.addEventListener("click", function() {
			that._onClickZone(that._zone);
		})

		map.getPanes().labelPane.appendChild(div);

		return div;
	}

	draw() {
		var map = this._map;
		var pixel = map.pointToOverlayPixel(this._point);
		this._div.style.left = pixel.x - 80 + "px";
		this._div.style.top = pixel.y - 20 + "px";
	}

}
