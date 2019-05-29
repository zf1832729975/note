**cd服务端配置：**
1.安装一个可以提供Web功能软件

[root@server0 ~]# yum -y install httpd

2.启动httpd服务

```shell
[root@server0 ~]# systemctl restart httpd
[root@server0 ~]# systemctl enable httpd
```



3.编写自己的测试页面文件

在web服务中默认存放网页文件的路径：/var/www/html

默认网页文件名字：index.html

[root@server0 ~]# vim /var/www/html/index.html

<marquee><font color=red><h1>hello world!



客户端访问
[root@desktop0 /]# firefox 172.25.0.11

-------------------

## 让web服务器永远运行

情境
运行nodejs的程序，使用命令：node xxx.js，但是关掉终端，程序也关闭了，如何让node app的程序一直运行？

第一种：让node app 在后台运行，但是当服务器重启后并不会重新启动，所以需要将此命令加入启动项中。

```shell
$ nohup node app &
```
如果上面这个命令不行可以输入下面的语句

```shell
$ nohup command & node log.io-server.js &
```

解决
1.安装forever

```
$ npm install -g forever
```


2.使用forever开启nodejs程序

```shell
$ forever start xxx.js
```

如果你需要用npm run  start来运行你的程序，则用命令
forever start -c “npm run  start” 路径

```shell
$ forever start -c "npm run start" ./
```

3.如果不需要一直运行nodejs程序

forever stop xxx.js
--------------------- 

在linux下能全局使用

cd 进 `/usr/local/bin `

在当前目录下使用  `ln -s /usr/nodejs/bin/forever  `创建软链接 . (-s后面的地址是安装成功后forever位置))

```
// 1. 简单的启动  
forever start app.js  
  
// 2. 指定forever信息输出文件，当然，默认它会放到~/.forever/forever.log  
forever start -l forever.log app.js  
  
// 3. 指定app.js中的日志信息和错误日志输出文件，  
//  -o 就是console.log输出的信息，-e 就是console.error输出的信息  
forever start -o out.log -e err.log app.js  
  
// 4. 追加日志，forever默认是不能覆盖上次的启动日志，  
//  所以如果第二次启动不加-a，则会不让运行  
forever start -l forever.log -a app.js  
  
// 5. 监听当前文件夹下的所有文件改动  
forever start -w app.js  
  
文件改动监听并自动重启  
  
// 1. 监听当前文件夹下的所有文件改动（不太建议这样）  
forever start -w app.js  
  
显示所有运行的服务  
  
forever list  
  
停止操作  
  
// 1. 停止所有运行的node App  
forever stopall  
  
// 2. 停止其中一个node App  
forever stop app.js  
// 当然还可以这样  
// forever list 找到对应的id，然后：  
forever stop [id]  
  
重启操作  
  
重启操作跟停止操作保持一致。  
  
// 1. 启动所有  
forever restartall  
  
更多一些  
  
上面的一些解释足够平常使用，还有待之后继续补充。  
开发和线上建议配置  
  
// 开发环境下  
NODE_ENV=development forever start -l forever.log -e err.log -a app.js  
// 线上环境下  
NODE_ENV=production forever start -l ~/.forever/forever.log -e ~/.forever/err.log -w -a app.js  
  
上面加上NODE_ENV为了让app.js辨认当前是什么环境用的。不加它可能就不知道哦？  
一些注意点  
  
有可能你需要使用unix下的crontab（定时任务）  
  
这个时候需要注意配置好环境变量。  
  
SHELL=/bin/sh  
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin  
```



1.nohup

用途：不挂断地运行命令。

语法：nohup Command [ Arg … ] [　& ]

　　无论是否将 nohup 命令的输出重定向到终端，输出都将附加到当前目录的 nohup.out 文件中。

　　如果当前目录的 nohup.out 文件不可写，输出重定向到 $HOME/nohup.out 文件中。

　　如果没有文件能创建或打开以用于追加，那么 Command 参数指定的命令不可调用。

退出状态：该命令返回下列出口值： 　　

　　126 可以查找但不能调用 Command 参数指定的命令。 　　

　　127 nohup 命令发生错误或不能查找由 Command 参数指定的命令。 　　

　　否则，nohup 命令的退出状态是 Command 参数指定命令的退出状态。

2.&

用途：在后台运行

一般两个一起用

nohup command &

eg:

```
`nohup /usr/local/node/bin/node /www/im/chat.js >> /usr/local/node/output.log 2>&1 &`
```

![img](https://images2015.cnblogs.com/blog/798214/201703/798214-20170320150831908-545166421.png)

进程号7585

##### 查看运行的后台进程

###### （1）jobs -l

![img](https://images2015.cnblogs.com/blog/798214/201703/798214-20170320150912955-1772662776.png)

jobs命令只看当前终端生效的，关闭终端后，在另一个终端jobs已经无法看到后台跑得程序了，此时利用ps（进程查看命令）

（2）ps -ef 

```
`ps -aux|grep chat.js`
```

![img](https://images2015.cnblogs.com/blog/798214/201703/798214-20170320153334877-1168175476.png)

注：

　　用ps -def | grep查找进程很方便，最后一行总是会grep自己

　　用grep -v参数可以将grep命令排除掉

```
`ps -aux|grep chat.js| grep -v grep`
```

![img](https://images2015.cnblogs.com/blog/798214/201703/798214-20170320153456502-1139370768.png)

　　再用awk提取一下进程ID　

```
`ps -aux|grep chat.js| grep -v grep | awk ``'{print $2}'`
```

![img](https://images2015.cnblogs.com/blog/798214/201703/798214-20170320153606799-967154073.png)

```

```

3.如果某个进程起不来，可能是某个端口被占用

###### 查看使用某端口的进程

```
`lsof -i:8090`
```

![img](https://images2015.cnblogs.com/blog/798214/201703/798214-20170320154514377-1985478430.png)

```
`netstat -ap|grep 8090`
```

![img](https://images2015.cnblogs.com/blog/798214/201703/798214-20170320154600658-246972161.png)

查看到进程id之后，使用netstat命令查看其占用的端口

```
`netstat -nap|grep 7779`
```

![img](https://images2015.cnblogs.com/blog/798214/201703/798214-20170320155041815-1272481492.png)

使用kill杀掉进城后再启动

###### 4.终止后台运行的进程

```
`kill -9  进程号`
```

![img](https://images2015.cnblogs.com/blog/798214/201703/798214-20170320153728049-88100874.png)