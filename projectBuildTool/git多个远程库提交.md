# git多个远程库提交

例如我有下面两个仓库： 
https://gitee.com/zkzong/mongodb.git 
https://github.com/zkzong/mongodb.git

先添加第一个仓库： 

```shell
git remote add origin https://gitee.com/zkzong/mongodb.git 
```

再添加第二个仓库： 

```shell
git remote set-url --add origin https://github.com/zf1832729975/utils.git
```

如果还有其他，则可以像添加第二个一样继续添加其他仓库。

然后使用下面命令提交： 

```
git push origin --all
```

**之前的**

```shell
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = https://gitee.com/zh8739/note.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master

```

**之后的**

```shell
打开.git/config，可以看到这样的配置：
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = https://gitee.com/zh8739/note.git
	fetch = +refs/heads/*:refs/remotes/origin/*
	url = https://github.com/zf1832729975/note.git	 # 就添加了这句
[branch "master"]
	remote = origin
	merge = refs/heads/master


## 刚才的命令其实就是添加了这些配

```

置。如果不想用命令行，可以直接编辑该文件，添加对应的url即可。
--------------------- 

原文：https://blog.csdn.net/zongzhankui/article/details/78888651 
