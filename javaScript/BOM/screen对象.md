# Screen对象

1. screen 对象

    - window.screen 对象包含有关用户屏幕的信息

2. 属性：

    - screen.availWidth: 可用的屏幕宽度
    - screen.availHeight: 可用的屏幕的高度
    - scereen.Height: 屏幕高度
    - screen.Widht:   屏幕宽度

```html

<div>
    <input type="button" name="" value="Screen information" onclick="screenInfo()">
    <p id="ik"></p>
</div>
<script type="text/javascript">
    
    function screenInfo() {
        let ik = document.getElementById('ik');
        ik.innerHTML = "可用高度：" + screen.availHeight + 
        "\t可用宽度" + screen.availWidth + "<br />高度：" + screen.height +
        "\t宽度：" + screen.width;
    }
</script>
```
