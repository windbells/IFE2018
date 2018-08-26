var index = "task-39.html";

function changeURL(){
    let product = productChecked.join(",");
    let region = regionChecked.join(",");
    let url = encodeURI(index + "#product=" + product + "&region=" + region);
    let state = {
        title: null,
        url: window.location.href
    };
    window.history.pushState(state, null, url);//添加到历史记录
}

window.addEventListener("popstate", function() {
    let currentState = history.state;
    if (currentState) {
        let url = decodeURI(currentState["url"]);
        let regAndPro = url.split("#")[1];
        productChecked = regAndPro.split("&")[0].split("=")[1].split(",");
        regionChecked = regAndPro.split("&")[1].split("=")[1].split(",");
        flag = judgeRegAndPro(); //判断商品和地区的选中个数
        // 根据select选项获取数据
        let dataList = createData();
        localDataList = dataList;
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
});