'use strict';

var express = require('express');

var curPath = __dirname;

var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "*");
  res.set('Access-Control-Allow-Credentials', true);
  res.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.set("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
  else  next();
});

// 后台静态资源
app.use('/', express.static(curPath + '/dist'));

app.get('/', function(req, res, next){
	res.sendFile(curPath + '/dist/index.html');
})

app.use(function (err, req, res, next) {

});

app.listen(8989);

module.exports = app;
