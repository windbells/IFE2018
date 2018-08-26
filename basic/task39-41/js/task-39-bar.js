function createSvg(dataList, maxHeight) {
    // 定义用来绘制柱状图图像区域的高度
    let axisHeight = 200;
    // 拿到柱状图中的最大值Max，进行一个数据和像素的折算比例
    let ratio = (axisHeight/maxHeight).toFixed(2);
    // console.log(ratio + "\t" + maxHeight);

    // 绘制横轴及纵轴
    let svg = document.getElementById("bar");
    let axis = createAxis(maxHeight);
    let bar = createBar(dataList, ratio, barColors);
    svg.innerHTML = axis + bar;

}


//建立坐标轴
function createAxis(maxHeight) {
    let html = "";
    // 柱子的间隔宽度
    let barPadding = 10;
    //定义好每一个柱子的宽度
    let barWidth = 36;
    //定义x轴月份的位置
    let axisTextX = [];
    for (let i = 1; i <= 12; i++) {
        axisTextX.push((i*(barWidth+barPadding))-barWidth/2+barPadding);
        // console.log((i*(barWidth+barPadding))-barWidth/2+barPadding);
    }
    //建立y轴
    html += "<line x1='25' y1='0' x2='25' y2='200' " +
        "style='stroke:rgb(99,99,99);stroke-width:2'/>";

    //建立x轴
    html += "<line x1='25' y1='200' x2='620' y2='200' " +
        "style='stroke:rgb(99,99,99);stroke-width:2'/>";

    //y轴的数字
    html += "<text x='0' ' y='20' " +
        "font-size='12'>" + maxHeight + "</text>";

    //x轴上的月份
    for (let i=0;i<12;i++) {
        html += "<text x='" + axisTextX[i] + "' y='220' " +
            "font-size='12'>" + (i+1) + "月" + "</text>";

    }
    return html;
}

// createAxis(710);

function createBar(dataList, radio, barColors) {
    let html= "";
    // 柱子的间隔宽度
    let barPadding = 10;
    //定义每月柱子的总宽度
    let barWidth = 36;
    let barEvery = barWidth / dataList.length;
    //定义每个月份的第一个柱子的x轴起始位置
    let axisBarX = [];
    for (let i = 0; i < 12; i++) {
        axisBarX.push((i*(barWidth+barPadding))+ barPadding + 25);
    }

    // 遍历数据
    for (let j = 0;j < 12; j++) {
        for (let i = 0; i < dataList.length; i++) {
            // 计算将要绘制柱子的高度和位置
            let axisX = axisBarX[j] + i * barEvery;
            // console.log(axisX);
            html += " <rect x='" + axisX + "' y='" + (199-(dataList[i]["sale"][j]*radio)) + "' width='" + barEvery + "' height='" + (dataList[i]["sale"][j]*radio) +
                "' style='fill:" + barColors[i] + "'/>";
            // 绘制每一个柱子
        }
    }
    return html;

}

function getMaxHeight(dataList) {
    //将传进来的数据的销售数据存在数组中
    let saleList = [];
    for (let i in dataList) {
        saleList.push(dataList[i]["sale"]);
    }
    //转化为一维数组
    let saleOneDim = saleList.join(",").split(",");
    //求数组中的最大值
    let maxHeight = Math.max.apply(null, saleOneDim);
    return maxHeight;
}