# Proxy

## 概述

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

## 用法

Proxy接受两个参数。第一个参数是所要代理的目标对象，即如果没有Proxy的介入，操作原来要访问的就是这个对象；第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作

注意，要使得Proxy起作用，必须针对Proxy实例（下例是proxy1对象）进行操作，而不是针对目标对象（下例是boj对象）进行操作。

如果handler没有设置任何拦截，那就等同于直接通向原对象。

```js
/**
var proxy = new Proxy(target, handler);
get(target, propKey, receiver)
target： 拦截的目标对象
popKey: proxy1访问的对象，
receiver：Proxy的实列
*/
let obj = {name: 'zhou', age: 20};

/**
 * target: 要拦截的对象
 * handle: 操作
 * new Proxy(target, handle)
*/
let proxy1 = new Proxy(obj, {
    /**
     * 拦截对象属性的读取
     * target: 拦截的目标对象, 这里的就是obj
     * propKey: 拦截到访问的属性 如 proxy1.name 中的 name
     * receiver: proxy1的实列
    */
    get: function(target, propKey, receiver) {
        console.log("get", arguments);
    }
    /**
     * 拦截对象属性的设置
     * value: 设置的值
    */
    set: function(target, propKey, value, receiver) {
        console.log("set", arguments);
    }
})
proxy1.name;  // 执行 proxy1 中的 get 方法
proxy1.name = 'xiao';  // 执行 proxy1 中的 set 方法

```

我们通过 `console.log(arguments)`; 可以看看参数里面是什么东西

上面代码执行结果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190314114400474.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3oxODMyNzI5OTc1,size_16,color_FFFFFF,t_70)
### Proxy 支持的拦截操作

- `get(target, propKey, receiver)`：拦截对象属性的读取，比如`proxy.foo和proxy['foo']`。

- `set(target, propKey, value, receiver)`：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。

- `has(target, propKey)`：拦截propKey in proxy的操作，返回一个布尔值。

- `apply(target, object, args)`：拦截 Proxy 实例作为**函数调用**的操作，比如`proxy(...args)`、`proxy.call(object, ...args)、proxy.apply(...)`

参考: <http://es6.ruanyifeng.com/#docs/proxy>