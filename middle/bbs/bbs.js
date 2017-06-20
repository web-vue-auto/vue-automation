/**
*************************
 * auther：马群
 * QQ：2381930754
 * BBS相关API
 *************************
 **/
 'use strict';
var express = require('express');
var connection = require('../config.js');
var dataTime = require('../commen/date.js');
var email = require('../email/index.js');
var async = require('async');
var app = express();

// 详情页列表
app.post('/api/getBbsDetialsList', function(req, res){
	var id = req.body.id;
	var name = req.body.name;
	// 流程控制方法（瀑布流）
	async.waterfall([
		function zero(cb) {
			// 获取当前人数
			connection.query("SELECT auther FROM "+connection.dev.call+".bbs_details WHERE details_id = '"+id+"'", function(err, result) {
				if (err) {
					throw err;
				}else{
					cb(null,result)
				}
			});
		},
		function one(data,cb) {
			// 循环查表内容
			let arr = [];
			data.forEach(function (item,index) {
				arr.push(new Promise((resolve)=>{
					connection.query("SELECT * FROM "+connection.dev.call+".bbs_creat WHERE auther = '"+item.auther+"'", function(err, result) {
						if (err) {
							throw err;
						}else{
							resolve({
								name:item.auther,
								count:result.length
							});
						}
					})
				}));
			})
			// 收集帖子数
			Promise.all(arr).then(function (result) {
				//console.log(result)
			    cb(null,result)
			});
		},
		function two(data,cb) {
			// 循环cb会导致callback异常报错
			let arr = [];
			let resObj = data;
			data.forEach(function (item,index) {
				arr.push(new Promise((resolve)=>{
					connection.query("SELECT imgUrl FROM "+connection.dev.call+".user WHERE id = '"+item.name+"'", function(err, result) {
						if (err) {
							throw err;
						}else{
							resolve(result[0]);
						}
					})
				}));
			})
			// 收集头像
			Promise.all(arr).then(function (result) {
				resObj.forEach((item,index)=>{
					item['imgUrl'] = result[index].imgUrl;
				})
			    cb(null,resObj)
			});
		}
	],function (err,result) {
		if (err) {
			return err;
		}else{
			// 获取最终对象
			getEnd(id,result,name)
		}
	})
	function getEnd (id,flag,flagName) {
		connection.query("SELECT date,cast(content as char) as content,title,autherType,auther FROM "+connection.dev.call+".bbs_details WHERE details_id = '"+id+"'", function(err, result) {
			if (err) {
				throw err;
			}else{
				var title_ = "";
				result.forEach(function (item){
					if(item.auther == flagName){
						// 判断楼主
						item.autherType = 0;
					}
					if (item.title != null && item.title != "") {
						title_ = item.title;
					}
				})
				res.status(200).json({"type":true,"data":result,"title":title_,"total":result.length,"row":flag});
			}
		})
	}
})

// 详情页发表帖子
app.post('/api/addBbsDetials', function(req, res){
	var content = req.body.content;
	var auther = req.body.auther;
	var localauther = req.body.localauther;
	var detailsId = req.body.id;
	var sign = Date.parse(new Date()) / 1000;
	var type = 1;
	// 区分参与者还是楼主的唯一标识
	if (localauther == auther) {
		type = 0;
	}
	// 判断为空
	if (content == "<p><br></p>") {
		return res.status(200).json({"type":false,"data":"请填写帖子内容！"});
	}
	// 更新回复数
	connection.query("UPDATE "+connection.dev.call+".bbs_creat SET reply_count = reply_count+1 WHERE id='"+detailsId+"'", function(err, result) {
		if (err) throw err;
	});
	connection.query("INSERT INTO "+connection.dev.call+".bbs_details (details_id, date,content,autherType,auther) VALUES ('"+detailsId+"', '"+sign+"','"+content+"','"+type+"','"+auther+"')", function(err, result) {
		if (err) {
			throw err;
		}else{
			// 发送邮件提醒
			connection.query("select id,email from "+connection.dev.call+".user where id = '"+localauther+"'",function (err,res_) {
				email.email("您的好友在BBS中更新了帖子,请登录前端基础平台查看详情☺☺☺",res_[0].email.toString());
				// 返回信息
				res.status(200).json({"type":true,"data":"提交成功！"});
			})
		}
	})
})


