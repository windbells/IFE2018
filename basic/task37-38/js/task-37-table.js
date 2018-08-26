
// 根据复选框选项获取数据,返回选中的复选框列表
function getCheckBox(checkBox) {
    let selector = "#" + checkBox.id + " input";
    let checked = []; //选中的复选框
    let inputList = document.querySelectorAll(selector);
    // 遍历数据，向要返回的数据list中添加符合两个表单项所选的数据
    for (let i=1;i<inputList.length;i++) {
        if (inputList[i].checked) {
            checked.push(inputList[i].value);
        }
    }
    return checked;
}

//渲染新的表格
function createNewTable(flag, dataList) {
    let tHead = createTableHead(flag); //获取表头
    let tBody = "";
    //输出每一行的表格HTML内容
    switch (flag) {
        case "00":
            for (let i in dataList) {
                tBody += "<tr data-index='" + i + "'><td data-index='" + i + "'>" + dataList[i]["product"] + "</td><td>" + dataList[i]["region"] + "</td>";
                for (let j in dataList[i]["sale"]) {
                    tBody += "<td data-index='" + i + j + "'>" + "<span class='active'>" + dataList[i]["sale"][j] + "</span>" +
                        "<em class='edit'>编辑</em><input type='text' class='input-text' value='" + dataList[i]["sale"][j] + "'><br><em class='cancle'>取消</em><em class='save'>保存</em></td>";
                }
                tBody += "</tr>";
            }
            break;
        case "01":
            for (let i in dataList) {
                tBody += "<tr data-index='" + i + "'>";
                if (i == 0) {
                    tBody += "<td data-index='" + i + "' rowspan='" + dataList.length +"'>" + dataList[i]["product"] + "</td><td>" + dataList[i]["region"] + "</td>";
                }
                else {
                    tBody += "<td data-index='" + i + "'>" + dataList[i]["region"] + "</td>";
                }
                for(let j in dataList[i]["sale"]) {
                    tBody += "<td data-index='" + i + j + "'>" + "<span class='active'>" + dataList[i]["sale"][j] + "</span>" +
                        "<em class='edit'>编辑</em><input type='text' class='input-text' value='" + dataList[i]["sale"][j] + "'><br><em class='cancle'>取消</em><em class='save'>保存</em></td>";
                }
                tBody += "</tr>";
            }
            break;
        case "10":
            for (let i in dataList) {
                tBody += "<tr data-index='" + i + "'>";
                if (i == 0) {
                    tBody += "<td data-index='" + i + "' rowspan='" + dataList.length +"'>" + dataList[i]["region"] + "</td><td>" + dataList[i]["product"] + "</td>";
                }
                else {
                    tBody += "<td data-index='" + i + "'>" + dataList[i]["product"] + "</td>";
                }
                for(let j in dataList[i]["sale"]) {
                    tBody += "<td data-index='" + i + j + "'>" + "<span class='active'>" + dataList[i]["sale"][j] + "</span>" +
                        "<em class='edit'>编辑</em><input type='text' class='input-text' value='" + dataList[i]["sale"][j] + "'><br><em class='cancle'>取消</em><em class='save'>保存</em></td>";
                }
                tBody += "</tr>";
            }
            break;
        case "11":
            for (let i=0;i<dataList.length;i++) {
                tBody += "<tr data-index='" + i + "'>";
                if (i % regionChecked.length == 0) {
                    tBody +=  "<td data-index='" + i + "' rowspan= '" + regionChecked.length + "'>" + dataList[i]["product"] + "</td><td data-index='" + i + "'>" + dataList[i]["region"]+"</td>";
                }
                else {
                    tBody += "<td data-index='" + i + "'>" + dataList[i]["region"] + "</td>";
                }
                for(let j in dataList[i]["sale"]) {
                    tBody += "<td data-index='" + i + j + "'>" + "<span class='active'>" + dataList[i]["sale"][j] + "</span>" +
                        "<em class='edit'>编辑</em><input type='text' class='input-text' value='" + dataList[i]["sale"][j] + "'><br><em class='cancle'>取消</em><em class='save'>保存</em></td>";
                }
                tBody += "</tr>";
            }
            break;
    }
    let html = tHead + tBody;
    table.innerHTML = html ;

    // 监听表格鼠标事件
    // 获取对应tr或者td的商品及区域的自定义属性
    table.addEventListener("mouseover", function(ev) {
        ev = ev || window.event;
        let target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == "td" ) {
            // 获取对应tr或者td的商品及区域的自定义属性
            // 根据上面两个属性在数据中获取对应的12个月的数据
            let index = target.dataset.index.charAt(0);
            let newDataList = [];
            newDataList.push(sourceData[index]);
            let maxHeight = getMaxHeight(newDataList);
            // 调用图表的设置数据方式
            createLineChat(newDataList, maxHeight);
            createSvg(newDataList, maxHeight);
        }
        if (target.nodeName.toLocaleLowerCase() == "span") {
            clearEffect(target, table);
            target.parentNode.childNodes[1].classList.add("active");
        }
    });

    // 鼠标移开表格时图表默认显示全部数据
    table.addEventListener("mouseleave", function(ev) {
        let newDataList = createData();
        let maxHeight = getMaxHeight(newDataList);
        // 调用图表的设置数据方式
        createLineChat(newDataList, maxHeight);
        createSvg(newDataList, maxHeight);
    });

    // text文本框focus事件，记录某一文本框在blur之前的数据，以便于输入不合法时重新设置为该数据
    table.addEventListener("focus",function(ev) {
        ev = ev || window.event;
        let target = event.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == "input"){
            rawData = target.value;
        }
    },true); //阻止事件冒泡

    // text文本框blur事件  blur后如果数据不合法则恢复原来的数据
    table.addEventListener("blur",function(ev){
        ev = ev || window.event;
        let target = ev.target || ev.srcElement;
        let td = target.parentNode;
        if(target.nodeName.toLowerCase() == "input"){
            if(!isLegal(target.value)){
                alert("输入数据不合法!");
                target.value = rawData;
            }
            else {
                rawData = target.value;
            }
        }
    }, true); //阻止事件冒泡


    // 文本域上的点击事件
    table.addEventListener("click",function(ev) {
        ev = ev || window.event;
        let target = ev.target || ev.srcElement;
        let td = target.parentNode;
        let nodeName = target.nodeName.toLowerCase();
        // 确定点击事件
        if (nodeName.indexOf("em")!= -1 || nodeName == "span") { //点击了span文本框或者是编辑
            clearEffect(target, table);
            let emClassName = target.className;
            if (nodeName == "span" || emClassName == "edit") {
                td.childNodes[0].classList.remove("active");
                td.childNodes[1].classList.remove("active");
                td.childNodes[2].classList.add("active");
                td.childNodes[2].focus();
                td.childNodes[4].classList.add("active");
                td.childNodes[5].classList.add("active");
            }
            else if (emClassName.indexOf("cancle") != -1) {
                td.childNodes[2].classList.remove("active");
                td.childNodes[4].classList.remove("active");
                td.childNodes[5].classList.remove("active");
                td.childNodes[0].classList.add("active");
                td.childNodes[1].classList.add("active");
            }
            else if (emClassName.indexOf("save") != -1) {
                td.childNodes[1].classList.remove("active");
                td.childNodes[2].classList.remove("active");
                td.childNodes[4].classList.remove("active");
                td.childNodes[5].classList.remove("active");
                td.childNodes[0].classList.add("active");
                let trIndex = td.dataset.index.charAt(0);
                let tdIndex = td.dataset.index.substring(1); //获得要修改数据的自定义属性，以存储数据
                localDataList[trIndex]["sale"][tdIndex] = rawData;
                //重新渲染页面
                let dataList = createData();
                createNewTable(flag, dataList);

                //    渲染柱状图
                let maxHeight = getMaxHeight(dataList);
                createSvg(dataList, maxHeight);

                //    渲染折线图
                createLineChat(dataList, maxHeight);


                //    保存数据到本地
                let storage = window.localStorage;
                storage.clear();
                storage.setItem("data", JSON.stringify(dataList));
            }
        }
    });

    //键盘事件
    table.addEventListener("keydown", function (ev) {
        ev = ev || window.event;
        let target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() == "input") {
            let keyCode = ev.keyCode;
            if (/^13|27$/.test(keyCode)) {
                ev.preventDefault();
                let td = target.parentNode;
                if (keyCode == 13) { //按下了Enter
                    td.childNodes[1].classList.remove("active");
                    td.childNodes[2].classList.remove("active");
                    td.childNodes[4].classList.remove("active");
                    td.childNodes[5].classList.remove("active");
                    td.childNodes[0].classList.add("active");
                    let trIndex = td.dataset.index.charAt(0);
                    let tdIndex = td.dataset.index.substring(1); //获得要修改数据的自定义属性，以存储数据
                    localDataList[trIndex]["sale"][tdIndex] = rawData;
                    //重新渲染页面
                    let dataList = createData();
                    createNewTable(flag, dataList);

                    //    渲染柱状图
                    let maxHeight = getMaxHeight(dataList);
                    createSvg(dataList, maxHeight);

                    //    渲染折线图
                    createLineChat(dataList, maxHeight);


                    //    保存数据到本地
                    let storage = window.localStorage;
                    storage.clear();
                    storage.setItem("data", JSON.stringify(dataList));
                } else {
                    td.childNodes[2].classList.remove("active");
                    td.childNodes[4].classList.remove("active");
                    td.childNodes[5].classList.remove("active");
                    td.childNodes[0].classList.add("active");
                    td.childNodes[1].classList.add("active");
                }
            }
        }
    });

}


