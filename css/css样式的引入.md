# css 的引入

链接样式

```html
<link rel="stylesheet" type="text/css" href="reset.css" />
```
导入样式

```css
/*css*/ 
@import url(common.css);
```

```index
<!-- index.html -->
<style type="text/css">
@import url(index.css)
</style>
```


## `link` 和 `@import` 的区别

- link 是html引入css方式， @import是css引入方式
- 浏览器会先加载页面时同步加载link引入的css， 页面加载完成后，再加载@import引入的css
- 浏览器对link的兼容性高， 
- 优先级， link > @import

