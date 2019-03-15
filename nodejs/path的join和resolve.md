# nodejs 中 path.join() 和 path.resolve()

## 基本介绍

__dirname：返回当前文件所在的绝对路径

### 引入 path模块

```const path = require('path')```

### 使用

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019031014250043.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3oxODMyNzI5OTc1,size_16,color_FFFFFF,t_70)

## path.join()

 `path.join()` 主要作用是拼接路径

 path.join方法用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是”/“，Windows系统是”\“。

 ```js
console.log(path.join('a', 'b', '..', 'c/', './d'));
// 将path片段都连接起来
// 输出：a/c/d
 ```

## path.resolve()

`path.resolve()` 方法用于将相对路径转为绝对路径。

`/`作为绝对路径的根目录，遇到 `/` 则回到根目录解析

它可以接受多个参数，依次表示所要进入的路径，直到将最后一个参数转为绝对路径。如果根据参数无法得到绝对路径，就以当前所在路径作为基准。除了根目录，该方法的返回值都不带尾部的斜杠

```js
path.resolve(); // 默认返回所在目录绝对路径，等于 __dirname 
path.resolve('/foo/bar', './baz')
// '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/')
// '/tmp/file'
```

执行的效果类似于 cd 操作

```bash
cd /foo/bar  ==> /foo/bar
cd ./baz     ==> /foo/bar
cd /tmp/file ==> /tmp/file
```
