# buid/webpack.dev.conf.js 文件详细

```js
/*
    1、合并基础的webpack配置
    2、使用styleLoaders
    3、配置Source Maps
    4、配置webpack插件
*/
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
//生成html文件并自动注入依赖文件的插件， script & link
var HtmlWebpackPlugin = require('html-webpack-plugin')
//一个输出webpack警告，错误的插件
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
//添加热重载相关的代码到entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
//合并webpack.base.conf
module.exports = merge(baseWebpackConfig, {
  module: {
    //使用styleLoaders处理样式文件
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  //配置Source Maps

  devtool: '#cheap-module-eval-source-map',
  //配置webpack插件
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})

>/** 配置Source Maps
/*
    1、source-map 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最
好的source map，但是它会减慢打包文件的构建速度；

    2、cheap-module-source-map在一个单独的文件中生成一个不带列映射的map，不带列
映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应
到具体的列（符号），会对调试造成不便；

    3、eval-source-map 使用eval打包源文件模块，在同一个文件中生成干净的完整的
source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后
输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在
生产阶段一定不要用这个选项；

    4、cheap-module-eval-source-map 这是在打包文件时最快的生成source map的方法，
生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map
选项具有相似的缺点；
*/

```
