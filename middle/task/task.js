/**
*************************
 * auther：马群
 * QQ：2381930754
 * 任务列表相关API
 *************************
 **/
var express = require('express');
var connection = require('../config.js');
var async = require('async');
var dataTime = require('../commen/date.js');
// MD5 加密组件
var crypto = require('crypto');
var app = express();
function md5(data) {
	return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
}


// 当前用户列表查询
app.post('/api/userTask', function(req, res){
	var auther = req.body.auther;
	connection.query("select title,date from VuePlatom.tasklist where recipient = '"+auther+"'", function(err, result) {
		if (err) throw err;
		else  res.status(200).json({"type":"success","data":result});
	})
})


// 点击接受任务
app.post('/api/respectTask', function(req, res){
	var id = req.body.id;
	var auther = req.body.auther;
	connection.query("UPDATE VuePlatom.tasklist SET recipient='"+auther+"' WHERE id='"+id+"'", function(err, result) {
		if (err) throw err;
		else  res.status(200).json({"type":"success","data":"成功接受任务！"});
	})
})

// 删除任务
app.post('/api/deleteTaskList', function(req, res){
	var id = req.body.id;
	connection.query("DELETE FROM VuePlatom.tasklist WHERE id='"+id+"'", function(err, result) {
		if (err) throw err;
		else  res.status(200).json({"type":"success","data":"删除成功！"});
	})
})

// 反显任务
app.post('/api/reloadTaskList', function(req, res){
	var id = req.body.id;
	connection.query("SELECT date,auther,title,system,weight,id,recipient,price,cast(content as char) as content FROM VuePlatom.tasklist where id='"+id+"'", function(err, result) {
		if (err) throw err;
		else  res.status(200).json({"type":"success","data":result[0]});
	})
})

// 编辑任务
app.post('/api/updateTaskList', function(req, res){
	var id = req.body.id;
	var auther = req.body.auther;
	var title = req.body.title;
	var time = dataTime();
	var system = req.body.project;
	var weight = req.body.weight;
	var content = req.body.content;
	var price = req.body.price;
	connection.query("UPDATE VuePlatom.tasklist SET price='"+price+"',auther='"+auther+"',date='"+time+"',weight='"+weight+"',system='"+system+"',title='"+title+"',content='"+content+"' where id='"+id+"'", function(err, result) {
		if (err) throw err;
		else  res.status(200).json({"type":"success","data":"编辑成功！"});
	})
})

// 发布任务
app.post('/api/addTaskList', function(req, res){
	var sign = Date.parse(new Date());
	var auther = req.body.auther;
	var title = req.body.title;
	var time = dataTime();
	var system = req.body.project;
	var weight = req.body.weight;
	var content = req.body.content;
	var price = req.body.price;
	connection.query("INSERT INTO VuePlatom.tasklist (date, auther,title,system,weight,id,price,content) VALUES ('"+time+"','"+auther+"','"+title+"','"+system+"','"+weight+"','"+sign+"','"+price+"','"+content+"');", function(err, result) {
		if (err) throw err;
		else  res.status(200).json({"type":"success","data":"添加成功"});
	})
})

// 发布任务列表
app.post('/api/TaskList', function(req, res){
	var pageNum = (req.body.current -1)*10;
	var current = req.body.current;
	var pageTotal = '';
	connection.query("select * from VuePlatom.tasklist", function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"加载失败！"});
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
	connection.query("SELECT date,price,auther,title,system,weight,id,recipient,price ,cast(content as char) as content from VuePlatom.tasklist order by Date desc limit "+pageNum+",10", function(err, result) {
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


// 获取投票内容列表
app.post('/api/getProjectListNum', function(req, res){
	connection.query("select typenum from VuePlatom.activityList", function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"加载失败！"});
	     }else {	
	     		//捕获异常 
	     		try {
	     			return res.status(200).json(result[0]);
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}   		
	    }
	});
})

// 获取投票内容列表
app.post('/api/getProjectList', function(req, res){
	connection.query("select id,name from VuePlatom.activityList", function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	    		return res.status(200).json({"type":"error","data":"加载失败！"});
	     }else {	
	     		//捕获异常 
	     		try {
	     			return res.status(200).json(result);
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}   		
	    }
	});
})

