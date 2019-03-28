# element-ui换肤， 动态换主题

参考链接> <https://blog.csdn.net/young_Emily/article/details/78591261>

思路

###### 改变原有element-ui主题

安装element-ui的自定义主题工具， 然后初始化变量文件， 得到elementUI的scss文件， 修改颜色就修改scss文件， 然后编译scss文件得到css文件， 我们引用修改好了的css文件【实现覆盖elementui的css文件】即可实现换肤

###### 至于动态换肤

用上述方法生产不同主题[颜色值]的css文件后，

1. 生成不同的css颜色文件， 每个文件内部命名前加上.custom-颜色值做命名空间。
2. 然后在 `app.vue` 里引入全部的颜色文件
3. 用户点击某种颜色，就在body加上 `class: custom-00a7898`
4. 

