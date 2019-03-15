# mock.js学习总结

## 一、语法规范

Mock.js 的语法规范包括两部分：

1. 数据模板定义（Data Temaplte Definition，DTD）
2. 数据占位符定义（Data Placeholder Definition，DPD）

### 数据模板定义 （DTD）

属性名   |  生成规则   | 属性值
`'name|rule': value`
生成规则可选
生成规则的7中模式  

1. `'name|min-max': value`
2. `'name|count': vlaue`
3. `'name|min-max.dmin-dmax': value`
4. `'name|min-max.dount': value`
5. `'name|count.dmin-dmax': value`
6. `'name|count.dcount':value`
7. `'name|+step': vlalue`

### 数据占位符定义 DPD

占位符 只是在属性值字符串中占个位置， 并不出现在最终的属性值中

```text
@占位符
@占位符(参数 [, 参数])
```

注意：

1. 用 `@` 符来标识其后的是字符串占位符。
2. 占位符引用的是 `Mock.Random` 中的方法
3. 通过 `Mock.Random.extend()`来扩展自定义占位符
4. 占位符 也可以引用 数据模板 中的属性
5. 占位符 会优先引用 数据模板 中的属性

```js
{
    name: {
        firsrt: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
}
// ==>
{
    'name': {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charlet Brenda Lopez"
    }
}

```