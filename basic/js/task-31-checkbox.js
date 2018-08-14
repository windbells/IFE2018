function createCheckBox(checkBox, data) {
    var html = "";  // 生成全选checkbox的html
    let checkAll = "<input type='checkbox' value='all' data-index='all'/>" + "全选"; // 给一个自定义属性data-index=all表示为全选checkbox
    html += checkAll;
    //遍历参数对象
    for (let i in data) {
        //生成各个子选项checkbox的html，给一个自定义data-index=data[i].value属性表示为子选项
        let check = "<input type='checkbox' value='" + data[i].text + "' data-index='" + data[i].value + "'/>" + data[i].text;
        html += check;
    }
    checkBox.innerHTML = checkBox.innerHTML + html;

    //定义事件委托机制，监听复选框的点击事件
    checkBox.addEventListener("click", function(ev) {
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == "input") {
            // 读取自定义属性
            var index = target.dataset.index;
            var selector = "#" + checkBox.id + " input";
            var inputList = document.querySelectorAll(selector);
            if (index == "all") { //如果是全选，做全选对应的逻辑
                checkedAll(inputList);
                // regionChecked = getCheckBox(regionCheckBox); //地区的选中复选框列表
                // productChecked = getCheckBox(productCheckBox); //商品的选中复选框列表
                // flag = judgeRegAndPro(); //判断商品和地区的选中个数
                // // 渲染新的表格(根据select选项获取数据)
                // createNewTable(flag, createData());
            }
            else {
                var count = countSelect(inputList);
                if (count == 3) {
                    checkedAll(inputList);
                }
                else if (count == 2 ) {
                    clearAll(inputList);  //有一个没选上,则全选取消勾选
                }
                else if(count == 0) {
                    // ev.preventDefault(); //阻止这次点击默认事件
                    target.checked = true;  //// 如果点击后数组的长度为0，说明当前点击是最后一个，则不能修改
                }
            }
            // 渲染新的表格(根据select选项获取数据)
            regionChecked = getCheckBox(regionCheckBox); //地区的选中复选框列表
            productChecked = getCheckBox(productCheckBox); //商品的选中复选框列表
            flag = judgeRegAndPro(); //判断商品和地区的选中个数
            // 渲染新的表格(根据select选项获取数据)
            createNewTable(flag, createData());
        }
    });
}


// 点击全选时，如果单个选项中只要有一个不是被选上的状态，则进行全选操作
function checkedAll(checkList){
    for(let i in checkList){
        checkList[i].checked = true;
    }
}

// 其中一个取消勾选时，全选按钮取消勾选
function clearAll(checkList) {
    checkList[0].checked = false;
}

// 计算有多少个选中的复选框
function countSelect(checkList) {
    var count = 0; //计算有多少个checkbox被选中
    for (let i=1;i<checkList.length;i++) {
        if (checkList[i].checked)
            count++;
    }
    return count;
}
