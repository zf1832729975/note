# 在nodejs中使用 jwt(JSON Web Token)进行身份验证

## 使用

```shell
# 首先要安装 jsonwebtoken
npm install jsonwebtoken --save
```

```js
// 新建一个文件 auth.js
const jwt = require('jsonwebtoken')
// 秘钥
const mySecret = 'xxskdkfywhlslyHSLDJL_SDXsldjksjdljs'
/*
 playload: token携带的数据，一般不能包含用户的一些重要信息
 secret: 用来加密和解密的秘钥
 expiresIn: 过期时间 'day', 'h', 's'
*/
module.exports = {
  /**
   * 签发 Token
   * @param {Object} payload {name: , pwd: }
   * @param {*} secret 秘钥
   */
  sign (payload, secret = mySecret) {
    return jwt.sign(payload, secret, { expiresIn: '1h' })
  },
  /**
   * token: 要验证的token
   * secret: 秘密， 秘钥
   * 验证不正确会直接走 error 
   */
  verify (token, secret = mySecret) {
    let result = false
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
          // 验证不通过时直接走这里，后面的 return 都不会走的
        console.log('不正确', error.message)
      } else {
        console.log('验证通过', decoded)
        result = true
      }
    })
    return result
  }
}
```

