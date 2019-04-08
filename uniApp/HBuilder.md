# uniApp的使用教程

## 基本使用

官网： <https://uniapp.dcloud.io/>

下载地址: <http://www.dcloud.io/hbuilderx.html>

**配置环境变量**

在安装目录下有个：\plugins\launcher\tools\adbs

拷贝地址： D:\worksoft\HBuilderX\plugins\launcher\tools\adbs

在环境变量 path 中新建环境变量，粘贴地址

**配置手机模拟器**

下载手机模拟器 MUMU 地址： <http://mumu.163.com/>

配置 hubilder 的连接配置 MUMU手机模拟器浏览器运行在 7555端口

```shell
adb connect 127.0.0.1:7555
```

**配置微信小程序**

在微信开发者工具里运行：进入项目，点击工具栏的运行 -> 运行到小程序模拟器 -> 微信开发者工具，即可在微信开发者工具里面体验uni-app。

第一次使用时，需要先配置小程序ide的相关路径，才能运行成功，需在输入框输入微信开发者工具的安装路径。 若HBuilderX不能正常启动微信开发者工具，需要开发者手动启动，然后将uni-app生成小程序工程的路径拷贝到微信开发者工具里面，在HBuilderX里面开发，在微信开发者工具里面就可看到实时的效果。

## 目录结构

```
┌─components            uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                存放本地网页的目录
├─platforms             存放各平台专用页面的目录
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息
└─pages.json            配置页面路由、导航条、选项卡等页面类信息
    
```

**Tips**

- `static` 目录下的 `js` 文件不会被编译，如果里面有 `es6` 的代码，不经过转换直接运行，在手机设备上会报错。
- `css`、`less/scss` 等资源同样不要放在 `static` 目录下，建议这些公用的资源放在 `common` 目录下。

| 有效目录  |     说明     |
| :-------: | :----------: |
| app-plus  |    5+App     |
|    h5     |      H5      |
| mp-weixin |  微信小程序  |
| mp-alipay | 支付宝小程序 |
| mp-baidu  |  百度小程序  |

## pages.json 

`pages.json` 文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口表现、设置多 tab 等。

### [配置项列表](https://uniapp.dcloud.io/collocation/pages?id=%e9%85%8d%e7%bd%ae%e9%a1%b9%e5%88%97%e8%a1%a8)

| 属性                                                         | 类型         | 必填 | 描述                    | 平台兼容   |
| :----------------------------------------------------------- | :----------- | :--- | :---------------------- | :--------- |
| [globalStyle](https://uniapp.dcloud.io/collocation/pages?id=globalstyle) | Object       | 否   | 设置默认页面的窗口表现  |            |
| [pages](https://uniapp.dcloud.io/collocation/pages?id=pages) | Object Array | 是   | 设置页面路径及窗口表现  |            |
| [tabBar](https://uniapp.dcloud.io/collocation/pages?id=tabbar) | Object       | 否   | 设置底部 tab 的表现     |            |
| [condition](https://uniapp.dcloud.io/collocation/pages?id=condition) | Object       | 否   | 启动模式配置            |            |
| [subPackages](https://uniapp.dcloud.io/collocation/pages?id=subpackages) | Object Array | 否   | 分包加载配置            |            |
| [preloadRule](https://uniapp.dcloud.io/collocation/pages?id=preloadrule) | Object       | 否   | 分包预下载规则          | 微信小程序 |
| [workers](https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html) | String       | 否   | `Worker` 代码放置的目录 | 微信小程序 |

### globalStyle

用于设置应用的状态栏、导航条、标题、窗口背景色等

### [pages](https://uniapp.dcloud.io/collocation/pages?id=pages)

`uni-app` 通过 pages 节点配置应用由哪些页面组成，pages 节点接收一个数组，数组每个项都是一个对象，其属性值如下：

| 属性  | 类型   | 默认值 | 描述                                                         |
| :---- | :----- | :----- | :----------------------------------------------------------- |
| path  | String |        | 配置页面路径                                                 |
| style | Object |        | 配置页面窗口变现，配置项参考下方 [pageStyle](https://uniapp.dcloud.io/collocation/pages?id=style) |

**Tips：**

- pages节点的第一项为应用入口页（即首页）
- **应用中新增/减少页面**，都需要对 pages 数组进行修改
- 文件名**不需要写后缀**，框架会自动寻找路径下的页面资源

### [style](https://uniapp.dcloud.io/collocation/pages?id=style)

用于设置每个页面的状态栏、导航条、标题、窗口背景色等。

页面中配置项会覆盖 [globalStyle](https://uniapp.dcloud.io/collocation/pages?id=globalstyle) 中相同的配置项

### [app-plus](https://uniapp.dcloud.io/collocation/pages?id=app-plus)

配置编译到 App 平台时的特定样式，以下仅列出常用，更多配置项参考 [WebviewStyles](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewStyles)。

仅应用首页支持完整的 `app-plus` 配置，二级页面支持以下配置：

| 属性              | 类型   | 默认值 | 描述                                                         |
| :---------------- | :----- | :----- | :----------------------------------------------------------- |
| titleNView        | Object |        | 导航栏                                                       |
| bounce            | String |        | 页面回弹效果，设置为 "none" 时关闭效果。                     |
| softinputNavBar   | String |        | 软键盘上导航条的显示模式，设置为 "none" 时关闭导航条。仅ios生效 |
| pullToRefresh     | Object |        | 下拉刷新                                                     |
| scrollIndicator   | String |        | 滚动条显示策略，设置为 "none" 时不显示滚动条。               |
| animationType     | String | pop-in | 窗口显示的动画效果，详见：[窗口动画](https://uniapp.dcloud.io/api/router?id=animation)。仅 5+App 生效，H5 平台不支持。 |
| animationDuration | Number | 300    | 窗口显示动画的持续时间，单位为 ms。仅 5+App 生效，H5 平台不支持。 |

#### [导航栏](https://uniapp.dcloud.io/collocation/pages?id=app-titlenview)

| 属性            | 类型   | 默认值   | 描述                                                         | 最低版本 |
| :-------------- | :----- | :------- | :----------------------------------------------------------- | :------- |
| backgroundColor | String | #F7F7F7  | 背景颜色，颜色值格式为"#RRGGBB"。                            |          |
| buttons         | Array  |          | 自定义按钮，详见 [buttons](https://uniapp.dcloud.io/collocation/pages?id=app-titlenview-buttons) |          |
| titleColor      | String | #000000  | 标题文字颜色                                                 |          |
| titleOverflow   | String | ellipsis | 标题文字超出显示区域时处理方式。"clip"-超出显示区域时内容裁剪；"ellipsis"-超出显示区域时尾部显示省略标记（...）。 |          |
| titleText       | String |          | 标题文字内容                                                 |          |
| titleSize       | String |          | 标题文字字体大小                                             |          |
| type            | String | default  | 导航栏样式。"default"-默认样式；"transparent"-透明渐变。     |          |
| tags            | Array  |          | 原生 View 增强，详见：[5+ View 控件](http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.ViewDrawTagStyles) |          |
| searchInput     | Object |          | 原生导航栏上的搜索框样式，详见：[searchInput](https://uniapp.dcloud.io/collocation/pages?id=app-titlenview-searchinput) |          |







































