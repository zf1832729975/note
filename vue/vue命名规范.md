# vue 的命名规范

#### 好例子

**单文件组件**，就是vue中的 `.vue` 文件

**字符串模板**，是写在组件的 template 里面的

**DOM 模板**， 就是直接写在 HTML 中的， 如写在 html文件中的 template （`<template id=my-component""></template>` ）之间的代码， 通过 组件的里的 `template` 属性指定 , `template: '#my-component'`

```html
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent/>
<!-- 在 DOM 模板中 -->
<my-component></my-component>
```



## 组件实例顺序

## [优先级 C 的规则：推荐 (将选择和认知成本最小化)](https://cn.vuejs.org/v2/style-guide/#%E4%BC%98%E5%85%88%E7%BA%A7-C-%E7%9A%84%E8%A7%84%E5%88%99%EF%BC%9A%E6%8E%A8%E8%8D%90-%E5%B0%86%E9%80%89%E6%8B%A9%E5%92%8C%E8%AE%A4%E7%9F%A5%E6%88%90%E6%9C%AC%E6%9C%80%E5%B0%8F%E5%8C%96)

### [组件/实例的选项的顺序推荐](https://cn.vuejs.org/v2/style-guide/#%E7%BB%84%E4%BB%B6-%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%89%E9%A1%B9%E7%9A%84%E9%A1%BA%E5%BA%8F-%E6%8E%A8%E8%8D%90)

**组件/实例的选项应该有统一的顺序。**

这是我们推荐的组件选项默认顺序。它们被划分为几大类，所以你也能知道从插件里添加的新属性应该放到哪里。

1. **副作用** (触发组件外的影响)
   - `el`
2. **全局感知** (要求组件以外的知识)
   - `name`
   - `parent`
3. **组件类型** (更改组件的类型)
   - `functional`
4. **模板修改器** (改变模板的编译方式)
   - `delimiters`
   - `comments`
5. **模板依赖** (模板内使用的资源)
   - `components`
   - `directives`
   - `filters`
6. **组合** (向选项里合并属性)
   - `extends`
   - `mixins`
7. **接口** (组件的接口)
   - `inheritAttrs`
   - `model`
   - `props`/`propsData`
8. **本地状态** (本地的响应式属性)
   - `data`
   - `computed`
9. **事件** (通过响应式事件触发的回调)
   - `watch`
   - 生命周期钩子 (按照它们被调用的顺序)
     - `beforeCreate`
     - `created`
     - `beforeMount`
     - `mounted`
     - `beforeUpdate`
     - `updated`
     - `activated`
     - `deactivated`
     - `beforeDestroy`
     - `destroyed`
10. **非响应式的属性** (不依赖响应系统的实例属性)
    - `methods`
11. **渲染** (组件输出的声明式描述)
    - `template`/`render`
    - `renderError`