// 投票保存
app.post('/api/getProjectSave', function(req, res){
	var token = req.body.token;
	var ids = req.body.id;
	// 获取当前用户
	connection.query("select id,token from VuePlatom.user where token='"+token+"'", function(err, result) {
	    // 过滤提炼出数组
	    if (err) {
	    		throw err;
	     }else {	
	     		//捕获异常 
	     		try {
	     			getNext(result[0].id);
	     		}
	     		catch (e) {
	     			console.log(e);
	     		}   		
	    }
	});
	// 获取用户下一步的操作
	function getNext (name) {
		if (ids) {
			ids.split(",").forEach(function (item){
				connection.query("select count,cast(auther as char) as auther from VuePlatom.activityList where id='"+item+"'", function(err, result) {
					var str="";
					var num = result[0].count + 1;
					if (result[0].auther) {
						str = result[0].auther + "," + name;
					}else{
						str = name;
					}
					// 更新值
					connection.query("update VuePlatom.activityList set auther='"+str+"',count="+num+" where id='"+item+"'", function(err, result) {
						if (err) throw err;
					})
				})
			}) 
			return res.status(200).json({"type":"success","data":"保存成功！"});
		}else{
			return res.status(200).json({"type":"error","data":"请选择后保存！"});
		}
	}
})


// 投票结果
app.post('/api/getCount', function(req, res){
	connection.query("SELECT id,name,count,title FROM VuePlatom.activityList", function(err, result) {
		if (err) {
			throw err;
		}else{
			return res.status(200).json(result);
		}
	})
})

// 投票重复校验
app.post('/api/getCountCheck', function(req, res){
	var token = req.body.token;
	connection.query("SELECT id FROM VuePlatom.user where token='"+token+"'", function(err, result) {
		if (err) {
			throw err;
		}else{
			var name = result[0].id;
			checkName(name);
		}
	})
	// check name
	function checkName (name) {
		
		var type = "";
		connection.query("SELECT cast(auther as char) as auther FROM VuePlatom.activityList", function(err, result) {
			if (err) {
				throw err;
			}else{

				result.forEach(function(item){
					// 初始化字段可能为null
					if (item.auther ==  null) {
						item.auther = "";
					}
					// }else 
					if (item.auther.includes(name)) {
						// 说明投票了
						return type += 2;
					}else{
						// 未投票
						return type += 1;
					}
				})
				// 反显			
				if (type.includes(2)) return res.status(200).json({"type":"error","data":"用户已提交投票！"});
				else return res.status(200).json({"type":"success","data":"用户未提交投票！"});
			}
		})
	}
})

// 发起投票
app.post('/api/goVote', function(req, res){
	var title = req.body.title;
	var content = req.body.content;
	var typenum = req.body.num;
	async.series({
		one: function (cb) {
			connection.query("Delete from VuePlatom.activityList where 1=1", function(err, result) {
				if (err) {
					throw err;
				}else{
					cb(null)
				}
			});
		},
		two: function (cb) {
			content.split(",").forEach(function (item,index) {
				var sign = +Date.parse(new Date()) + index;
				connection.query("INSERT INTO VuePlatom.activityList (id, name,count,title,typenum) VALUES ('"+sign+"', '"+item+"',0,'"+title+"','"+typenum+"')", function(err, result) {
					if (err) {
						throw err;
					}
				})
			})
			// 循环cb会导致callback异常报错
			cb(null)
		}
	},function (err,result) {
		if (err) {
			return err;
		}else{
			res.status(200).json({"type":"success","data":"添加成功！"});
		}
	})		
})

// 初始化投票数据
app.post('/api/getListDate', function(req, res){
	connection.query("SELECT name,title FROM VuePlatom.activityList", function(err, result) {
		if (err) {
			throw err;
		}else{
			return res.status(200).json({"type":"success","data":result});
		}
	})
})

// 重置投票数据
app.post('/api/getListDateDelete', function(req, res){
	connection.query("Delete from VuePlatom.activityList where 1=1", function(err, result) {
		if (err) {
			throw err;
		}else{
			return res.status(200).json({"type":"success","data":"数据已重置！"});
		}
	});
})


module.exports = app;