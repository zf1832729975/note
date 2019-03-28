# js自定义工具方法

```js
// 切换类
export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  element.className = className
}

// 添加样式
export function addStyle (dom, obj) {
  if (!dom || !obj) return
  for (let prop in obj) {
    dom.style[prop] = obj[prop]
  }
}

// 添加&删除类
export function addClass (dom, className) {
    if (dom.classList.add) {
        dom.classList.add(className)
    } else {
		dom.className += dom.className + className
    }
}
```



