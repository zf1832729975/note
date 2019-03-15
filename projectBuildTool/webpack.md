# webpack vue项目中一些文件的作用

## vue项目结构

```text
/*
├── build --------------------------------- webpack相关配置文件
│   ├── build.js --------------------------webpack打包配置文件
│   ├── check-versions.js ------------------------------ 检查npm,nodejs版本
│   ├── dev-client.js ---------------------------------- 设置环境
│   ├── dev-server.js ---------------------------------- 创建express服务器，配置中间件，启动可热重载的服务器，用于开发项目
│   ├── utils.js --------------------------------------- 配置资源路径，配置css加载器
│   ├── vue-loader.conf.js ----------------------------- 配置css加载器等
│   ├── webpack.base.conf.js --------------------------- webpack基本配置
│   ├── webpack.dev.conf.js ---------------------------- 用于开发的webpack设置
│   ├── webpack.prod.conf.js --------------------------- 用于打包的webpack设置
├── config ---------------------------------- 配置文件
├── node_modules ---------------------------- 存放依赖的目录
├── src ------------------------------------- 源码
│   ├── assets ------------------------------ 静态文件
│   ├── components -------------------------- 组件
│   ├── main.js ----------------------------- 主js
│   ├── App.vue ----------------------------- 项目入口组件
│   ├── router ------------------------------ 路由
├── package.json ---------------------------- node配置文件
├── .babelrc--------------------------------- babel配置文件
├── .editorconfig---------------------------- 编辑器配置
├── .gitignore------------------------------- 配置git可忽略的文件
*/
```

## 主要配置文件

### package.josn 文件

1. script --progress: 显示进度条 --config: build/webpack.dev.conf.js 配置文件路径

    ```json
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "build": "node build/build.js"
    ```

2. dependencies: 依赖， 在生产环境中也要用到的依赖包

3. devDependencies: 开发环境依赖， 指在开发环境中要用到的一些依赖包，工具，如 eslint 语法检验， babel-loader等

### dev-server.js

```js
/*

1. 引入配置文件
2. 引入相关插件
3. 创建 express 实列
4. 配置 webpack-dev-middleware 和 webpack-hot-middleware
5. 配置静态资源路径， 并挂载到 express 服务器上
6. 启动服务器， 并判断是否自动打开浏览器
7. 监听端口

*/

```

### webpack.base.conf.js

```js
/*

1. 配置编译入口和输出路径
2. 模块 resolve 的规则
3. 配置不同类型模块的处理规则

*/

```

###

```js
/*

1. 合并基础的 webpack 配置
2. 使用 styleLoaders
3. 配置 Source Maps
4. 配置 webpack 插件

*/

```

### build.js

```js
/*

1. webpack编译
2. 输出信息
*/

```

### webpack.prod.conf.js

```js
/**
 * 1. 合并基础的 webpack 配置
 * 2. 配置 webpack 的输出
 * 3. 配置 webpack 插件
 * 4. 配置 gzip 模式
 * 5. 配置 webpack-bundle-analyzer, 分析打包后生成的文件结构
 * /

```

### config/index.js

```js


```