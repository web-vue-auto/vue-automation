/**
*************************
 * auther：马群
 * QQ：2381930754
 * 资源列表相关API
 *************************
 **/
var http = require("http"),
	url = require("url"),
	express = require('express'),
	connection = require('../config.js'),
	cheerio = require("cheerio"),
	schedule = require('node-schedule'),
	iconv = require('iconv-lite'),
	app = express();

var rule = new schedule.RecurrenceRule();

rule.dayOfWeek = [0, new schedule.Range(1, 6)];

rule.hour = 23;

rule.minute = 0;
// resouce定时任务
function scheduleCronstyle(){
	// 每隔 30 分钟执行
    schedule.scheduleJob(rule, function(){
    		// 第一层循环页数
    		for (var i = 0; i < 100; i++) {
    			var url = 'http://www.cnblogs.com/mvc/AggSite/PostList.aspx/?CategoryId=106893&CategoryType=SiteCategory&ItemListActionName=PostList&PageIndex='+i+'&ParentCategoryId=108703&TotalPostCount=4000';
    			getResouce(url,function (data) {
    				// 循环插入数据数据
    				data.forEach(function (item) {
    					// 遍历插入
    					connection.query("INSERT INTO "+connection.dev.call+".resouce (title, url) VALUES ('"+item.title+"', '"+item.url+"')", function(err, result) {
    						if (err) {
    							throw err;
    							return;
    						}
					})
    				})
			});
    		}
    });
}


scheduleCronstyle();



// 获取资源列表
app.post('/api/resouceNewList', function(req, res){
	var page = req.body.current;
	var pageNum = (req.body.current -1)*20;
	var pageTotal = '';
	connection.query("select * from "+connection.dev.call+".resouce", function(err, result) {
		if (err) {
			throw err;
		}else {
			 pageTotal = result.length;
			 connection.query("select * from "+connection.dev.call+".resouce limit "+pageNum+",20", function(err, result) {
			 	if (err) {
			 		throw err;
			 	}else{
		 			return res.status(200).json({
						data:result,
						total:pageTotal,
						current:page
					});
			 	}
			 })
		}
	})
})

// 爬虫解析数组
function getResouce (url,cb) {
	http.get(url, function(sres) {
		var chunks = [];
		sres.on('data', function(chunk) {
			chunks.push(chunk);
		});
		// chunks里面存储着网页的 html 内容，将它转码传给 cheerio.load 之后
		// 就可以得到一个实现了 jQuery 接口的变量，将它命名为 `$`
		// 剩下就都是 jQuery 的内容了
		sres.on('end', function() {
			var resouce = [];
			//由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
			//依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
			var html = iconv.decode(Buffer.concat(chunks), 'utf-8');
			var $ = cheerio.load(html, {decodeEntities: false});
			$('.post_item h3 a').each(function (idx, element) {
				var $element = $(element);
				resouce.push({
					title: $element.text(),
					url: $element.attr('href'),
					time:$element.parents().find('.post_item_foot').text()
				})
			})
			return cb(resouce)
		});
	});
}


module.exports = app;
