# webpack 学习笔记 2

## 清理 dist 目录

每次构建，我们的 /dist 文件夹都会保存生成的文件，然后就会非常杂乱。

通常，在每次构建前清理 /dist 文件夹，是比较推荐的做法

`clean-webpack-plugin` 是一个比较普及的管理插件

> npm install clean-webpack-plugin --save-dev

webpack.config.js

```js
const path = require('path');
  ....
const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    plugins: [
     new CleanWebpackPlugin(['dist'])
      ...
    ],
    ...
  };
```

## 加载图片与图片优化

`background: url('../static/1.jpeg')` 报错， 安装 file-loader

> npm install --save-dev file-loader

webpack.config.js

```js
 module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }

```

`image-webpack-loader` 可以帮助我们对图片进行压缩和优化。
