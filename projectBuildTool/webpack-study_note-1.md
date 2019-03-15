# webpack学习笔记1

## 基本认识

1. 初识化一个项目

    ```text
    npm init        ==> 之后会询问一下基本的信息

    npm  init -y    ==> 这个命令不需要询问信息

    ```

2. 安装 webpack

    本地开发依赖安装
    > npm i -D webpack

    之后就会在项目的 `package.josn` 文件的 `devDependencies` 里面写入安装的依赖

    在 webpack 4.0 以后的版本中， 需要在额外的安装一个命令行工具 webpack-cli
    > npm i -D webpack-cli

### 安装 loadash 依赖

早期的安装命令
> npm i loadash --save-port

现在的可以使用
> npm i loadash -P

### mode模式

`development`： 开发环境

`production:`  生产环境

通过选择 `development` 或 `production` 之中的一个，来设置 mode 参数，可以启用相应模式下的 webpack 内置的优化

```js
// webpack.production.config.js
module.exports = {
    mode: "production"  // 开发模式 生产环境
}

```

### 入口 | 出口文件

入口文件， 类似于其他语言的起始文件， 比如C语言的 main 函数所在的文件

```js
// webpack.config.js
const path = require('path')

module.exports = {
    mode: 'development',   // 开发环境
    entry: './src/main.js',
    ouput: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
        // 注意：不要写成了 path.resolve(__dirname, '/dist')
    }
}
```

### loader

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack自身只理解JavaScript）， loader 可以将所有类型额文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对他们进行处理

### 插件（plugins）

## 加载非JS 文件

### 加载 CSS 文件

在需要加载 CSS 的文件中使用 `import 'style/index.css'`, 这就需要 `css-loader` 来解析

用 `style-loader` 来动态的把 css 文件插入的index.html文件中，是通过脚本添加到index.html上的，不是直接再index.html里面添加

1. 安装 css 和 style 模块解析的依赖 `style-loader` 和 `css-loader`
    > npm install --save-dev style-loader css-loader

2. 添加 css 解析的 loader

    ```js
    // webpack.config.js
    const path = require('path')

    module.exports = {
        mode: 'development'
        entry: './src/main.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirnaem, '/dist')
        },
        moudle: {
            rules: [
                test: /\.css$/,
                // 满足test这个规则里的正则表达式使用下面的 loader 解析
                // 注意 loader 的解析顺序是从右边解析过来，就是先解析 `css-loader` 在 解析 `style-loader`
                use: ['style-loader', 'css-loader']  
            ]
        }
    }
    ```

*注意*:  loader 的解析顺序是从右边到左边解析，就是先解析 `css-loader` 在 解析 `style-loader`

### module Rule

- rule条件
  - 字符串：匹配输入必须以提供的字符串开始，目录绝对路径或文件绝对路径
  
  - 正则表达式： test输入值

  - 函数： 调用输入的函数， 必须返回一个真值（truty value）以匹配

  - 条件数组： 至少一个匹配条件

  - 对象： 匹配所有的属性， 每个属性都有一个定义行为

- Rule.test
  - 匹配特定条件，一般是提供一个正则表达式或正则表达式数组， 但这不是强制的

- 其他条件比如：
  - include: 匹配特定条件，

  - exclude: 排除特定条件

  - and： 必须满足所有条件

  - or: 或者

  - not: 必须排除这个条件

例如

```js
 moudle: {
            rules: [
                test: /\.css$/,
                include: [
                    path: resolve(__dirname, 'app/styles'),
                    path: resolve(__dirname, 'vand/styles')
                ],
                use: ['style-loader', 'css-loader']  
            ]
        }

```

### 加载 scss | sass

加载 Sass 需要 `sass-loader` 和 `node-sass`

#### 安装

> npm i -D sass-loader node-sass

#### 使用

```js
// webpack.config.js
const path = require('path')

module.exports = {
    //.....
    moudle: {
        rules: [
            test: /\.(c|sc|sa)ss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']  
        ]
    }
}
```

### module配置补充

#### module.noParse

值的类型： RegExp | [RegExp] | function

放在 webpack 解析那些任何与给定正则表达式相匹配的文件，忽略的文件中不应该含有 import, require, define 的调用，或任何其他的导入机制， 忽略大型的 Library可以调高构建性能

```js
module.exports = {
    // ....
    module: {
        noParse: /jquery|lodash/
    }
    // ...
}

```

## 启用source Map

在没有 source map的时候, 是直接通过 style标签注入的,在element的styles面板的css样式中，后面只有一个 `<style>...<style>`，点击时找不到具体的文件，就只能找到那个 `index.html` 里的 `style` 标签
通过 `source map` 可以找到我们的css样式具体写在那个文件，在那个位置的那一行

