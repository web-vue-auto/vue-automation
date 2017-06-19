const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const ejs = require('ejs');
const reload = require('reload');
const LAYOUTOBJ = {};
const SWAPITEM = (arr, index1, index2) => {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
};
// 数组删除
const remove = (arr,val) => {
  var index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};
// 请求头获取处理
app.use(bodyParser.urlencoded({ extended: false }));
//挂载静态资源处理中间件
app.use(express.static(path.join(__dirname, "../")));

//设置模板视图的目录
app.set("views", "../");

//设置是否启用视图编译缓存，启用将加快服务器执行效率
app.set("view cache", true);

//设置模板引擎的格式即运用何种模板引擎
app.set("view engine", "ejs");

//设置路由
app.get("/", (req, res) => {
    let userId = 'layout_one';
    // // 不同用户登录
    if (!LAYOUTOBJ.hasOwnProperty(userId)) {
        LAYOUTOBJ[userId] = [];
    }
    res.render("layout_one", {
        html: LAYOUTOBJ[userId]
    });
});


app.get("/layout_two", (req, res) => {
    let id = req.params.id == undefined ? 'layout_two' : id;
    // // 不同用户登录
    if (!LAYOUTOBJ.hasOwnProperty(id)) {
        LAYOUTOBJ[id] = ["demo1"];
    }
    // layout_two  === userId
    res.render('layout_two', {
        layout_two_left: LAYOUTOBJ[id],
        layout_two_right: ["demo2"]
    });
});


// 添加调用数据
app.post("/givehtml", (req, res) => {
    let html = req.body.html;
    let userId = req.body.id;

    // 区分同一用户不同的布局
    if (!LAYOUTOBJ.hasOwnProperty(userId)) {
        LAYOUTOBJ[userId] = [];
    }
    LAYOUTOBJ[userId].push(html);
    // 前端返回值
    return res.status(200).json({"type":true,"data":"创建成功！"});
});

// 位移改变
app.post("/change", (req, res) => {
    let userId = req.body.id;
    let num = req.body.num;
    let status = req.body.status;
    // 修复数组中值的顺序
    if (status == "up") {
      SWAPITEM(LAYOUTOBJ[userId],num,num-1);
    }else if (status == "down") {
      // 防止负数溢出
      if (num-1 < 0) {
          num = 1;
      }
      SWAPITEM(LAYOUTOBJ[userId],num-1,num);
    }
    ejs.render("/",{
        html: LAYOUTOBJ[userId]
    });
    return res.status(200).json({"type":true,"data":"生成页面！"});
});

app.post("/delete", (req, res) => {
    let userId = req.body.id;
    let num = req.body.num;
    // 删除指定元素
    remove(LAYOUTOBJ[userId],LAYOUTOBJ[userId][num]);
    ejs.render("/",{
        html: LAYOUTOBJ[userId]
    });
    return res.status(200).json({"type":true,"data":"生成页面！"});
});


// 释放数据空间
app.post("/release", (req, res) => {
    let userId = req.body.id;
    LAYOUTOBJ[userId] = [];
    ejs.render("/",{
        html: LAYOUTOBJ[userId]
    });
    return res.status(200).json({"type":true,"data":"生成页面！"});
});

// 输出页面(待修复)
app.post("/output", (req, res) => {
    let userId = req.body.id;
    console.log(1111);
    return res.status(200).json({"type":true,"data":"生成页面！"});
});

//创建服务器
var server = http.createServer(app);
reload(server, app);
server.listen(8080, () => {
    console.log("****************** 启动成功！端口号：8080 ******************")
});
