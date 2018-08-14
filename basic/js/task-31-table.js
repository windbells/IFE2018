
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
    var tHead = createTableHead(flag); //获取表头
    var tBody = "";
    //输出每一行的表格HTML内容
    switch (flag) {
        case "00":
            for (let i in dataList) {
                tBody += "<tr><td>" + dataList[i]["product"] + "</td><td>" + dataList[i]["region"] + "</td>";
                for (let j in dataList[i]["sale"]) {
                    tBody += "<td>" + dataList[i]["sale"][j] + "</td>";
                }
                tBody += "</tr>";
            }
            break;
        case "01":
            for (let i in dataList) {
                tBody += "<tr>";
                if (i == 0) {
                    tBody += "<td rowspan='" + dataList.length +"'>" + dataList[i]["product"] + "</td><td>" + dataList[i]["region"] + "</td>";
                }
                else {
                    tBody += "<td>" + dataList[i]["region"] + "</td>";
                }
                for(let j in dataList[i]["sale"]) {
                    tBody   += "<td>" + dataList[i]["sale"][j] + "</td>";
                }
                tBody += "</tr>";
            }
            break;
        case "10":
            for (let i in dataList) {
                tBody += "<tr>";
                if (i == 0) {
                    tBody += "<td rowspan='" + dataList.length +"'>" + dataList[i]["region"] + "</td><td>" + dataList[i]["product"] + "</td>";
                }
                else {
                    tBody += "<td>" + dataList[i]["product"] + "</td>";
                }
                for(let j in dataList[i]["sale"]) {
                    tBody   += "<td>" + dataList[i]["sale"][j] + "</td>";
                }
                tBody += "</tr>";
            }
            break;
        case "11":
            for (let i=0;i<dataList.length;i++) {
                tBody += "<tr>";
                // console.log(i % regionChecked.length + ",i=" + i + ",region=" + regionChecked.length + dataList[i]["product"]);
                if (i % regionChecked.length == 0) {
                    tBody +=  "<td rowspan= '" + regionChecked.length + "'>" + dataList[i]["product"] + "</td><td>" + dataList[i]["region"]+"</td>";
                }
                else {
                    tBody += "<td>" + dataList[i]["region"] + "</td>";
                }
                for(let j in dataList[i]["sale"]) {
                    tBody += "<td>" + dataList[i]["sale"][j] + "</td>";
                }
                tBody += "</tr>";
            }
        }
    var html = tHead + tBody;
    table.innerHTML = html ;
}


//生成对应选择了的复选框的表格数据
function createData() {
    var dataList = [];
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
    var flag;
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
    var head = "<thead><tr>";
    var month = "";
    var product = "<th>商品</th>";
    var region = "<th>地区</th>";
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
