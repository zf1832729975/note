# JavaScript之 Array

通过构造函数创建数组

```js
let arr = new Array(10);  // 创建一个数组， 数组的值为空，长度为10， 
arr[0] == undefined  // true

let arr = new Array(2, 3) // 创建一个数组， 数组的值为[2, 3], 长度为2 
```

通过直接量

```js
let arr = []  // 创建一个空数组
let arr2 = [1, 2, 4] // 创建一个数有三个元素的数组
```

推荐使用直接量创建

## 属性

### Array.length

`length ` 是 `Array`的实例属性。返回或设置一个数组中的元素个数。该值是一个无符号 32bit （ 0- 232-1）整数，并且总是大于数组最高项的下标。

## 方法



