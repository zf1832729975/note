# webpack 学习笔记 3 开发相关辅助

## 合并两个 webpack 的 js 配置文件

开发环境(development)和生产环境(production)配置文件有很多不同点，但是也有一部分是相同的配置内容，如果在两个配置文件中都添加相同的配置节点， 就非常不爽。

`webpack-merge` 的工具可以实现两个配置文件进合并，这样我们就可以把 开发环境和生产环境的公共配置抽取到一个公共的配置文件中。

> npm install --save-dev webpack-merge

```js
const merge = require("webpack-merge");

module.exports = merge(common, {
  //.....如果有相同的配置， 后面的会覆盖前面的
});
```

_注意_：如果有相同的配置， 后面的会覆盖前面的

## js 使用 source map

当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。

使用 inline-source-map 选项，这有助于解释说明 js 原始出错的位置。（不要用于生产环境）

```js
 module.exports = {
  devtool: 'inline-source-map',
```

## 监控文件变化，自动编译。使用观察模式

每次修改完毕后，都手动编译异常痛苦。最简单解决的办法就是启动 watch

> npx webpack --watch

## 使用 webpack-dev-server 和热更新

webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

> npm install --save-dev webpack-dev-server

```js

  module.exports = {
   devServer: {
     contentBase: './dist'
   }
```

官网其他配置：

```js
devServer: {
  clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
  hot: true,  // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
  contentBase:  path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
  compress: true, // 一切服务都启用gzip 压缩
  host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
  port: 8080, // 端口
  open: true, // 是否打开浏览器
  overlay: {  // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
    warnings: true,
    errors: true
  },
  publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
  proxy: {  // 设置代理
    "/api": {  // 访问api开头的请求，会跳转到  下面的target配置
      target: "http://192.168.0.102:8080",
      pathRewrite: {"^/api" : "/mockjsdata/5/api"}
    }
  },
  quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
  watchOptions: { // 监视文件相关的控制选项
    poll: true,   // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
    ignored: /node_modules/, // 忽略监控的文件夹，正则
    aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
  }
}
```

如何启用热更新呢？

```js
webpack.config.js

  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
       app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
+     new webpack.NamedModulesPlugin(),  // 更容易查看(patch)的依赖
+     new webpack.HotModuleReplacementPlugin()  // 替换插件
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

## JS 启用 babel 转码

虽然现代的浏览器已经兼容了 96%以上的 ES6 的语法了，但是为了兼容老式的浏览器（IE8、9）我们需要把最新的 ES6 的语法转成 ES5 的。那么 babel 的 loader 就出场了。

> npm i -D babel-loader babel-core babel-preset-env

在 webpack 的配置文件中，添加 js 的处理模块。

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,  // 加快编译速度，不包含node_modules文件夹内容
      use: {
        loader: 'babel-loader'
      }
    }
  ]
}

然后，在项目根目录下，添加babel的配置文件 .babelrc.

.babelrc文件如下：

{
  "presets": ["env"]
}
```

## Babel 优化

babel-loader 可以配置如下几个 options：

- cacheDirectory：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)。如果设置了一个空值 (loader: 'babel-loader?cacheDirectory') 或者 true (loader: babel-loader?cacheDirectory=true)，loader 将使用默认的缓存目录 node_modules/.cache/babel-loader，如果在任何根目录下都没有找到 node_modules 目录，将会降级回退到操作系统默认的临时文件目录。

- cacheIdentifier：默认是一个由 babel-core 版本号，babel-loader 版本号，.babelrc 文件内容（存在的情况下），环境变量 BABEL_ENV 的值（没有时降级到 NODE_ENV）组成的字符串。可以设置为一个自定义的值，在 identifier 改变后，强制缓存失效。

- forceEnv：默认将解析 BABEL_ENV 然后是 NODE_ENV。允许你在 loader 级别上覆盖 BABEL_ENV/NODE_ENV。对有不同 babel 配置的，客户端和服务端同构应用非常有用。

> 注意：sourceMap 选项是被忽略的。当 webpack 配置了 sourceMap 时（通过 devtool 配置选项），将会自动生成 sourceMap。

babel 在每个文件都插入了辅助代码，使代码体积过大.babel 对一些公共方法使用了非常小的辅助代码，比如 \_extend。 默认情况下会被添加到每一个需要它的文件中。你可以引入 babel runtime 作为一个独立模块，来避免重复引入。

安装：

```bash
npm install babel-plugin-transform-runtime --save-dev
npm install babel-runtime --save
```

配置：

webpack.config.js

```js
rules: [
  // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
    }
  }
]

修改.babelrc

{
  "presets": ["env"],
  "plugins": [
    ["transform-runtime", {
      "helpers": true,
      "polyfill": true,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
```

此时，webpack 打包的时候，会自动优化重复引入公共方法的问题。

## ESLint 校验代码格式规范

```bash
npm install eslint --save-dev
npm install eslint-loader --save-dev

# 以下是用到的额外的需要安装的eslint的解释器、校验规则等
npm i -D babel-eslint standard
```

使用

```js
// .eslintrc.js  根目录下
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  globals: {
    NODE_ENV: false
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 添加，分号必须
    semi: ['error', 'always'],
    'no-unexpected-multiline': 'off',
    'space-before-function-paren': ['error', 'never'],
    // 'quotes': ["error", "double", { "avoidEscape": true }]
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ]
  }
};

```