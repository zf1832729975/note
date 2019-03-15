# VueX

## Vuex 是什么？

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

```js
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

    ```js
    <input type="text" v-model="$store.state.count">
    ```
