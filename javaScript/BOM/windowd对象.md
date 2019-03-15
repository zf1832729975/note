# Window对象

1. Window对象:

    - window对象是BOM的核心， window对象指当前的浏览器窗口, 所有的JavaScirpt全局对象，函数已经变量均自动成为 window 对象的成员

    - 全局变量是 window 对象的属性

    - 全局函数是 window 对象的方法

    - 甚至HTML DOM 的 document 也是 window 对象的属性之一

2. window尺寸：

    - window.innerHeight:  浏览器窗口的内部高度

    - window.innerWidht: 浏览器窗口的内部宽度

3. window方法：

    - window.open(): 打开新的窗口

    - window.close(): 关闭当前窗口

```html

<div class="container">

<input type="button" name="" value="打开新的窗口" onclick="openNewWindow()">
</div>

<script type="text/javascript">

function openNewWindow () {
    window.open('./newWindow.html', "新窗口名字", "height = 200,"+
    "width = 200, top = 100, left = 100, toolbar = no, menumbar = no,");
}

 </script>
```