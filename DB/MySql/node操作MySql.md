# 用 nodejs 操作 MySql 数据库

文档：在 npmjs 中搜索 mysql

> <https://www.npmjs.com/package/mysql>

## 安装

```shell
npm install mysql
```

## 使用

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

## 封装之后的方法

在nodejs项目的根路径下创建一个`db`文件夹，在里面创建两个文件 `database.config.js`, `index.js`

### /db/databse.config.js

```js
//a)database.config.js代码：
//配置链接数据库参数
module.exports = {
    host: 'localhost',
    port: 3306,
    database: 'exam-system',
    user: 'root',
    password: 'zhou_fei'
};

```

### index.js

```js
//定义数据库query函数，向外暴露
var mysql = require('mysql');
var databaseConfig = require('./database.config')  //引入数据库配置模块中的数据

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
				console.log('数据库链接失败')
				throw err
			}
			//开始数据操作
			connection.query(sql, params, function (err, results, fields) {
				if (err) {
					console.log('数据操作失败')
					throw err
				}
				//将查询出来的数据返回给回调函数，这个时候就没有必要使用错误前置的思想了，因为我们在这个文件中已经对错误进行了处理，如果数据检索报错，直接就会阻塞到这个文件中
				
				callback && callback(JSON.parse(JSON.stringify(results)), fields);
				//results作为数据操作后的结果，fields作为数据库连接的一些字段，大家可以打印到控制台观察一下
				//停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
				connection.end(function (err) {
					if (err) {
						console.log('关闭数据库连接失败！')
						throw err;
					}
				})
			})
		})
	}
};
```

### 使用

```js
// 在需要使用的文件中引入该文件
const db = require('../db')

// 使用 query
db.query('SELECT * FROM tabel_name', params, (results, fields) => {
    
})

```

#### 插入数据

```js
// 使用参数
let data = {
        Paper_name: paperName,
        Paper_Course_name: courseName,
        Paper_Teacher: teacherId
    }
    db.query('INSERT into Paper SET ?', data, (result) => {
        if (result.affectedRows === 1) {
            res.json({ code: 0, msg: '添加试卷成功' })
        } else {
            res.json({ code: 2, msg: '添加试卷失败' })
        }
    })

// 
var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
```

#### 插入多条数据



```js
 var sql = "INSERT INTO customers (name, address) VALUES ?";
  var values = [
    ['John', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
```

 

#### 更新数据

```js
var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',6];
//改
connection.query(modSql,modSqlParams,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
  console.log('--------------------------UPDATE----------------------------');
  console.log('UPDATE affectedRows',result.affectedRows);
  console.log('-----------------------------------------------------------------\n\n');
});
```



#### 删除数据

```js
var delSql = 'DELETE FROM websites where id=6';
//删
connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        
 
       console.log('--------------------------DELETE----------------------------');
       console.log('DELETE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
});
```

## in语句

in语句， `in(1, 2, 3)` ==> `'SQL WHERE id in(?)', [[1, 2, 3]], `

```js
arr = [1, 2, 3]
db.query('DELETE FROM category WHERE id in(?)', [data], result => {
            console.log('result', result)
            res.json({
                code: 0,
                msg: '删除分类成功'
            })
        })
```











