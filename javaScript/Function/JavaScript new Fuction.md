# JavaScript new Function

new Function， 可以往函数里动态的传递内容，

语法

```js
let func = new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

arg1...是参数，可以有任意个，最后一个参数是函数体

这三个意思相同：

```js
new Function('a', 'b', 'return a + b'); // 基础语法
new Function('a,b', 'return a + b'); // 逗号分隔
new Function('a , b', 'return a + b'); // 逗号加空格分隔
```

例如

```js
// 正常的函数
function add (x, y) {
    return x + y 
}

// 用 new Function 
var add = new Function('x', 'y', 'return x+y')

```

具体可以动态的用参数来调用其他函数

```js
function markMutations (scopedStr, arr) {
  let res = {}
  arr.map(name => {
    // eslint-disable-next-line no-new-func
    res[`update${name.charAt(0).toUpperCase() + name.slice(1)}`]
     = new Function('state', 'val', 
     `${scopedStr}.${name}.set(state, val); `)
  })
  return res
}

let arr = ['add', 'base']
markMutations('window', arr)
// => 最终可以得到
{
    updateAdd: function(state, val) {
        window.add.set(state, val)
    },
    updaeBase: function(state, val) {
        window.add.set(state, val)
    }
}
// 实现了函数内容动态的调用其他方法函数
```



**闭包（Closure）**

通常，函数将它所创建的位置记录在特殊属性[[Environment]]中。 它引用了创建地点的词法环境。

但是当使用new Function()创建函数时，其[[Environment]]不是引用当前的词法环境，而是引用全局环境。

```js
function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}

getFunc()(); // error: value is not defined
```

与常规方法比较：


```js
function getFunc() {
  let value = "test";

  let func = function() { alert(value); };

  return func;
}

getFunc()(); // "test", 来自getFunc的词法环境
```



这个特殊的new Function表面看起来很奇怪，但在实践中显得非常有用。

想象一下，我们必须从字符串创建一个函数。在编写脚本时不知道该函数的代码（这就是我们不使用常规函数的原因），但在执行过程中将会知道。我们可能会从服务器或其他来源收到它。

我们的新函数需要与主脚本进行交互。

也许我们希望它能够访问外部的局部变量？

问题是在JavaScript发布到生产之前，它是使用minifier压缩的——一个通过删除额外的注释，空格来缩小代码的特殊程序，而且 - 重要的是，会将局部变量重命名为较短的变量。

例如，如果一个函数中有let userName，那么minifier会替换它为let a（或者如果a被占用，则用另一个字母替换），这个过程会在任何地方进行。这通常是一件安全的事情，因为被替换的变量是局部的，函数外部没有任何东西可以访问它。并且在函数内部，minifier取代了它的每一个提及。Minifiers很聪明，他们会分析代码结构，所以他们不会破坏任何东西。他们不是只会愚蠢地发现和替换。

但是，如果new Function可以访问外部变量，那么它将无法找到userName，因为userName在代码缩小后才作为字符串传入。

**所以，即使我们可以在 new Function中 访问外部词汇环境，我们也会遇到 minifiers的问题。**

而这时，new Function的“特色”可以让我们免于犯错。

它强制执行更好的代码。如果我们需要将某些东西传递给由new Function创建的函数，我们应该将它作为参数显式传递（可以避免直接读取外部变量时产生的问题）。

我们的“sum”函数实际上是这样正确使用的：



```js
let sum = new Function('a', 'b', 'return a + b');

let a = 1, b = 2;

// 外部变量作为参数传入
alert( sum(a, b) ); // 3
```


