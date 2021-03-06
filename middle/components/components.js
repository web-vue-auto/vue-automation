/**
 *************************
 * auther：马群
 * QQ：2381930754
 * components相关API
 *************************
 **/
var http = require("http"),
    url = require("url"),
    path = require("path"),
    express = require('express'),
    connection = require('../config.js'),
    config = require('./content/config.js'),
    template = require('./content/template.js'),
    fs = require("fs"),
    dataTime = require('../commen/date.js'),
    spawn = require('child_process').exec;
app = express();

// 截取方法
const SUB = (str, content, start, end, start2, end2, bol) => {
    var a = str.substring(start, end);
    var b = str.substring(start2, end2);
    if (bol) {
        return `${a},${content}${b} `;
    } else {
        return `${a}${content}${b} `;
    }
};
// 数据解构字符串
const arrFix = (arr) => {
    let str = "";
    arr.map((item) => {
        str += item;
    });
    return str;
};
const writeFileload = (objname, name) => {

    // 创建文件   process(buffer)
    fs.open(`/user/maqun/Desktop/${objname}/src/components/${name}.vue`, "w+", (err, fd) => {
        if (err !== null) {
            console.error(err);
            return;
        }
        var buf = new Buffer(template.data());
        fs.write(fd, buf, 0, buf.length, 0);
    });

    // 写入路由
    fs.readFile(`/user/maqun/Desktop/${objname}/src/routes.js`, (err, buffer) => {
        var str = buffer.toString();
        var a = `import ${name} from 'components/${name}';`;
        var b = `{
                path: '/${name}',
                component: ${name}
            }`;
        endStr = SUB(str, b, 0, str.length - 3, str.length - 3, str.length, true);
        endStr = SUB(endStr, a, 0, 0, 0, endStr.length, false);

        //写入路由信息
        fs.writeFile(`/user/maqun/Desktop/${objname}/src/routes.js`, new Buffer(endStr), { flag: 'r+', encoding: 'utf8' }, (err, data) => {
            if (err) throw err;
        });
    });

};
// MD5 加密组件
var crypto = require('crypto');
// MD5编码
function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
}



// 拷贝文件接口
app.post('/api/copyFile', function(req, res) {
    // 执行命令
    var ip = req.body.ip;
    var ssd = req.body.ssd;
    var name = req.body.name;
    var objname = req.body.objname;
    var localValue = req.body.localValue;
    var root = req.body.root;
    var sys = req.body.sys;
    var endStr = "";
    // // 执行命令加载依赖
    spawn(`cd /user/maqun/Desktop && cp -r trunk ${objname} && cd /user/maqun/Desktop/${objname}`, function(error, stdout, stderr) {
        if (error == null) write();
    });
    // 写入文件   process(buffer)
    var write = () => {
        // 写入配置
        fs.writeFile(`/user/maqun/Desktop/${objname}/config/index.js`, new Buffer(config.process(ip, ssd, root)), (err, data) => {
            if (err) {
                throw err
            } else {
                // 写入文件
                writeFileload(objname, name);
                return res.status(200).json({ "type": true, "data": `项目创建成功，启动端口号为: ${ssd}` });
            }
        });
    };
    // end
});

//  preview 项目
app.post('/api/gopreview', function(req, res) {
    var objname = req.body.objname;
    // var objname = "chonggou";
    spawn(`cd /user/maqun/Desktop/${objname} && npm run dev`);
    res.status(200).json({ "type": true, "data": "启动成功！" });
})


// 新增业务系统
app.post('/api/newSystem', function(req, res) {
    var name = req.body.name;
    var person = req.body.person;
    var sign = md5(name);
    connection.query("select id from " + connection.dev.call + ".comp_systerm where id = '" + sign + "'", function(err, result) {
        if (result.length > 0) {
            // 数据存在
            return res.status(200).json({ "type": false, "data": "创建失败！系统名称重复" });
        } else {
            connection.query("INSERT INTO " + connection.dev.call + ".comp_systerm (id, name, last_person) VALUES ('" + sign + "', '" + name + "','" + person + "')", function(err, result) {
                if (err) throw err;
                else res.status(200).json({ "type": true, "data": "系统创建成功！" });
            })
        }
    })
})

