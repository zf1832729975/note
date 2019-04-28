# 用 nodejs 操作 MySql 数据库

文档：在 npmjs 中搜索 mysql

> <https://www.npmjs.com/package/mysql>

安装

```shell
npm install mysql
```

使用

创建好 MySql 数据库，数据表

```js
var mysql      = require('mysql');

// 1. 创建连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});



// 2. 连接
connection.connect();
 
// 3. 操作
// 直接在 query 里的第一个参数里执行 mysql 的 SQL 语句， 所有的操作都能执行
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
 // 4. 关闭`连接
connection.end();	
```

```js
//b)db.js代码：
//定义数据库query函数，向外暴露
var mysql = require('mysql');
var databaseConfig = require('./database.config');  //引入数据库配置模块中的数据

//向外暴露方法
module.exports = {
	/**
	 * 
	 * @param {*} sql sql语句
	 * @param {*} params 参数
	 * @param {*} callback (results: 结果, fields:连接字段)
	 */
	query: function (sql, params, callback) {
		//每次使用的时候需要创建链接，数据操作完成之后要关闭连接
		var connection = mysql.createConnection(databaseConfig);
		connection.connect(function (err) {
			if (err) {
				console.log('数据库链接失败');
				throw err;
			}
			//开始数据操作
			connection.query(sql, params, function (err, results, fields) {
				if (err) {
					console.log('数据操作失败');
					throw err;
				}
				//将查询出来的数据返回给回调函数，这个时候就没有必要使用错误前置的思想了，因为我们在这个文件中已经对错误进行了处理，如果数据检索报错，直接就会阻塞到这个文件中
				
				callback && callback(JSON.parse(JSON.stringify(results)), fields);
				//results作为数据操作后的结果，fields作为数据库连接的一些字段，大家可以打印到控制台观察一下
				//停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
				connection.end(function (err) {
					if (err) {
						console.log('关闭数据库连接失败！');
						throw err;
					}
				});
			});
		});
	}
};

//对数据库操作(从show_cascade 表中检索所有字段，并打印出结果)
/*
db.query('select * from Paper', [], function (results, fields) {
    console.log(results);
    // console.log(fields);
});

db.query('select * from ChoiceQst', [], function (results, fields) {
    console.log(results);
    // console.log(fields);
});
*/

```

