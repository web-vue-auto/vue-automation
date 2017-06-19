/**
*************************
 * auther：马群
 * QQ：2381930754
 * 意见反馈相关api
 *************************
 **/
var express = require('express');
var connection = require('../config.js');
var email = require('../email/index.js');
var dataTime = require('../commen/date.js');

var app = express();

// 意见列表查询
app.post('/api/getOptionList', function(req, res){
	var pageNum = (req.body.current -1)*10;
	var current = req.body.current;
	var pageTotal = '';
	connection.query("select * from VuePlatom.option", function(err, result) {
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
	connection.query("select date,title,id,auther,status from VuePlatom.option order by date desc limit "+pageNum+",10", function(err, result) {
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

// 意见提交
app.post('/api/getOptionSave', function(req, res){
	var token = req.body.token;
	var title = req.body.title;
	var content = req.body.content;
	var time = dataTime();
	var sign = Date.parse(new Date());
	var user = "";
	connection.query("select * from VuePlatom.user where token='"+token+"'", function(err, result) {
		if (err) {
			throw err;
		}else {
			user = result[0].id;
			connection.query("INSERT INTO VuePlatom.option (date,id,title,content,auther) VALUES ('"+time+"', '"+sign+"','"+title+"','"+content+"','"+user+"')", function(err, result) {
				if (err) {
					throw err;
				}else{
					return res.status(200).json({"type":"success","data":"提交成功！"});
				}
			})
		}
	})
})

// 意见反显
app.post('/api/getOptionRe', function(req, res){
	var id = req.body.id;
	connection.query("select auther,title,cast(content as char) as content from VuePlatom.option where id='"+id+"'", function(err, result) {
		if (err) throw err;
		else return res.status(200).json({"type":"success","data":result[0]});
	})
})

// 反显反馈意见状态
app.post('/api/getOptionReStatus', function(req, res){
	var id = req.body.id;
	connection.query("select status from VuePlatom.option where id='"+id+"'", function(err, result) {
		if (err) throw err;
		else return res.status(200).json({"type":"success","data":result[0]});
	})
})

// 提交反馈意见状态
app.post('/api/getOptionReSave', function(req, res){
	var id = req.body.id;
	var status = req.body.status;
	var auther = req.body.auther;
	connection.query("UPDATE VuePlatom.option SET status='"+status+"' WHERE id='"+id+"'", function(err, result) {
		if (err) {
			throw err;
		}else {
			connection.query("select id,email from VuePlatom.user where id = '"+auther+"'",function (err,res_) {
				email.email("管理员处理了您在前端基础平台意见栏中提出的BUG,处理状态："+status+"",res_[0].email.toString());
				// 返回信息
				return res.status(200).json({"type":"success","data":"提交成功！"});
			})
		}
	})
})

module.exports = app;