// 查询业务系统列表
app.post('/api/getnewSystem', function(req, res) {
    connection.query("select * from " + connection.dev.call + ".comp_systerm", function(err, result) {
        if (err) throw err;
        else res.status(200).json({ "type": true, "data": result });
    })
})

// 删除业务系统
app.post('/api/delnewSystem', function(req, res) {
    var id = req.body.id;
    connection.query("DELETE FROM " + connection.dev.call + ".comp_systerm WHERE id='" + id + "'", function(err, result) {
        if (err) throw err;
        else res.status(200).json({ "type": true, "data": "系统删除成功！" });
    })
})

// 系统添加区块
app.post('/api/addblock', function(req, res) {
    var name = req.body.name;
    var html = req.body.html_code;
    var css = req.body.css_code;
    var title = req.body.title;
    var id = req.body.id;
    var sign = Date.parse(new Date());
    var str = "UPDATE " + connection.dev.call + ".block SET title='" + title + "',html_code='" + html + "',css_code='" + css + "',name='" + name + "' WHERE id='" + id + "'";
    if (id == "") {
        str = "INSERT INTO " + connection.dev.call + ".block (id, name,html_code,css_code,title) VALUES ('" + sign + "', '" + name + "','" + html + "','" + css + "','" + title + "')";
    }
    connection.query(str, function(err, result) {
        if (err) throw err;
        else res.status(200).json({ "type": true, "data": "区块添加成功！" });
    })
})

// 系统区块查询
app.post('/api/searchblock', function(req, res) {
    var id = req.body.id;
    connection.query("SELECT id, name,cast(html_code as char) as html_code,cast(css_code as char) as css_code,title FROM " + connection.dev.call + ".block WHERE id = '" + id + "' ", function(err, result) {
        if (err) throw err;
        else res.status(200).json({ "type": true, "data": result });
    })
})

// 删除区块
app.post('/api/delblock', function(req, res) {
    var id = req.body.id;
    connection.query("DELETE FROM " + connection.dev.call + ".block WHERE id='" + id + "'", function(err, result) {
        if (err) throw err;
        else res.status(200).json({ "type": true, "data": "删除成功！" });
    })
})

// 区块下拉查询
app.post('/api/blockListDrop', function(req, res) {
    connection.query("select id,title from " + connection.dev.call + ".block", function(err, res0) {
        if (err) throw err;
        else return res.status(200).json({ "type": "success", "data": res0 });
    })
})

