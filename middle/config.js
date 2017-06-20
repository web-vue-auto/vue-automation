// 数据库连接模块
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'VuePlatom'
});

connection = mysql.createConnection(connection.config);
// 创建数据库连接
connection.connect();

module.exports = connection;

module.exports.dev = {
    call : 'VuePlatom' //VuePlatom
};
