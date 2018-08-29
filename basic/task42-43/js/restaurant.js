function Restaurant(config) {
    this.cash = config.cash;
    this.seats = config.seats;
    this.staff = config.staff;
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