//生成对应选择了的复选框的表格数据，优先从本地存储中取数据
function createData() {
    for (let i in localDataList) {
        for (let j in sourceData) {
            if (localDataList[i]["region"] == sourceData[j]["region"] && localDataList[i]["product"] == sourceData[j]["product"]) {
                sourceData[j]["sale"] = localDataList[i]["sale"];
            }
        }
    }
    let dataList = [];
    //遍历原始数据
    for(let i in sourceData) {
        if(regionChecked.indexOf(sourceData[i]["region"]) != -1 && productChecked.indexOf(sourceData[i]["product"]) != -1) {
            dataList.push(sourceData[i]);
        }
    }
    return dataList;
}

//判断选择了的地区和商品数量
function judgeRegAndPro() {
    let flag;
    if (productChecked.length > 1 && regionChecked.length > 1)
        flag = "11"; //当商品和地区都选择了多于一个的情况下
    else if (productChecked.length == 1 && regionChecked.length > 1)
        flag = "01"; //当商品选择了一个，地区选择了多个的时候
    else if (productChecked.length > 1 && regionChecked.length == 1)
        flag = "10"; //当地区选择了一个，商品选择了多个的时候
    else
        flag = "00"; //当商品和地区都只选择一个的情况下
    return flag;
}

//生成表头信息
function createTableHead(flag) {  //flag判断选择了的地区和商品数量
    if (!flag)
        return "";
    let head = "<thead><tr>";
    let month = "";
    let product = "<th>商品</th>";
    let region = "<th>地区</th>";
    if (flag == "10" ) { //当地区选择了一个，商品选择了多个的时候
        head += region; //先加载地区
        head += product;  //再加载商品
    }
    else { //flag=01,11,00
        head += product;
        head += region;
    }
    for (let i=1;i<=12;i++) {
        month += "<th>" + i + "月" + "</th>"; //生成月份
    }
    head = head + month + "</tr></thead>";
    return head;
}

//清除非当前悬浮td的编辑效果
function clearEffect(target, table) {
    let activeItem = table.querySelector("em.active");
    if (activeItem) {
        let parent = activeItem.parentNode;
        if (parent && (!target || !parent.contains(target)))
            parent.childNodes[1].classList.remove("active");
    }
}

// 判断输入的数据是否合法 不合法给出警告 并且不进行数据设置
function isLegal(inputData){
    // Number会将空字符串按照0处理,返回true表示合法
    if((!Number(inputData)) || inputData === "0")
        return false;
    else
        return true;
}