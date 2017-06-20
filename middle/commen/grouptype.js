/**
 * auther：马群
 * QQ：2381930754
 * 组织树相关API
 */

var express = require('express');
var connection = require('../config.js');
var app = express();

// 组织类型(一级)
app.post('/api/groupTypeOne', function(req, res){
	var pid = req.body.pid;
	connection.query("select * from "+connection.dev.call+".groupmenu where pid='"+pid+"'", function(err, result) {
		if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"服务端报错！"});
	     }else {
	     		//捕获异常 
	     		try {
	     			res.status(200).json(result);
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}
	    }
	})
})

// 组织类型(二级)
app.post('/api/groupTypeTwo', function(req, res){
	var id = req.body.id;
	connection.query("select * from "+connection.dev.call+".groupmenu where pid='"+id+"'", function(err, result) {
		if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"服务端报错！"});
	     }else {
	     		//捕获异常
	     		try {
	     			res.status(200).json(result);
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}
	    }
	})
})


// 组织类型(三级)
app.post('/api/groupTypeThree', function(req, res){
	var id = req.body.id;
	connection.query("select * from "+connection.dev.call+".groupmenu where pid='"+id+"'", function(err, result) {
		if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"服务端报错！"});
	     }else {
	     		//捕获异常
	     		try {
	     			res.status(200).json(result);
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}
	    }
	})
})


// 组织类型(一二三级合并)
app.post('/api/groupTypeAll', function(req, res){
	var str = "select * from "+connection.dev.call+".groupmenu";
	connection.query(str, function(err, result) {
		if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"服务端报错！"});
	     }else {
	     		//捕获异常
	     		try {
	     			res.status(200).json(result);
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}
	    }
	})
})
// 组织树保存(更新)
app.post('/api/groupTypeDelete', function(req, res){
	var type = req.body.delete;
	var str = "";
	// 数据库删除
	type.split(",").forEach(function (item) {
		// 1
		connection.query("delete from "+connection.dev.call+".groupmenu where id='"+item+"'", function(err, result) {
			if (err) {
		    		throw err;
		    		return res.status(200).json({"type":"error","data":"服务端报错！"});
		     }else {
		     		//捕获异常
		     		try {
		     			res.status(200).json({"type":"success","data":"删除成功！"});
		     		}
		     		catch (e) {
		     			console.log(e);
		     		}
		    }
		})
	})
})


// 组织树保存(更新)
app.post('/api/groupTypeUpdate', function(req, res){
	var type = req.body.update;
	var str = "";
	// 更新
	type.split(",").forEach(function (item) {
		str = item.split('-');
		 connection.query("select * from "+connection.dev.call+".groupmenu where id ='"+str[1]+"' and pid='"+str[0]+"'", function(err, result){
		 	if (err) {
		    		throw err;
		    		return res.status(200).json({"type":"error","data":"服务端报错！"});
		     }else {
		     		//捕获异常
		     		try {
		     			// 新增
		     			if (result.length == 0) {
		     				connection.query("insert into "+connection.dev.call+".groupmenu (id,value,pid) values ('"+str[1]+"','"+str[2]+"','"+str[0]+"')", function(err, resultadd){
		     					if (err) {
		     						throw err;
		     					}else{
		     						return res.status(200).json({"type":"success","data":"更新成功！"});
		     					}
		     				})
		     			}else{
		     				// 编辑
		     				connection.query("update "+connection.dev.call+".groupmenu set id='"+str[1]+"', value= '"+str[2]+"' where pid='"+str[0]+"'", function(err, resultupdate){
		     						if (err) {
			     						throw err;
			     					}else{
			     						return res.status(200).json({"type":"success","data":"更新成功！"});
			     					}
		     				})
		     			}
		     		}
		     		catch (e) {
		     			console.log(e);
		     		}
		    }
		 })
	})
})

module.exports = app;
