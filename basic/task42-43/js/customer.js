function Customer() {

}

Customer.prototype.eat = function(dish){
    console.log("吃" + dish);
};

Customer.prototype.order = function(dish){
    console.log("点了" + dish);
};