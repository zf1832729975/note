# MongoDB 数据库

MongoDB  数据库是一个非关系数据库，非关系数据库就是比较灵活，不用设计表结构，什么都可以存储， 例如 json 文件； 关系数据库是比较严格，要设计表，例如 mysql, SQL

表就是关系
- 属于的关系型数据库都要通过 `sql` 语言来操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 而且数据还支持约束
    - 唯一的
    - 主键
    - 默认值
    - 非空
-  非关系数据库非常的灵活
-  有的非关系型数据库就是 key-value 对儿
- MongoDB是长的最像关系型数据库的非关系型数据库
    - 数据库 ==> 数据库
    - 数据表 ==> 集合（数组）
    - 表记录 ==> 文档对象

MongoDB的存储结构， 有点像下面的结构

```js
{
    qq: {	// 数据库
        users: [	// 表， 集合，数组
            {},	// 记录， 文档, 必须是对象
            {}, // 文档结构很灵活，没有限制， 不需要像 mysql 一样
            {}, // 先创建数据库， 表， 设计表结构， 一切都有 mongodb
            {}, // 自动帮我们创建好
        ],
    },
    taobao: {	// 数据库
        
    }
}

```

## 安装配置， 启动
下载链接：https://www.mongodb.com/download-center#community
- 把安装包下载下来， 安装好，记好安装目录
- 配置环境变量， 复制安装目录下的 bin 目录，新建环境变量，粘贴，保存就可以了
- 在 c 盘或者 其他盘符的根目录下创建 /data/db, data/log， 在哪个盘符新建的文件就要在那个盘符执行命令
- 启动服务：打开cmd窗口，  输入 `mongod`
- 关闭服务： 在控制台 `ctrl+c`或者直接关闭控制台
- 也可以自定义data目录 `mongod --dbpath 数据存放目录`
- 连接数据库输入 `mongo`, 回车就可以了， *注意*： 没有 d，且连接的时候要把数据库开着； 连接的是本地的服务， 输入 `exit` 命令就退出连接

## 基本命令
在连接数据库的窗口输入命令

- `show dbs`： 查看显示所有的数据库
- `db` 查看当前操作的数据库
- `use 数据库名称` ： 切换到知道的数据库（如果没有会新建， 输入show dbs 不会出现， 除非插入数据）
- 插入数据 `db.students.insertOne({"name": "Jack"})`, 向学生 students 中插入一条数据
- 查询数据 `da.students.find()`， 查询 students 中的所有数据

## 使用 node 操作 mongodb 数据库

使用官方的 `MongoDB` 来操作 在 npmjs 上搜索 mongodb

### 使用第三方 mongoose 来操作 Mongodb

安装 `npm install mongoose`
官网：https://mongoosejs.com/
官方指南： https://mongoosejs.com/docs/guide.html
官方API文档：https://mongoosejs.com/docs/api.html

```js
const mongoose = require('mongoose');
// 连接数据库，数据库是本机的 test 数据库，如果没有这个数据库，
// 当像该数据库插入一条数据是就会自动创建
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// 
// 创建数据表， Cat， 会变成 cats
// 用个 name 字段， 要求是字符串类型
const Cat = mongoose.model('Cat', { name: String });

// 创建实例，持久化实例
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

#### demo

```js
const mongoose = require('mongoose')
// 1. 连接
mongoose.connect('mongodb://localhost/itcast')

// 2. 设计
// 设计集合结构（表结构）
// 字段名称就是表结构中的属性名称
var blogSchema = new Schema({
	title: 	String,	// 约束， 不要有脏数据
 	author: String,
 	body: 	String,
 	comments: [{ body: String, date: Date }],
 	date: { type: Date, default: Date.now },
 	hidden: Boolen,
 	meta: {
    	votes: 	Numeber,
    	favs: 	Number
 	}
})

// 3. 文档结发布为模型
/**
 * 第一个参数：传入一个大写名词单数来表示你的表名称
 * mongoose 会自动将大写名词字符串变成小写复数 User ==> users
 * 第二个参数： 架构 userSchema
 */
let User = mongoose.model('User', blogSchema)

// 4. 使用构造函数, 新增数据
var admin = new User({
    // 。。。。
})

// 5. 持久化
admin.save((err, ret) => {
    if (err) {
        console.lgo('err')
    } else {
        console.log('Success')
        console.log(ret)
    }
})
```

#### 查询

```js
// 查询所有
User.find((err, ret) => {
    if (err) {
        
    } else {
        console.log(ret)
    }
})

// 按条件查询
User.find({
    name: 'zs'	// 查询name为 'zs' 的数据
}, (err, ret) => {})

// 按条件查询，查询到第一个就返回
User.findOne({
    name: 'zs'，	// 查询name为 'zs' & sex 为 1 的数据
    sex:1
}, (err, ret) => {})
```

#### 删除

```js
User.remove({
    name: 'zs'
}, (err, ret) => {})

```

#### 更新

3.X版本

```js
// findOneAndUpdate
User.findByIdAndUpdate('id号', {
    name: 'lisi'	// 更改内容
}, (err, ret) => {})

```













