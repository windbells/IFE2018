function Restaurant(restInfo) {
    restInfo = restInfo || {};
    this.cash = restInfo.cash || 0;
    this.seats = restInfo.seats || 0;
    this.staff = restInfo.staff || null;
}

Restaurant.prototype.hire = function (staff) {
    if (staff) {
        this.staff.push(staff);
    }
};

Restaurant.prototype.fire = function (staffDel) {
    const index = this.staff.indexOf(staffDel);
    if (index != -1) {
        this.staff.splice(index, 1);
        console.log("删除成功");
    }
    else {
        console.log("该员工不存在");
    }
};

// var restaurant = (function (restInfo) {
//    var instance;
//    return function () {
//        if (!instance) {
//            instance = new Restaurant(restInfo);
//        }
//        return instance;
//    }
// });