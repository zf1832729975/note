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

## 路由跳转

navigator

#### [navigator](https://uniapp.dcloud.io/component/navigator?id=navigator)

页面链接。

**属性说明**

| 属性名                 | 类型    | 默认值          | 说明                                                         | 平台支持度 |
| :--------------------- | :------ | :-------------- | :----------------------------------------------------------- | :--------- |
| url                    | String  |                 | 应用内的跳转链接，值为相对路径或绝对路径，如："../first/first"，"/pages/first/first"，注意不能加 `.vue` 后缀 |            |
| open-type              | String  | navigate        | 跳转方式                                                     |            |
| delta                  | Number  |                 | 当 open-type 为 'navigateBack' 时有效，表示回退的层数        |            |
| animation-type         | String  | pop-in/out      | 当 open-type 为 navigateTo、navigateBack 时有效，窗口的显示/关闭动画效果，详见：[窗口动画](https://uniapp.dcloud.io/api/router?id=animation) | 5+App      |
| animation-duration     | Number  | 300             | 当 open-type 为 navigateTo、navigateBack 时有效，窗口显示/关闭动画的持续时间。 | 5+App      |
| hover-class            | String  | navigator-hover | 指定点击时的样式类，当hover-class="none"时，没有点击态效果   |            |
| hover-stop-propagation | Boolean | false           | 指定是否阻止本节点的祖先节点出现点击态                       | 微信小程序 |
| hover-start-time       | Number  | 50              | 按住后多久出现点击态，单位毫秒                               |            |
| hover-stay-time        | Number  | 600             | 手指松开后点击态保留时间，单位毫秒                           |            |

**open-type 有效值**

| 值           | 说明                         | 平台支持度                                                   |
| :----------- | :--------------------------- | :----------------------------------------------------------- |
| navigate     | 对应 uni.navigateTo 的功能,  | 保留当前页面，跳转到应用内的某个页面，使用`uni.navigateBack`可以返回到原页面。 |
| redirect     | 对应 uni.redirectTo 的功能   | 关闭当前页面，跳转到应用内的某个页面。                       |
| switchTab    | 对应 uni.switchTab 的功能    | 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。           |
| reLaunch     | 对应 uni.reLaunch 的功能     | 关闭所有页面，打开到应用内的某个页面。                       |
| navigateBack | 对应 uni.navigateBack 的功能 | 关闭当前页面，返回上一页面或多级页面。可通过 `getCurrentPages()` 获取当前的页面栈，决定需要返回几层。 |

```js
openView(path) {
    uni.navigateTo({
        url: path
    })
}
```

uni中还有用接口实现跳转的，类似于web开发中使用window.location.href
uni.navigateTo	保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
uni.redirectTo	关闭当前页面，跳转到应用内的某个页面。
uni.reLaunch	关闭所有页面，打开到应用内的某个页面。
uni.switchTab	跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
uni.navigateBack	关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。

**注：使用期间发现路由不能用下面导航栏的页面路径**

## 网络：

### 发起网络请求

```js
uni.request({
    url: "http://jsonplaceholder.typicode.com/users",
    method: "GET",	// 必须大写
    data:	{ 			// 请求参数
        id: 1
    },
    success: function (res) {	// 成功回调
        console.log('response', res)
    },
    fail: function (err) {	// 失败回调
        console.log(err)
    }
})
```



#### [uni.request(OBJECT)](https://uniapp.dcloud.io/api/request/request?id=request)

发起网络请求。

> 在各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。

**OBJECT 参数说明**

| 参数名       | 类型                      | 必填 | 默认值 | 说明                                               | 平台支持度         |
| :----------- | :------------------------ | :--- | :----- | :------------------------------------------------- | :----------------- |
| url          | String                    | 是   |        | 开发者服务器接口地址                               |                    |
| data         | Object/String/ArrayBuffer | 否   |        | 请求的参数                                         |                    |
| header       | Object                    | 否   |        | 设置请求的 header，header 中不能设置 Referer。     |                    |
| method       | String                    | 否   | GET    | 有效值详见下方说明                                 |                    |
| dataType     | String                    | 否   | json   | 如果设为 json，会尝试对返回的数据做一次 JSON.parse |                    |
| responseType | String                    | 否   | text   | 设置响应的数据类型。合法值：text、arraybuffer      | 支付宝小程序不支持 |
| success      | Function                  | 否   |        | 收到开发者服务成功返回的回调函数                   |                    |
| fail         | Function                  | 否   |        | 接口调用失败的回调函数                             |                    |
| complete     | Function                  | 否   |        | 接口调用结束的回调函数（调用成功、失败都会执行）   |                    |

**method 有效值**

必须大写，有效值在不同平台支持度不同。

| method  | 5+App |  H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 |
| :-----: | :---: | :--: | :--------: | :----------: | :--------: | :--------: |
|   GET   |   √   |  √   |     √      |      √       |     √      |     √      |
|  POST   |   √   |  √   |     √      |      √       |     √      |     √      |
|   PUT   |   √   |  √   |     √      |      x       |     √      |     √      |
| DELETE  |   √   |  √   |     √      |      x       |     √      |     x      |
| CONNECT |   √   |  √   |     √      |      x       |     x      |     x      |
|  HEAD   |   √   |  √   |     √      |      x       |     √      |     x      |
| OPTIONS |   √   |  √   |     √      |      x       |     √      |     x      |
|  TRACE  |   √   |  √   |     √      |      x       |     x      |     x      |

**success 返回参数说明**

| 参数       | 类型                      | 说明                                    |
| :--------- | :------------------------ | :-------------------------------------- |
| data       | Object/String/ArrayBuffer | 开发者服务器返回的数据                  |
| statusCode | Number                    | 开发者服务器返回的 HTTP 状态码          |
| header     | Object                    | 开发者服务器返回的 HTTP Response Header |

**data 数据说明**

最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String。转换规则如下：

- 对于 `GET` 方法，会将数据转换为 query string。例如 `{ name: 'name', age: 18 }` 转换后的结果是 `name=name&age=18`。
- 对于 `POST` 方法且 `header['content-type']` 为 `application/json` 的数据，会进行 JSON 序列化。
- 对于 `POST` 方法且 `header['content-type']` 为 `application/x-www-form-urlencoded` 的数据，会将数据转换为 query string

### 上传和下载

#### uni.uploadFile(object)

将本地资源上传到开发者服务器，客户端发起一个 `POST` 请求，其中 `content-type` 为 `multipart/form-data`。

```js
	uni.chooseImage({
        success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths;
            uni.uploadFile({	// 三个必填
                url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
                filePath: tempFilePaths[0], // 必填 要上传的文件资源路径
                name: 'file',	// 必填 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                formData: {
                    'user': 'test'
                },
                success: (uploadFileRes) => {
                    console.log(uploadFileRes.data);
                }
            });
        }
    });
```

#### uni.downloadFile（object）

下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。

































