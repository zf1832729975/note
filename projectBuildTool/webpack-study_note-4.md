# webpack 学习 4

## 解析(resolve)

配置模块如何解析。比如： `import _ from 'lodash'` ,其实是加载解析了 lodash.js 文件。此配置就是设置加载和解析的方式。

resolve.alias
创建 `import` 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块：

```js

// webpack.config.js
module.exports = {
 resolve: {
   alias: {
     vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
     '@': path.resolve(__dirname, 'src/')
   }
 }
  ...
}

// index.js
// 在我们的index.js文件中，就可以直接import
import vue from 'vue';
// 等价于
import vue from  'src/lib/vue/dist/vue.esm.js';
```

### `resolve.extensions` 的应用

自动解析确定的扩展。

```js
 resolve: {
    alias: {
      vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
      '@': path.resolve(__dirname, 'src/')
    },
    extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"]
  }
```

## 外部扩展(externals)

externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。

例如，从 CDN 引入 jQuery，而不是把它打包：

```js

module.exports = {
 externals: {
   jquery: 'jQuery'
 },
  ...
}
```
