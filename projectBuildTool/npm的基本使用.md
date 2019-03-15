
# npm 的基本使用

## npm install 命令

```shell
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>

alias: npm i
common options: [-P|--save-prod|-D|--save-dev|-O|--save-optional]
                [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]

```

### -g

全局安装

### -D, --save-dev: Package will appear in your` dependencies`

包将出现在依赖项中

### -P, --save-prod: Package will appear in your` dependencies`

包将出现在依赖项中。这是默认值，除非出现-D或-O

安装包信息将加到`devDependencies`（开发阶段的依赖），所以开发阶段一般使用它

### -D, --save-dev: Package will appear in your `devDependencies`

包将出现在您的`devDependencies`中

### -O, --save-optional: Package will appear in your `optionalDependencies`.

包将出现在`optionalDependencies`中

### --no-save: Prevents saving to dependencies

防止保存到依赖项

### -E, –save-exact 精确安装指定模块版本

安装包，默认会安装最新的版本

    npm install jquery --save-exact 或
    npm install jquery -E

参考链接：<https://www.npmjs.cn/cli/install/>