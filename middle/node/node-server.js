/**
*************************
 * auther：马群
 * QQ：2381930754
 * node列表相关API
 *************************
 **/
var http = require("http"),
	url = require("url"),
	express = require('express'),
	connection = require('../config.js'),
	schedule = require('node-schedule'),
	cheerio = require("cheerio"),
	iconv = require('iconv-lite'),
	app = express();

var rule = new schedule.RecurrenceRule();

rule.dayOfWeek = [0, new schedule.Range(1, 6)];

rule.hour = 23;

rule.minute = 0;
// node定时任务
function scheduleCronstyle(){
	// 每隔 30 分钟执行
    schedule.scheduleJob(rule, function(){
    		// 第一层循环页数
    		for (var i = 0; i < 100; i++) {
    			var url = 'http://cnodejs.org/?tab=all&page='+i+'';
    			getResouce(url,function (data) {
    				// 循环插入数据数据
    				data.forEach(function (item) {
    					// 遍历插入
    					connection.query("INSERT INTO VuePlatom.node (title, url,imgUrl) VALUES ('"+item.title+"', '"+item.url+"','"+item.imgUrl+"')", function(err, result) {
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
app.post('/api/nodeNewList', function(req, res){
	var page = req.body.current;
	var pageNum = (req.body.current -1)*20;
	var pageTotal = '';
	connection.query("select * from VuePlatom.node", function(err, result) {
		if (err) {
			throw err;
		}else {
			 pageTotal = result.length;
			 connection.query("select * from VuePlatom.node limit "+pageNum+",20", function(err, res_) {
			 	if (err) {
			 		throw err;
			 	}else{
		 			return res.status(200).json({
						data:res_,
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
			$('#topic_list .cell').each(function (idx, element) {      
				var $element = $(element);
				resouce.push({        
					imgUrl: $element.find('.user_avatar img').attr('src'),
					url: 'http://cnodejs.org'+$element.find('.topic_title_wrapper a').attr('href'),
					title:$element.find('.topic_title').text()
				})    
			})
			return cb(resouce)
		});
	});
}



 module.exports = app;