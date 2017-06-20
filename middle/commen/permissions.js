/**
 * auther：马群
 * QQ：2381930754
 * 用户权限相关API
 */

/* 用户权限查询 */
var connection = require('../config.js');
var express = require('express');
var app = express();


// 检验账号是否存在
app.post('/api/checkPermiss', function(req, res){
	var token = req.body.token;
	connection.query("select token,permissions from "+connection.dev.call+".user where token='"+token+"' ", function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	     }else {
	     		//捕获异常
	     		try {
	     			res.status(200).json({"status":"success","data":result[0].permissions});
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}
	    }
	});
});




module.exports = app;
