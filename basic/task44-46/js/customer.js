var cId = 0;
function Customer() {
    cId += 1;
    this.cId = cId;
    console.log("顾客" + cId + "进来啦");
}

//顾客用餐
Customer.prototype.eat = function(dish){
    console.log("顾客" + cId + "吃" + dish);
};


//顾客点菜
Customer.prototype.order = function(dish){
    console.log("顾客" + cId + "点了" + dish);
    var dishes = [];
    dishes.push(dish);
};