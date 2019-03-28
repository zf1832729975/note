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

## Array.length

`length` 是 `Array`的实例属性。返回或设置一个数组中的元素个数。该值是一个无符号 32bit （ 0- 232-1）整数，并且总是大于数组最高项的下标。

## Array.isArray(arr)

**Array.isArray(arr)** 用于确定传递的值是否是一个 `Array`

```js
Array.isArray([2, 3, 5,6]);
// true
Array.isArray(Array.prototype)
// true
Array.isArray({foo: 23});
// false
Array.isArray("ik");
// false
Array.isArray(undefined)
// false
```

- arr: 需要坚持的值
- 返回值： 如果对象是 `Array` , 则为true； 否则为false

## Array.prototype.forEace()

`arr.forEach(callback[, thisArg])`方法对数组的每个元素执行以下提供的函数（回调函数）

```js
let arr1 = ['a', 'b', 'black', 12]

arr1.forEach(item => {
    console.log(item)
})

// 'a'
// 'b'
// 'black'
// 12

```

- **参数**
  - `callback`
    - `curentValue` : 数组正在处理的当前元素
    - `index` |可选 ： 数组中正在处理的当前元素的索引
    - `array` |可选 ： `forEach()` 方法正在操作的数组
  - `thisArg` | 可选
    - 可选参数。当执行回调函数时用作 `this` 的值(参考对象)。   如果给 `forEach()` 传递了 `thisArg` 参数，当调用时，它将被传给 `callback` 函数，作为它的 `this` 值。否则，将会传入 [`undefined`作为它的` `this` 值。`callback` 函数最终可观察到 `this` 值。
- **返回值**
  - `undefined`

### 示例

**for循环转换为forEach**

```js
const items = ['item1', 'item2', 'item3'];
const copy = [];

// before
for (let i=0; i<items.length; i++) {
  copy.push(items[i]);
}

// after
items.forEach(function(item){
  copy.push(item);
});
```

### 注意

 没有办法中止或者跳出 `forEach()` 循环，除了抛出一个异常。如果需要，使用 `forEach()` 方法是错误的。

若需要提前终止循环，可以使用：

- 简单循环
- `for...of` 循环
- [`Array.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [`Array.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [`Array.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [`Array.prototype.findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

这些数组方法可以对数组元素判断，以便确定是否需要继续遍历：[`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)，[`some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)，[`find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)，[`findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

若条件允许，也可以使用 [`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 提前过滤出需要遍历的部分，再用 `forEach()` 处理。



## Array.prototype.some()

### 描述

`some()` 为数组中的每一个元素执行一次 `callback` 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，`some()` 将会立即返回 `true`。否则，`some()` 返回 `false`。`callback` 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。



`arr.some()` 方法测试是否至少有一个元素通过由提供的函数实现的测试

**注意：**对于放在空数组上的任何条件，此方法返回`false`。

```js
var array = [1, 2, 3, 4, 5];

var even = function(element) {
  // checks whether an element is even
  return element % 2 === 0;
};

console.log(array.some(even));
// expected output: true

```

### 语法

```javascript
arr.some(callback(element[, index[, array]])[, thisArg])
```

- 参数
  - `callback`
    - `element`:  数组正在处理的元素。
    - `index：`|可选：数组中正在处理的元素的索引值。
    - `array`|可选: `some()`被调用的数组。
  - `thisArg`|可选
    -  执行 `callback` 时使用的 `this` 值。
- 返回值
  - 如果回调函数返回任何数组元素的[truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy)值，则返回 **true**；否则为 **false**。

## Array.prototype.map()

`map` 方法会给原数组中的每个元素都按顺序调用一次  `callback` 函数。`callback` 每次执行后的返回值（包括`undefined`)组合起来形成一个新数组

```js
var arr1 = [1, 4, 9, 16];

const map1 = array1.map(x => x * 2);

console.log(map1);
//[2, 8, 18, 32], arr1没有变
```

#### 语法

```js
arr.map(callback(currentValue[, index[, array]]) => {
    // 返回一个新的数组
}[, thisArg])
```



##### 参数

- `callback`

  生成新数组元素的函数，使用三个参数：

  - `currentValue`
    -  `callback` 数组中正在处理的当前元素。
  - `index`可选 
    - `callback` 数组中正在处理的当前元素的索引。
  - `array`可选 
    - `callback`  `map` 方法被调用的数组。

- `thisArg`可选

  执行 `callback` 函数时使用的`this` 值。

#### 返回值

一个新数组，每个元素都是回调函数的结果。