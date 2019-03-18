# VueX

# Vuex 是什么？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 `devtools extension`，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能

## 安装

### CDN

指定版本
> `<script src="https://unpkg.com/vuex@2.0.0"></script>`

最新版本
> `<script src="https://unpkg.com/vuex"></script>` 

### NPM

> npm install vuex --save

### Promise

Vuex 依赖 Promise。如果你支持的浏览器并没有实现 Promise (比如 IE)，那么你可以使用一个 polyfill 的库，例如 es6-promise

## 使用

1. 导入  `import Vuex form "vuex"`
2. 注册Vuex到Vue中 `Vue.use(Vuex)`
3. new Vuex.store()实例， 得到一个 数据仓储对象
4. 将 vuex 创建的 store 挂载到 Vue 实例上

main.js

```javascript
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
// 1. 导入
import Vuex form "vuex"
// 2. 注册Vuex到Vue中
Vue.use(Vuex)
// 3. new Vuex.store()实例， 得到一个 数据仓储对象
let store = new Vuex.Store({
    /**
     * 相当于一个仓库， 用来存储东西
    */
    state: {  // 通过 this.$store.state.xxx
        count: 0  
    },
    mutations: { // 通过 this.$store.commit("方法名称")来调用方法
       /**
        * 这里的参数是第一个是国定的， 是 state
        * 有且最多只有两个参数， 第二个参数才是正常的传参，
        * 如果参数超过两个，后面的参数是Undefined
        * 可用通过数组或者对象来传达到传多个的效果
       */
        increment (state) {
            // 变更状态
            state.count++
        }
    },
    getters: { // 通过 this.$store.getters.xxx访问
        // 相当于管道符(|), 对数据进行包装
        doneTodosCount: (state, getters) => {
                return getters.doneTodos.length
            }
        }
});

let vm = new Vue({
    el: "#app",
    router,   // 子组件可以通过 this.$router 访问
    // 4. 将 vuex 创建的 store 挂载到 Vue 实例上
    store,   // 子组件可以通过 this.$store 访问
    template: '<App/>>'
    components: { App }
});

```

- 我们能通过 `this.$store.state.xxx` 修改数据， 但我们不建议这么做，因为有多个修改公共的仓库，当出错时不好找到是哪里出错了

- 我们应该通过调用方法 `this.$store.commit("方法名")` 这样来更改数据

- 在组件的模板中， 我们可以省去 `this`， 通过 `$store.state.xxx` 访问

    ```javascript
    <input type="text" v-model="$store.state.count">
    ```



## 核心概念



### State

```js
import Vuex from 'vuex'
Vue.use(vuex)
let store = new Vuex.Store({
    state: {
        count: 0
    }
})
```

- 访问 store 里的count通过 `this.$store.state.xxx`,  在vue的组件的模板中可以直接通过 `$store.state.xxx` 访问

### Getter

有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：

```js
computed: {
  doneTodosCount () { 
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接受 state 作为其第一个参数：

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => { // 通过 this.$store.getters.xxx访问
      // 相当于管道符(|), 对数据进行包装
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

#### 通过属性访问

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

Getter 也可以接受其他 getter 作为第二个参数：

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1
```

我们可以很容易地在任何组件中使用它：

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

#### 通过方法访问

你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果

### Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {  // 第一个参数都是 state, 第二个参数才是正常传参， 有且只能有一个参数
      // 变更状态
      state.count++
    }
  }
})
```

- 通过 `this.$store.commit("方法名"， 参数)` 来访问方法， 注意， 有且只能有一个参数

### Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

访问模块a里的东西就可以通过 `strore.state.a.state.xxx 或 store.state.a.commit("方法名", 参数)`



## 项目结构



Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

1. 应用层级的状态应该集中到单个 store 对象中。
2. 提交 **mutation** 是更改状态的唯一方法，并且这个过程是同步的。
3. 异步逻辑都应该封装到 **action** 里面。

只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。

对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

```bash
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```



## 严格模式



开启严格模式，仅需在创建 store 的时候传入 `strict: true`：

```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```

在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

### 开发环境与发布环境

**不要在发布环境下启用严格模式！**严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。

类似于插件，我们可以让构建工具来处理这种情况：

```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```











