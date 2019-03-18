# Object构造函数

**`Object`** 构造函数创建一个对象包装器。

## 可枚举和不可枚举属性

在JavaScript中，对象的属性分为可枚举和不可枚举之分，它们是由属性的 `enumerable`值决定的。可枚举性决定了这个属性能否被`for…i`n查找遍历到。

怎么判断属性是否可枚举

 js中基本包装类型的原型属性是不可枚举的，如Object, Array, Number等，如果你写出这样的代码遍历其中的属性：

## 属性

### Object.prototype

几乎所有的 JavaScript 对象都是 `Object` 的实例；一个典型的对象继承了 `Object.prototype `的属性（包括方法），尽管这些属性可能被遮蔽（亦称为覆盖）。但是有时候可能故意创建不具有典型原型链继承的对象，比如通过 `Object.create(null)` 创建的对象，或者通过 `Object.setPrototypeOf` 方法改变原型链。

改变`Object`原型，会通过原型链改变**所有**对象；除非在原型链中进一步覆盖受这些变化影响的属性和方法。这提供了一个非常强大的、但有潜在危险的机制来覆盖或扩展对象行为。

## 方法

### Object.keys(obj)

`Object.keys(obj)` 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环遍历该对象时返回的顺序一致 。-

- obj 要返回其枚举自身属性的对象。
- 返回值： 一个表示给定对象的所有**可枚举属性**的**字符串数组。**

```js
// simple array
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// getFoo is a property which isn't enumerable
var myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  } 
});
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
```

如果你想获取一个对象的所有属性,，甚至包括不可枚举的，请查看`Object.getOwnPropertyNames。`

####  注意

在ES5里，如果此方法的参数不是对象（而是一个原始值），那么它会抛出 TypeError。在ES2015中，非对象的参数将被强制转换为一个对象。

```js
Object.keys("foo");
// TypeError: "foo" is not an object (ES5 code)

Object.keys("foo");
// ["0", "1", "2"]                   (ES2015 code)
```

###  Object.prototype.hasOwnProperty(prop)

`hasOwnProperty(prop)`方法会返回一个布尔值，指示对象**自身**属性中是否具有指定的属性

- prop: 要检查的属性 `字符串` 名称或者 `Symbol`
- 返回：用来判断某个对象是否含有指定的属性的 `Boolean`

```js
o = new Object();
o.prop = 'exists';

function changeO() {
  o.newprop = o.prop;
  delete o.prop;
}

o.hasOwnProperty('prop');   // 返回 true
changeO();
o.hasOwnProperty('prop');   // 返回 false
```

所有继承了 `Objetct`的对象都会继承到 `hasOwnProperty` 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 `in` 运算符不同，**该方法会忽略掉那些从原型链上继承到的属性**。

```js
o = new Object();
o.prop = 'exists';
o.hasOwnProperty('prop');             // 返回 true
o.hasOwnProperty('toString');         // 返回 false
o.hasOwnProperty('hasOwnProperty');   // 返回 false
```

#### 遍历一个对象的所有自身属性

下面的例子演示了如何在遍历一个对象的所有属性时忽略掉继承属性，注意这里  `for...in` 循环只会遍历可枚举属性，所以不应该基于这个循环中没有不可枚举的属性而得出 `hasOwnProperty 是严格限制于可枚举项目的（如同 `[`Object.getOwnPropertyNames()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)）。

```js
var buz = {
    fog: 'stack'
};

for (var name in buz) {
    if (buz.hasOwnProperty(name)) {
        alert("this is fog (" + name + ") for sure. Value: " + buz[name]);
    }
    else {
        alert(name); // toString or something else
    }
}
```

### Object.getOwnPropertyNames()

**Object.getOwnPropertyNames(obj)** 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

- obj:   一个对象， 其子孙的可枚举和不可枚举属性的名称被返回
- 返回值： 在给定对象上找到的自身属性对应的字符串数组。

#### 描述

`Object.getOwnPropertyNames()` 返回一个数组，该数组对元素是 `obj`自身拥有的枚举或不可枚举属性名称字符串。 数组中枚举属性的顺序与通过 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环（或 [`Object.keys`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)）迭代该对象属性时一致。数组中不可枚举属性的顺序未定义。

#### 示例

```js
var arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]

// 类数组对象
var obj = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]

// 使用Array.forEach输出属性名和属性值
Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
  console.log(val + " -> " + obj[val]);
});
// 输出
// 0 -> a
// 1 -> b
// 2 -> c

//不可枚举属性
var my_obj = Object.create({}, {
  getFoo: {
    value: function() { return this.foo; },
    enumerable: false
  }
});
my_obj.foo = 1;

console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]
```

如果想获取可枚举的属性， 可以通过 `Object.keys(obj)` 或用 `fo...in` 循环（还会获取到原型链上的可枚举属性，可以通过 `hsoOwnProperty()` 方法过滤掉）

#### 注意

在 ES5 中，如果参数不是一个原始对象类型，将抛出一个 `TypeError` 异常。在 ES2015 中，非对象参数被强制转换为对象 **。**

```js
Object.getOwnPropertyNames('foo');
// TypeError: "foo" is not an object (ES5 code)

Object.getOwnPropertyNames('foo');
// ['length', '0', '1', '2']  (ES2015 code)
```



参考链接： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object





