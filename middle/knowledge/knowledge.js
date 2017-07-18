/**
 *************************
 * auther：姚悦
 * 知识库API
 *************************
 **/
/* 用户注册 */
var connection = require('../config.js');
var express = require('express');
var dataTime = require('../commen/date.js');
var email = require('../email/index.js');
// MD5 加密组件
var crypto = require('crypto');
var app = express();

function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
}

// 管理条件查询
app.post('/api/searchKnowledgeList', function(req, res) {
    var searchValue = req.body.search;
    var pageNum = (req.body.current - 1) * 10;
    var current = req.body.current
    var pageTotal = '';
    var str = "select Date,Auther,type,Title,id,cast(content as char) as content from " + connection.dev.call + ".knowledgeList where Title like '%" + searchValue + "%' or Auther like '%" + searchValue + "%' ";
    connection.query(str, function(err, result) {
        if (err) {
            throw err;
            return res.status(200).json({ "type": "error", "data": "服务端报错！" });
        } else {
            pageTotal = result.length;
            str += "limit " + pageNum + ",10";
            connection.query(str, function(err, res0) {
                if (err) throw err;
                else return res.status(200).json({
                    "type": "success",
                    "data": {
                        data: res0,
                        total: pageTotal,
                        current: current
                    }
                });
            })
        }
    })
})


// 管理列表页查询
app.post('/api/knowledgeList', function(req, res) {

    var pageNum = (req.body.current - 1) * 10;
    var current = req.body.current
    var pageTotal = '';
    debugger;
    connection.query("select * from " + connection.dev.call + ".knowledgeList", function(err, result) {

        // 过滤提炼出数组
        if (err) {
            throw err;
            return res.status(200).json({ "type": "error", "data": "服务端报错！" });
        } else {
            //捕获异常
            try {
                pageTotal = result.length;
            } catch (e) {
                console.log(e);
            }
        }
    });

    connection.query("select Date,Auther,type,Title,id,cast(content as char) as content from " + connection.dev.call + ".knowledgeList order by Date desc limit " + pageNum + ",10", function(err, result) {
        // 过滤提炼出数组
        if (err) {
            throw err;
            return res.status(200).json({ "type": "error", "data": "服务端报错！" });
        } else {
            //捕获异常
            try {
                res.status(200).json({
                    data: result,
                    total: pageTotal,
                    current: current
                });
            } catch (e) {
                console.log(e);
            }
        }
    });
});

// 管理列表新增
app.post('/api/knowledgeAdd', function(req, res) {
    // MD5加密处理
    var time = dataTime();
    // 前端入参
    var title = req.body.title;
    // 以时间戳作为唯一标识
    var sign = Date.parse(new Date());

    var auther = req.body.autherId;
    var content = req.body.content.replace(/[\\"']/g, '\\$&');

    // 通过用户id查询用户名
    connection.query("select * from " + connection.dev.call + ".user where token = '" + auther + "'", function(err, result) {
        if (err) {
            throw err;
            return res.status(200).json({ "type": "error", "data": "服务端报错！" });
        } else {
            // 插入内容
            return connection.query("insert into " + connection.dev.call + ".knowledgeList (Date,auther,title,id,content) values('" + time + "','" + result[0].id + "','" + title + "','" + sign + "','" + content + "')", function(err, result) {
                // 过滤提炼出数组
                if (err) {
                    throw err;
                    return res.status(200).json({ "type": "error", "data": "服务端报错！" });
                } else {
                    //捕获异常
                    try {
                        var str = [];
                        // 群发邮件
                        connection.query("select id,email from " + connection.dev.call + ".user", function(err, res_) {
                            res_.forEach(function(item, index) {
                                if (!!item.email) {
                                    str.push(item.email);
                                } else {
                                    return;
                                }
                            });
                            email.email("您的好友在Knowledge中发表了新的分享资料,请登录前端基础平台查看详情☺☺☺", str.join());
                            // 返回信息
                            return res.status(200).json({ "type": "success", "data": "新建成功！" });
                        })
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        }
    });
});

// 管理列表编辑
app.post('/api/knowledgeUpdate', function(req, res) {
    // MD5加密处理
    var time = dataTime();
    // 前端入参
    var title = req.body.title;
    var sign = req.body.id;
    var auther = req.body.autherId;
    var content = req.body.content.replace(/[\\"']/g, '\\$&');

    // 通过用户id查询用户名
    connection.query("select * from " + connection.dev.call + ".user where token = '" + auther + "'", function(err, result) {
        if (err) {
            throw err;
            return res.status(200).json({ "type": "error", "data": "服务端报错！" });
        } else {
            // 通过文章id更新对应的文章
            return connection.query("UPDATE " + connection.dev.call + ".knowledgeList SET date='" + time + "',Auther='" + result[0].id + "',title='" + title + "',id='" + sign + "',content='" + content + "' where id='" + sign + "'", function(err, result) {
                // 过滤提炼出数组
                if (err) {
                    throw err;
                    return res.status(200).json({ "type": "error", "data": "服务端报错！" });
                } else {
                    //捕获异常
                    try {
                        res.status(200).json({ "type": "success", "data": "更新成功！" });
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        }
    });
});

// 详情页反显
app.post('/api/knowledgeReplay', function(req, res) {
    // 反显查询id
    var sign = req.body.id;
    // 通过用户id查询用户名
    connection.query("select Date,Auther,Title,id,cast(content as char) as content from " + connection.dev.call + ".knowledgeList where id = '" + sign + "'", function(err, result) {
        if (err) {
            throw err;
            return res.status(200).json({ "type": "error", "data": "服务端报错！" });
        } else {
            try {
                res.status(200).json(result);
            } catch (e) {
                console.log(e);
            }
        }
    });
});

// 删除数据
app.post('/api/knowledgeDelete', function(req, res) {
    // 反显查询id
    var sign = req.body.id;
    // 通过用户id查询用户名
    connection.query("delete from " + connection.dev.call + ".knowledgeList where id = '" + sign + "'", function(err, result) {
        if (err) {
            throw err;
            return res.status(200).json({ "type": "error", "data": "服务端报错！" });
        } else {
            try {
                res.status(200).json({ "type": "success", "data": "删除成功！" });
            } catch (e) {
                console.log(e);
            }
        }
    });
});
module.exports = app;
