/**
 * auther：马群
 * QQ：2381930754
 * 用户注册相关API
 */

/* 用户注册 */
var connection = require('../config.js');
var express = require('express');
// MD5 加密组件
var crypto = require('crypto');
var app = express();
function md5(data) {
	return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
}


// 检验账号是否存在
app.post('/api/checkIdCard', function(req, res){
	var name = req.body.name;
	connection.query("select id from VuePlatom.user", function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	     }else {	
	     		//捕获异常 
	     		try {
	     			var bol = result.some(function(item) {return item.id === name});
		    		// 开始校验
			     if (bol) {
			    		res.status(200).json({"type":"false","data":"用户名存在！"});
			     }else{
			    		res.status(200).json({"type":"true","data":"用户名未定义！"});
			     }
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}   		
	    }
	});
});

// 新增用户名
app.post('/api/addUserIdCard', function(req, res){
	var name = req.body.name.toString();
	var password = req.body.password.toString();
	// MD5加密处理
	var sign = md5(name);
	try {
		connection.query("insert into VuePlatom.user (id,password,token) values('"+name+"','"+password+"','"+sign+"')", function(err, result) {
		    if (err) {
		    	throw err;
		    	return res.status(200).json({"type":"true","data":"创建失败！"});
		    }else {
		    	return res.status(200).json({"type":"success","data":"创建成功！","token":sign});
		    }
		});
	}
	catch (e) {
		console.log(e);
	}
});

// 用户登录
app.post('/api/UserLogin', function(req, res){
	var name = req.body.name;
	var password = req.body.password;
	var token = "";
     connection.query("select * from VuePlatom.user", function(err, result) {
	    if (err) {
	    		throw err;
	    }else {
	    		try {
	    			// 待修改
		    		var bol = result.some(function(item) {return item.id === name});
		    		if (bol) {
		    			connection.query("select id,password,token from VuePlatom.user where id='"+name+"'", function(err, resp) {
		    				if (err) {
		    					throw err;
		    				}else{
		    					try{
		    						if(password == resp[0].password){
						    			return res.status(200).json({"type":"success","data":"登录成功！","token":resp[0].token});
		    						}else{
		    							return res.status(200).json({"type":"error","data":"登录失败！"});
		    						}
		    					}
		    					catch(e) {
		    						console.log(e);
		    					}
		    				}
		    			})
		    		}
	    		}
	    		catch (e) {
	    			console.log(e);
	    		}

	    }
	});
});


// 获取用户个人信息
app.post('/api/getUserInfomation', function(req, res){
	var token = req.body.token;
	connection.query("select id,imgUrl,email,local_id from VuePlatom.user where token='"+token+"'", function(err, result) {
		if (err) {
			throw err;
		}else{
			return res.status(200).json({"type":"success","data":result});
		}
	})
})


// 修改密码校验
app.post('/api/getUserChecknum', function(req, res){
	var password = req.body.password;
	var token = req.body.token;
	// 域账号
	var mlocal = req.body.mlocal;
	// email
	var email = req.body.email;
	var newPassword = req.body.newPassword;
	connection.query("select id,password from VuePlatom.user where token='"+token+"'", function(err, result) {
		if (err) {
			throw err;
		}else{
			if (password == result[0].password) {
				connection.query("UPDATE VuePlatom.user SET email='"+email+"',local_id='"+mlocal+"',password='"+newPassword+"' WHERE token='"+token+"'", function(err, result) {
					return res.status(200).json({"type":"success","data":"个人信息修改成功！"});
				})
			}else{
				return res.status(200).json({"type":"error","data":"密码错误！"});
			}
		}
	})
})
module.exports = app;