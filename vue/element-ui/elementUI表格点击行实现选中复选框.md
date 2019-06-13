# elementUI点击行时选中复选框

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190603100934446.gif)

在 `el-table` 部分加上 `@row-click` 和 `ref`

```html
 <el-table
           ref="handSelectTest_multipleTable"
           tooltip-effect="dark"
           :data="tableData"
           style="width:100%"
           height="500"
           @selection-change="handleSelectionChange"
           @row-click="handleRowClick"
           v-loading="loading"
           >
```

```js
     //点击复选框触发，复选框样式的改变
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //点击行触发，选中或不选中复选框
   	handleRowClick(row, column, event) {
        this.$refs.handSelectTest_multipleTable.toggleRowSelection(row);
        // console.log("this.selecTestContent", this.selectTestContent);
    },
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190603093916288.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3oxODMyNzI5OTc1,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190603094504435.png)