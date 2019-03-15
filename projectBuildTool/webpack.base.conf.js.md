# build/webpack.base.conf.js 文件讲解

1. 配置编译入口和输出路径
2. 模块resolve的规则
3. 配置不同类型模块的**处理规则**

```js
/*
    1、配置编译入口和输出路径
    2、模块resolve的规则
    3、配置不同类型模块的处理规则
*/
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
//绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  //webpack的入口文件
  entry: {
    app: './src/main.js'
  },
  output: {
     //webpack输出文件的路径
    path: config.build.assetsRoot,
    //输出的文件命名格式
    filename: '[name].js',
    // webpack编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  //模块resolve的规则
  resolve: {
    //resolve的后缀名
    extensions: ['.js', '.vue', '.json'],
    //配置路径别名，比如import Vue from 'vue/dist/vue.common.js'--> import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  //配置不同类型模块的处理规则
  module: {
    rules: [
    // src和test文件夹下的.js和.vue文件使用eslint-loader
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      //所有的.vue文件使用vue-loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      //src和test下的.js文件使用babel-loader
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      //所有的图片文件使用url-loader
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      //所有的音频文件使用url-loader
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      //所有的字体文件使用url-loader
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

```