在webpack.config.js中

```js
module.exports = {
   module: {
        rules: [
        test: /.\(c|sa|sc)ss$/,
        use:[
            {loader: 'style-loader'},
            {loader: 'css-loader',  options: {sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}}
        ]
    ]
   }
}
```

## 使用 PostCSS 处理loader（附带CSS3前缀）

PostCSS是一个CSS的预处理工具， 可以帮助我们：给CSS3的数据添加前缀(autoprefixer)，样式格式校验（stylelint）, 提前使用css 的新特性

官网<https://github.com/postcss/postcss>

```bash
npm i -D postcss-loader
npm i autoprefixer --save-dev
```

```js
module.exports = {
    module: {
        rules: [
            test: /.\(c|sa|sc)ss$/,
            use:[
                {loader: 'style-loader'},
                {loader: 'css-loader',  options: {sourceMap: true}},
                {
                    loader: 'postcss',
                    sourceMap: true,
                    plugins: (loader) => [
                        // require('postcss-import')({root: loader.resourcePath}),
                        // 最低浏览器，在中国市场份额大于0.15%的
                        require('autoprefixer')({browsers: ['> 0.15% in CN']})
                        // 其他插件
                        // require('postcss-cssnext')(),
                    ]
                },
                {loader: 'sass-loader', options: {sourceMap: true}}
            ]
        ]
    }
}
```

## 把 CSS 单独抽离为一个单独文件并且设置版本号

首先 css 的处理我们都把 node 设置为 `production` 生产环境

webpack4开始使用： `mini-css-extract-plugin` 插件， 1-3的版本可以使用： `extract-text-webpack-plugin`

> 抽取了样式， 就不能再用 `style-loader` 注入到html中了

> npm install --save-dev mini-css-extract-plugin

```js
const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    //...
    mode: 'production',
    module: {
        rules: [
            test: /.\(c|sa|sc)ss$/,
            use:[
                MiniCSSExtractPlugin.loader,
                {loader: 'css-loader',  options: {sourceMap: true}},
                {
                    loader: 'postcss',
                    sourceMap: true,
                    plugins: (loader) => [
                        // require('postcss-import')({root: loader.resourcePath}),
                        // 最低浏览器，在中国市场份额大于0.15%的
                        require('autoprefixer')({browsers: ['> 0.15% in CN']})
                        // 其他插件
                        // require('postcss-cssnext')(),
                    ]
                },
                {loader: 'sass-loader', options: {sourceMap: true}}
            ]
        ]
    },
    plugins: {
        new MiniCSSExtractPlugin({
            filename: [name].css, // 设置最终输出的文件名， 和输出的文件名main.js一样 ==> main.js
            // 还可以有 hash值 [name].[hash].css
            chunkFilename: [id].css
        })
    }
}
```

## 压缩CSS

压缩 CSS 插件 `optimize-css-assets-webpack-plugin`

安装
> npm i -D optimize-css-assets-webpack-plugin

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    // entry:''
    // output ....
    // module: {}
    // plugins
    mode: 'production', // 生产模式压缩就可以，其他模式一般不用
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    }
}
```

## 压缩 JS

压缩需要一个插件 `uglifyjs-webpack-plugin`, 此插件需要一个前提就是: `mode: 'production'` 生产环境

安装
> npm i -D uglifyjs-webpack-plugin

使用

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    // entry:''
    // output ....
    // module: {}
    // plugins
    mode: 'production', // 生产模式压缩就可以，其他模式一般不用
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}), // 压缩 css
            new UglifyJSPlugin({  // 压缩 js
                cache: true, parallel: true, sourceMap: true
                // cache js没有变化不在进行压缩
                // parallel并行压缩
            })
        ]
    }
}
```

## 解决 CSS 文件或者 JS 文件名字哈希变化的问题

`HtmlWebpackPlugin` 插件， 可以把打包后的CSS或JS文件引用直接注入到HTML模板中，这样就不用每次手动修改文件引用了

安装
> npm install --save-dev html-webpack-plugin

简写
> npm i -D html-webpack-plugin

使用

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //...
    plugins: [
        new HtmlWebpackPlugin({
            title: '',   //
            filename: 'index.html', // 在dist下生成的文件名 默认 index.html
            template: path.resolve(__dirname, './index.html'), // 模板, 要把js或者css注入到那个文件里面去
            minify: {  // 启用压缩
                collapseWhitespace: true, // 空白去掉
                removeComments: true, // 移除注释
                removeAttributeQuotes: true // 移除属性的引号
            }
        })
    ]
}

```
