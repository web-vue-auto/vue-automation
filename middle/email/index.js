/**
*************************
 * auther：马群
 * QQ：2381930754
 * Email 通用方法
 *************************
 **/

// 发送邮件模块
var nodemailer  = require('nodemailer');
var connection = require('../config.js');
var postURL = "http://192.168.145.159:8080/";
var mailTransport = nodemailer.createTransport({
    host : 'smtp.sina.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth : {
        user : 'markexin@sina.com',
        pass : 'admin1030'
    },
});

module.exports = {
    url : postURL,
    email : function (html,url) {
        var options = {
            from           : '"前端基础平台管理员" <markexin@sina.com>',
            to             : ""+url+"",
            // cc          : ''    //抄送
            // bcc         : ''    //密送
            subject        : '一封来自前端基础平台的邮件',
            text           : html
        };

        mailTransport.sendMail(options, function(err, msg){
            if(err){
                console.log(err);
            }
            else {
                console.log(msg);
            }
        });
    }
}
