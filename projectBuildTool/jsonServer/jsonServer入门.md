# JsonServer使用

## 安装

```shell
npm install -g json-server

json-server -v
0.14.2
```

 ## 基本使用

### 创建db.json

在一个文件夹下新建一个db.json文件

```js
{
    "posts": [
      { "id": 1, "title": "json-server", "author": "typicode" }
    ],
    "comments": [
      { "id": 1, "body": "some comment", "postId": 1 }
    ],
    "profile": { "name": "typicode" }
}
```

### 启动josn-server

在当前文件路径下输入命令：

```shell
json-server db.json

  \{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/profile

Home
http://localhost:3000

Type s + enter at any time to create a snapshot of the database
```

访问http://localhost:3000

### 用脚本启动

创建一个文件夹(不要用json-server为名字，否则会报错哦)，在终端进入到我们这个文件夹，然后初始化一个package.json文件 npm init --yes（之后我们的文件夹中就会有一个package.json的文件）

安装我们的json-server：npm i json-server --save

在package.json 的scripts选项中

```json
"script": {
 "json:server": "json-sever --watch db.json"   
}
```

## 各种命令使用

```shell
# Sort
# 以公司排降序
/users?_sort=company&_order=desc
# 以公司升序排序
/users?_sort=company&_order=asc

# Slice
/users?_start=2&_end=7

# Operators
# id >= 1 & id <= 2
/users?id_gte=1&id_lte=2
# 排除 id=1 的
/users?id_ne=1
# company里有值‘像’2
/users?company_like=2

# Search
# 查询包含2的
/users?q=2
```



