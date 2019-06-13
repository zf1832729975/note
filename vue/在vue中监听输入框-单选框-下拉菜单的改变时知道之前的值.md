在vue中监听输入框-单选框-下拉菜单的改变时知道之前的值

```html
<select v-model="value">
	<option>1</option>
	<option>3</option>
	<option>4</option>
</select>
```
```js
watch: {
	// 通过 监听 value，会传入两个参数，现在的值和以前的值
    value (currValue, oldValue) {
        
    }
}
```

