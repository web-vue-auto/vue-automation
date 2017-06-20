// 数据库连接模块
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.145.159',
    user     : 'root',
    password : 'root',
    database : 'VuePlatomTest'
});

connection = mysql.createConnection(connection.config);
// 创建数据库连接
connection.connect();

module.exports = connection;

module.exports.dev = {
    call : 'VuePlatomTest' //VuePlatom
};
