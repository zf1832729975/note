> 详细教程： <https://blog.csdn.net/Hanani_Jia/article/details/77950594>

## 一、 注册账号，基本使用

注册github账号。。。 下载git。。。 安装

接下来，就要开始获取属于你自己的密匙。在`git bash`中所有功能都是通过简单的一些代码来实现的。获取密匙的时候需要输入

> $ ssh-keygen -t rsa -C ["your_email@youremail.com](http://mailto:%22your_email@youremail.com)"

- 需要输入这个代码，引号内需要改成你在注册GitHub的时候绑定的邮箱账号。之后会有一些简单的让你确认的操作，之后让你会提示操作路径、密码等等，一般情况下就直接按回车一路过就可以。

```
# 默认回车
Enter file in which to save the key 

# 输入电脑默认
Enter file in which to save the key (/c/Users/DG/.ssh/id_rsa):
Created directory '/c/Users/DG/.ssh'.
Enter passphrase (empty for no passphrase):
```

- 之后在电脑的 c:/用户/.ssh --> 两个文件夹中的其中一个 复制 id_rsa 里面的内容

- 登陆 github, 找到seting --> SSh-keys --> [new SSH key] 粘贴到 key 里

## 二、Git 全局设置:

```
git config --global user.name "zhoufei"
git config --global user.email "1832729975@qq.com"
```

## 三、创建和提交

```
.gitignore  提交忽略的文件
git init 初始化
git status  
查看状态 红色的没有添加， 蓝色和绿色的添加了

git add .  添加到仓库
git commit -m "first commit"

git remote add origin https://gitee.com/zh8739/js-study.git
git push -u origin master
```

###### 注意：输入用户名和密码时： 用户名是邮箱

## 创建 git 仓库:

```
mkdir js-study
cd js-study
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/zh8739/js-study.git
git push -u origin master
```

### 已有仓库?

```
cd existing_git_repo
git remote add origin https://gitee.com/zh8739/js-study.git
git push -u origin master
```

### 发生错误

这个问题的意思大概是：用户名或密码不正确（访问令牌） [remote: Incorrect username or password ( access token )](https://blog.csdn.net/mmyhs/article/details/81589419)

仓库已经存在：[fatal: remote origin already exists.](https://www.jianshu.com/p/3380ec281729) ==> <https://www.jianshu.com/p/3380ec281729>

### 克隆库

> git clone "http...."

> npm install

## 常用命令

```shell
# 克隆指定分支
git clone -b dev http://gitdg.nat.gzbrckj.com/java/dgcloud-fast-vue.git
# 显示本地所有分支
git branch


```











