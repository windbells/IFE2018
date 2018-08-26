function createLineChat(dataList, maxHeight) {
    // 轴的高度，宽度
    let axisHeight = 200;
    //定义第一个点距离坐标轴的位置
    let firstPadding = 20;
    //定义坐标轴的偏移量
    let offset = 25;
    // 定义好每两个数据点之间的横向间隔距离
    let linePadding = 47;
    // 定义好每一个数据点的直径
    let radius = 5;

    // 根据Max和你用来绘制折线图图像区域的高度，进行一个数据和像素的折算比例
    //定义x轴月份的位置
    let axisTextX = [];
    for (let i = 0; i < 12; i++) {
        axisTextX.push(i * linePadding + firstPadding + offset);
    }
    let ratio = (axisHeight / maxHeight).toFixed(2);
    //绘制横轴及纵轴
    let canvas = document.getElementById("line");
    canvas.height = canvas.height; //清除画布
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        //画坐标轴的线
        ctx.beginPath();
        ctx.moveTo(offset,0);
        ctx.lineWidth = 2;
        ctx.lineTo(offset,205);
        ctx.lineTo(600,205);
        ctx.stroke();

        //画x轴的月份
        // 填充文字
        ctx.font = "12px Arial";
        for (let i = 0; i < 12; i++) {
            ctx.fillText((i+1)+"月", axisTextX[i], 220);
        }

        //绘制y轴上面的数字
        ctx.fillText(maxHeight, 0, 20);

        // 绘制折线
        drawLine(dataList, axisTextX, ratio, barColors, ctx);
        //绘制圆
        drawArc(dataList, axisTextX, ratio, barColors, ctx);

    }

}

// createLineChat(sourceData, 710);

//定义画折线的函数
function drawLine(dataList, axisX, ratio, barColors, ctx) {
    // 遍历数据
    for (let j = 0; j < 12; j++) {
        for (let i = 0; i < dataList.length; i++) {
            // 计算将要绘制数据点的起点坐标
            let xStart = axisX[j] + 8;
            let yStart = 205-(dataList[i]["sale"][j]*ratio);
            // 终点坐标
            let xEnd = axisX[j+1] + 8;
            let yEnd = 205-(dataList[i]["sale"][j+1]*ratio);
            // 绘制数据点
            if (j != 11) { //不是最后一个点
                // 绘制这个数据点和下一个数据点的连线
                ctx.beginPath();
                ctx.moveTo(xStart, yStart);
                ctx.lineTo(xEnd, yEnd);
                ctx.strokeStyle = barColors[i]; //设置线的颜色
                ctx.closePath();
                ctx.stroke();
            }

        }

    }

}

//定义画圆的函数
function drawArc(dataList, axisX, ratio, barColors, ctx) {
    //如果只有一条线，显示具体数字
    if (dataList.length == 1) {
        // 遍历数据
        for (let j = 0; j < 12; j++) {
            // 计算将要绘制圆的中心坐标
            let xStart = axisX[j] + 8;
            let yStart = 205-(dataList[0]["sale"][j]*ratio);

            // 绘制数据点
            ctx.beginPath();
            ctx.moveTo(xStart, yStart);
            ctx.arc(xStart, yStart, 5, 0, 2*Math.PI);
            ctx.fillStyle = barColors[0]; //设置线的颜色
            ctx.fillText(dataList[0]["sale"][j], xStart - 5, yStart + 15);
            ctx.closePath();
            ctx.fill();
        }

    }
    else {
        // 遍历数据
        for (let j = 0; j < 12; j++) {
            for (let i = 0; i < dataList.length; i++) {
                // 计算将要绘制圆的中心坐标
                let xStart = axisX[j] + 8;
                let yStart = 205-(dataList[i]["sale"][j]*ratio);

                // 绘制数据点
                ctx.beginPath();
                ctx.moveTo(xStart, yStart);
                ctx.arc(xStart, yStart, 3, 0, 2*Math.PI);
                ctx.fillStyle = barColors[i]; //设置线的颜色
                ctx.closePath();
                ctx.fill();
            }

        }
    }

}