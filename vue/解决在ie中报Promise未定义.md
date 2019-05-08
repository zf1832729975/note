# 解决使用Vue后IE下不支持Promise的问题

这个现象的IE下报错为：“Proxy”未定义。

# 解决方法

首先安装开发环境依赖：

```shell
npm install --save-dev es6-promise
```

然后在主入口main.js如下：

```js
import Promise from 'es6-promise'
Promise.polyfill()
```