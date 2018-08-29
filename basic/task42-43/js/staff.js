let id = 0;
function Staff(name, salary) {
    id += 1;
    this.id = id;
    this.name = name;
    this.salary = salary;
}

Staff.prototype.doWork = function () {
    console.log("工作啦");
};

function Waiter(name, salary) {
    Staff.call(this, name, salary);
}

Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;


Waiter.prototype.doWork = function (order) {
    if (order instanceof Array)
        console.log("服务员记录客人点菜");
    else 
        console.log("服务员上菜啦");
        
};

function Cook(name, salary) {
    Staff.call(this, name , salary);
}

Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;

Cook.prototype.doWork = function () {
    console.log("厨师做菜");
};

