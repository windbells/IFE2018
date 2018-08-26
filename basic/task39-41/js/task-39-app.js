var productCheckBox = document.querySelector("#product-checkbox");
var regionCheckBox = document.querySelector("#region-checkbox");
var table = document.querySelector("#table");
var regionChecked = [];
var productChecked = [];
var flag; //判断选择了的地区和商品数量，01：当商品选择了一个，地区选择了多个的时候；
//								  10：当地区选择了一个，商品选择了多个的时候；
//								  11：当商品和地区都选择了多于一个的情况下；
//								  00：当商品和地区都只选择一个的情况下；
//定义柱子以及折线的颜色列表
var barColors = ["#F49AC1","#FED5A3","#D19D8D","#C3E8F2","#4F96E8","#91FF8B","#65180D", "#E8C573", "#9C5CA1"];
var localDataList = []; //取出本地存储的数据
var rawData; //记录输入框的原始数据

var sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
},
    {
        product: "手机",
        region: "华北",
        sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
    },
    {
        product: "手机",
        region: "华南",
        sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
    },
    {
        product: "笔记本",
        region: "华东",
        sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
    },
    {
        product: "笔记本",
        region: "华北",
        sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
    },
    {
        product: "笔记本",
        region: "华南",
        sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
    },
    {
        product: "智能音箱",
        region: "华东",
        sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
    },
    {
        product: "智能音箱",
        region: "华北",
        sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
    },
    {
        product: "智能音箱",
        region: "华南",
        sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
    }];

//  商品复选框参数
var productData=[{
    value:1,
    text:"手机"
},
    {
        value:2,
        text:"笔记本"
    },
    {
        value:3,
        text:"智能音箱"
    }];

// 地区复选框参数
var regionData=[{
    value:1,
    text:"华东"
},
    {
        value:2,
        text:"华南"
    },
    {
        value:3,
        text:"华北"
    }];

// 页面加载时，自动生成checkbox
window.onload=function(){
    createCheckBox(regionCheckBox,regionData);
    createCheckBox(productCheckBox,productData);

    //从本地存储中获取数据
    if(window.localStorage){
        localDataList = JSON.parse(localStorage.getItem("data"));
        if (localDataList.length > 0) {
            let regCheckList = "";
            let proCheckList = "";
            for (let i in localDataList) {
                let region = localDataList[i]["region"];
                let product = localDataList[i]["product"];
                if (regCheckList.indexOf(region) == -1) {
                    regCheckList += region;
                }
                if (proCheckList.indexOf(product) == -1) {
                    proCheckList += product;
                }
            }
            let regSelector = "#" + regionCheckBox.id + " input";
            let proSelector= "#" + productCheckBox.id + " input";
            let regCheckBoxs = document.querySelectorAll(regSelector);
            let proCheckBoxs = document.querySelectorAll(proSelector);
            let countReg = 0; //计算本地数据中有多少复选框被选中
            let countPro = 0;
            for (let i=1;i<regCheckBoxs.length;i++) {
                if (regCheckList.indexOf(regCheckBoxs[i].value) != -1) {
                    regCheckBoxs[i].checked = true;
                    countReg++;
                }
            }
            for (let i=1;i<proCheckBoxs.length;i++) {
                if (proCheckList.indexOf(proCheckBoxs[i].value) != -1) {
                    proCheckBoxs[i].checked = true;
                    countPro++;
                }
            }
            if (countReg == 3) {
                regCheckBoxs[0].checked = true;
            }
            if (countPro == 3) {
                proCheckBoxs[0].checked = true;
            }

            // 渲染新的表格(根据select选项获取数据)
            regionChecked = getCheckBox(regionCheckBox); //地区的选中复选框列表
            productChecked = getCheckBox(productCheckBox); //商品的选中复选框列表
            flag = judgeRegAndPro(); //判断商品和地区的选中个数
            createNewTable(flag, localDataList);

            //    渲染柱状图
            let maxHeight = getMaxHeight(localDataList);
            createSvg(localDataList, maxHeight);

            //    渲染折线图
            createLineChat(localDataList, maxHeight);
        }
    }

    changeURL();
};

