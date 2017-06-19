/**
 * auther：马群
 * QQ：2381930754
 */
var express = require('express');
var bodyParser = require('body-parser');
var user = require('./user/user.js');
var upload = require('./upload/upload.js');
var list = require('./management/list.js');
var option = require('./opinion/opinion.js');
var resouce = require('./resouce/resouce.js');
var task = require('./task/task.js');
var bbs = require('./bbs/bbs.js');
var components = require('./components/components.js');
var useradmin = require('./user/userAdmin.js');
var grop = require('./commen/grouptype.js');
var resouceServer = require('./resouce/resouce-server.js');
var nodeServer = require('./node/node-server.js');
var permissions = require('./commen/permissions.js');
var app = express();

//允许跨域访问(待修改)
app.all('*', function(req, res, next) {
res.header("Access-Control-Allow-Origin", req.headers.origin);
res.header('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, " +
    "Last-Modified, Cache-Control, Expires, Content-Type, Content-Language, Cache-Control, X-E4M-With,X_FILENAME");
res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
res.header("X-Powered-By",' 3.2.1')
res.header("Content-Type", "application/json;charset=utf-8");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }));

// parse application/json
app.use(bodyParser.json({limit:'50mb'}))

app.use(user);

app.use(bbs);

app.use(list);

app.use(upload);

app.use(components);

app.use(nodeServer);

app.use(task);

app.use(useradmin);

app.use(resouce);

app.use(grop);

app.use(option);

app.use(resouceServer);

app.use(permissions);

app.listen(3000,function () {
	return console.log("****************** 程序更新 *******************");
});
