# mysql 的基本使用

## 基本使用命令

```shell
# 1. 连接数据库, 之后输入密码
$ mysql -u root -p

# 2. 显示所有的数据库
mysql> show databases;

# 3. 切换数据库
mysql> use database_name;

# 4. 显示所有的表
mysql> show tables;

# 5. 显示表的结构
mysql> describe table_name

# 6.查看端口号
mysql> show global varibles like 'port';

# 修改当前用户密码
alter user user() identified by "123456";

```



