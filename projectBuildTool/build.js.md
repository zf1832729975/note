# build/build.js 文件

```js
/* 
    1、webpack编译
    2、输出信息
*/

require('./check-versions')()
process.env.NODE_ENV = 'production'
//控制台loading动画
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
// 高亮控制台输出的插件
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
//在控制台输出building for production...
var spinner = ora('building for production...')
//开始loading动画
spinner.start()
//获取输出文件路径
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  //webpack编译  
  webpack(webpackConfig, function (err, stats) {
    //停止loading动画
    spinner.stop()
    //如果错误抛出错误
    if (err) throw err
    //完成输出相关信息 
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

```