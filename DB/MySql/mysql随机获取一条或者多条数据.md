# [mysql随机获取一条或者多条数据](https://www.cnblogs.com/leezhxing/p/3951801.html)



原文地址：http://www.im286.com/thread-7091552-1-1.html

转来备份

研究一些随机的因素，主要是讲究效率问题。

语句一：

```sql
select * from users order by rand() LIMIT 1
```

MYSQL手册里面针对RAND()的提示大概意思就是，在 ORDER BY从句里面不能使用RAND()函数，因为这样会导致数据列被多次扫描，导致效率相当相当的低，效率不行，切忌使用。

－－－－－－－－－分隔线－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

语句二：

```sql
    SELECT * FROM users  AS t1  JOIN (SELECT ROUND(RAND() * ((SELECT MAX(userId) FROM `users`)-(SELECT MIN(userId) FROM users))+(SELECT MIN(userId) FROM users)) AS userId) AS t2 WHERE t1.userId >= t2.userId ORDER BY t1.userId LIMIT 1
```

执 行该sql语句，用时0.031s，效率非常好。当把”LIMIT 1“改为了”LIMIT 100“ 随机取一百条记录，用时0.048s。可是就在此时问题出现了，发现结果好像不是随机的。为了验证结果，又执行了N次，的确不是随机的。问题出现 在”ORDER BY t1.userId“这里，按userId排序了。随机取一条记录还是不错的选择，多条就不行了啊。

－－－－－－－－－分隔线－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

语句三：

```sql
SELECT * FROM users WHERE userId >= ((SELECT MAX(userId) FROM users)-(SELECT MIN(userId) FROM users)) * RAND() + (SELECT MIN(userId) FROM users)  LIMIT 1
```

执行该sql语句，用时0.039s，效率也是非常好。接着把”LIMIT 1“改为了”LIMIT 10000“，用时0.063s。经过多次验证，得出的结果都是随机的。

－－－－－－－－－分隔线－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

结论：语句一效率不行，切忌使用。随机获得一条记录，语句二是相当不错的选择，采用JOIN的语法比直接在WHERE中使用函数效率还是要高一些的。语句三也不错，随机获得多条记录的首选。



```sql
 SELECT * FROM qst_single WHERE id >= ((SELECT  MAX(id) from qst_single) - (select min(id) from qst_single) ) * rand() + (select min(id) from qst_single) limit 5;
```

语句三： 查询的量过少会有问题