/**
*************************
 * auther：马群
 * QQ：2381930754
 * 资源列表相关API
 *************************
 **/

var express = require('express');
var connection = require('../config.js');
var app = express();
var dataTime = require('../commen/date.js');
// MD5 加密组件
var crypto = require('crypto');
function md5(data) {
	return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
}
// 资源列表查询
app.post('/api/resouce', function(req, res){
	var pageNum = (req.body.current -1)*10;
	var current = req.body.current;
	var pageTotal = '';
	connection.query("select * from VuePlatom.resouce", function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"查询失败！"});
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
	// 分页查询列表
	connection.query("select id,title,type,auther,date,cast(content as char) as content from VuePlatom.resouce limit "+pageNum+",10", function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"查询失败！"});
	     }else {	
	     		//捕获异常 
	     		try {
	     			res.status(200).json({
	     				data:result,
	     				total:pageTotal,
	     				current:current
	     			});
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}   		
	    }
	});
})

// 新增
app.post('/api/addresouce', function(req, res){
	// MD5加密处理	
	var time = dataTime();
	// 前端入参
	var title = req.body.title;
	var type = req.body.type;
	// 以时间戳作为唯一标识
	var sign = Date.parse(new Date());
	var auther = req.body.autherId;	
	var content = req.body.content.replace(/[\\"']/g,'\\$&');
	// 通过用户id查询用户名
	connection.query("select * from VuePlatom.user where token = '"+auther+"'", function(err, result) {
	    if (err) {
	    		throw err;
	    }else {
	    		// 插入内容
	    		return connection.query("insert into VuePlatom.resouce (id,title,content,type,date,auther) values('"+sign+"','"+title+"','"+content+"','"+type+"','"+time+"','"+result[0].id+"')", function(err, result) {
			    // 过滤提炼出数组
			    if (err) {
			    		throw err;
			    		return res.status(200).json({"type":"error","data":"服务端报错！"});
			     }else {	
			     		//捕获异常 
			     		try {
			     			res.status(200).json({"type":"success","data":"新建成功！"});
			     		}
			     		catch (e) {
			     			console.log(e);
			     		}   		
			    }
			});
	    }
	});
})

// 目录列表查询
app.post('/api/directory', function(req, res){
	var pageNum = (req.body.current -1)*20;
	var current = req.body.current;
	var type = req.body.type == undefined ? "" : req.body.type;
	var search = req.body.searchname == undefined ? "" : req.body.searchname;
	var pageTotal = '';
	// 条件查询总数
	var str_ = "select * from VuePlatom.resouce where 1=1 ";
	if (type != "")  str_ += " and type='"+type+"'";
	if (search != "")  str_ += " and title like '%"+search+"%'";
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
	// 分页查询sql 字符串
	var str = "select * from VuePlatom.resouce where 1=1 ";
	if (type != "")  str += " and type='"+type+"'";
	if (search != "")  str += " and title like '%"+search+"%'";
	else str += " limit "+pageNum+",20";
	// 分页查询列表
	connection.query(str, function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"服务端报错！"});
	     }else {	
	     		//捕获异常 
	     		try {
	     			res.status(200).json({
	     				data:result,
	     				total:pageTotal,
	     				current:current
	     			});
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}   		
	    }
	});
})

// 通过目录id查询内容
app.post('/api/searchresouce', function(req, res){
	// 反显查询id
	var sign = req.body.id;
	// 通过用户id查询用户名
	connection.query("select title,type,auther,date,cast(content as char) as content from VuePlatom.resouce where id= '"+sign+"'", function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"服务端报错！"});
	     }else {	
	     		//捕获异常 
	     		try {
	     			res.status(200).json({data:result});
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}   		
	    }
	});
});


// 删除数据
app.post('/api/deleteresouce', function(req, res){
	// 反显查询id
	var sign = req.body.id;
	// 通过用户id查询用户名
	connection.query("delete from VuePlatom.resouce where id = '"+sign+"'", function(err, result) {
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"服务端报错！"});
	    }else {
	    		try {
	     			res.status(200).json({"type":"success","data":"删除成功！"});
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}   		
	    }
	});
});

// 管理列表编辑
app.post('/api/resouceUpdate', function(req, res){
	// MD5加密处理	
	var time = dataTime();
	// 前端入参
	var title = req.body.title;
	var type = req.body.type;
	var sign = req.body.id;
	var auther = req.body.autherId;	
	var content = req.body.content.replace(/[\\"']/g,'\\$&');
	// 通过用户id查询用户名
	connection.query("select * from VuePlatom.user where token = '"+auther+"'", function(err, result) {
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"服务端报错！"});
	    }else {
	    		// 通过文章id更新对应的文章
	    		return connection.query("UPDATE VuePlatom.resouce SET type='"+type+"',date='"+time+"',auther='"+result[0].id+"',title='"+title+"',id='"+sign+"',content='"+content+"' where id='"+sign+"'", function(err, result) {
			    // 过滤提炼出数组
			    if (err) {
			    		throw err;
			     }else {	
			     		//捕获异常 
			     		try {
			     			res.status(200).json({"type":"success","data":"更新成功！"});
			     		}
			     		catch (e) {
			     			console.log(e);
			     		}   		
			    }
			});
	    }
	});
});


// 通过用户id查询权限
app.post('/api/searchToken', function(req, res){

	var token = req.body.token;

	// 通过用户id查询用户名
	connection.query("select * from VuePlatom.user where token = '"+token+"'", function(err, result) {
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"服务端报错！"});
	    }else {
	    		// 通过用户id查询权限
	    		return res.status(200).json({"type":"error","data":result});
	    }
	});
});
module.exports = app;