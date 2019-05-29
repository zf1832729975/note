# vue-i18n和elementUI实现多语言工具类封装

```js
// main.js
import Vue from 'vue'
import App from '@/App'
import i18n from './i18n'

Vue.use(VueCookie)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  template: '<App/>',
  components: { App }
})

```





```js
// /src/i18n/index.js
import Vue from 'vue'
import VueI18n from 'vue-i18n' // 引入vue-i18n多语言包
import ElementUILocale from 'element-ui/lib/locale' // 引入element ui自带语言包

Vue.use(VueI18n) // vue使用vue-i18n

const DEFAULT_LANG = 'zh-CN' // 默认语言
const LOCALE_KEY = 'Language' // localStorage来存放的key

// 分别是本地的和elementUI引入
const _importLocale = lang => require(`@/i18n/lang/${lang}.json`)   
const _importUI     = lang => require(`element-ui/lib/locale/lang/${lang}`).default
// const _importUI     =  lang  => () import(`element-ui/lib/locale/lang/${lang}`)

// __import = file => () => import('@/views/' + file + '.vue')

/**
 * 配置好的方法，需要添加新语言直接在 languages 中添加新项
 */
export const __languages = {
    "zh-CN" : "简体中文",
    "en"    : "English",
    "zh-TW" :"繁体中文"
}

let _locales = {}
let _localesUI = {}
for (let lang in __languages) {
    _locales[lang] = _importLocale(lang)
    _localesUI[lang] = _importUI(lang)
}
const locales = _locales
const UIlocales = _localesUI

console.log('locales', locales)
console.log('UIlocales', UIlocales)

const i18n = new VueI18n({  // 创建带有选项的 VueI18n 实例
    locale: currLanguage(),   // 语言标识，默认语言
    messages: locales   // 语言包，上边创建的json文件
})


/**
 * 切换语言
 * @param {string} lang 
 */
export function changeLanguage(lang) {
    if (lang == undefined) {
        lang = window.localStorage.getItem(LOCALE_KEY)
        if (locales[lang] == undefined) {
            lang = DEFAULT_LANG
        }
    }
    window.localStorage.setItem(LOCALE_KEY, lang)
    Vue.config.lang = lang
    i18n.locale = lang
    ElementUILocale.use(UIlocales[lang])     // element ui 切换语言
}

/**
 * 当前语言
 */
export function currLanguage() {
    return window.localStorage.getItem(LOCALE_KEY) || DEFAULT_LANG
}


changeLanguage()

export default i18n



```

