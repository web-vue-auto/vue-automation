/**
 * auther：马群
 * QQ：2381930754
 *用户中心相关API
 */

 // 用户中心
var connection = require('../config.js');
var express = require('express');
var app = express();

// 模糊查询用户信息
app.post('/api/getUser', function(req, res){
	var search = req.body.username == "" ? "" : req.body.username;
	var pageNum = (req.body.current -1)*10;
	var pageTotal="";
	//分类sql查询
	var str_ = "select id,token,permissions from "+connection.dev.call+".user where 1=1 "
	var str = "select id,token,permissions from "+connection.dev.call+".user where 1=1 "
	if (search != "")  str_ += " and id like '%"+search+"%'";

	// 查询总数
	connection.query(str_, function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"服务端报错！"});
	     }else {
	     		//捕获异常
	     		try {
	     			pageTotal = result.length;
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}
	    }
	});


	// 添加模糊查询
	if (search != "") str += " and id like '%"+search+"%'";
	// 拼接页数字段
	str += " limit "+pageNum+",10";

	connection.query(str, function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"搜索失败！"});
	     }else {
	     		//捕获异常
	     		try {
	     			res.status(200).json({"type":"success","data":result,"total":pageTotal});
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}
	    }
	});
});

// 分配权限保存
app.post('/api/saveUser', function(req, res){
	// 请求获取
	var type = req.body.type; //arr
	var token = req.body.token; //arr
	// 加工处理
	var arrToken = token.split(",");
	// 循环查询方法
	function queryTypedo(value) {
		connection.query("update "+connection.dev.call+".user set permissions = '"+type+"' where token='"+value+"'", function(err, result) {
		    // 过滤提炼出数组
		    if (err) {
		    		throw err;
		    		return res.status(200).json({"type":"error","data":"保存失败！"});
		     }else {
		     		//捕获异常
		     		try {
		     			res.status(200).json({"type":"success","data":"权限分配成功！"});
		     		}
		     		catch (e) {
		     			console.log(e);
		     		}
		    }
		});
	};
	// 轮询type __   首先执行
	arrToken.forEach(function (item) {
		queryTypedo(item);
	})
});
module.exports = app;
