/**
 * auther：马群
 * QQ：2381930754
 */
var express = require('express');
// 文件上传插件
var multipart = require('connect-multiparty'); 
var fs = require('fs');
var multipartMiddleware = multipart();
var connection = require('../config.js');
var dataTime = require('../commen/date.js');
var app = express();

app.use(multipart({uploadDir:'../static/upload' }));
// 单图上传
app.post('/api/headUpload',multipartMiddleware, function(req, res, next){
	var token = req.body.token;
	connection.query("update VuePlatom.user set imgUrl='"+req.files.files.path+"',imgName='"+req.files.files.name+"' where token='"+req.body.token+"'", function(err, result) {
		if (err) throw err;
		else return res.status(200).json({"type":"success","data":{
			imageUrl:req.files.files.path
		}});
	})
});

// 资料上传
app.post('/api/fileUpload',multipartMiddleware, function(req, res, next){
	return res.status(200).json({"type":"success","data":{
		url:req.files.file.path,
		name:req.files.file.name,
		type:req.files.file.type
	}});
});

// 资料上传保存
app.post('/api/fileUploadSave',function(req, res, next){
	var title = req.body.title;
	var contArr = req.body.data;
	var auther = req.body.auther;
	var sign = Date.parse(new Date());
	var time = dataTime();
	connection.query("INSERT INTO VuePlatom.ManageList (Date,Auther,Title,id,content,type) VALUES ('"+time+"','"+auther+"','"+title+"','"+sign+"','"+contArr.url+"','"+contArr.type+"')", function(err, result) {
		if (err) {
			throw err;
		}else{
			return res.status(200).json({"type":"success","data":"添加成功！"})
		}
	})
});

// wangEdit 图片上传保存
app.post('/api/imgUpload',multipartMiddleware, function(req, res, next){
	if (req.files.wangEditorH5File == undefined) {
		return res.status(200).json({"type":"success","data":{
			url:req.files.wangEditorPasteFile.path,
			name:req.files.wangEditorPasteFile.name,
			type:req.files.wangEditorPasteFile.type
		}});
	}else{
		return res.status(200).json({"type":"success","data":{
			url:req.files.wangEditorH5File.path,
			name:req.files.wangEditorH5File.name,
			type:req.files.wangEditorH5File.type
		}});
	}
	
});

module.exports = app;