// 区块列表
app.post('/api/blockList', function(req, res) {
    var searchValue = req.body.search;
    var pageNum = (req.body.current - 1) * 10;
    var current = req.body.current
    var pageTotal = '';
    var str = "select id,name,title,cast(html_code as char) as html_code,cast(css_code as char) as css_code from " + connection.dev.call + ".block where title like '%" + searchValue + "%'";
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
                    "type": "error",
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


// 模块新增
app.post('/api/templateAdd', function(req, res) {
    var html = req.body.html.replace(/[\\"']/g, '\\$&');
    var title = req.body.title;
    var author = req.body.author;
    var html2 = req.body.html2;
    var sign = Date.parse(new Date());
    var str = "INSERT INTO " + connection.dev.call + ".template (id, title,template_code,html_code,author) VALUES ('" + sign + "', '" + title + "','" + html2 + "','" + html + "','" + author + "')";
    connection.query(str, function(err, result) {
        if (err) throw err;
        else return res.status(200).json({ "type": "success", "data": "模块更新成功！" })
    })
});

//模块列表下拉列表
app.post('/api/templateListDrop', function(req, res) {
    connection.query("select id, title,cast(template_code as char) as template_code,cast(html_code as char) as html_code,author from " + connection.dev.call + ".template", function(err, result) {
        if (err) {
            throw err;
            return res.status(200).json({ "type": "error", "data": "服务端报错！" });
        } else {
            return res.status(200).json({ "type": "success", "data": result });
        }
    });
});

//点击生成模板
app.post('/api/creatTemplate', function(req, res) {
    var sign = Date.parse(new Date());
    var name = req.body.name;
    var auther = req.body.author;
    var proname = req.body.proname;
    var sys = req.body.sysname;
    var template_code = arrFix(JSON.parse(req.body.template_code));
    var html_code = arrFix(JSON.parse(req.body.html_code));
    var time = dataTime();
    var path = `/user/maqun/Desktop/${proname}`;
    var str = "INSERT INTO " + connection.dev.call + ".template_list (id,name,auther,proname,sysname,template_code,html_code,date,path) VALUES ('" + sign + "', '" + name + "','" + auther + "','" + proname + "','" + sys + "','" + template_code + "','" + html_code + "','" + time + "','" + path + "')";
    // 增加数据库记录
    connection.query(str, function(err, result) {
        if (err) {
            throw err;
            return res.status(200).json({ "type": "error", "data": "服务端报错！" });
        } else {
            // writeFileload(proname, name);
            return res.status(200).json({ data: "系统添加成功！" });
        }
    });
    // 执行文件写入操作
    fs.open(`/user/maqun/Desktop/${proname}/src/components/${name}.vue`, 'w+', (err, data) => {
        var buf = new Buffer(template.data(template_code));
        fs.write(data, buf, 0, buf.length, 0);
    });
});

//
//
// // 模块详情
// app.post('/api/templateDetails', function(req, res){
//     var id = req.body.id;
//     connection.query("select id, title,cast(css_code as char) as css_code,cast(html_code as char) as html_code,author from "+connection.dev.call+".template where id = '"+id+"'", function(err, result) {
//         if (err) throw err;
//         else return res.status(200).json({"type":"success","data":result})
//     })
// })
//
//
// // 模块详情
// app.post('/api/templateDelete', function(req, res){
//     var id = req.body.id;
//     connection.query("DELETE FROM "+connection.dev.call+".template WHERE id='"+id+"'", function(err, result) {
//         if (err) throw err;
//         else return res.status(200).json({"type":"success","data":"删除成功！"})
//     })
// })
//


// 模块列表页查询
// app.post('/api/templateList', function(req, res){
//
//     var pageNum = (req.body.current -1)*9;
//     var current = req.body.current
//     var pageTotal = '';
//     connection.query("select * from "+connection.dev.call+".template", function(err, result) {
//         // 过滤提炼出数组
//         if (err) {
//                 throw err;
//                 return res.status(200).json({"type":"error","data":"服务端报错！"});
//          }else {
//                 //捕获异常
//                 try {
//                     pageTotal = result.length;
//                 }
//                 catch (e) {
//                     console.log(e);
//                 }
//         }
//     });
//
//     connection.query("select id, title,cast(css_code as char) as css_code,cast(html_code as char) as html_code,author from "+connection.dev.call+".template order by id desc limit "+pageNum+",9", function(err,   result) {
//         // 过滤提炼出数组
//         if (err) {
//                 throw err;
//                 return res.status(200).json({"type":"error","data":"服务端报错！"});
//          }else {
//                 //捕获异常
//                 try {
//                     res.status(200).json({
//                         data:result,
//                         total:pageTotal,
//                         current:current
//                     });
//                 }
//                 catch (e) {
//                     console.log(e);
//                 }
//         }
//     });
// });


// 模块条件查询
// app.post('/api/searchTemplateList', function(req, res){
//     var searchValue = req.body.search;
//     var pageNum = (req.body.current -1)*9;
//     var current = req.body.current
//     var pageTotal = '';
//     var str = "select id, title,cast(css_code as char) as css_code,cast(html_code as char) as html_code,author from "+connection.dev.call+".template where title like '%"+searchValue+"%' ";
//     connection.query(str, function(err, result) {
//         if (err) {
//                 throw err;
//                 return res.status(200).json({"type":"error","data":"服务端报错！"});
//          }else{
//                 pageTotal = result.length;
//                 str += "limit "+pageNum+",9";
//                 connection.query(str, function(err, res0) {
//                     if (err) throw err;
//                     else return res.status(200).json({"type":"success","data":{
//                         data:res0,
//                         total:pageTotal,
//                         current:current
//                     }});
//                 })
//          }
//     })
// })

module.exports = app;
