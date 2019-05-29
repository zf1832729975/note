# 用gulp-css-wrap给css添加命名空间



在css文件中，我们要给css添加前缀

> gulp官网 ：<https://www.gulpjs.com.cn/> 
>
> gulp官网文档： <https://www.gulpjs.com.cn/docs/getting-started/>
>
> gulp-css-wrap : <https://npm.taobao.org/package/gulp-css-wrap/v/0.1.2>

1. 搭建项目

   ```shell
   $ mkdir gulp-hello
   $ cd gulp-hello/
   $ npm init -y
   ```

   

2. 搭建gulp环境  项目中

   ```shell
   # 1. 安装gulp
   npm install gulp -D
   
   # 2. 安装gulp-css-wrap 给css添加前缀
   npm install gulp-css-wrap -D
   
   # 3. 安装gulp-clean-css 用于清除多余的文件
   npm install gulp-clean-css -D
   ```

3. 把要加入命名空间的文件随便放在项目中的一个目录中

4. 在根目录下创建一个 `gulpfile.js` 文件

   ```js
   // gulpfile.js
   const path = require('path');
   const gulp = require('gulp');
   const cleanCSS = require('gulp-clean-css');
   const cssWrap = require('gulp-css-wrap');
   
   gulp.task('css-wrap', function () {
   	return gulp.src(path.resolve('./theme/index.css')) // 需要添加命名空间的文件
   				.pipe(cssWrap({
   					selector: '.custom-#002140' // 添加命名空间
   				}))
   				.pipe(cleanCSS())
   				.pipe(gulp.dest('./dist/#002140'))	// 存放目录
   });
   
   ```

   