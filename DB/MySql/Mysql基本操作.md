# Mysql 基本操作

## 数据库

```sql
-- 创建数据库
CREATE DATABASE database_name;
-- 删除数据库
DROP DATABASE database_name;
-- 选择数据库
USE database_name;
-- 显示数据中的表
SHOW TABLES;
-- 显示表结构
DESCRIBE table_name;
```

**表结构** 

```sql
-- 插入字段 ALTER TABLE table_name ADD filed1 类型;
-- 字段会自动添加到数据表字段的末尾。
ALTER TABLE table_name ADD filed1 INT;

-- 如果你需要指定新增字段的位置，可以使用MySQL提供的关键字 FIRST (设定位第一列)， AFTER 字段名（设定位于某个字段之后）。
ALTER TABLE table_name ADD filed1 INT FIRST;
ALTER TABLE table_name ADD filed1 INT AFTER c;

```

**修改字段类型及名称**

如果需要修改字段类型及名称, 你可以在ALTER命令中使用 MODIFY 或 CHANGE 子句 。

例如，把字段 c 的类型从 CHAR(1) 改为 CHAR(10)，可以执行以下命令:

```
mysql> ALTER TABLE testalter_tbl MODIFY c CHAR(10);
```

使用 CHANGE 子句, 语法有很大的不同。 在 CHANGE 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段名及类型。尝试如下实例：

```shell
mysql> ALTER TABLE testalter_tbl CHANGE i j BIGINT;
mysql> ALTER TABLE testalter_tbl CHANGE j j INT;
#  ALTER TABLE 表名 CHANGE 要被更改的字段名，新的字段名 类型;
```

**修改表名**

如果需要修改数据表的名称，可以在 ALTER TABLE 语句中使用 RENAME 子句来实现。

尝试以下实例将数据表 testalter_tbl 重命名为 alter_tbl：

```sql
mysql> ALTER TABLE testalter_tbl RENAME TO alter_tbl;
```



## 表数据



### 增

一、

```sql
INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );
```

二、

```sql
INSERT INTO table_name ()
                       VALUES
                       ( value1, value2,...valueN );
```

三、插入多行

```sql
INSERT INTO table_name ()
                       VALUES
                       ( value1, value2,...valueN ),
                       ( value1, value2,...valueN ),
                       ( value1, value2,...valueN );
```

### 删

```sql
DELETE FROM table_name [WHERE Clause]
```



### 改

```sql
UPDATE table_name SET field1=new-value1, field2=new-value2 [WHERE Clause]
```



### 查

```sql
select * from table_name
```


## 其他操作

###  like

```sql
SELECT * FROM lang WHERE `name` like "%f%";
```

### 排序 ORDER BY 

```sql
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]
```

### 分组

```sql
SELECT column_name, function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190815100538884.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3oxODMyNzI5OTc1,size_16,color_FFFFFF,t_70)

```sql
mysql> select * from employee_tbl;
+----+--------+---------------------+--------+
| id | name   | date                | singin |
+----+--------+---------------------+--------+
|  1 | 小明   | 2016-04-22 15:25:33 |      1 |
|  2 | 小王   | 2016-04-20 15:25:47 |      3
|  3 | 小丽   | 2016-04-19 15:26:02 |      2 |
|  4 | 小王   | 2016-04-07 15:26:14 |      4 |
|  5 | 小明   | 2016-04-11 15:26:40 |      4 |
|  6 | 小明   | 2016-04-04 15:26:54 |      2 |
+----+--------+---------------------+--------+
6 rows in set (0.00 sec)

mysql> SELECT name, count(*) from employee_tbl GROUP BY name;
+--------+----------+
| name   | count(*) |
+--------+----------+
| 小明   |        3 |
| 小王   |        2 |
| 小丽   |        1 |
+--------+----------+
3 rows in set (0.00 sec)
```

### 事务

MySQL 事务主要用于处理操作量大，复杂度高的数据。比如说，在人员管理系统中，你删除一个人员，你即需要删除人员的基本资料，也要删除和该人员相关的信息，如信箱，文章等等，这样，这些数据库操作语句就构成一个事务！



- 在 MySQL 中只有使用了 Innodb 数据库引擎的数据库或表才支持事务。
- <u>事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行</u>。
- 事务用来管理 insert,update,delete 语句

一般来说，事务是必须满足4个条件（ACID）：：原子性（**A**tomicity，或称不可分割性）、一致性（**C**onsistency）、隔离性（**I**solation，又称独立性）、持久性（**D**urability）。

- **原子性：**一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。
- **一致性：**在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。
- **隔离性：**数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。
- **持久性：**事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

<hr />

- BEGIN 或 START TRANSACTION 显式地开启一个事务；
- COMMIT 也可以使用 COMMIT WORK，不过二者是等价的。COMMIT 会提交事务，并使已对数据库进行的所有修改成为永久性的；
- ROLLBACK 也可以使用 ROLLBACK WORK，不过二者是等价的。回滚会结束用户的事务，并撤销正在进行的所有未提交的修改；
- SAVEPOINT identifier，SAVEPOINT 允许在事务中创建一个保存点，一个事务中可以有多个 SAVEPOINT；
- RELEASE SAVEPOINT identifier 删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常；
- ROLLBACK TO identifier 把事务回滚到标记点；
- SET TRANSACTION 用来设置事务的隔离级别。InnoDB 存储引擎提供事务的隔离级别有READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ 和 SERIALIZABLE。



**MYSQL 事务处理主要有两种方法**：

1、用 BEGIN, ROLLBACK, COMMIT来实现

- **BEGIN** 开始一个事务
- **ROLLBACK** 事务回滚
- **COMMIT** 事务确认

2、直接用 SET 来改变 MySQL 的自动提交模式:

- **SET AUTOCOMMIT=0** 禁止自动提交
- **SET AUTOCOMMIT=1** 开启自动提交





