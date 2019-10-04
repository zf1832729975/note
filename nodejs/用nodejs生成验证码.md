# 在nodejs中使用 `svg-captcha` 生成验证码

要使用 `svg-captcha` 需要使用 `express-session`, `cookie-parser`

**安装**

```shell
# 单独安装
$ npm install svg-captcha --save
$ npm install express-session --save 
$ npm  install cookie-parser --save
# 三个一起安装
$ npm install svg-captcha express-session cookie-parser --save
```

**使用**

需要在根目录下的 `app.js` 中加入以下代码

```js
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session');

app.use(cookieParser())
app.use(session({
	secret: 'XXWWYY-XBYZHI',	// 用来对session数据进行加密的字符串.这个属性值为必须指定的属性。
	name: 'name',	// 表示cookie的name，默认cookie的name是：connect.sid
	cookie: {maxAge: 10000},	// cookie过期时间，毫秒。
	resave: false,	// 是指每次请求都重新设置session cookie
	saveUninitialized: true, // 无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
}))

```

在 `routes/` 下创建文件 `svg.js`

```js
// svg.js
/**
 * 生成验证码
 *
 */
const express = require('express');
const svgCaptcha = require('svg-captcha');
const router = express.Router();
router.get('/',(req, res)=>{
	const cap = svgCaptcha.create({
		size: 4,  //验证码长度、个数
		width: 100,
		height: 25,
		background: '#999',
		noise: 1, //干扰线条数
		fontSize: 32,	 // 字体大小
		// color: true,  // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有  
		ignoreChars: '0o1ij',   //验证码字符中排除'0o1i'
		// 翻转颜色
		inverse: false,		
	});
	req.session.captcha = cap.text.toLowerCase()// session 存储验证码数值
	res.type('svg'); // 响应的类型
	res.send(cap.data)
})
 
module.exports = router;



```















