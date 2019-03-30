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
 
 // 4. 关闭连接
connection.end();	
```

