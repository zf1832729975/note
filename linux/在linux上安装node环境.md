1. 这个比较小，一下就好了
    [官网](https://nodejs.org/en/download/)
2. 我自己安装在  /usr/local/nodejs

1. 需要新建目录
    mkdir /usr/local/nodejs
    cd /usr/local/nodejs
    wget <https://nodejs.org/dist/v10.13.0/node-v10.13.0-linux-x64.tar.xz>
2. 解压
    tar -xvf   node-v10.13.0-linux-x64.tar.xz
3. 将node-v10.13.0-linux-x64下的文件全部移到  /usr/local/nodejs/
    mv node-v10.13.0-linux-x64/* /usr/local/nodejs/
4. 建立软连接，变为全局即可
    ln -s /usr/local/nodejs/bin/node /usr/local/bin/node
    ln -s /usr/local/nodejs/bin/npm /usr/local/bin/npm
5. 在任何目录输入 node -v 显示版本号就安装完毕
    不需要的安装文件可以使用  rm "文件名"  删除掉了

作者：红瞳雀

链接：https://www.jianshu.com/p/c35a580b197d

来源：简书

简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。