// 话题模糊查询
app.post('/api/getListResult', function(req, res){
	var title = req.body.title;
	var pageNum = (req.body.current -1)*10;
	var current = req.body.current
	var pageTotal = '';
	var str = "select title,date,reply_count,thumb_up,auther from "+connection.dev.call+".bbs_creat where title like '%"+title+"%'";
	connection.query(str, function(err, result) {
		if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"服务端报错！"});
	     }else{
	     		pageTotal = result.length;
	     		str += "limit "+pageNum+",10";
	     		connection.query(str, function(err, res0) {
	     			if (err) throw err;
	     			else return res.status(200).json({"type":"error","data":{
	     				data:res0,
	     				total:pageTotal,
	     				current:current
	     			}});
	     		})
	     }
	})
})


// 最热话题
app.post('/api/getTopList', function(req, res){
	connection.query("SELECT title,thumb_up FROM "+connection.dev.call+".bbs_creat order by thumb_up desc limit 5", function(err, result) {
		if (err)  throw err;
		return res.status(200).json({"type":false,"data":result});
	})
})

// 收藏功能
app.post('/api/addBbsArticleLove', function(req, res){
	var id = req.body.id;
	var status_ = req.body.status;
	var token = req.body.token;

	if (status_) {
		connection.query("UPDATE "+connection.dev.call+".bbs_creat SET thumb_up = thumb_up + 1, restore = CONCAT('"+token+"',restore) WHERE id='"+id+"'", function(err, result) {
			if (err) {
				throw err
			}else {
				// 点击收藏功能关联表添加
				return res.status(200).json({"type":false,"data":result[0]});
			}
		})
	}else{
		connection.query("UPDATE "+connection.dev.call+".bbs_creat SET thumb_up = thumb_up - 1, restore = replace(restore,'"+token+"','') WHERE id='"+id+"'", function(err, result) {
			if (err) {
				throw err;
			}else{
				// 点击收藏功能关联表删除
				return res.status(200).json({"type":false,"data":result[0]});
			}
		})
	}
})

// 发帖
app.post('/api/addBbsArticle', function(req, res){
	var sign = Date.parse(new Date());
	var title = req.body.title;
	var content = req.body.content.replace(/[\\"']/g,'\\$&');
	var auther = req.body.auther;
	var time = dataTime();
	var dataTimes = sign / 1000;
	if (content == "<p><br></p>") {
		return res.status(200).json({"type":false,"data":"请填写帖子内容！"});
	}
	connection.query("INSERT INTO "+connection.dev.call+".bbs_creat (id, title, content,date,auther,restore,reply_count) VALUES ('"+sign+"', '"+title+"', '"+content+"', '"+time+"','"+auther+"',0,1)", function(err, result) {
		if (err) {
			throw err;
		}else{
			var str = [];
			// 群发邮件
			connection.query("select id,email from "+connection.dev.call+".user",function (err,res_) {
				res_.forEach( function(item, index) {
					if (!!item.email) {
						str.push(item.email);
					}else{
						return;
					}
				});
				email.email("您的好友在BBS中发表了帖子,请登录前端基础平台查看详情☺☺☺",str.join());
				// 返回信息
				return res.status(200).json({"type":true,"data":"发表成功！"});
			})
		}
	});
	// 插入详情表信息
	connection.query("INSERT INTO "+connection.dev.call+".bbs_details (details_id, date, title,content,auther,autherType) VALUES ('"+sign+"', '"+dataTimes+"', '"+title+"', '"+content+"','"+auther+"',0)", function(err, result) {
		if (err) throw err;
	});
})

// 初始化列表
app.post('/api/BbsArticleList', function(req, res){
	var pageNum = (req.body.current -1)*10;
	var current = req.body.current
	var pageTotal = '';
	var token = req.body.token;
	connection.query("SELECT * FROM "+connection.dev.call+".bbs_creat", function(err, result) {
		if (err) {
			throw err;
		}else{
			return pageTotal = result.length;
		}
	})
	connection.query("SELECT id,title,date,reply_count,thumb_up,cast(content as char) as content,cast(restore as char) as restore,auther FROM "+connection.dev.call+".bbs_creat order by Date desc limit "+pageNum+",10", function(err, result) {
		if (err) {
			throw err;
		}else{
			// 判断当前人是否点赞过
			result.forEach(function (item) {
				if (item.restore == null || item.restore == "") {
					item.restore = false;
				}else if(item.restore.includes(token)){
					item.restore = true;
				}else{
					item.restore = false;
				}
			})
			return res.status(200).json({
     				data:result,
     				total:pageTotal,
     				current:current
     			});
		}
	});
})


module.exports = app;
