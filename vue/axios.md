# axios的基本使用

## 安装

```shell
npm install axios --save
```

## 在vue中使用

### mais.js中引入

```js
import axios from 'axios'
Vue.prototype.$axios = axios
```

### 全局配置

```js
// main.js
// 全局配置， 在以后的请求中都会自动加上这个地址
axios.defaults.baseURL = 'https://zf-vue-demo.firebaseio.com'
```

## 请求方法

### 实例方法

```shell
axios.request(config)		# 
axios.get(url[, config])	#
axios.delete(url[, config])	# 删除
axios.head(url[, config])   # 
axios.options(url[, config])#
axios.post(url[, data[, config]])	
axios.put(url[, data[, config]])  	# 编辑 修改 用这个
axios.patch(url[, data[, config]])  # 修改
```

### get

```js
axios.get('/user?id=1234')
    .then(res => {
    	console.log(res)
	})
    .catch(err => {
		console.log(err)    
	})
// 可选的， 上面的请求可以这样做
axios.get('/user', {
    params: {
        id:123
    }
})
```



### post

```js
axios.post('/user', {
    firstName: 'Red',
    lastNaem: 'good'
})
.then(res => {})
.catch(err => {})
```

### 执行多个并发请求

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
	.then(axios.spread((acct, perms) => {
        // 两个请求现在都执行完成
	}))
```

## axios API

可以通过向 `axios` 传递相关配置来创建请求

##### axios(config)

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

##### axios(url[, config])

```js
// 发送 GET 请求（默认的方法）
axios('/user/12345');
```

#### 并发

处理并发请求的助手函数

##### axios.all(iterable)

##### axios.spread(callback)

#### 创建实例

可以使用自定义配置新建一个 axios 实例

##### axios.create([config])

```js
var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

## 响应结构

某个请求的响应包含以下信息

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

  // `config` 是为请求提供的配置信息
  config: {}
}
```

使用 `then` 时，你将接收下面这样的响应：

```js
axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

在使用 `catch` 时，或传递 [rejection callback](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 作为 `then` 的第二个参数时，响应可以通过 `error`对象可被使用，正如在[错误处理](https://www.kancloud.cn/yunye/axios/234845#handling-errors)这一节所讲。

## 配置的默认值/defaults

你可以指定将被用在各个请求的配置默认值

### 全局的 axios 默认值

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axio
```





